package com.daka.crm.model

import com.daka.crm.enums.VerificationTokenType
import jakarta.persistence.*
import java.util.Date

@Entity
data class VerificationToken (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "verification_token_id")
    var id: Long,
    var token: String,
    @Enumerated(value = EnumType.STRING)
    var type: VerificationTokenType,
    var userId: Long,
    var expirationDate: Date
){
    fun isExpired(): Boolean {
        return Date().after(expirationDate)
    }
}