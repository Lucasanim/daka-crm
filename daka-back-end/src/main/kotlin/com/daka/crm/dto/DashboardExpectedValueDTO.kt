package com.daka.crm.dto

import java.math.BigDecimal

class DashboardExpectedValueDTO(
    var month: String,
    var expected: BigDecimal,
    var realized: BigDecimal
) {
}