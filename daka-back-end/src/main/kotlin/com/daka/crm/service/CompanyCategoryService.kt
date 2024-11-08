package com.daka.crm.service

import com.daka.crm.dto.CompanyCategoryDTO
import com.daka.crm.model.CompanyCategory
import com.daka.crm.repository.CompanyCategoryRepository
import org.springframework.stereotype.Service
import java.util.Optional

@Service
class CompanyCategoryService(private val categoryRepository: CompanyCategoryRepository) {
    fun getAll(): List<CompanyCategory> = categoryRepository.findAll()

    fun getById(id: Long): Optional<CompanyCategory> = categoryRepository.findById(id)

    fun getByNameAndUser(name: String, userId: Long): Optional<CompanyCategory> = categoryRepository.findByNameAndUserId(name, userId)

    fun save(category: CompanyCategory): CompanyCategory = categoryRepository.save(category)

    fun getOrCreate(userId: Long, categoryDTO: CompanyCategoryDTO): CompanyCategory {
        if (categoryDTO.id != 0L) return getById(categoryDTO.id).orElseThrow()

        return getByNameAndUser(categoryDTO.name.lowercase(), userId).orElseGet { save(categoryDTO.toEntity(userId)) }
    }

    fun deleteById(id: Long) = categoryRepository.deleteById(id)
}
