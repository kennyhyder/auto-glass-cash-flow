// Business metrics from analysis
export const businessMetrics = {
  avgMonthlyRevenue: 272316,
  avgMonthlyGrossMargin: 142849,
  grossMarginPercent: 52.46,
  monthlyOverhead: 32642,
  avgTransactionSize: 686,
  monthlyTransactions: 397,
  netProfit: 110208,
  netMarginPercent: 40.5
};

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
  {name: "Marketing", amount: 5000, day: 15, category: "Marketing", vendor: "Various", autoPay: false},
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
  {name: "Sales Tax", amount: 2000, day: 30, category: "Tax", vendor: "State", autoPay: false}
];

// Sample payroll data
export const samplePayroll = [
  {employee: "John Smith", position: "Senior Tech", type: "Hourly", gross: 2800, taxes: 420, net: 2380, payDate: 5, status: "Pending"},
  {employee: "Maria Garcia", position: "Technician", type: "Hourly", gross: 2240, taxes: 336, net: 1904, payDate: 5, status: "Pending"},
  {employee: "Sarah Williams", position: "Office Mgr", type: "Salary", gross: 3500, taxes: 525, net: 2975, payDate: 5, status: "Pending"},
  {employee: "David Brown", position: "Sales", type: "Commission", gross: 4500, taxes: 675, net: 3825, payDate: 5, status: "Pending"},
  {employee: "Jennifer Lee", position: "Accounting", type: "Salary", gross: 3000, taxes: 450, net: 2550, payDate: 20, status: "Pending"},
  {employee: "Robert Taylor", position: "Technician", type: "Hourly", gross: 2080, taxes: 312, net: 1768, payDate: 20, status: "Pending"}
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