package com.daka.crm.service

import com.daka.crm.dto.StageDTO
import com.daka.crm.enums.StageType
import com.daka.crm.model.Stage
import com.daka.crm.repository.StageRepository
import org.springframework.stereotype.Service

@Service
class StageService(private val stageRepository: StageRepository) {
    fun getAll(): List<Stage> = stageRepository.findAll()

    fun getById(id: Long): Stage? = stageRepository.findById(id).orElse(null)

    fun save(stage: Stage): Stage = stageRepository.save(stage)

    fun create(userId: Long, stageType: StageType, customerId: Long): Stage {
        return save(StageDTO.toEntity(userId, customerId, stageType))
    }

    fun changeStage(stage: Stage, stageType: StageType): Stage {
        stage.type = stageType
        return save(stage)
    }

    fun deleteById(id: Long) = stageRepository.deleteById(id)
}
