package com.daka.crm.dto

import com.daka.crm.enums.StageType
import com.daka.crm.model.Stage
import java.time.LocalDateTime

data class StageDTO(
    val id: Long = 0,
    val type: StageType,
    val creationDate: LocalDateTime,
    val customerId: Long?
) {
    companion object {
        fun from(stage: Stage): StageDTO {
            return StageDTO(
                id = stage.id,
                type = stage.type,
                creationDate = stage.creationDate,
                customerId = stage.customerId,
            )
        }

        fun toEntity(userId: Long, customerId: Long, stageType: StageType): Stage {
            return Stage(
                type = stageType,
                creationDate = LocalDateTime.now(),
                customerId = customerId,
                userId = userId
            )
        }
    }

    fun toEntity(userId: Long, customerId: Long): Stage {
        return Stage(
            id = this.id,
            type = this.type,
            creationDate = this.creationDate,
            customerId = customerId,
            userId = userId
        )
    }
}
