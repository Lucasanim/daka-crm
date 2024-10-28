package com.daka.crm.model

import com.daka.crm.enums.TaskState
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
data class Task(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val userId: Long,
    var name: String,
    @Enumerated(value = EnumType.STRING)
    var state: TaskState,
    val creationDate: LocalDateTime = LocalDateTime.now(),
    @ManyToOne
    @JoinColumn(name = "customer_id")
    val customer: Customer,
)
