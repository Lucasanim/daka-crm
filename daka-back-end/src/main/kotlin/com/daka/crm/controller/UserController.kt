package com.daka.crm.controller

import com.daka.crm.dto.LoginRequestDTO
import com.daka.crm.dto.SignUpDTO
import com.daka.crm.dto.UserDTO
import com.daka.crm.exception.DAuthenticationException
import com.daka.crm.service.UserSecurityService
import com.daka.crm.service.UserService
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/users")
class UserController(
    private val userService: UserService,
) {
    @GetMapping("/{userId}")
    fun getUserDetails(@PathVariable userId: Long): ResponseEntity<out Any> {
        try {
            val response = userService.getPublicDTOById(userId)

            return ResponseEntity.ok().body(response)
        } catch (e: NotFoundException) {
            return ResponseEntity.notFound().build()
        }
    }

    @PutMapping("/update")
    fun updateUser(@RequestBody user: UserDTO): ResponseEntity<out Any> {
        try {
            return ResponseEntity.ok().body(userService.updateUser(user))
        } catch (e: Exception) {
            return ResponseEntity.badRequest().build()
        }
    }
}
