package com.daka.crm.controller

import com.daka.crm.dto.TaskDTO
import com.daka.crm.service.CustomerService
import com.daka.crm.service.TaskService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/task")
class TaskController(
    private val customerService: CustomerService,
    private val taskService: TaskService
) {

    @GetMapping
    fun getAllTasks(@RequestHeader userId: Long): ResponseEntity<List<TaskDTO>> {
        return ResponseEntity.ok(taskService.getAll(userId))
    }

    @GetMapping("/{id}")
    fun getTaskById(@PathVariable id: Long): ResponseEntity<TaskDTO> {
        return ResponseEntity.ok(taskService.getDTOById(id))
    }

    @PostMapping
    fun createTask(@RequestHeader userId: Long, @RequestBody dto: TaskDTO): ResponseEntity<String>{
        customerService.addTaskToCustomer(userId, dto)
        return ResponseEntity.status(201).build()
    }

    @PutMapping("/{id}")
    fun updateTask(@PathVariable id: Long, @RequestBody dto: TaskDTO): ResponseEntity<String>{
        taskService.update(id, dto)
        return ResponseEntity.ok().build()
    }

    @DeleteMapping("/{id}")
    fun deleteTask(@PathVariable id: Long): ResponseEntity<String>{
        taskService.deleteById(id)
        return ResponseEntity.ok().build()
    }
}
