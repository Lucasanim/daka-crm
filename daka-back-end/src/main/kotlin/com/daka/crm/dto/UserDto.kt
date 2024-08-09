package com.daka.crm.dto

import com.daka.crm.enums.UserRole
import com.daka.crm.model.User
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority

data class UserDTO(
    var id: Long,
    var roles: List<UserRole>,
    var email: String,
    var lastName: String,
    var firstName: String
) {
    fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return roles.map { role -> SimpleGrantedAuthority(role.name) }.toMutableList()
    }

    companion object {
        fun from(user: User): UserDTO {
            return UserDTO(
                id = user.id,
                roles = user.roles,
                email = user.email,
                lastName = user.lastName,
                firstName = user.firstName
            )
        }
    }
}
