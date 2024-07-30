package com.daka.crm.model

import com.daka.crm.enums.UserRole
import jakarta.persistence.*

@Entity
@Table(name = "user")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    var id: Long,
    @Enumerated(value = EnumType.STRING)
    var roles: List<UserRole>,
    var password: String,
    var email: String,
    var lastName: String,
    var firstName: String
) {

}