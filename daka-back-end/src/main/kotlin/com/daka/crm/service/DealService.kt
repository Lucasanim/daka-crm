package com.daka.crm.service

import com.daka.crm.dto.DealDTO
import com.daka.crm.model.Customer
import com.daka.crm.model.Deal
import com.daka.crm.repository.DealRepository
import liquibase.util.StringUtil.isEmpty
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
class DealService(
    private val dealRepository: DealRepository
) {
    fun getAll(userId: Long): List<DealDTO> {
        val deals = dealRepository.findAllByUserId(userId)
        return DealDTO.from(deals)
    }

    fun getByCustomerId(customerId: Long): List<Deal> {
        return dealRepository.findAllByCustomerId(customerId)
    }

    fun deleteByCustomerId(customerId: Long){
        getByCustomerId(customerId).forEach { d -> dealRepository.deleteById(d.id) }
    }

    fun getById(id: Long): Optional<Deal> = dealRepository.findById(id)

    fun getDTOById(id: Long): DealDTO {
        val deal = getById(id).orElseThrow()
        return DealDTO.from(deal)
    }

    fun getAllFromYear(userId: Long): List<DealDTO> {
        return DealDTO.from(dealRepository.getFromCurrentYear(userId))
    }

    fun save(deal: Deal): Deal = dealRepository.save(deal)

    fun create(userId: Long, customer: Customer, dealDTO: DealDTO): Deal {
        return save(dealDTO.toEntity(userId, customer))
    }

    fun update(id: Long, dealDTO: DealDTO): Deal {
        val deal = getById(id).orElseThrow()

        if (!isEmpty(dealDTO.name)) deal.name = dealDTO.name
        if (!isEmpty(dealDTO.amount.toPlainString())) deal.amount = dealDTO.amount
        if (!isEmpty(dealDTO.state.toString())) deal.state = dealDTO.state

        return save(deal)
    }

    @Transactional
    fun deleteById(id: Long) {
        dealRepository.deleteById(id)
    }
}

