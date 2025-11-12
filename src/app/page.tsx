'use client';

import { useState, useRef, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import {
  staticOverhead,
  samplePayroll,
  sampleDebts,
  sampleTaxes,
  businessMetrics,
  monthlyMarketingCosts
} from '@/lib/data';
import monthlyData2025 from '@/lib/monthly-data-2025.json';
import cogsData2025 from '@/lib/cogs-data-2025.json';
import rebatesData2025 from '@/lib/rebates-data-2025.json';
import commissionsData2025 from '@/lib/commissions-data-2025.json';

// Types
interface Payment {
  name: string;
  amount: number;
  day: number;
  category: string;
  vendor?: string;
  autoPay?: boolean;
  status?: string;
}

interface COGSItem {
  id: string;
  date: string;
  customer: string;
  cost: number;
}

interface Commission {
  id: string;
  customer: string;
  sales: number;
  commission: number;
  commissionPercent: number;
}

interface Tax {
  type: string;
  period: string;
  gross: number;
  taxable: number;
  rate: number;
  due: number;
  dueDate: string;
  status: string;
}

interface Rebate {
  id: string;
  date: string;
  customer: string;
  invoiceAmount: number;
  rebateAmount: number;
  rebatePercent: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [overhead] = useState<Payment[]>(staticOverhead);
  const [payroll] = useState(samplePayroll);
  const [debts] = useState(sampleDebts);
  const [cogs] = useState<COGSItem[]>(cogsData2025 as COGSItem[]);
  const [commissions] = useState<Commission[]>(commissionsData2025 as Commission[]);
  const [taxes] = useState<Tax[]>(sampleTaxes);
  const [rebates] = useState<Rebate[]>(rebatesData2025 as Rebate[]);
  const [cogsPage, setCogsPage] = useState(1);
  const [rebatesPage, setRebatesPage] = useState(1);
  const [commissionsPage, setCommissionsPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle URL parameters for deep linking to tabs
  useEffect(() => {
    // Read tab from URL on initial load
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, []);

  // Reset page when switching tabs
  useEffect(() => {
    if (activeTab === 'cogs') {
      setCogsPage(1);
    }
    if (activeTab === 'rebates') {
      setRebatesPage(1);
    }
    if (activeTab === 'commissions') {
      setCommissionsPage(1);
    }
  }, [activeTab]);

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url);
  };

  // Calculate metrics from real data
  const overheadTotal = overhead.reduce((sum, item) => sum + item.amount, 0);
  const payrollTotal = payroll.reduce((sum, item) => sum + item.gross, 0);
  const debtTotal = debts.reduce((sum, item) => sum + item.current, 0);
  const cogsTotal = cogs.reduce((sum, item) => sum + item.cost, 0);
  const commissionsTotal = commissions.reduce((sum, item) => sum + item.commission, 0);
  const taxesTotal = taxes.reduce((sum, item) => sum + item.due, 0);
  const rebatesTotal = rebates.reduce((sum, item) => sum + item.rebateAmount, 0);

  // Calculate YTD metrics from monthly data (2025 only, excluding Dec 2024)
  const monthlyData = (monthlyData2025 as any[]).filter(m => m.month.startsWith('2025'));
  const ytdRevenue = monthlyData.reduce((sum, m) => sum + m.revenue, 0);
  const ytdCosts = monthlyData.reduce((sum, m) => sum + m.costs, 0);
  const ytdMargin = monthlyData.reduce((sum, m) => sum + m.margin, 0);
  const ytdTransactions = monthlyData.reduce((sum, m) => sum + m.transactionCount, 0);
  const avgMonthlyRevenue = ytdRevenue / monthlyData.length;
  const avgMonthlyMargin = ytdMargin / monthlyData.length;
  const avgTransactionValue = ytdRevenue / ytdTransactions;
  const marginPercent = (ytdMargin / ytdRevenue) * 100;

  // Calculate total monthly expenses
  const monthlyOverhead = overheadTotal;
  const monthlyPayroll = payrollTotal * 4; // Weekly * 4
  const monthlyExpenses = monthlyOverhead + monthlyPayroll;

  // Estimate current cash (avg monthly revenue - avg monthly expenses + buffer)
  const estimatedMonthlyCashFlow = avgMonthlyRevenue - monthlyExpenses - (cogsTotal / 10); // COGS spread over months
  const estimatedCurrentCash = estimatedMonthlyCashFlow * 1.5; // ~1.5 months buffer

  // Calculate best month performance for optimistic forecast
  const bestMonth = monthlyData.reduce((best, current) =>
    current.revenue > best.revenue ? current : best
  , monthlyData[0]);
  const bestWeeklyRevenue = bestMonth.revenue / 4; // Assume 4 weeks per month
  const bestWeeklyMargin = bestMonth.margin / 4;
  const bestWeeklyCosts = bestMonth.costs / 4;
  const bestWeeklyTransactions = Math.ceil(bestMonth.transactionCount / 4);

  // Generate 8-week forecast based on best performance
  function generateWeeklyForecast() {
    const forecast = [];
    let cumulativeCash = estimatedCurrentCash;
    const weeklyOverhead = monthlyOverhead / 4;
    const weeklyExpenses = weeklyOverhead + payrollTotal; // payroll is already weekly

    for (let week = 1; week <= 8; week++) {
      const startingBalance = cumulativeCash;
      const expectedRevenue = bestWeeklyRevenue;
      const expectedCosts = bestWeeklyCosts;
      const expectedMargin = bestWeeklyMargin;
      const totalExpenses = weeklyExpenses + expectedCosts;
      const netCashFlow = expectedRevenue - totalExpenses;
      const endingBalance = startingBalance + netCashFlow;

      forecast.push({
        week,
        startingBalance,
        expectedRevenue,
        expectedCosts,
        expectedMargin,
        overhead: weeklyOverhead,
        payroll: payrollTotal,
        totalExpenses,
        netCashFlow,
        endingBalance,
        transactions: bestWeeklyTransactions
      });

      cumulativeCash = endingBalance;
    }

    return forecast;
  }

  const weeklyForecast = generateWeeklyForecast();
  
  // Calculate daily obligations
  const today = new Date();
  const currentDay = today.getDate();
  const todaysDue = overhead
    .filter(item => item.day === currentDay)
    .reduce((sum, item) => sum + item.amount, 0);
  
  // Calculate weekly obligations
  const weeklyDue = calculateWeeklyDue();
  
  function calculateWeeklyDue() {
    let total = 0;
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      const checkDay = checkDate.getDate();
      
      // Add overhead for that day
      total += overhead
        .filter(item => item.day === checkDay)
        .reduce((sum, item) => sum + item.amount, 0);
      
      // Add weekly payroll (paid weekly)
      if (checkDay % 7 === 0) {
        total += payrollTotal;
      }
    }
    return total;
  }
  
  // Get upcoming payments for next 7 days
  function getUpcomingPayments() {
    const payments: any[] = [];
    
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      const checkDay = checkDate.getDate();
      
      // Add overhead payments
      overhead
        .filter(item => item.day === checkDay)
        .forEach(item => {
          payments.push({
            date: checkDate,
            name: item.name,
            amount: item.amount,
            category: 'Overhead',
            status: i === 0 ? 'Due Today' : `In ${i} days`
          });
        });
      
      // Add weekly payroll
      if (checkDay % 7 === 0) {
        payments.push({
          date: checkDate,
          name: `Weekly Payroll`,
          amount: payrollTotal,
          category: 'Payroll',
          status: i === 0 ? 'Due Today' : `In ${i} days`
        });
      }
    }
    
    return payments.sort((a, b) => a.date - b.date);
  }
  
  // Handle file import
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // In a real app, you would parse the Excel file here
    alert('File import feature would parse: ' + file.name);
  };
  
  // Export data to Excel
  const exportToExcel = () => {
    // In a real app, you would generate an Excel file here
    alert('Export feature would generate Excel file with all data');
  };

  const upcomingPayments = getUpcomingPayments();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              💰 Integrated Cash Flow Management System
            </h1>
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileImport}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                📁 Import Data
              </button>
              <button
                onClick={exportToExcel}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                📥 Export Excel
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white p-2 rounded-xl shadow-sm">
          <div className="flex flex-wrap gap-1">
            {['dashboard', 'overhead', 'payroll', 'cogs', 'commissions', 'rebates', 'forecast', 'analysis', '2025-performance'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-transparent text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab === 'cogs' ? 'COGS' : tab === '2025-performance' ? '2025 Performance' : tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">YTD Revenue</div>
                <div className="text-3xl font-bold text-blue-600">{formatCurrency(ytdRevenue)}</div>
                <div className="text-sm text-gray-600 mt-2">{ytdTransactions.toLocaleString()} transactions</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">YTD Gross Margin</div>
                <div className="text-3xl font-bold text-green-600">{formatCurrency(ytdMargin)}</div>
                <div className="text-sm text-gray-600 mt-2">{marginPercent.toFixed(1)}% margin rate</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Avg Monthly Revenue</div>
                <div className="text-3xl font-bold text-gray-900">{formatCurrency(avgMonthlyRevenue)}</div>
                <div className="text-sm text-gray-600 mt-2">{(ytdTransactions / monthlyData.length).toFixed(0)} transactions/mo</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Estimated Cash Position</div>
                <div className="text-3xl font-bold text-gray-900">{formatCurrency(estimatedCurrentCash)}</div>
                <div className="text-sm text-gray-600 mt-2">Based on cash flow</div>
              </div>
            </div>

            {/* Payment Obligations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Today's Obligations</div>
                <div className="text-2xl font-bold text-red-600">{formatCurrency(todaysDue)}</div>
                <div className="text-sm text-red-600 mt-2">{todaysDue > 0 ? 'Payments due' : 'No payments today'}</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Week Total Due</div>
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(weeklyDue)}</div>
                <div className="text-sm text-gray-600 mt-2">{upcomingPayments.length} payments</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Monthly Expenses</div>
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(monthlyExpenses)}</div>
                <div className="text-sm text-gray-600 mt-2">Overhead + Payroll</div>
              </div>
            </div>

            {/* Business Performance Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Business Performance (YTD 2025)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">Total Revenue</div>
                  <div className="text-xl font-bold text-blue-600">{formatCurrency(ytdRevenue)}</div>
                  <div className="text-xs text-gray-500 mt-1">{ytdTransactions.toLocaleString()} trans.</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">Total COGS</div>
                  <div className="text-xl font-bold text-red-600">{formatCurrency(ytdCosts)}</div>
                  <div className="text-xs text-gray-500 mt-1">{cogs.length.toLocaleString()} items</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">Gross Margin</div>
                  <div className="text-xl font-bold text-green-600">{formatCurrency(ytdMargin)}</div>
                  <div className="text-xs text-gray-500 mt-1">{marginPercent.toFixed(1)}% rate</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">Avg Ticket</div>
                  <div className="text-xl font-bold text-purple-600">{formatCurrency(avgTransactionValue)}</div>
                  <div className="text-xs text-gray-500 mt-1">per transaction</div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">💰 Expenses Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">Monthly Overhead</div>
                  <div className="text-lg font-bold">{formatCurrency(monthlyOverhead)}</div>
                  <div className="text-xs text-gray-500 mt-1">{overhead.length} items</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">Weekly Payroll</div>
                  <div className="text-lg font-bold">{formatCurrency(payrollTotal)}</div>
                  <div className="text-xs text-gray-500 mt-1">{payroll.length} employees</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">Commissions</div>
                  <div className="text-lg font-bold">{formatCurrency(commissionsTotal)}</div>
                  <div className="text-xs text-gray-500 mt-1">{commissions.length.toLocaleString()} paid</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">TPT Taxes Due</div>
                  <div className="text-lg font-bold">{formatCurrency(taxesTotal)}</div>
                  <div className="text-xs text-gray-500 mt-1">{taxes.length} items</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">Rebates Expected</div>
                  <div className="text-lg font-bold text-green-600">{formatCurrency(rebatesTotal)}</div>
                  <div className="text-xs text-gray-500 mt-1">{rebates.length.toLocaleString()} pending</div>
                </div>
              </div>
            </div>

            {/* Alerts & Insights */}
            <div className="space-y-3">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>💡 Business Health:</strong> YTD margin of {marginPercent.toFixed(1)}% with average monthly revenue of {formatCurrency(avgMonthlyRevenue)}. Net cash flow per month: {formatCurrency(estimatedMonthlyCashFlow)}.
                    </p>
                  </div>
                </div>
              </div>

              {estimatedMonthlyCashFlow > 0 ? (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        <strong>✅ Positive Cash Flow:</strong> Generating approximately {formatCurrency(estimatedMonthlyCashFlow)}/month after all expenses. Rebates of {formatCurrency(rebatesTotal)} expected to boost cash position.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        <strong>🚨 Cash Flow Warning:</strong> Monthly expenses ({formatCurrency(monthlyExpenses)}) exceed average revenue. Review overhead and payroll costs.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>⚠️ Outstanding Items:</strong> {cogs.length.toLocaleString()} COGS items ({formatCurrency(cogsTotal)}), {commissions.length.toLocaleString()} commissions ({formatCurrency(commissionsTotal)}), and {rebates.length.toLocaleString()} rebates ({formatCurrency(rebatesTotal)}) to reconcile.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Payments */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📅 Upcoming Payments (Next 7 Days)</h2>
              <div className="space-y-2">
                {upcomingPayments.slice(0, 10).map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium">{payment.name}</div>
                      <div className="text-sm text-gray-500">
                        {payment.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {payment.category}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">{formatCurrency(payment.amount)}</div>
                      <div className={`text-xs ${payment.status === 'Due Today' ? 'text-red-600' : 'text-gray-500'}`}>
                        {payment.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Overhead Tab */}
        {activeTab === 'overhead' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">📋 Fixed Monthly Overhead</h2>
                <p className="text-gray-600">Total: <strong>{formatCurrency(overheadTotal)}</strong></p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auto-Pay</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {overhead.map((item, index) => {
                    const isPast = item.day < currentDay;
                    const isToday = item.day === currentDay;
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">{item.day}</td>
                        <td className="px-6 py-4 text-sm font-medium">{item.name}</td>
                        <td className="px-6 py-4 text-sm font-bold">{formatCurrency(item.amount)}</td>
                        <td className="px-6 py-4 text-sm">{item.category}</td>
                        <td className="px-6 py-4 text-sm">{item.vendor}</td>
                        <td className="px-6 py-4 text-sm">{item.autoPay ? '✓ Yes' : 'No'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            isPast ? 'bg-green-100 text-green-800' : 
                            isToday ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {isPast ? 'Paid' : isToday ? 'Due Today' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payroll Tab */}
        {activeTab === 'payroll' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">👥 Payroll Schedule</h2>
              <p className="text-gray-600">Total Weekly Payroll: <strong>{formatCurrency(payrollTotal)}</strong> | Total Monthly: <strong>{formatCurrency(payrollTotal * 4)}</strong></p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Gross Pay</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Pay Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {payroll.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium">{item.employee}</td>
                      <td className="px-6 py-4 text-sm text-right">{formatCurrency(item.gross)}</td>
                      <td className="px-6 py-4 text-sm text-center">{item.type}</td>
                      <td className="px-6 py-4 text-sm text-center">{item.payDate}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td className="px-6 py-4 text-sm font-bold">Total ({payroll.length} employees)</td>
                    <td className="px-6 py-4 text-sm font-bold text-right">{formatCurrency(payrollTotal)}</td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* COGS Tab */}
        {activeTab === 'cogs' && (() => {
          const itemsPerPage = 100;
          const totalPages = Math.ceil(cogs.length / itemsPerPage);
          const startIndex = (cogsPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const currentItems = cogs.slice(startIndex, endIndex);

          // Generate page numbers to show
          const getPageNumbers = () => {
            const pages = [];
            const maxPagesToShow = 7;

            if (totalPages <= maxPagesToShow) {
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
              }
            } else {
              if (cogsPage <= 4) {
                for (let i = 1; i <= 5; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
              } else if (cogsPage >= totalPages - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
              } else {
                pages.push(1);
                pages.push('...');
                for (let i = cogsPage - 1; i <= cogsPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
              }
            }
            return pages;
          };

          return (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">📦 Cost of Goods Sold (2025)</h2>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-600">
                    Total COGS: <strong>{formatCurrency(cogsTotal)}</strong> |
                    Total TPT Taxes (7.9%): <strong>{formatCurrency(cogsTotal * 0.079)}</strong> |
                    Grand Total: <strong>{formatCurrency(cogsTotal * 1.079)}</strong> |
                    ({cogs.length.toLocaleString()} transactions)
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Cost</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">TPT Taxes (7.9%)</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentItems.map((item, index) => {
                      const tptTax = item.cost * 0.079;
                      const total = item.cost + tptTax;
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm">{item.date}</td>
                          <td className="px-6 py-4 text-sm font-medium">{item.id}</td>
                          <td className="px-6 py-4 text-sm">{item.customer}</td>
                          <td className="px-6 py-4 text-sm text-right">{formatCurrency(item.cost)}</td>
                          <td className="px-6 py-4 text-sm text-right text-orange-600">{formatCurrency(tptTax)}</td>
                          <td className="px-6 py-4 text-sm font-bold text-right text-blue-600">{formatCurrency(total)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, cogs.length)} of {cogs.length.toLocaleString()} transactions
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCogsPage(prev => Math.max(1, prev - 1))}
                    disabled={cogsPage === 1}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      cogsPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    Previous
                  </button>

                  {getPageNumbers().map((page, idx) => (
                    page === '...' ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">...</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCogsPage(page as number)}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          cogsPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}

                  <button
                    onClick={() => setCogsPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={cogsPage === totalPages}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      cogsPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Commissions Tab */}
        {activeTab === 'commissions' && (() => {
          const itemsPerPage = 100;
          const totalPages = Math.ceil(commissions.length / itemsPerPage);
          const startIndex = (commissionsPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const currentCommissions = commissions.slice(startIndex, endIndex);

          // Smart page numbers (show first, last, and pages around current)
          const getPageNumbers = () => {
            const pages: (number | string)[] = [];
            if (totalPages <= 7) {
              return Array.from({ length: totalPages }, (_, i) => i + 1);
            }

            pages.push(1);

            if (commissionsPage > 3) {
              pages.push('...');
            }

            for (let i = Math.max(2, commissionsPage - 1); i <= Math.min(totalPages - 1, commissionsPage + 1); i++) {
              pages.push(i);
            }

            if (commissionsPage < totalPages - 2) {
              pages.push('...');
            }

            if (totalPages > 1) {
              pages.push(totalPages);
            }

            return pages;
          };

          return (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">💵 Sales Commissions</h2>
                <p className="text-gray-600">Total: <strong>{formatCurrency(commissionsTotal)}</strong> ({commissions.length.toLocaleString()} transactions)</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission %</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentCommissions.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium">{item.id}</td>
                        <td className="px-6 py-4 text-sm">{item.customer}</td>
                        <td className="px-6 py-4 text-sm">{formatCurrency(item.sales)}</td>
                        <td className="px-6 py-4 text-sm">{item.commissionPercent.toFixed(2)}%</td>
                        <td className="px-6 py-4 text-sm font-bold">{formatCurrency(item.commission)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1}-{Math.min(endIndex, commissions.length)} of {commissions.length.toLocaleString()} transactions
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCommissionsPage(p => Math.max(1, p - 1))}
                      disabled={commissionsPage === 1}
                      className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {getPageNumbers().map((page, idx) => (
                      page === '...' ? (
                        <span key={idx} className="px-4 py-2 text-sm">...</span>
                      ) : (
                        <button
                          key={idx}
                          onClick={() => setCommissionsPage(page as number)}
                          className={`px-4 py-2 text-sm border rounded-lg ${
                            commissionsPage === page
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    ))}
                    <button
                      onClick={() => setCommissionsPage(p => Math.min(totalPages, p + 1))}
                      disabled={commissionsPage === totalPages}
                      className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* Taxes Tab */}
        {activeTab === 'taxes' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">🏛️ TPT Taxes</h2>
              <p className="text-gray-600">Total Due: <strong>{formatCurrency(taxesTotal)}</strong></p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tax Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gross Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taxable Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tax Due</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {taxes.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium">{item.type}</td>
                      <td className="px-6 py-4 text-sm">{item.period}</td>
                      <td className="px-6 py-4 text-sm">{formatCurrency(item.gross)}</td>
                      <td className="px-6 py-4 text-sm">{formatCurrency(item.taxable)}</td>
                      <td className="px-6 py-4 text-sm">{item.rate}%</td>
                      <td className="px-6 py-4 text-sm font-bold">{formatCurrency(item.due)}</td>
                      <td className="px-6 py-4 text-sm">{item.dueDate}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Rebates Tab */}
        {activeTab === 'rebates' && (() => {
          const itemsPerPage = 100;
          const totalPages = Math.ceil(rebates.length / itemsPerPage);
          const startIndex = (rebatesPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const currentItems = rebates.slice(startIndex, endIndex);

          // Generate page numbers to show
          const getPageNumbers = () => {
            const pages = [];
            const maxPagesToShow = 7;

            if (totalPages <= maxPagesToShow) {
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
              }
            } else {
              if (rebatesPage <= 4) {
                for (let i = 1; i <= 5; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
              } else if (rebatesPage >= totalPages - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
              } else {
                pages.push(1);
                pages.push('...');
                for (let i = rebatesPage - 1; i <= rebatesPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
              }
            }
            return pages;
          };

          return (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">💸 Customer Rebates (2025)</h2>
                <p className="text-gray-600">
                  Total Rebates: <strong className="text-green-600">{formatCurrency(rebatesTotal)}</strong> ({rebates.length.toLocaleString()} transactions)
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Invoice Amount</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Rebate %</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Rebate Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentItems.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">{item.date}</td>
                        <td className="px-6 py-4 text-sm">{item.customer}</td>
                        <td className="px-6 py-4 text-sm text-right">{formatCurrency(item.invoiceAmount)}</td>
                        <td className="px-6 py-4 text-sm text-right">{item.rebatePercent.toFixed(1)}%</td>
                        <td className="px-6 py-4 text-sm font-bold text-right text-green-600">{formatCurrency(item.rebateAmount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, rebates.length)} of {rebates.length.toLocaleString()} transactions
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRebatesPage(prev => Math.max(1, prev - 1))}
                    disabled={rebatesPage === 1}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      rebatesPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    Previous
                  </button>

                  {getPageNumbers().map((page, idx) => (
                    page === '...' ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">...</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setRebatesPage(page as number)}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          rebatesPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}

                  <button
                    onClick={() => setRebatesPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={rebatesPage === totalPages}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      rebatesPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Forecast Tab */}
        {activeTab === 'forecast' && (
          <div className="space-y-6">
            {/* Forecast Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Best Month Performance</div>
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(bestMonth.revenue)}</div>
                <div className="text-sm text-gray-600 mt-2">{bestMonth.monthName}</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Weekly Revenue (Best)</div>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(bestWeeklyRevenue)}</div>
                <div className="text-sm text-gray-600 mt-2">~{bestWeeklyTransactions} transactions/week</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">8-Week Projected Revenue</div>
                <div className="text-2xl font-bold text-purple-600">{formatCurrency(bestWeeklyRevenue * 8)}</div>
                <div className="text-sm text-gray-600 mt-2">Optimistic scenario</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Projected Cash Position</div>
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(weeklyForecast[7].endingBalance)}</div>
                <div className="text-sm text-gray-600 mt-2">After 8 weeks</div>
              </div>
            </div>

            {/* Weekly Forecast Table */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">📈 8-Week Cash Flow Forecast</h2>
                <p className="text-sm text-gray-600 mt-1">Based on best month performance ({bestMonth.monthName}) - Optimistic projection</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Week</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Starting Balance</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Revenue</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">COGS</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Gross Margin</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Overhead</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Payroll</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Net Cash Flow</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ending Balance</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {weeklyForecast.map((week) => {
                      const today = new Date();
                      const weekStartDate = new Date(today.getTime() + (week.week - 1) * 7 * 24 * 60 * 60 * 1000);
                      const weekEndDate = new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000);
                      const dateRange = `${weekStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

                      return (
                        <tr key={week.week} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium">
                            <div>Week {week.week}</div>
                            <div className="text-xs text-gray-500">{dateRange}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-right">{formatCurrency(week.startingBalance)}</td>
                          <td className="px-6 py-4 text-sm text-right text-blue-600 font-medium">{formatCurrency(week.expectedRevenue)}</td>
                          <td className="px-6 py-4 text-sm text-right text-red-600">-{formatCurrency(week.expectedCosts)}</td>
                          <td className="px-6 py-4 text-sm text-right text-green-600 font-medium">{formatCurrency(week.expectedMargin)}</td>
                          <td className="px-6 py-4 text-sm text-right text-orange-600">-{formatCurrency(week.overhead)}</td>
                          <td className="px-6 py-4 text-sm text-right text-purple-600">-{formatCurrency(week.payroll)}</td>
                          <td className="px-6 py-4 text-sm text-right font-bold">
                            <span className={week.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {week.netCashFlow >= 0 ? '+' : ''}{formatCurrency(week.netCashFlow)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-right font-bold">{formatCurrency(week.endingBalance)}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              week.endingBalance < 50000 ? 'bg-yellow-100 text-yellow-800' :
                              week.endingBalance < 100000 ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {week.endingBalance < 50000 ? 'Caution' : week.endingBalance < 100000 ? 'Good' : 'Excellent'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-gray-50 font-bold">
                    <tr>
                      <td className="px-6 py-4 text-sm">8-Week Totals</td>
                      <td className="px-6 py-4 text-sm text-right">-</td>
                      <td className="px-6 py-4 text-sm text-right text-blue-600">
                        {formatCurrency(weeklyForecast.reduce((sum, w) => sum + w.expectedRevenue, 0))}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-red-600">
                        -{formatCurrency(weeklyForecast.reduce((sum, w) => sum + w.expectedCosts, 0))}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-green-600">
                        {formatCurrency(weeklyForecast.reduce((sum, w) => sum + w.expectedMargin, 0))}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-orange-600">
                        -{formatCurrency(weeklyForecast.reduce((sum, w) => sum + w.overhead, 0))}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-purple-600">
                        -{formatCurrency(weeklyForecast.reduce((sum, w) => sum + w.payroll, 0))}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-green-600">
                        +{formatCurrency(weeklyForecast.reduce((sum, w) => sum + w.netCashFlow, 0))}
                      </td>
                      <td className="px-6 py-4 text-sm text-right">-</td>
                      <td className="px-6 py-4 text-center">-</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Forecast Assumptions */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-blue-800">Forecast Assumptions</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Based on best month: {bestMonth.monthName} ({formatCurrency(bestMonth.revenue)} revenue, {bestMonth.transactionCount} transactions)</li>
                      <li>Weekly revenue: {formatCurrency(bestWeeklyRevenue)} (~{bestWeeklyTransactions} transactions)</li>
                      <li>Weekly expenses: {formatCurrency(payrollTotal)} payroll + {formatCurrency(monthlyOverhead / 4)} overhead</li>
                      <li>COGS: {((bestWeeklyCosts / bestWeeklyRevenue) * 100).toFixed(1)}% of revenue</li>
                      <li>Gross margin: {((bestWeeklyMargin / bestWeeklyRevenue) * 100).toFixed(1)}%</li>
                      <li>This is an optimistic projection assuming consistent best-case performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Expense Analysis by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{formatCurrency(overheadTotal)}</div>
                  <div className="text-sm text-gray-600">Overhead ({((overheadTotal / (overheadTotal + payrollTotal + cogsTotal)) * 100).toFixed(1)}%)</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(payrollTotal)}</div>
                  <div className="text-sm text-gray-600">Payroll ({((payrollTotal / (overheadTotal + payrollTotal + cogsTotal)) * 100).toFixed(1)}%)</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{formatCurrency(cogsTotal)}</div>
                  <div className="text-sm text-gray-600">COGS ({((cogsTotal / (overheadTotal + payrollTotal + cogsTotal)) * 100).toFixed(1)}%)</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{formatCurrency(commissionsTotal)}</div>
                  <div className="text-sm text-gray-600">Commissions</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{formatCurrency(taxesTotal)}</div>
                  <div className="text-sm text-gray-600">Taxes</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">{formatCurrency(rebatesTotal)}</div>
                  <div className="text-sm text-gray-600">Rebates (Income)</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📅 Payment Distribution by Day</h2>
              <div className="space-y-2">
                {[1, 5, 10, 15, 20, 25, 30].map(day => {
                  const dayTotal = overhead
                    .filter(item => item.day === day)
                    .reduce((sum, item) => sum + item.amount, 0);
                  const hasPayroll = day === 5 || day === 20;
                  const total = dayTotal + (hasPayroll ? 25000 : 0);
                  
                  return (
                    <div key={day} className="flex items-center gap-4">
                      <div className="w-20 text-sm font-medium">Day {day}</div>
                      <div className="flex-1">
                        <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${total > 10000 ? 'bg-red-500' : total > 5000 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min((total / 40000) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-24 text-right text-sm font-medium">
                        {formatCurrency(total)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 2025 Performance Tab */}
        {activeTab === '2025-performance' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(monthlyData2025
                    .filter(m => m.month >= '2025-01' && m.month <= '2025-10')
                    .reduce((sum, m) => sum + m.revenue, 0))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Total COGS</div>
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(monthlyData2025
                    .filter(m => m.month >= '2025-01' && m.month <= '2025-10')
                    .reduce((sum, m) => sum + m.costs, 0))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Total Overhead</div>
                <div className="text-2xl font-bold text-red-600">
                  {(() => {
                    // Base overhead (without fixed marketing) + actual monthly marketing costs
                    const baseOverhead = 67567.14; // businessMetrics.monthlyOverhead - 50000
                    const totalMarketingCosts = monthlyData2025
                      .filter(m => m.month >= '2025-01' && m.month <= '2025-10')
                      .reduce((sum, m) => sum + (monthlyMarketingCosts[m.month] || 0), 0);
                    return formatCurrency((baseOverhead * 10) + totalMarketingCosts);
                  })()}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Net Profit</div>
                <div className="text-2xl font-bold text-green-600">
                  {(() => {
                    const filtered = monthlyData2025.filter(m => m.month >= '2025-01' && m.month <= '2025-10');
                    const totalMargin = filtered.reduce((sum, m) => sum + m.margin, 0);
                    const baseOverhead = 67567.14;
                    const totalMarketingCosts = filtered.reduce((sum, m) => sum + (monthlyMarketingCosts[m.month] || 0), 0);
                    const totalOverhead = (baseOverhead * 10) + totalMarketingCosts;
                    return formatCurrency(totalMargin - totalOverhead);
                  })()}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Net Margin %</div>
                <div className="text-2xl font-bold text-purple-600">
                  {(() => {
                    const filtered = monthlyData2025.filter(m => m.month >= '2025-01' && m.month <= '2025-10');
                    const totalRevenue = filtered.reduce((sum, m) => sum + m.revenue, 0);
                    const totalMargin = filtered.reduce((sum, m) => sum + m.margin, 0);
                    const baseOverhead = 67567.14;
                    const totalMarketingCosts = filtered.reduce((sum, m) => sum + (monthlyMarketingCosts[m.month] || 0), 0);
                    const totalOverhead = (baseOverhead * 10) + totalMarketingCosts;
                    const netProfit = totalMargin - totalOverhead;
                    return ((netProfit / totalRevenue) * 100).toFixed(2);
                  })()}%
                </div>
              </div>
            </div>

            {/* Consolidated Performance Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Monthly Performance Overview (Jan-Oct 2025)</h2>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-700">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-sm text-gray-700">COGS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-700">Overhead</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-700">Net Profit</span>
                </div>
              </div>

              {/* Chart */}
              <div className="space-y-6">
                {monthlyData2025
                  .filter(m => m.month >= '2025-01' && m.month <= '2025-10')
                  .map(month => {
                    // Variable overhead: base overhead + actual marketing cost for this month
                    const baseOverhead = 67567.14;
                    const marketingCost = monthlyMarketingCosts[month.month] || 0;
                    const overhead = baseOverhead + marketingCost;
                    const netProfit = month.margin - overhead;
                    const maxValue = Math.max(...monthlyData2025
                      .filter(m => m.month >= '2025-01' && m.month <= '2025-10')
                      .map(m => m.revenue));

                    return (
                      <div key={month.month} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-gray-900 w-24">
                            {month.monthName.split(' ')[0]}
                          </div>
                          <div className="text-xs text-gray-500">
                            {month.transactionCount} transactions
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          {/* Revenue Bar */}
                          <div className="flex items-center gap-2">
                            <div className="w-20 text-xs text-gray-600">Revenue</div>
                            <div className="flex-1">
                              <div className="h-7 bg-gray-100 rounded overflow-hidden relative">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-end px-2"
                                  style={{ width: `${(month.revenue / maxValue) * 100}%` }}
                                >
                                  <span className="text-white text-xs font-semibold">
                                    {formatCurrency(month.revenue)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* COGS Bar */}
                          <div className="flex items-center gap-2">
                            <div className="w-20 text-xs text-gray-600">COGS</div>
                            <div className="flex-1">
                              <div className="h-7 bg-gray-100 rounded overflow-hidden relative">
                                <div
                                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-end px-2"
                                  style={{ width: `${(month.costs / maxValue) * 100}%` }}
                                >
                                  <span className="text-white text-xs font-semibold">
                                    {formatCurrency(month.costs)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="w-16 text-xs text-gray-500 text-right">
                              {((month.costs / month.revenue) * 100).toFixed(1)}%
                            </div>
                          </div>

                          {/* Overhead Bar */}
                          <div className="flex items-center gap-2">
                            <div className="w-20 text-xs text-gray-600">Overhead</div>
                            <div className="flex-1">
                              <div className="h-7 bg-gray-100 rounded overflow-hidden relative">
                                <div
                                  className="h-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-end px-2"
                                  style={{ width: `${(overhead / maxValue) * 100}%` }}
                                >
                                  <span className="text-white text-xs font-semibold">
                                    {formatCurrency(overhead)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="w-16 text-xs text-gray-500 text-right">
                              {((overhead / month.revenue) * 100).toFixed(1)}%
                            </div>
                          </div>

                          {/* Net Profit Bar */}
                          <div className="flex items-center gap-2">
                            <div className="w-20 text-xs text-gray-600 font-semibold">Net Profit</div>
                            <div className="flex-1">
                              <div className="h-7 bg-gray-100 rounded overflow-hidden relative">
                                <div
                                  className={`h-full bg-gradient-to-r ${netProfit >= 0 ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} flex items-center justify-end px-2`}
                                  style={{ width: `${Math.abs(netProfit / maxValue) * 100}%` }}
                                >
                                  <span className="text-white text-xs font-semibold">
                                    {formatCurrency(netProfit)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="w-16 text-xs font-semibold text-gray-700 text-right">
                              {((netProfit / month.revenue) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Monthly Comparison Table */}
            <div className="bg-white rounded-xl p-6 shadow-sm overflow-x-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">📊 Detailed Monthly Breakdown</h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Month</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Revenue</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">COGS</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Gross Margin</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Overhead</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Net Profit</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Net %</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Trans.</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData2025
                    .filter(m => m.month >= '2025-01' && m.month <= '2025-10')
                    .map((month, index) => {
                      // Variable overhead: base overhead + actual marketing cost for this month
                      const baseOverhead = 67567.14;
                      const marketingCost = monthlyMarketingCosts[month.month] || 0;
                      const overhead = baseOverhead + marketingCost;
                      const netProfit = month.margin - overhead;
                      return (
                        <tr key={month.month} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">
                            {month.monthName.split(' ')[0]}
                          </td>
                          <td className="py-3 px-4 text-sm text-right text-gray-900">
                            {formatCurrency(month.revenue)}
                          </td>
                          <td className="py-3 px-4 text-sm text-right text-gray-900">
                            {formatCurrency(month.costs)}
                          </td>
                          <td className="py-3 px-4 text-sm text-right text-gray-900">
                            {formatCurrency(month.margin)}
                          </td>
                          <td className="py-3 px-4 text-sm text-right text-gray-900">
                            {formatCurrency(overhead)}
                          </td>
                          <td className={`py-3 px-4 text-sm text-right font-semibold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(netProfit)}
                          </td>
                          <td className="py-3 px-4 text-sm text-right text-gray-900">
                            {((netProfit / month.revenue) * 100).toFixed(2)}%
                          </td>
                          <td className="py-3 px-4 text-sm text-right text-gray-600">
                            {month.transactionCount}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-300 font-bold">
                    <td className="py-3 px-4 text-sm">Total</td>
                    <td className="py-3 px-4 text-sm text-right">
                      {formatCurrency(monthlyData2025
                        .filter(m => m.month >= '2025-01' && m.month <= '2025-10')
                        .reduce((sum, m) => sum + m.revenue, 0))}
                    </td>
                    <td className="py-3 px-4 text-sm text-right">
                      {formatCurrency(monthlyData2025
                        .filter(m => m.month >= '2025-01' && m.month <= '2025-10')
                        .reduce((sum, m) => sum + m.costs, 0))}
                    </td>
                    <td className="py-3 px-4 text-sm text-right">
                      {formatCurrency(monthlyData2025
                        .filter(m => m.month >= '2025-01' && m.month <= '2025-10')
                        .reduce((sum, m) => sum + m.margin, 0))}
                    </td>
                    <td className="py-3 px-4 text-sm text-right">
                      {(() => {
                        const filtered = monthlyData2025.filter(m => m.month >= '2025-01' && m.month <= '2025-10');
                        const baseOverhead = 67567.14;
                        const totalMarketingCosts = filtered.reduce((sum, m) => sum + (monthlyMarketingCosts[m.month] || 0), 0);
                        return formatCurrency((baseOverhead * 10) + totalMarketingCosts);
                      })()}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-green-600">
                      {(() => {
                        const filtered = monthlyData2025.filter(m => m.month >= '2025-01' && m.month <= '2025-10');
                        const totalMargin = filtered.reduce((sum, m) => sum + m.margin, 0);
                        const baseOverhead = 67567.14;
                        const totalMarketingCosts = filtered.reduce((sum, m) => sum + (monthlyMarketingCosts[m.month] || 0), 0);
                        const totalOverhead = (baseOverhead * 10) + totalMarketingCosts;
                        return formatCurrency(totalMargin - totalOverhead);
                      })()}
                    </td>
                    <td className="py-3 px-4 text-sm text-right">
                      {(() => {
                        const filtered = monthlyData2025.filter(m => m.month >= '2025-01' && m.month <= '2025-10');
                        const totalRevenue = filtered.reduce((sum, m) => sum + m.revenue, 0);
                        const totalMargin = filtered.reduce((sum, m) => sum + m.margin, 0);
                        const baseOverhead = 67567.14;
                        const totalMarketingCosts = filtered.reduce((sum, m) => sum + (monthlyMarketingCosts[m.month] || 0), 0);
                        const totalOverhead = (baseOverhead * 10) + totalMarketingCosts;
                        const netProfit = totalMargin - totalOverhead;
                        return ((netProfit / totalRevenue) * 100).toFixed(2);
                      })()}%
                    </td>
                    <td className="py-3 px-4 text-sm text-right">
                      {monthlyData2025
                        .filter(m => m.month >= '2025-01' && m.month <= '2025-10')
                        .reduce((sum, m) => sum + m.transactionCount, 0)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}