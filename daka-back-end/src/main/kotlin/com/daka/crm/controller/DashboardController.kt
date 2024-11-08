package com.daka.crm.controller

import com.daka.crm.dto.DashboardDataDTO
import com.daka.crm.service.DashboardService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/dashboard")
class DashboardController(
    private val dashboardService: DashboardService
) {

    @GetMapping
    fun getDashboardData(@RequestHeader userId: Long): ResponseEntity<DashboardDataDTO> {
        return ResponseEntity.ok(dashboardService.getDashboardData(userId))
    }

}
