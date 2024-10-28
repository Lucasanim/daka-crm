package com.daka.crm.dto

import com.daka.crm.enums.TaskState
import com.daka.crm.model.Customer
import com.daka.crm.model.Task
import java.time.LocalDateTime

data class TaskDTO(
    val id: Long,
    val name: String,
    val state: TaskState = TaskState.TO_DO,
    val creationDate: LocalDateTime = LocalDateTime.now(),
    val customer: CustomerDTO
) {

    companion object {
        fun from(task: Task): TaskDTO {
            return TaskDTO(
                id = task.id,
                name = task.name,
                state = task.state,
                creationDate = task.creationDate,
                customer = CustomerDTO.from(task.customer)
            )
        }

        fun from(tasks: List<Task>): List<TaskDTO> {
            return tasks.map { from(it) }
        }
    }

    fun toModel(userId: Long, customer: Customer): Task {
        return Task(
            id = this.id,
            name = this.name,
            userId = userId,
            state = this.state,
            creationDate = this.creationDate,
            customer = customer
        )
    }
}