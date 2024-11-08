package com.daka.crm.service

import com.daka.crm.dto.TaskDTO
import com.daka.crm.model.Customer
import com.daka.crm.model.Task
import com.daka.crm.repository.TaskRepository
import liquibase.util.StringUtil.isEmpty
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
class TaskService(
    private val taskRepository: TaskRepository,
) {
    fun getAll(userId: Long): List<TaskDTO> {
        val Tasks = taskRepository.findAllByUserId(userId)
        return TaskDTO.from(Tasks)
    }

    fun getById(id: Long): Optional<Task> = taskRepository.findById(id)

    fun getDTOById(id: Long): TaskDTO {
        val task = getById(id).orElseThrow()
        return TaskDTO.from(task)
    }

    fun getAllFromYear(userId: Long): List<TaskDTO> {
        return TaskDTO.from(taskRepository.getFromCurrentYear(userId))
    }

    fun getByCustomerId(customerId: Long): List<Task> {
        return taskRepository.findAllByCustomerId(customerId)
    }

    fun deleteByCustomerId(customerId: Long){
        getByCustomerId(customerId).forEach { d -> deleteById(d.id) }
    }

    fun save(task: Task): Task = taskRepository.save(task)

    fun create(userId: Long, customer: Customer, taskDTO: TaskDTO): Task {
        return save(taskDTO.toModel(userId, customer))
    }

    fun update(id: Long, taskDTO: TaskDTO): Task {
        val task = getById(id).orElseThrow()

        task.state = taskDTO.state
        if (!isEmpty(taskDTO.name)) task.name = taskDTO.name

        return save(task)
    }

    @Transactional
    fun deleteById(id: Long) {
        taskRepository.deleteById(id)
    }
}

