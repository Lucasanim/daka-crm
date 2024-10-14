package com.daka.crm.service

import com.daka.crm.client.StripeClient
import com.daka.crm.dto.CreateSubscriptionDTO
import com.daka.crm.dto.UserDTO
import com.daka.crm.enums.PlanType
import com.stripe.model.Customer
import com.stripe.model.Plan
import com.stripe.model.Subscription
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

    fun cancelSubscriptions(customerId: String) {
        val subscription = client.getCustomerSubscription(customerId) ?: return
        subscription.cancel();
    }

    fun deleteCustomerAndSubscription(customerId: String?) {
        if (customerId == null) return;
        val customer = cancelCustomerSubscriptions(customerId);

        client.removeCustomer(customer)
    }

    fun cancelCustomerSubscriptions(customerId: String): Customer {
        val customer = client.getCustomerById(customerId)

        cancelSubscriptions(customerId)
        return customer
    }

    fun getCustomerPlanPrice(customerId: String): String? {
        val subscription = client.getCustomerSubscription(customerId) ?: return null


        return subscription.items.data.get(0).price.id
    }

    fun getCustomerPlan(customerId: String): PlanType? {
        val priceId = getCustomerPlanPrice(customerId) ?: return null

        return PlanType.getByPriceId(priceId)
    }

    fun changeCustomerPlan(customerId: String, newPriceId: String) {
        cancelCustomerSubscriptions(customerId)
        client.createSubscription(customerId, newPriceId);
    }

}