package com.daka.crm.dto

import com.daka.crm.enums.DealState
import com.daka.crm.model.Customer
import com.daka.crm.model.Deal
import java.math.BigDecimal
import java.time.LocalDateTime

data class DealDTO(
    val id: Long,
    val name: String,
    val amount: BigDecimal,
    val creationDate: LocalDateTime = LocalDateTime.now(),
    val finishDate: LocalDateTime?,
    val state: DealState = DealState.TO_DO,
    val customer: CustomerDTO
) {
    companion object {
        fun from(deal: Deal): DealDTO {
            return DealDTO(
                id = deal.id,
                name = deal.name,
                amount = deal.amount,
                creationDate = deal.creationDate,
                finishDate = deal.finishDate,
                state = deal.state,
                customer = CustomerDTO.from(deal.customer)
            )
        }

        fun from(deals: List<Deal>): List<DealDTO> {
            return deals.map { d -> from(d) }
        }
    }

    fun toEntity(userId: Long, customer: Customer): Deal {
        return Deal(
            id = this.id,
            userId = userId,
            name = this.name,
            amount = this.amount,
            creationDate = this.creationDate,
            finishDate = this.finishDate,
            state = this.state,
            customer = customer
        )
    }
}
