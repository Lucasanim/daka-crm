package com.daka.crm.repository

import com.daka.crm.model.Task
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TaskRepository : JpaRepository<Task, Long> {
    fun findAllByUserId(userId: Long): List<Task>
    fun findAllByCustomerId(customerId: Long): List<Task>
}
