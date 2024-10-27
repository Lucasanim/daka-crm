package com.daka.crm.dto

import com.daka.crm.model.CompanyCategory

data class CompanyCategoryDTO(
    val id: Long = 0,
    val name: String
) {
    companion object {
        fun from(category: CompanyCategory): CompanyCategoryDTO {
            return CompanyCategoryDTO(
                id = category.id,
                name = category.name
            )
        }
    }

    fun toEntity(userId: Long): CompanyCategory {
        return CompanyCategory(
            id = this.id,
            name = this.name.lowercase(),
            userId = userId
        )
    }
}
