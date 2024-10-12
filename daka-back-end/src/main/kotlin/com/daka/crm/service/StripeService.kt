package com.daka.crm.service

import com.daka.crm.client.StripeClient
import com.daka.crm.dto.CreateSubscriptionDTO
import com.daka.crm.dto.UserDTO
import com.stripe.model.Customer
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.stereotype.Service

@Service
class StripeService (
    private val client: StripeClient
) {

    fun createCustomer(userDTO: UserDTO): Customer {
        return client.createCustomer(userDTO.email, userDTO.getFullName())
    }

    fun createSubscription(email: String, subscriptionDTO: CreateSubscriptionDTO): String? {
        val customer = client.getCustomer(email) ?: throw NotFoundException()
        val paymentMethod = client.attachPaymentMethod(customer.id, subscriptionDTO.paymentMethodId) ?: throw NotFoundException()

        client.addDefaultPaymentMethod(customer, paymentMethod.id)
        val subscription = client.createSubscription(customer.id, subscriptionDTO.plan.priceId);

        return subscription.latestInvoiceObject.paymentIntentObject.clientSecret
    }
}