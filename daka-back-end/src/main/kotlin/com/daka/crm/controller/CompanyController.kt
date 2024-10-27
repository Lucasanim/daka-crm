package com.daka.crm.controller

import com.daka.crm.dto.CompanyDTO
import com.daka.crm.service.CompanyService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/company")
class CompanyController(private val companyService: CompanyService) {

    @GetMapping
    fun getAllCompanies(@RequestHeader userId: Long): ResponseEntity<List<CompanyDTO>> {
        return ResponseEntity.ok(companyService.getAll(userId))
    }

    @GetMapping("/{id}")
    fun getCompanyById(@PathVariable id: Long): ResponseEntity<CompanyDTO> {
        return ResponseEntity.ok(companyService.getDTOById(id))
    }

    @PostMapping
    fun createCompany(@RequestHeader userId: Long, @RequestBody companyDTO: CompanyDTO): ResponseEntity<String>{
        companyService.create(userId, companyDTO)
        return ResponseEntity.status(201).build()
    }

    @PutMapping("/{id}")
    fun updateCompany(@PathVariable id: Long, @RequestBody companyDTO: CompanyDTO): ResponseEntity<String>{
        companyService.update(id, companyDTO)
        return ResponseEntity.ok().build()
    }

    @DeleteMapping("/{id}")
    fun deleteCompany(@PathVariable id: Long): ResponseEntity<String>{
        companyService.deleteById(id)
        return ResponseEntity.ok().build()
    }
}
