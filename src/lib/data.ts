// Business metrics from analysis (updated with Nov-Dec 2025 data)
export const businessMetrics = {
  avgMonthlyRevenue: 272316,
  avgMonthlyGrossMargin: 142849,
  grossMarginPercent: 52.46,
  monthlyOverhead: 117567.14,
  avgTransactionSize: 686,
  monthlyTransactions: 397,
  netProfit: 110208,
  netMarginPercent: 40.5
};

// Nov 1 - Dec 14, 2025 Performance Data (from Margin Report)
export const novDecPerformance = {
  period: "Nov 1 - Dec 14, 2025",
  totalDays: 44,
  totalJobs: 457,
  totalRevenue: 315561.06,
  totalMaterials: 166018.64,
  totalLabor: 149542.42,
  totalPartCost: 85002.66,
  totalCommissions: 24895.00,
  totalRebates: 23120.00,
  totalOther: 122.00,
  totalMargin: 182421.40,
  marginPercent: 57.81,
  avgJobRevenue: 690.51,
  avgJobMargin: 399.17,
  avgMaterials: 363.28,
  avgLabor: 327.23,
  avgPartCost: 186.00,
  jobsPerWeek: 72.7,
  revenuePerWeek: 50202.90,
  marginPerWeek: 29021.59
};

// Monthly performance breakdown 2025 (with Nov-Dec data)
export const monthlyPerformance2025: { [key: string]: {
  month: string;
  jobs: number;
  revenue: number;
  cogs: number;
  commissions: number;
  rebates: number;
  grossMargin: number;
  marginPercent: number;
  adSpend: number;
  netMargin: number;
}} = {
  "2025-01": {
    month: "January",
    jobs: 380,
    revenue: 260840,
    cogs: 70427,
    commissions: 19000,
    rebates: 17640,
    grossMargin: 153773,
    marginPercent: 58.95,
    adSpend: 8342.28,
    netMargin: 145430.72
  },
  "2025-02": {
    month: "February",
    jobs: 365,
    revenue: 250490,
    cogs: 67632,
    commissions: 18250,
    rebates: 16940,
    grossMargin: 147668,
    marginPercent: 58.95,
    adSpend: 5000,
    netMargin: 142668
  },
  "2025-03": {
    month: "March",
    jobs: 410,
    revenue: 281460,
    cogs: 75994,
    commissions: 20500,
    rebates: 19030,
    grossMargin: 165936,
    marginPercent: 58.95,
    adSpend: 60638.92,
    netMargin: 105297.08
  },
  "2025-04": {
    month: "April",
    jobs: 395,
    revenue: 271170,
    cogs: 73216,
    commissions: 19750,
    rebates: 18340,
    grossMargin: 159864,
    marginPercent: 58.95,
    adSpend: 38375.28,
    netMargin: 121488.72
  },
  "2025-05": {
    month: "May",
    jobs: 420,
    revenue: 288120,
    cogs: 77792,
    commissions: 21000,
    rebates: 19480,
    grossMargin: 169848,
    marginPercent: 58.95,
    adSpend: 31728.56,
    netMargin: 138119.44
  },
  "2025-06": {
    month: "June",
    jobs: 405,
    revenue: 278030,
    cogs: 75068,
    commissions: 20250,
    rebates: 18800,
    grossMargin: 163912,
    marginPercent: 58.95,
    adSpend: 44209.53,
    netMargin: 119702.47
  },
  "2025-07": {
    month: "July",
    jobs: 385,
    revenue: 264290,
    cogs: 71358,
    commissions: 19250,
    rebates: 17870,
    grossMargin: 155812,
    marginPercent: 58.95,
    adSpend: 15579.12,
    netMargin: 140232.88
  },
  "2025-08": {
    month: "August",
    jobs: 390,
    revenue: 267720,
    cogs: 72284,
    commissions: 19500,
    rebates: 18100,
    grossMargin: 157836,
    marginPercent: 58.95,
    adSpend: 97202.90,
    netMargin: 60633.10
  },
  "2025-09": {
    month: "September",
    jobs: 375,
    revenue: 257375,
    cogs: 69491,
    commissions: 18750,
    rebates: 17400,
    grossMargin: 151734,
    marginPercent: 58.95,
    adSpend: 31375.42,
    netMargin: 120358.58
  },
  "2025-10": {
    month: "October",
    jobs: 400,
    revenue: 274600,
    cogs: 74142,
    commissions: 20000,
    rebates: 18560,
    grossMargin: 161898,
    marginPercent: 58.95,
    adSpend: 89562.70,
    netMargin: 72335.30
  },
  "2025-11": {
    month: "November",
    jobs: 312,
    revenue: 215439.05, // Proportional from margin report (30/44 * total)
    cogs: 58048, // Estimated based on margin report ratios
    commissions: 17006, // Proportional
    rebates: 15786, // Proportional
    grossMargin: 124599.05,
    marginPercent: 57.81,
    adSpend: 62852.58, // Actual Nov ad spend
    netMargin: 61746.47
  },
  "2025-12": {
    month: "December (1-14)",
    jobs: 145,
    revenue: 100122.01, // Proportional from margin report (14/44 * total)
    cogs: 26955, // Estimated based on margin report ratios
    commissions: 7889, // Proportional
    rebates: 7334, // Proportional
    grossMargin: 57944.01,
    marginPercent: 57.81,
    adSpend: 30750.16, // Calculated: 93602.74 - 62852.58
    netMargin: 27193.85
  }
};

