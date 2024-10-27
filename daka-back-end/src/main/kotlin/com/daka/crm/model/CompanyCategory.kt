package com.daka.crm.model

import jakarta.persistence.*

@Entity
data class CompanyCategory(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val userId: Long,
    val name: String,
)
