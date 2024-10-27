package com.daka.crm.controller

import com.daka.crm.dto.DealDTO
import com.daka.crm.service.CustomerService
import com.daka.crm.service.DealService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/deal")
class DealController(
    private val customerService: CustomerService,
    private val dealService: DealService
) {

    @GetMapping
    fun getAllDeals(@RequestHeader userId: Long): ResponseEntity<List<DealDTO>> {
        return ResponseEntity.ok(dealService.getAll(userId))
    }

    @GetMapping("/{id}")
    fun getDealById(@PathVariable id: Long): ResponseEntity<DealDTO> {
        return ResponseEntity.ok(dealService.getDTOById(id))
    }

    @PostMapping
    fun createDeal(@RequestHeader userId: Long, @RequestBody dto: DealDTO): ResponseEntity<String>{
        customerService.addDealToCustomer(userId, dto)
        return ResponseEntity.status(201).build()
    }

    @PutMapping("/{id}")
    fun updateDeal(@PathVariable id: Long, @RequestBody dto: DealDTO): ResponseEntity<String>{
        dealService.update(id, dto)
        return ResponseEntity.ok().build()
    }

    @DeleteMapping("/{id}")
    fun deleteDeal(@PathVariable id: Long): ResponseEntity<String>{
        dealService.deleteById(id)
        return ResponseEntity.ok().build()
    }
}
