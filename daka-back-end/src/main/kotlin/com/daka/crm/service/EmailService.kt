package com.daka.crm.service

import com.mailgun.api.v3.MailgunMessagesApi
import com.mailgun.client.MailgunClient
import com.mailgun.model.message.Message
import com.mailgun.model.message.MessageResponse
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service


@Service
class EmailService(
    @Value("\${mailgun.api.key}") private val apiKey: String,
    private val logger: Logger = LoggerFactory.getLogger(EmailService::class.java)
) {
    fun sendEmail(email: String, body: String) {
        try {
            val mailgunMessagesApi = MailgunClient.config(apiKey)
                .createApi<MailgunMessagesApi>(MailgunMessagesApi::class.java)
            val message: Message = Message.builder()
                .from("USER@sandboxd7b522e9939a4ed49a0129e15e5098a9.mailgun.org")
                .to(email)
                .subject("Password Reset")
                .text(body)
                .build()

            val messageResponse: MessageResponse = mailgunMessagesApi.sendMessage("sandboxd7b522e9939a4ed49a0129e15e5098a9.mailgun.org", message)
            logger.info("[EMAIL_SENDING] Sent email to: $email")
        } catch (ex: Exception) {
            logger.error("[EMAIL_SENDING]", ex)
        }
    }

    fun sendPasswordRecovery(email: String, token: String) {
        sendEmail("lucasvazquezum@gmail.com", "http://localhost:5173/public/password-recovery/" + token)
    }

}