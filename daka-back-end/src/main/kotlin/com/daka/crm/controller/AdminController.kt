package com.daka.crm.controller

import com.daka.crm.dto.UserDTO
import com.daka.crm.service.AdminService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/admin")
//@PreAuthorize("hasRole('ADMIN')")
class AdminController(
    private val adminService: AdminService,
    private val logger: Logger = LoggerFactory.getLogger(AdminController::class.java)
) {

    @GetMapping("/search")
    fun login(@RequestParam value: String): ResponseEntity<out Any> {
        try {
            return ResponseEntity.ok().body(adminService.searchUsers(value))
        } catch (e: Exception) {
            logger.error(e.message)
            return ResponseEntity.badRequest().build()
        }
    }

    @PutMapping("/update")
    fun updateUser(@RequestBody user: UserDTO): ResponseEntity<out Any> {
        try {
            return ResponseEntity.ok().body(adminService.updateUser(user))
        } catch (e: Exception) {
            logger.error(e.message)
            return ResponseEntity.badRequest().build()
        }
    }

    @DeleteMapping("/delete/{id}")
    fun deleteUser(@PathVariable id: Long): ResponseEntity<out Any> {
        try {
            return ResponseEntity.ok().body(adminService.deleteUser(id))
        } catch (e: Exception) {
            logger.error(e.message)
            return ResponseEntity.badRequest().build()
        }
    }
}