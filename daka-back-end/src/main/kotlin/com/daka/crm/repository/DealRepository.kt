package com.daka.crm.repository

import com.daka.crm.model.Deal
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DealRepository : JpaRepository<Deal, Long> {
    fun findAllByUserId(userId: Long): List<Deal>
    fun findAllByCustomerId(customerId: Long): List<Deal>
}
