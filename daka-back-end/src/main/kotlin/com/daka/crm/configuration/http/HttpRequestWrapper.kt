package com.daka.crm.configuration.http

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletRequestWrapper
import java.util.*
import kotlin.collections.HashMap


class HttpRequestWrapper : HttpServletRequestWrapper {
    private val headerMap: MutableMap<String, String> = HashMap()

    constructor(request: HttpServletRequest) : super(request) {}

    fun addHeader(name: String, value: String) {
        headerMap[name] = value
    }

    override fun getHeader(name: String): String? {
        var headerValue: String? = super.getHeader(name)
        if (headerMap.containsKey(name)) {
            headerValue = headerMap[name]
        }
        return headerValue
    }

    override fun getHeaderNames(): Enumeration<String> {
        val names: MutableList<String> = super.getHeaderNames().toList().toMutableList()
        names.addAll(headerMap.keys)
        return Collections.enumeration(names)
    }

    override fun getHeaders(name: String): Enumeration<String> {
        val values: MutableList<String?> = super.getHeaders(name).toList().toMutableList()
        if (headerMap.containsKey(name)) {
            values.add(headerMap[name])
        }
        return Collections.enumeration(values)
    }
}
