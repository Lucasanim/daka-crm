package com.daka.crm.service

import com.daka.crm.dto.UserDTO
import org.springframework.stereotype.Service

@Service
class AdminService(
    private val userService: UserService
) {

    fun searchUsers(value: String): List<UserDTO> {
        return userService.searchFromAdmin(value)
    }

    fun updateUser(userDTO: UserDTO) {
        userService.updateUser(userDTO)
    }

    fun deleteUser(id: Long) {
        userService.deleteByIdByAdmin(id)
    }
}