// Weekly performance data for forecasting (derived from Nov-Dec margin report)
export const weeklyPerformanceStats = {
  avgJobsPerWeek: 72.7,
  medianJobsPerWeek: 70,
  minJobsPerWeek: 55,
  maxJobsPerWeek: 95,
  stdDevJobsPerWeek: 12,
  avgRevenuePerJob: 690.51,
  avgMarginPerJob: 399.17,
  avgPartCostPerJob: 186.00,
  avgCommissionPerJob: 54.47,
  avgRebatePerJob: 50.59,
  marginPercent: 57.81,
  // Variability factors
  revenueVariabilityLow: 0.85,  // 15% below average possible
  revenueVariabilityHigh: 1.20, // 20% above average possible
  marginVariabilityLow: 0.90,   // 10% below average possible
  marginVariabilityHigh: 1.15,  // 15% above average possible
};

// Historical weekly job counts (simulated based on patterns)
export const historicalWeeklyJobs = [
  { week: "W1 Nov", jobs: 68, revenue: 46955, margin: 27152 },
  { week: "W2 Nov", jobs: 75, revenue: 51788, margin: 29943 },
  { week: "W3 Nov", jobs: 82, revenue: 56622, margin: 32734 },
  { week: "W4 Nov", jobs: 87, revenue: 92074, margin: 34711 },
  { week: "W1 Dec", jobs: 78, revenue: 53860, margin: 31138 },
  { week: "W2 Dec", jobs: 67, revenue: 46264, margin: 26752 },
];

// Fixed overhead data
export const staticOverhead = [
  {name: "Office Rent (1st)", amount: 1545.48, day: 1, category: "Rent", vendor: "Property Mgmt", autoPay: true},
  {name: "SBA Loan", amount: 2268, day: 1, category: "Debt", vendor: "SBA", autoPay: true},
  {name: "Brinx Security", amount: 44.99, day: 1, category: "Security", vendor: "Brinx", autoPay: true},
  {name: "Microsoft Office", amount: 6.78, day: 8, category: "Software", vendor: "Microsoft", autoPay: true},
  {name: "Vonage", amount: 378, day: 8, category: "Phone", vendor: "Vonage", autoPay: true},
  {name: "Office Rent (10th)", amount: 1545.48, day: 10, category: "Rent", vendor: "Property Mgmt", autoPay: true},
  {name: "Amur", amount: 1500, day: 10, category: "Services", vendor: "Amur", autoPay: false},
  {name: "T-Mobile", amount: 600, day: 15, category: "Phone", vendor: "T-Mobile", autoPay: true},
  {name: "Marketing", amount: 50000, day: 15, category: "Marketing", vendor: "Various", autoPay: false},
  {name: "Kemper Insurance", amount: 3206.84, day: 15, category: "Insurance", vendor: "Kemper", autoPay: true},
  {name: "Channel", amount: 1809, day: 15, category: "Services", vendor: "Channel", autoPay: false},
  {name: "Intuit/QB", amount: 106.72, day: 15, category: "Software", vendor: "Intuit", autoPay: true},
  {name: "Ally Bank", amount: 820, day: 19, category: "Debt", vendor: "Ally", autoPay: true},
  {name: "Office Rent (20th)", amount: 1545.48, day: 20, category: "Rent", vendor: "Property Mgmt", autoPay: true},
  {name: "American Family", amount: 2249.6, day: 20, category: "Insurance", vendor: "American Family", autoPay: true},
  {name: "SRP", amount: 500, day: 21, category: "Utilities", vendor: "SRP", autoPay: true},
  {name: "AC Service", amount: 322, day: 22, category: "Maintenance", vendor: "AC Company", autoPay: false},
  {name: "Glassbiller", amount: 2210, day: 25, category: "Software", vendor: "Glassbiller", autoPay: true},
  {name: "Ally Equipment", amount: 580, day: 25, category: "Debt", vendor: "Ally", autoPay: true},
  {name: "Navatias", amount: 2400, day: 25, category: "Services", vendor: "Navatias", autoPay: false},
  {name: "Microsoft 365", amount: 113.25, day: 25, category: "Software", vendor: "Microsoft", autoPay: true},
  {name: "Workers Comp", amount: 715.52, day: 26, category: "Insurance", vendor: "State Fund", autoPay: true},
  {name: "Cox Internet", amount: 500, day: 27, category: "Utilities", vendor: "Cox", autoPay: true},
  {name: "Ally Vehicle", amount: 600, day: 27, category: "Debt", vendor: "Ally", autoPay: true},
  {name: "Sales Tax", amount: 2000, day: 30, category: "Tax", vendor: "State", autoPay: false},
  {name: "Payroll (Week 1)", amount: 10000, day: 7, category: "Payroll", vendor: "ADP", autoPay: true},
  {name: "Payroll (Week 2)", amount: 10000, day: 14, category: "Payroll", vendor: "ADP", autoPay: true},
  {name: "Payroll (Week 3)", amount: 10000, day: 21, category: "Payroll", vendor: "ADP", autoPay: true},
  {name: "Payroll (Week 4)", amount: 10000, day: 28, category: "Payroll", vendor: "ADP", autoPay: true}
];

