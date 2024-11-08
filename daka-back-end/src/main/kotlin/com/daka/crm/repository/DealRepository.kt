package com.daka.crm.repository

import com.daka.crm.model.Deal
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface DealRepository : JpaRepository<Deal, Long> {
    fun findAllByUserId(userId: Long): List<Deal>
    fun findAllByCustomerId(customerId: Long): List<Deal>

    @Query("SELECT * FROM deal d WHERE d.user_id = :userId AND YEAR(d.creation_date) = YEAR(CURRENT_DATE)", nativeQuery = true)
    fun getFromCurrentYear(@Param("userId") userId: Long): List<Deal>
}
