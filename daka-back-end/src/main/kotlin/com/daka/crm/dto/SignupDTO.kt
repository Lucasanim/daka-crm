package com.daka.crm.dto

import com.daka.crm.enums.UserRole
import com.daka.crm.model.User

data class SignUpDTO(
    var id: Long,
    var roles: List<UserRole>,
    var email: String,
    var password: String,
    var lastName: String,
    var firstName: String
) {

    fun toModel(): User {
        return User(
            id = this.id,
            roles = this.roles,
            email = this.email,
            lastName = this.lastName,
            firstName = this.firstName,
            password = this.password,
        )
    }
}
