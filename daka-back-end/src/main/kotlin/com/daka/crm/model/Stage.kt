package com.daka.crm.model

import com.daka.crm.enums.StageType
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
data class Stage(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val userId: Long,
    @Enumerated(value = EnumType.STRING)
    var type: StageType,
    val creationDate: LocalDateTime = LocalDateTime.now(),
    val customerId: Long
)
