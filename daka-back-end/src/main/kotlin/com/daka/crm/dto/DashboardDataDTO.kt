package com.daka.crm.dto

class DashboardDataDTO(
    var dealsAmountData: List<DashboardValueDTO> = mutableListOf(),
    var tasksAmountData: List<DashboardValueDTO> = mutableListOf(),
    var companiesAmountData: List<DashboardValueDTO> = mutableListOf(),
    var customersData: List<DashboardValueDTO> = mutableListOf(),
    var dealsRevenueData: List<DashboardExpectedValueDTO> = mutableListOf(),
    var revenueData: List<DashboardExpectedValueDTO> = mutableListOf(),
) {
}