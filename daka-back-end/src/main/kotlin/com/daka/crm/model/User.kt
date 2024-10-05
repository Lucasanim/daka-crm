package com.daka.crm.model

import com.daka.crm.enums.UserRole
import jakarta.persistence.*
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.util.*

@Entity
@Table(name = "user")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    var id: Long,
    @Enumerated(value = EnumType.STRING)
    var roles: List<UserRole>,
    @get:JvmName("_password") @get:JvmSynthetic var password: String,
    var email: String,
    var lastName: String,
    var firstName: String,
    var creationDate: Date
) : UserDetails {

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return roles.map { role -> SimpleGrantedAuthority(role.name) }.toMutableList()
    }

    override fun getPassword(): String {
        return password
    }

    override fun getUsername(): String {
        return email
    }


}