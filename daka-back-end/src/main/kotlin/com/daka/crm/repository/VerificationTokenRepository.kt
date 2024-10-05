package com.daka.crm.repository

import com.daka.crm.model.VerificationToken
import org.springframework.data.repository.CrudRepository
import java.util.Optional

interface VerificationTokenRepository : CrudRepository<VerificationToken, Long> {
    fun findByToken(token: String): Optional<VerificationToken>
}