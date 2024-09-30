package com.daka.crm.repository

import com.daka.crm.model.User
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface UserRepository : CrudRepository<User, Long> {
    fun findByEmail(email: String) : Optional<User>
    fun findByEmailContaining(email: String): List<User>
}
