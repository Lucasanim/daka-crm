package com.daka.crm.service

import com.daka.crm.dto.UserDTO
import com.daka.crm.model.User
import com.daka.crm.repository.UserRepository
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
    private val passwordEncoder: PasswordEncoder,
    private val logger: Logger = LoggerFactory.getLogger(UserService::class.java)
) {

    fun getById(id: Long): Optional<User> {
        return userRepository.findById(id)
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

    fun save(user: User) {
        userRepository.save(user)
    }

    fun deleteById(id: Long) {
        userRepository.deleteById(id)
    }

    fun updateUser(userDTO: UserDTO) {
        val user = getById(userDTO.id).orElseThrow()

        user.firstName = userDTO.firstName
        user.lastName = userDTO.lastName

        // TODO - Add plan and state

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
}