package com.daka.crm.service

import com.daka.crm.dto.CustomerDTO
import com.daka.crm.dto.DealDTO
import com.daka.crm.dto.TaskDTO
import com.daka.crm.model.Customer
import com.daka.crm.repository.CustomerRepository
import liquibase.util.StringUtil.isEmpty
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
class CustomerService(
    private val customerRepository: CustomerRepository,
    private val companyService: CompanyService,
    private val stageService: StageService,
    private val dealService: DealService,
    private val taskService: TaskService,
) {
    fun getAll(userId: Long): List<CustomerDTO> {
        val customers = customerRepository.findAllByUserId(userId)
        return CustomerDTO.from(customers)
    }

    fun getById(id: Long): Optional<Customer> = customerRepository.findById(id)

    fun getDTOById(id: Long): CustomerDTO {
        val customer = customerRepository.findById(id).orElseThrow()
        return CustomerDTO.from(customer)
    }

    fun save(customer: Customer): Customer = customerRepository.save(customer)

    fun create(userId: Long, customerDTO: CustomerDTO): Customer {
        val company = companyService.getOrCreate(userId, customerDTO.company)
        val customer = save(customerDTO.toEntity(company, userId))
        val stage = stageService.create(userId, customerDTO.stageType, customer.id)

        customer.stage = stage
        return save(customer)
    }

    fun update(id: Long, customerDTO: CustomerDTO): Customer {
        val customer = getById(id).orElseThrow()

        if (customer.company.id != customerDTO.company.id) {
            customer.company = companyService.getOrCreate(customer.userId, customerDTO.company)
        }

        if (customer.stage != null && customer.stage!!.type != customerDTO.stageType) {
            customer.stage = stageService.changeStage(customer.stage!!, customerDTO.stageType)
        }

        if (!isEmpty(customer.firstName)) customer.firstName = customerDTO.firstName
        if (!isEmpty(customer.lastName)) customer.lastName = customerDTO.lastName
        if (!isEmpty(customer.phone)) customer.phone = customerDTO.phone
        if (!isEmpty(customer.email)) customer.email = customerDTO.email

        return save(customer)
    }

    fun addDealToCustomer(userId: Long, dealDTO: DealDTO) {
        val customer = getById(dealDTO.customer.id).orElseThrow()
        dealService.create(userId, customer, dealDTO)
    }

    fun addTaskToCustomer(userId: Long, taskDTO: TaskDTO) {
        val customer = getById(taskDTO.customer.id).orElseThrow()
        taskService.create(userId, customer, taskDTO)
    }

    @Transactional
    fun deleteById(id: Long) {
        val customer = getById(id).orElseThrow()
        if (customer.stage != null) {
            stageService.deleteById(customer.stage!!.id)
        }

        dealService.deleteByCustomerId(customer.id)
        taskService.deleteByCustomerId(customer.id)
        customerRepository.deleteById(customer.id)
    }
}

