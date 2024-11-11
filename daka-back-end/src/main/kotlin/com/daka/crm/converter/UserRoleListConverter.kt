package com.daka.crm.converter

import com.daka.crm.enums.UserRole
import jakarta.persistence.AttributeConverter
import jakarta.persistence.Converter

@Converter
class UserRoleListConverter : AttributeConverter<List<UserRole>, String> {

    override fun convertToDatabaseColumn(attribute: List<UserRole>?): String {
        return attribute?.joinToString(",") ?: ""
    }

    override fun convertToEntityAttribute(dbData: String?): List<UserRole> {
        return dbData?.split(",")?.map { UserRole.valueOf(it) } ?: emptyList()
    }
}
