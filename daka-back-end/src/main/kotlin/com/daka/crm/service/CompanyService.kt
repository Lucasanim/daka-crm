package com.daka.crm.service

import com.daka.crm.dto.CompanyDTO
import com.daka.crm.model.Company
import com.daka.crm.repository.CompanyRepository
import liquibase.util.StringUtil.isEmpty
import org.springframework.stereotype.Service
import java.util.*

@Service
class CompanyService(
    private val companyRepository: CompanyRepository,
    private val categoryService: CompanyCategoryService
) {
    fun getAll(userId: Long): List<CompanyDTO> {
        val companies = companyRepository.findAllByUserId(userId)
        return CompanyDTO.from(companies)
    }

    fun getById(id: Long): Optional<Company> = companyRepository.findById(id)

    fun getDTOById(id: Long): CompanyDTO {
        return CompanyDTO.from(getById(id).orElseThrow())
    }

    fun getAllFromYear(userId: Long): List<CompanyDTO> {
        return CompanyDTO.from(companyRepository.getFromCurrentYear(userId))
    }

    fun save(company: Company): Company = companyRepository.save(company)

    fun getOrCreate(userId: Long, companyDTO: CompanyDTO): Company {
        if (companyDTO.id != 0L) return getById(companyDTO.id).orElseThrow()

        return create(userId, companyDTO)
    }

    fun create(userId: Long, companyDTO: CompanyDTO): Company {
        val category = categoryService.getOrCreate(userId, companyDTO.category)
        return save(companyDTO.toEntity(category, userId))
    }

    fun update(companyId: Long, companyDTO: CompanyDTO): Company {
        val company = getById(companyId).orElseThrow()

        if (!isEmpty(companyDTO.name)) company.name = companyDTO.name
        if (!isEmpty(companyDTO.email)) company.email = companyDTO.email
        if (!isEmpty(companyDTO.phone)) company.phone = companyDTO.phone
        if (!isEmpty(companyDTO.address)) company.address = companyDTO.address

        val newCategory = companyDTO.category
        if (newCategory.id == 0L || newCategory.name != company.category.name) {
            company.category = categoryService.getOrCreate(company.userId, newCategory)
        }

        return save(company)
    }

    fun deleteById(id: Long) = companyRepository.deleteById(id)
}
