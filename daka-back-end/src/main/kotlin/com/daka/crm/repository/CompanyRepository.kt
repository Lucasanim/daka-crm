package com.daka.crm.repository

import com.daka.crm.model.Company
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CompanyRepository : JpaRepository<Company, Long> {
    fun findAllByUserId(userId: Long): List<Company>
}