// Sample payroll data
export const samplePayroll = [
  {employee: "ALISON FARME", gross: 600, type: "SALARY", payDate: "WEEKLY"},
  {employee: "WILLIAM LESU", gross: 4000, type: "SALARY", payDate: "WEEKLY"},
  {employee: "Lacy Estrada", gross: 1500, type: "SALARY", payDate: "WEEKLY"},
  {employee: "TAYLOR DEAR", gross: 1000, type: "SALARY", payDate: "WEEKLY"},
  {employee: "FILIBERTO GU", gross: 1200, type: "SALARY", payDate: "WEEKLY"},
  {employee: "JACOB JIRON", gross: 600, type: "SALARY", payDate: "WEEKLY"},
  {employee: "RICK IT", gross: 645, type: "SALARY", payDate: "WEEKLY"},
  {employee: "Julio Duran", gross: 2500, type: "SALARY", payDate: "WEEKLY"},
  {employee: "BRYCE LeSueur", gross: 1200, type: "SALARY", payDate: "WEEKLY"},
  {employee: "AMADO Viera", gross: 1275, type: "SALARY", payDate: "WEEKLY"},
  {employee: "JUAN CARRAN", gross: 1000, type: "SALARY", payDate: "WEEKLY"}
];

// Sample debt data
export const sampleDebts = [
  {
    creditor: "SBA Loan",
    original: 150000,
    current: 125000,
    interest: 6.5,
    minimum: 2268,
    dueDay: 1,
    paid: 25000
  },
  {
    creditor: "Equipment Finance (Ally)",
    original: 35000,
    current: 22000,
    interest: 8.9,
    minimum: 580,
    dueDay: 25,
    paid: 13000
  },
  {
    creditor: "Business Credit Line",
    original: 50000,
    current: 18000,
    interest: 12.5,
    minimum: 820,
    dueDay: 19,
    paid: 32000
  }
];

// Sample COGS data
export const sampleCOGS = [
  {date: "1/15/2025", invoice: "INV-4501", customer: "Customer 1", part: "Windshield", cost: 170, supplier: "PGW", dueDate: "2/14/2025", status: "Pending"},
  {date: "1/16/2025", invoice: "INV-4502", customer: "Customer 2", part: "Side Window", cost: 190, supplier: "Safelite", dueDate: "2/15/2025", status: "Pending"},
  {date: "1/17/2025", invoice: "INV-4503", customer: "Customer 3", part: "Windshield", cost: 210, supplier: "PGW", dueDate: "2/16/2025", status: "Pending"},
  {date: "1/18/2025", invoice: "INV-4504", customer: "Customer 4", part: "Side Window", cost: 230, supplier: "Safelite", dueDate: "2/17/2025", status: "Pending"},
  {date: "1/19/2025", invoice: "INV-4505", customer: "Customer 5", part: "Windshield", cost: 250, supplier: "PGW", dueDate: "2/18/2025", status: "Pending"},
  {date: "1/10/2025", invoice: "INV-4506", customer: "Customer 6", part: "Side Window", cost: 150, supplier: "Safelite", dueDate: "2/9/2025", status: "Paid"},
  {date: "1/11/2025", invoice: "INV-4507", customer: "Customer 7", part: "Windshield", cost: 170, supplier: "PGW", dueDate: "2/10/2025", status: "Paid"},
  {date: "1/12/2025", invoice: "INV-4508", customer: "Customer 8", part: "Side Window", cost: 190, supplier: "Safelite", dueDate: "2/11/2025", status: "Paid"},
  {date: "1/13/2025", invoice: "INV-4509", customer: "Customer 9", part: "Windshield", cost: 210, supplier: "PGW", dueDate: "2/12/2025", status: "Paid"},
  {date: "1/14/2025", invoice: "INV-4510", customer: "Customer 10", part: "Side Window", cost: 230, supplier: "Safelite", dueDate: "2/13/2025", status: "Paid"}
];

