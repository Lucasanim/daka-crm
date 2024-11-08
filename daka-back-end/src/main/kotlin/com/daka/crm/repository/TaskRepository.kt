package com.daka.crm.repository

import com.daka.crm.model.Task
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface TaskRepository : JpaRepository<Task, Long> {
    fun findAllByUserId(userId: Long): List<Task>
    fun findAllByCustomerId(customerId: Long): List<Task>

    @Query("SELECT * FROM task t WHERE t.user_id = :userId AND YEAR(t.creation_date) = YEAR(CURRENT_DATE)", nativeQuery = true)
    fun getFromCurrentYear(@Param("userId") userId: Long): List<Task>
}
