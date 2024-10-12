package com.daka.crm.controller

import com.daka.crm.dto.CreateSubscriptionDTO
import com.daka.crm.service.StripeService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/billing")
class BillingController(
    private val stripeService: StripeService,
    private val logger: Logger = LoggerFactory.getLogger(BillingController::class.java)
) {

    @PostMapping("/subscription")
    fun createSubscription(@RequestHeader email: String, @RequestBody createSubscriptionDTO: CreateSubscriptionDTO): ResponseEntity<String> {
        try {
            val paymentSecret = stripeService.createSubscription(email, createSubscriptionDTO)
            return ResponseEntity.status(201).body(paymentSecret)
        } catch (e: Exception) {
            logger.error("[SUBSCRIPTION] Error: $e")
            return ResponseEntity.badRequest().build()
        }
    }
}