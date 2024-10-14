package com.daka.crm.service

import com.stripe.model.Event
import com.stripe.model.EventDataObjectDeserializer
import com.stripe.model.Invoice
import com.stripe.net.Webhook
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class StripeWebhookService(
    @Value("\${stripe.webhook.signature}") private val signature: String,
    private val userService: UserService,
    private val logger: Logger = LoggerFactory.getLogger(StripeWebhookService::class.java)
) {

    fun receiveEvent(eventSignature: String, payload: String) {
        try {
            processEvent(Webhook.constructEvent(payload, eventSignature, signature))
        } catch (e: Exception) {
            logger.error("[STRIPE_WEBHOOK] Error processing event: $payload")
            return;
        }
    }

    private fun processEvent(event: Event) {
        when (event.type) {
            "invoice.payment_succeeded" -> handleInvoicePaymentSucceeded(event)
            "invoice.payment_failed" -> handleInvoicePaymentFailed(event)
            else -> logger.warn("Unhandled event type: ${event.type}")
        }
    }

    private fun handleInvoicePaymentSucceeded(event: Event) {
        val dataObjectDeserializer: EventDataObjectDeserializer = event.dataObjectDeserializer
        val stripeObject = dataObjectDeserializer.deserializeUnsafe()

        if (stripeObject is Invoice) {
            logger.info("Payment succeeded for customer: $stripeObject.customer")
            userService.updateOnPaymentSucceed(stripeObject.customer)
        }
    }

    private fun handleInvoicePaymentFailed(event: Event) {
        val dataObjectDeserializer: EventDataObjectDeserializer = event.dataObjectDeserializer
        val stripeObject = dataObjectDeserializer.deserializeUnsafe()

        if (stripeObject is Invoice) {
            logger.error("Payment failed for customer: $stripeObject.customer")
            userService.updateOnPaymentFail(stripeObject.customer)
        }
    }
}