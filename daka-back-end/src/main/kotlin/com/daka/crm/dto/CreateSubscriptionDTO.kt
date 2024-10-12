package com.daka.crm.dto

import com.daka.crm.enums.PlanType

class CreateSubscriptionDTO(
    var paymentMethodId: String,
    var plan: PlanType
) {
}