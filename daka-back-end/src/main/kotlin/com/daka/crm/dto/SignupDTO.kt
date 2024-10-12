package com.daka.crm.dto

import com.daka.crm.enums.UserState
import com.daka.crm.model.User
import java.util.*

data class SignUpDTO(
    var email: String,
    var password: String,
    var lastName: String,
    var firstName: String
) {

    fun toModel(): User {
        return User(
            id = 0,
            roles = listOf(),
            state = UserState.INACTIVE,
            email = this.email,
            lastName = this.lastName,
            firstName = this.firstName,
            password = this.password,
            creationDate = Date()
        )
    }
}
