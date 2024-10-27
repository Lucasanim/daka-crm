package com.daka.crm.repository

import com.daka.crm.model.Stage
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface StageRepository : JpaRepository<Stage, Long> {
}