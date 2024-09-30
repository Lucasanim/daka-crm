package com.daka.crm.service

import com.daka.crm.dto.UserDTO
import com.daka.crm.model.User
import com.daka.crm.repository.UserRepository
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(
    private val userRepository: UserRepository
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
}