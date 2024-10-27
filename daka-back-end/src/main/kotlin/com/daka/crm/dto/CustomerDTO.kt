package com.daka.crm.dto

import com.daka.crm.enums.StageType
import com.daka.crm.model.Company
import com.daka.crm.model.Customer
import com.daka.crm.model.Stage
import java.time.LocalDateTime

data class CustomerDTO(
    val id: Long,
    val firstName: String,
    val lastName: String,
    val email: String?,
    val phone: String?,
    val creationDate: LocalDateTime = LocalDateTime.now(),
    val stageType: StageType = StageType.NEW,
    val company: CompanyDTO
) {
    companion object {
        fun from(customer: Customer): CustomerDTO {
            return CustomerDTO(
                id = customer.id,
                firstName = customer.firstName,
                lastName = customer.lastName,
                email = customer.email,
                phone = customer.phone,
                creationDate = customer.creationDate,
                stageType = customer.stage?.type ?: StageType.NEW,
                company = CompanyDTO.from(customer.company)
            )
        }

        fun from(customers: List<Customer>): List<CustomerDTO> {
            return customers.map { c -> from(c) }
        }
    }

    fun toEntity(stage: Stage?, company: Company, userId: Long): Customer {
        return Customer(
            id = this.id,
            firstName = this.firstName,
            lastName = this.lastName,
            email = this.email,
            phone = this.phone,
            creationDate = this.creationDate,
            stage = stage,
            company = company,
            userId = userId
        )
    }

    fun toEntity(company: Company, userId: Long): Customer {
        return toEntity(null, company, userId)
    }
}
