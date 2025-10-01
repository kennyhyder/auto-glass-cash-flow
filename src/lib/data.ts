/**
 * Data for the Auto Glass Cash Flow Management System
 */

// Types
export interface OverheadItem {
  name: string;
  amount: number;
  day: number;
  category: string;
  vendor: string;
  autoPay: boolean;
}

export interface PayrollItem {
  employee: string;
  position: string;
  type: string;
  gross: number;
  taxes: number;
  net: number;
  payDate: number;
  status: string;
}

export interface DebtItem {
  creditor: string;
  original: number;
  current: number;
  interest: number;
  minimum: number;
  dueDay: number;
  paid: number;
}

export interface BusinessMetrics {
  avgMonthlyRevenue: number;
  avgMonthlyGrossMargin: number;
  grossMarginPercent: number;
  monthlyOverhead: number;
  avgTransactionSize: number;
  monthlyTransactions: number;
  netProfit: number;
  netMarginPercent: number;
}

// Business metrics from analysis
export const businessMetrics: BusinessMetrics = {
  avgMonthlyRevenue: 272316,
  avgMonthlyGrossMargin: 142849,
  grossMarginPercent: 52.46,
  monthlyOverhead: 32642,
  avgTransactionSize: 686,
  monthlyTransactions: 397,
  netProfit: 110208,
  netMarginPercent: 40.5
};

