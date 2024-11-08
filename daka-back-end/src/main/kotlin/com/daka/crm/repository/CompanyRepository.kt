package com.daka.crm.repository

import com.daka.crm.model.Company
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface CompanyRepository : JpaRepository<Company, Long> {
    fun findAllByUserId(userId: Long): List<Company>

    @Query("SELECT * FROM company c WHERE c.user_id = :userId AND YEAR(c.creation_date) = YEAR(CURRENT_DATE)", nativeQuery = true)
    fun getFromCurrentYear(@Param("userId") userId: Long): List<Company>
}