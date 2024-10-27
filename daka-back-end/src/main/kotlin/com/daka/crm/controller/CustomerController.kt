package com.daka.crm.controller

import com.daka.crm.dto.CustomerDTO
import com.daka.crm.service.CustomerService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/customer")
class CustomerController(private val customerService: CustomerService) {

    @GetMapping
    fun getAllClients(@RequestHeader userId: Long): ResponseEntity<List<CustomerDTO>> {
        return ResponseEntity.ok(customerService.getAll(userId))
    }

    @GetMapping("/{id}")
    fun getClientById(@PathVariable id: Long): ResponseEntity<CustomerDTO> {
        return ResponseEntity.ok(customerService.getDTOById(id))
    }

    @PostMapping
    fun createClient(@RequestHeader userId: Long, @RequestBody customer: CustomerDTO): ResponseEntity<String>{
        customerService.create(userId, customer)
        return ResponseEntity.status(201).build()
    }

    @PutMapping("/{id}")
    fun updateClient(@PathVariable id: Long, @RequestBody customer: CustomerDTO): ResponseEntity<String>{
        customerService.update(id, customer)
        return ResponseEntity.ok().build()
    }

    @DeleteMapping("/{id}")
    fun deleteClient(@PathVariable id: Long): ResponseEntity<String>{
        customerService.deleteById(id)
        return ResponseEntity.ok().build()
    }
}
