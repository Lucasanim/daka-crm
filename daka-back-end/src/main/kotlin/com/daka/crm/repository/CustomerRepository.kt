package com.daka.crm.repository

import com.daka.crm.model.Customer
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface CustomerRepository : JpaRepository<Customer, Long> {
    fun findAllByUserId(userId: Long): List<Customer>

    @Query("SELECT * FROM customer c WHERE c.user_id = :userId AND YEAR(c.creation_date) = YEAR(CURRENT_DATE)", nativeQuery = true)
    fun getFromCurrentYear(@Param("userId") userId: Long): List<Customer>
}
