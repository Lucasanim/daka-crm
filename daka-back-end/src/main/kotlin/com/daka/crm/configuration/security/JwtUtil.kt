package com.daka.crm.configuration.security

import com.daka.crm.dto.UserDTO
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtUtil {
    private val mapper = jacksonObjectMapper()

    @Value("\${jwt.secret}")
    private lateinit var secretKey: String

    @Value("\${jwt.accessExpirationMinutes}")
    private var accessExpirationMinutes: Long = 0

    @Value("\${jwt.refreshExpirationMinutes}")
    private var refreshExpirationMinutes: Long = 0

    fun generateAccessToken(userDTO: UserDTO): String {
        return Jwts.builder()
            .setSubject(mapper.writeValueAsString(userDTO))
            .setIssuedAt(Date())
            .setExpiration(getExpirationDate(accessExpirationMinutes))
            .signWith(SignatureAlgorithm.HS512, secretKey.toByteArray())
            .compact()
    }

    fun generateRefreshToken(userDTO: UserDTO): String {
        return Jwts.builder()
            .setSubject(mapper.writeValueAsString(userDTO))
            .setIssuedAt(Date())
            .setExpiration(getExpirationDate(refreshExpirationMinutes))
            .signWith(SignatureAlgorithm.HS512, secretKey.toByteArray())
            .compact()
    }

    private fun getExpirationDate(minutes: Long) : Date {
        val calendar = Calendar.getInstance()

        calendar.time = Date()
        calendar.add(Calendar.MINUTE, minutes.toInt())

        return calendar.time
    }

    fun validateToken(token: String): Boolean {
        return try {
            Jwts.parser()
                .setSigningKey(secretKey.toByteArray())
                .parseClaimsJws(token)
                .body.expiration.after(Date())
        } catch (e: Exception) {
            false
        }
    }

    fun getUserFromToken(token: String): UserDTO {
        val claims = Jwts.parser()
            .setSigningKey(secretKey.toByteArray())
            .parseClaimsJws(token)
            .body
        return mapper.readValue(claims.subject)
    }
}
