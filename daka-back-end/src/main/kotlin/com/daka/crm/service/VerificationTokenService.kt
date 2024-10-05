package com.daka.crm.service

import com.daka.crm.enums.VerificationTokenType
import com.daka.crm.model.VerificationToken
import com.daka.crm.repository.VerificationTokenRepository
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.ZoneId
import java.util.*

@Service
class VerificationTokenService(
    private val verificationTokenRepository: VerificationTokenRepository
) {

    fun createPasswordRecoveryToken(userId: Long): VerificationToken {
        val verificationToken = VerificationToken(
            0L,
            UUID.randomUUID().toString().replace("-", ""),
            VerificationTokenType.PASSWORD_RECOVERY,
            userId,
            getPasswordRecoveryExpDate()
        )

        return verificationTokenRepository.save(verificationToken);
    }

    private fun getPasswordRecoveryExpDate(): Date {
        val localDate = LocalDate.now().plusDays(1)
        return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant())
    }

    fun getByToken(token: String): Optional<VerificationToken> {
        return verificationTokenRepository.findByToken(token)
    }

}