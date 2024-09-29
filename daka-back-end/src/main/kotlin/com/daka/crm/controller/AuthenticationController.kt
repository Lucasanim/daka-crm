package com.daka.crm.controller

import com.daka.crm.configuration.security.JwtUtil
import com.daka.crm.dto.LoginRequestDTO
import com.daka.crm.dto.LoginResponseDTO
import com.daka.crm.dto.SignUpDTO
import com.daka.crm.exception.DAuthenticationException
import com.daka.crm.service.UserSecurityService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/authentication")
class AuthenticationController(
    private val userSecurityService: UserSecurityService,
    private val jwtUtil: JwtUtil
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
}
