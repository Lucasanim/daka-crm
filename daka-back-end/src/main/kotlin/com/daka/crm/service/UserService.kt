package com.daka.crm.service

import com.daka.crm.dto.SignUpDTO
import com.daka.crm.dto.UserDTO
import com.daka.crm.enums.UserRole
import com.daka.crm.enums.UserState
import com.daka.crm.exception.DAuthenticationException
import com.daka.crm.model.User
import com.daka.crm.repository.UserRepository
import org.apache.commons.lang3.StringUtils
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(
    private val userRepository: UserRepository,
    private val emailService: EmailService,
    private val tokenService: VerificationTokenService,
    private val stripeService: StripeService,
    private val passwordEncoder: PasswordEncoder,
    private val logger: Logger = LoggerFactory.getLogger(UserService::class.java)
) {

    fun getById(id: Long): Optional<User> {
        return userRepository.findById(id)
    }

    fun getByCustomerId(customerId: String): User {
        return userRepository.findByCustomerId(customerId)
    }

    fun getPublicDTOById(id: Long): UserDTO {
        val optUser = getById(id)
        if (optUser.isEmpty) throw NotFoundException()

        return UserDTO.from(optUser.get())
    }

    fun getByEmail(email: String): Optional<User> {
        return userRepository.findByEmail(email)
    }

    fun getByEmailLike(email: String): List<User> {
        return userRepository.findByEmailContaining(email)
    }

    fun searchFromAdmin(email: String): List<UserDTO> {
        val users = getByEmailLike(email)

        return users.map { user ->
            val plan = stripeService.getCustomerPlan(user.customerId)
            UserDTO.from(user, plan)
        }
    }

    fun save(user: User) {
        userRepository.save(user)
    }

    fun deleteByIdByAdmin(id: Long) {
        val user = getById(id).orElseThrow()

        if (UserState.ACTIVE == user.state) {
            stripeService.deleteCustomerAndSubscription(user.customerId)
        }

        deleteById(id)
    }

    fun deleteById(id: Long) {
        userRepository.deleteById(id)
    }

    fun signup(request: SignUpDTO): UserDTO {
        if (StringUtils.isEmpty(request.email) || StringUtils.isEmpty(request.password)) {
            throw DAuthenticationException("Email and password are required")
        }

        val optUser = getByEmail(request.email)

        if (optUser.isPresent) {
            throw DAuthenticationException("Email already taken")
        }

        val user = request.toModel();
        user.password = passwordEncoder.encode(request.password)
        user.roles = listOf(UserRole.USER)

        val userDto = UserDTO.from(user);
        val customer = stripeService.createCustomer(userDto);
        user.customerId = customer.id;

        save(user)

        return UserDTO.from(user);
    }

    fun updateUser(userDTO: UserDTO) {
        val user = getById(userDTO.id).orElseThrow()

        user.firstName = userDTO.firstName
        user.lastName = userDTO.lastName
        user.state = userDTO.state
        val currentPlan = stripeService.getCustomerPlan(user.customerId)
        val newPlan = userDTO.plan

        if (newPlan != null && newPlan != currentPlan) {
            stripeService.changeCustomerPlan(user.customerId, newPlan.priceId)
        }

        save(user)
    }

    fun sendRecoveryEmail(email: String) {
        val optUser = getByEmail(email);
        if (optUser.isEmpty) {
            logger.warn("Trying to recover non existent account with email: $email")
            return;
        }

        val user = optUser.get()
        val token = tokenService.createPasswordRecoveryToken(user.id)

        emailService.sendPasswordRecovery(user.email, token.token)
    }

    fun changeUserPassword(newPassword: String, token: String) {
        val optToken = tokenService.getByToken(token)
        if (optToken.isEmpty) {
            throw NotFoundException()
        }

        val verificationToken = optToken.get()
        if (verificationToken.isExpired()) {
            logger.warn("Attempted to use expired token for userId: ${verificationToken.userId}")
            throw NotFoundException()
        }

        val optUser = getById(verificationToken.userId);
        if (optUser.isEmpty) {
            logger.warn("Trying to recover non existent account with id: ${verificationToken.userId}")
            throw NotFoundException()
        }

        val user = optUser.get()
        user.password = passwordEncoder.encode(newPassword)

        save(user)
    }

    fun updateOnPaymentSucceed(customerId: String) {
        val user = getByCustomerId(customerId)
        user.state = UserState.ACTIVE
        save(user)
    }

    fun updateOnPaymentFail(customerId: String) {
        val user = getByCustomerId(customerId)
        user.state = UserState.INACTIVE
        save(user)
    }

}