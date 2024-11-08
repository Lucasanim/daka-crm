package com.daka.crm.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
data class Company(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val userId: Long,
    var name: String,
    var address: String?,
    var email: String?,
    var phone: String?,

    @ManyToOne
    @JoinColumn(name = "category_id")
    var category: CompanyCategory,
    var creationDate: LocalDateTime = LocalDateTime.now(),
)