// Static overhead data
export const staticOverhead: OverheadItem[] = [
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
export const samplePayroll: PayrollItem[] = [
  {employee: "John Smith", position: "Senior Tech", type: "Hourly", gross: 2800, taxes: 420, net: 2380, payDate: 5, status: "Pending"},
  {employee: "Maria Garcia", position: "Technician", type: "Hourly", gross: 2240, taxes: 336, net: 1904, payDate: 5, status: "Pending"},
  {employee: "Sarah Williams", position: "Office Mgr", type: "Salary", gross: 3500, taxes: 525, net: 2975, payDate: 5, status: "Pending"},
  {employee: "David Brown", position: "Sales", type: "Commission", gross: 4500, taxes: 675, net: 3825, payDate: 5, status: "Pending"},
  {employee: "Jennifer Lee", position: "Accounting", type: "Salary", gross: 3000, taxes: 450, net: 2550, payDate: 20, status: "Pending"},
  {employee: "Robert Taylor", position: "Technician", type: "Hourly", gross: 2080, taxes: 312, net: 1768, payDate: 20, status: "Pending"}
];

// Sample debt data
export const sampleDebts: DebtItem[] = [
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
export interface COGSItem {
  date: string;
  invoice: string;
  customer: string;
  part: string;
  cost: number;
  supplier: string;
  dueDate: string;
  status: string;
}

export const sampleCOGS: COGSItem[] = [
  {date: "10/01/2024", invoice: "INV-4501", customer: "Customer 1", part: "Windshield", cost: 170, supplier: "PGW", dueDate: "10/31/2024", status: "Pending"},
  {date: "09/30/2024", invoice: "INV-4502", customer: "Customer 2", part: "Side Window", cost: 190, supplier: "Safelite", dueDate: "10/30/2024", status: "Pending"},
  {date: "09/29/2024", invoice: "INV-4503", customer: "Customer 3", part: "Windshield", cost: 210, supplier: "PGW", dueDate: "10/29/2024", status: "Pending"},
  {date: "09/28/2024", invoice: "INV-4504", customer: "Customer 4", part: "Side Window", cost: 230, supplier: "Safelite", dueDate: "10/28/2024", status: "Pending"},
  {date: "09/27/2024", invoice: "INV-4505", customer: "Customer 5", part: "Windshield", cost: 250, supplier: "PGW", dueDate: "10/27/2024", status: "Paid"}
];

// Sample commission data
export interface CommissionItem {
  rep: string;
  period: string;
  sales: number;
  rate: number;
  commission: number;
  bonus: number;
  total: number;
  payDate: number;
  status: string;
}

export const sampleCommissions: CommissionItem[] = [
  {rep: "David Brown", period: "Week 1", sales: 25000, rate: 3, commission: 750, bonus: 0, total: 750, payDate: 5, status: "Pending"},
  {rep: "David Brown", period: "Week 2", sales: 28000, rate: 3, commission: 840, bonus: 200, total: 1040, payDate: 12, status: "Pending"}
];

// Sample tax data
export interface TaxItem {
  type: string;
  period: string;
  gross: number;
  taxable: number;
  rate: number;
  due: number;
  dueDate: string;
  status: string;
}

export const sampleTaxes: TaxItem[] = [
  {type: "City TPT", period: "January 2025", gross: 245000, taxable: 230000, rate: 2.0, due: 4600, dueDate: "2/20/2025", status: "Pending"},
  {type: "State Sales Tax", period: "January 2025", gross: 245000, taxable: 230000, rate: 5.6, due: 12880, dueDate: "2/20/2025", status: "Pending"}
];

// Sample rebate data
export interface RebateItem {
  insurance: string;
  claim: string;
  customer: string;
  invoice: number;
  rate: number;
  amount: number;
  expectedDate: string;
  status: string;
}

export const sampleRebates: RebateItem[] = [
  {insurance: "State Farm", claim: "SF123456", customer: "John Doe", invoice: 850, rate: 15, amount: 127.50, expectedDate: "2/15/2025", status: "Pending"},
  {insurance: "Progressive", claim: "PG789012", customer: "Jane Smith", invoice: 650, rate: 12, amount: 78, expectedDate: "2/10/2025", status: "Pending"}
];

// Helper functions
export function getUpcomingPayments(days: number = 7): Array<{
  date: Date;
  name: string;
  amount: number;
  category: string;
  status: string;
}> {
  const today = new Date();
  const payments = [];
  
  // Add overhead payments
  for (let i = 0; i < days; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() + i);
    const dayOfMonth = checkDate.getDate();
    
    staticOverhead.forEach(item => {
      if (item.day === dayOfMonth) {
        payments.push({
          date: new Date(checkDate),
          name: item.name,
          amount: item.amount,
          category: 'Overhead',
          status: i === 0 ? 'Due Today' : `In ${i} days`
        });
      }
    });
    
    // Add payroll
    if (dayOfMonth === 5 || dayOfMonth === 20) {
      const payrollTotal = samplePayroll
        .filter(p => p.payDate === dayOfMonth)
        .reduce((sum, p) => sum + p.net, 0);
      
      if (payrollTotal > 0) {
        payments.push({
          date: new Date(checkDate),
          name: `Payroll (${dayOfMonth}th)`,
          amount: payrollTotal,
          category: 'Payroll',
          status: i === 0 ? 'Due Today' : `In ${i} days`
        });
      }
    }
  }
  
  return payments.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function calculateCashFlow(days: number = 30): Array<{
  date: Date;
  balance: number;
  income: number;
  expenses: number;
}> {
  const dailyRevenue = businessMetrics.avgMonthlyRevenue / 30;
  let balance = 45320; // Starting cash
  const forecast = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dayOfMonth = date.getDate();
    
    // Add daily revenue
    const income = dailyRevenue;
    
    // Calculate expenses for the day
    let expenses = 0;
    
    // Add overhead
    staticOverhead.forEach(item => {
      if (item.day === dayOfMonth) {
        expenses += item.amount;
      }
    });
    
    // Add payroll
    if (dayOfMonth === 5 || dayOfMonth === 20) {
      expenses += samplePayroll
        .filter(p => p.payDate === dayOfMonth)
        .reduce((sum, p) => sum + p.net, 0);
    }
    
    balance = balance + income - expenses;
    
    forecast.push({
      date: new Date(date),
      balance: Math.round(balance),
      income: Math.round(income),
      expenses: Math.round(expenses)
    });
  }
  
  return forecast;
}