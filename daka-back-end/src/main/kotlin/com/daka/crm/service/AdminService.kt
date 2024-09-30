package com.daka.crm.service

import com.daka.crm.dto.UserDTO
import org.springframework.stereotype.Service

@Service
class AdminService(
    private val userService: UserService
) {

    fun searchUsers(value: String): List<UserDTO> {
        val matches = userService.getByEmailLike(value)

        return UserDTO.from(matches)
    }

    fun updateUser(userDTO: UserDTO) {
        userService.updateUser(userDTO)
    }

    fun deleteUser(id: Long) {
        userService.deleteById(id)
    }
}