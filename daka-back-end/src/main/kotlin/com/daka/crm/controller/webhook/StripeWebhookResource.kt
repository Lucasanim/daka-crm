package com.daka.crm.controller.webhook

import com.daka.crm.service.StripeWebhookService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/webhook/stripe")
class StripeWebhookResource(
    private val stripeWebhookService: StripeWebhookService,
    private val logger: Logger = LoggerFactory.getLogger(StripeWebhookResource::class.java)
) {

    @PostMapping
    fun handleStripeWebhook(@RequestHeader(name = "Stripe-Signature") signature: String , @RequestBody payload: String): ResponseEntity<String> {
        stripeWebhookService.receiveEvent(signature, payload)

        return ResponseEntity.ok().build()
    }

}