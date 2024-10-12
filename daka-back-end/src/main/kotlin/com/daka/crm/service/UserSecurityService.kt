package com.daka.crm.service

import com.daka.crm.configuration.security.JwtUtil
import com.daka.crm.dto.LoginRequestDTO
import com.daka.crm.dto.LoginResponseDTO
import com.daka.crm.dto.SignUpDTO
import com.daka.crm.dto.UserDTO
import com.daka.crm.exception.DAuthenticationException
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.apache.commons.lang3.StringUtils
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserSecurityService(
    private val userService: UserService,
    private val passwordEncoder: PasswordEncoder,
    private val jwtUtil: JwtUtil
) : UserDetailsService{
    private val mapper = jacksonObjectMapper()

    override fun loadUserByUsername(username: String): UserDetails {
        return userService.getByEmail(username).orElse(null)
    }

    fun login(loginRequest: LoginRequestDTO) : LoginResponseDTO {
        if (StringUtils.isEmpty(loginRequest.email) || StringUtils.isEmpty(loginRequest.password)) {
            throw DAuthenticationException("Email and password are required")
        }

        val optUser = userService.getByEmail(loginRequest.email)

        if (optUser.isEmpty || !passwordEncoder.matches(loginRequest.password, optUser.get().password)) {
            throw DAuthenticationException("Wrong credentials")
        }

        val userDto = UserDTO.from(optUser.get())
        return getAuthTokenResponse(userDto);
    }

    fun signup(request: SignUpDTO): LoginResponseDTO {
        val userDto = userService.signup(request)

        return getAuthTokenResponse(userDto);
    }

    private fun getAuthTokenResponse(userDTO: UserDTO): LoginResponseDTO {
        val accessToken = jwtUtil.generateAccessToken(userDTO)
        val refreshToken = jwtUtil.generateRefreshToken(userDTO)

        return LoginResponseDTO(accessToken, refreshToken, userDTO.id)
    }

    fun refreshToken(refreshToken: String) : String {
        if (StringUtils.isEmpty(refreshToken) || !jwtUtil.validateToken(refreshToken)) {
            throw DAuthenticationException("Invalid refresh token provided")
        }

        val userDto = jwtUtil.getUserFromToken(refreshToken)
        val accessToken = jwtUtil.generateAccessToken(userDto)

        return accessToken
    }

}