package com.daka.crm.configuration.security

import com.daka.crm.filter.AuthenticationFilter
import com.daka.crm.service.UserSecurityService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource


@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val passwordEncoder: PasswordEncoder,
    private val userSecurityService: UserSecurityService,
    private val authenticationFilter: AuthenticationFilter
)  {

    @Bean
    @Throws(Exception::class)
    fun filterChain(http: HttpSecurity, authenticationManager: AuthenticationManager?): SecurityFilterChain {
        return http
            .cors { obj: CorsConfigurer<HttpSecurity> -> obj.configurationSource(corsConfigurationSource()) }
            .csrf { obj: CsrfConfigurer<HttpSecurity> -> obj.disable() }
            .sessionManagement { session: SessionManagementConfigurer<HttpSecurity?> ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            }
            .authorizeHttpRequests(Customizer { auth ->
                auth
                    .requestMatchers(HttpMethod.POST, "/authentication/**")
                    .permitAll()
                    .anyRequest().authenticated()
            })
            .authenticationManager(authenticationManager)
            .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter::class.java)
            .build()
    }

    @Bean
    @Throws(Exception::class)
    fun authenticationManager(http: HttpSecurity): AuthenticationManager {
        val authenticationManagerBuilder = http.getSharedObject(
            AuthenticationManagerBuilder::class.java
        )
        authenticationManagerBuilder.userDetailsService<UserDetailsService>(userSecurityService)
            .passwordEncoder(passwordEncoder)
        return authenticationManagerBuilder.build()
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf("http://localhost:5173")
        configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")
        configuration.allowedHeaders = listOf("Authorization", "Content-Type")
        configuration.allowCredentials = true

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

}
