package com.daka.crm.controller

import com.daka.crm.dto.LoginRequestDTO
import com.daka.crm.dto.SignUpDTO
import com.daka.crm.exception.DAuthenticationException
import com.daka.crm.service.UserSecurityService
import com.daka.crm.service.UserService
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/authentication")
class AuthenticationController(
    private val userSecurityService: UserSecurityService,
    private val userService: UserService,
) {
    @PostMapping("/login")
    fun login(@RequestBody loginRequest: LoginRequestDTO): ResponseEntity<out Any> {
        try {
            val response = userSecurityService.login(loginRequest)

            return ResponseEntity.ok().body(response)
        } catch (e: DAuthenticationException) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @PostMapping("/signup")
    fun signup(@RequestBody request: SignUpDTO): ResponseEntity<out Any> {
        try {
            userSecurityService.signup(request)

            return ResponseEntity.status(201).build()
        } catch (e: DAuthenticationException) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @PostMapping("/refresh")
    fun refresh(@RequestBody refreshToken: String): ResponseEntity<String> {
        try {
            val response = userSecurityService.refreshToken(refreshToken)

            return ResponseEntity.ok().body(response)
        } catch (e: DAuthenticationException) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }


    @PostMapping("/recover-account", consumes = [MediaType.TEXT_PLAIN_VALUE])
    fun sendRecoveryEmail(@RequestBody email: String): ResponseEntity<String> {
        userService.sendRecoveryEmail(email)
        return ResponseEntity.ok().build()
    }

    @PostMapping("/recover-account/{token}", consumes = [MediaType.TEXT_PLAIN_VALUE])
    fun recoverAccount(@PathVariable token: String, @RequestBody newPassword: String): ResponseEntity<String> {
        try {
            userService.changeUserPassword(newPassword, token)
            return ResponseEntity.ok().build()
        } catch (e: NotFoundException) {
            return ResponseEntity.notFound().build()
        }
    }
}
