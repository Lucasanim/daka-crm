export interface DashboardValue {
  month: string;
  value: number;
}

export interface DashboardExpectedValue {
  month: string;
  expected: number;
  realized: number;
}

export interface DashboardData {
  dealsAmountData: DashboardValue[];
  tasksAmountData: DashboardValue[];
  companiesAmountData: DashboardValue[];
  customersData: DashboardValue[];
  dealsRevenueData: DashboardExpectedValue[];
  revenueData: DashboardExpectedValue[];
  companiesRevenueData: DashboardExpectedValue[];
}
