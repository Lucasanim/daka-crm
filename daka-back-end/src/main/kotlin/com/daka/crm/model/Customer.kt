package com.daka.crm.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
data class Customer(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val userId: Long,
    var firstName: String,
    var lastName: String,
    var email: String?,
    var phone: String?,
    val creationDate: LocalDateTime = LocalDateTime.now(),

    @OneToOne(cascade = [CascadeType.ALL])
    @JoinColumn(name = "stage_id")
    var stage: Stage?,
    @ManyToOne
    @JoinColumn(name = "company_id")
    var company: Company,
    @OneToMany(cascade = [CascadeType.ALL])
    @JoinColumn(name = "deal_id")
    val deals: List<Deal> = emptyList(),
    @OneToMany()
    @JoinColumn(name = "task_id")
    val tasks: List<Task> = emptyList(),
)
