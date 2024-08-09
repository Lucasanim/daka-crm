package com.daka.crm.filter

import com.daka.crm.configuration.http.HttpRequestWrapper
import com.daka.crm.configuration.security.JwtUtil
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class AuthenticationFilter(
    private val jwtUtil: JwtUtil
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val token = request.getHeader("Authorization")?.removePrefix("Bearer ")

        if (token == null || !jwtUtil.validateToken(token)) {
            filterChain.doFilter(request, response)
            return
        }

        val requestWrapper = HttpRequestWrapper(request);
        val userDTO = jwtUtil.getUserFromToken(token)

        val authenticationToken = UsernamePasswordAuthenticationToken(userDTO, null, userDTO.getAuthorities())
        authenticationToken.details = WebAuthenticationDetailsSource().buildDetails(request)
        SecurityContextHolder.getContext().authentication = authenticationToken

        requestWrapper.addHeader("userId", userDTO.id.toString());
        requestWrapper.addHeader("email", userDTO.email);
        filterChain.doFilter(request, response)
    }
}
