package com.daka.crm.client

import com.stripe.Stripe
import com.stripe.exception.StripeException
import com.stripe.model.Customer
import com.stripe.model.PaymentMethod
import com.stripe.model.Subscription
import com.stripe.param.CustomerCreateParams
import com.stripe.param.CustomerListParams
import com.stripe.param.CustomerUpdateParams
import com.stripe.param.PaymentMethodAttachParams
import com.stripe.param.SubscriptionCancelParams
import com.stripe.param.SubscriptionCreateParams
import com.stripe.param.SubscriptionRetrieveParams
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class StripeClient(@Value("\${stripe.secret.key}") secretKey: String) {
    init {
        Stripe.apiKey = secretKey
    }

    @Throws(StripeException::class)
    fun createCustomer(email: String?, name: String?): Customer {
        val params = CustomerCreateParams.builder()
            .setEmail(email)
            .setName(name)
            .build()

        return Customer.create(params)
    }

    @Throws(StripeException::class)
    fun getCustomer(email: String): Customer? {
        val params = CustomerListParams.builder()
            .setEmail(email)
            .build()

        return Customer.list(params).data.getOrNull(0)
    }

    @Throws(StripeException::class)
    fun getCustomerById(customerId: String): Customer {
        return Customer.retrieve(customerId)
    }

    @Throws(StripeException::class)
    fun attachPaymentMethod(customerId: String, paymentMethodId: String): PaymentMethod? {
        val params = PaymentMethodAttachParams.builder()
            .setCustomer(customerId)
            .build()

        val resource = PaymentMethod.retrieve(paymentMethodId)
        return resource.attach(params)
    }

    @Throws(StripeException::class)
    fun addDefaultPaymentMethod(customer: Customer, paymentMethodId: String): Customer {
        val params = CustomerUpdateParams.builder()
            .setInvoiceSettings(
                CustomerUpdateParams.InvoiceSettings.builder()
                    .setDefaultPaymentMethod(paymentMethodId)
                    .build()
            )
            .build()

        return customer.update(params)
    }

    @Throws(StripeException::class)
    fun createSubscription(customerId: String, priceId: String): Subscription {
        val params = SubscriptionCreateParams.builder()
            .setCustomer(customerId)
            .addItem(
                SubscriptionCreateParams.Item.builder()
                    .setPrice(priceId)
                    .build()
            )
            .setPaymentSettings(
                SubscriptionCreateParams.PaymentSettings.builder()
                    .addPaymentMethodType(SubscriptionCreateParams.PaymentSettings.PaymentMethodType.CARD)
                    .build()
            )
            .addExpand("latest_invoice.payment_intent")
            .build()

        return Subscription.create(params)
    }

    @Throws(StripeException::class)
    fun removeCustomer(customer: Customer): Customer {
        return customer.delete()
    }

    fun getCustomerSubscription(customerId: String): Subscription? {
        val subscriptionParams = mapOf("customer" to customerId)
        return Subscription.list(subscriptionParams).data.getOrNull(0)
    }

}