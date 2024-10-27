package com.daka.crm.repository

import com.daka.crm.model.CompanyCategory
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface CompanyCategoryRepository : JpaRepository<CompanyCategory, Long> {
    fun findByNameAndUserId(name: String, userId: Long): Optional<CompanyCategory>
}

