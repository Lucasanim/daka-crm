package com.daka.crm.repository

import com.daka.crm.model.Customer
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CustomerRepository : JpaRepository<Customer, Long> {
    fun findAllByUserId(userId: Long): List<Customer>
}
