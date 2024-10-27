package com.daka.crm.model

import com.daka.crm.enums.DealState
import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDateTime

@Entity
data class Deal(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val userId: Long,
    var name: String,
    var amount: BigDecimal,
    val creationDate: LocalDateTime = LocalDateTime.now(),
    val finishDate: LocalDateTime?,
    @Enumerated(value = EnumType.STRING)
    var state: DealState = DealState.TO_DO,
    @ManyToOne
    @JoinColumn(name = "customer_id")
    val customer: Customer,
)