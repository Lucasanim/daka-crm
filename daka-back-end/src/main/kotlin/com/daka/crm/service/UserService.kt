package com.daka.crm.service

import com.daka.crm.model.User
import com.daka.crm.repository.UserRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(
    private val userRepository: UserRepository
) {

    fun getById(id: Long): Optional<User> {
        return userRepository.findById(id)
    }

    fun getByEmail(email: String): Optional<User> {
        return userRepository.findByEmail(email)
    }

    fun save(user: User) {
        userRepository.save(user)
    }
}