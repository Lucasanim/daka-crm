package com.daka.crm.dto

import com.daka.crm.model.Company
import com.daka.crm.model.CompanyCategory

data class CompanyDTO(
    val id: Long,
    val name: String,
    val address: String?,
    val email: String?,
    val phone: String?,
    val category: CompanyCategoryDTO
) {
    companion object {
        fun from(company: Company): CompanyDTO {
            return CompanyDTO(
                id = company.id,
                name = company.name,
                address = company.address,
                email = company.email,
                phone = company.phone,
                category = CompanyCategoryDTO.from(company.category)
            )
        }

        fun from(companies: List<Company>): List<CompanyDTO> {
            return companies.map { company -> from(company) }
        }
    }

    fun toEntity(category: CompanyCategory, userId: Long): Company {
        return Company(
            id = this.id,
            name = this.name,
            address = this.address,
            email = this.email,
            phone = this.phone,
            category = category,
            userId = userId
        )
    }
}

