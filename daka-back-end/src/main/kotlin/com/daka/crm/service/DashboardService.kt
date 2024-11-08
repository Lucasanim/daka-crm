package com.daka.crm.service

import com.daka.crm.dto.DashboardDataDTO
import com.daka.crm.dto.DashboardExpectedValueDTO
import com.daka.crm.dto.DashboardValueDTO
import com.daka.crm.enums.DealState
import com.daka.crm.enums.TaskState
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal
import java.time.LocalDateTime
import java.time.Month
import java.util.HashMap

@Service
class DashboardService(
    private val companyService: CompanyService,
    private val customerService: CustomerService,
    private val dealService: DealService,
    private val taskService: TaskService
) {

    @Transactional(readOnly = true)
    fun getDashboardData(userId: Long): DashboardDataDTO {
        val customers = customerService.getAllFromYear(userId)
        val companies = companyService.getAllFromYear(userId)
        val deals = dealService.getAllFromYear(userId)
        val tasks = taskService.getAllFromYear(userId)

        val dashboardData = DashboardDataDTO()
        val now = LocalDateTime.now()

        for (month in Month.JANUARY.value..now.month.value) {
            val monthlyDeals = deals.filter { d -> d.creationDate.month.value == month }
            dashboardData.dealsAmountData = dashboardData.dealsAmountData.plus(DashboardValueDTO(Month.of(month).name, BigDecimal(monthlyDeals.size)))

            val companiesAmount = BigDecimal(monthlyDeals.distinctBy { d -> d.customer.company.id }.size)
            dashboardData.companiesAmountData = dashboardData.companiesAmountData.plus(DashboardValueDTO(Month.of(month).name, companiesAmount))

            val monthlyCustomers = customers.filter { d -> d.creationDate.month.value == month }
            dashboardData.customersData = dashboardData.customersData.plus(DashboardValueDTO(Month.of(month).name, BigDecimal(monthlyCustomers.size)))

            val monthlyExpectedRevenue = monthlyDeals.sumOf { d -> d.amount }
            val monthlyRealizedRevenue = monthlyDeals.filter { d -> d.state == DealState.FINISHED }.sumOf { d -> d.amount }
            dashboardData.revenueData = dashboardData.revenueData.plus(DashboardExpectedValueDTO(Month.of(month).name, monthlyExpectedRevenue, monthlyRealizedRevenue))

            val wonDeals = monthlyDeals.filter { d -> d.state == DealState.LOST }
            val lostDeals = monthlyDeals.filter { d -> d.state == DealState.FINISHED }
            dashboardData.dealsRevenueData = dashboardData.dealsRevenueData.plus(DashboardExpectedValueDTO(Month.of(month).name, BigDecimal(wonDeals.size), BigDecimal(lostDeals.size)))
        }

        for (state in TaskState.entries) {
            val stateTasks = tasks.filter { t -> t.state == state }
            dashboardData.tasksAmountData = dashboardData.tasksAmountData.plus(DashboardValueDTO(state.name, BigDecimal(stateTasks.size)))
        }

        return dashboardData
    }




}