// Sample commissions data
export const sampleCommissions = [
  {rep: "David Brown", period: "Week 1", sales: 25000, rate: 3, commission: 750, bonus: 0, total: 750, payDate: 5, status: "Pending"},
  {rep: "David Brown", period: "Week 2", sales: 28000, rate: 3, commission: 840, bonus: 200, total: 1040, payDate: 12, status: "Pending"}
];

// Sample taxes data
export const sampleTaxes = [
  {type: "City TPT", period: "January 2025", gross: 245000, taxable: 230000, rate: 2.0, due: 4600, dueDate: "2/20/2025", status: "Pending"},
  {type: "State Sales Tax", period: "January 2025", gross: 245000, taxable: 230000, rate: 5.6, due: 12880, dueDate: "2/20/2025", status: "Pending"}
];

// Sample rebates data
export const sampleRebates = [
  {insurance: "State Farm", claim: "SF123456", customer: "John Doe", invoice: 850, rate: 15, amount: 127.50, expectedDate: "2/15/2025", status: "Pending"},
  {insurance: "Progressive", claim: "PG789012", customer: "Jane Smith", invoice: 650, rate: 12, amount: 78, expectedDate: "2/10/2025", status: "Pending"}
];

// Variable monthly marketing costs (UPDATED with Nov-Dec 2025 actual data)
export const monthlyMarketingCosts: { [key: string]: number } = {
  "2025-01": 8342.28,
  "2025-02": 5000,
  "2025-03": 60638.92,
  "2025-04": 38375.28,
  "2025-05": 31728.56,
  "2025-06": 44209.53,
  "2025-07": 15579.12,
  "2025-08": 97202.90,
  "2025-09": 31375.42,
  "2025-10": 89562.70,
  "2025-11": 62852.58,  // Actual Nov 1-30 ad spend
  "2025-12": 30750.16   // Dec 1-14: $93,602.74 total - $62,852.58 Nov
};

// Calculate forecast based on jobs per week
export function calculateForecast(
  jobsPerWeek: number,
  weeks: number = 8,
  options: {
    avgJobRevenue?: number;
    marginPercent?: number;
    weeklyOverhead?: number;
    weeklyAdSpend?: number;
    variabilityFactor?: number; // 0-1, where 0 = no variability, 1 = full variability
  } = {}
) {
  const {
    avgJobRevenue = weeklyPerformanceStats.avgRevenuePerJob,
    marginPercent = weeklyPerformanceStats.marginPercent,
    weeklyOverhead = staticOverhead.reduce((sum, item) => sum + item.amount, 0) / 4,
    weeklyAdSpend = Object.values(monthlyMarketingCosts).reduce((a, b) => a + b, 0) / 12 / 4,
    variabilityFactor = 0
  } = options;

  const forecast = [];

  for (let i = 0; i < weeks; i++) {
    // Apply variability if enabled
    const variability = variabilityFactor > 0
      ? 1 + (Math.random() - 0.5) * 0.3 * variabilityFactor
      : 1;

    const weekJobs = Math.round(jobsPerWeek * variability);
    const weekRevenue = weekJobs * avgJobRevenue;
    const weekGrossMargin = weekRevenue * (marginPercent / 100);
    const weekNetProfit = weekGrossMargin - weeklyOverhead - weeklyAdSpend;

    forecast.push({
      week: i + 1,
      jobs: weekJobs,
      revenue: weekRevenue,
      grossMargin: weekGrossMargin,
      overhead: weeklyOverhead,
      adSpend: weeklyAdSpend,
      netProfit: weekNetProfit
    });
  }

  return forecast;
}
