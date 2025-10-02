'use client';

import { useState, useRef } from 'react';
import { formatCurrency } from '@/lib/utils';
import { 
  staticOverhead, 
  samplePayroll, 
  sampleDebts,
  sampleCOGS,
  sampleCommissions,
  sampleTaxes,
  sampleRebates,
  businessMetrics 
} from '@/lib/data';

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
  date: string;
  invoice: string;
  customer: string;
  part: string;
  cost: number;
  supplier: string;
  dueDate: string;
  status: string;
}

interface Commission {
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
  insurance: string;
  claim: string;
  customer: string;
  invoice: number;
  rate: number;
  amount: number;
  expectedDate: string;
  status: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentCash] = useState(45320);
  const [overhead] = useState<Payment[]>(staticOverhead);
  const [payroll] = useState(samplePayroll);
  const [debts] = useState(sampleDebts);
  const [cogs] = useState<COGSItem[]>(sampleCOGS);
  const [commissions] = useState<Commission[]>(sampleCommissions);
  const [taxes] = useState<Tax[]>(sampleTaxes);
  const [rebates] = useState<Rebate[]>(sampleRebates);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Calculate metrics
  const overheadTotal = overhead.reduce((sum, item) => sum + item.amount, 0);
  const payrollTotal = payroll.reduce((sum, item) => sum + item.net, 0);
  const debtTotal = debts.reduce((sum, item) => sum + item.current, 0);
  const cogsTotal = cogs.filter(item => item.status === "Pending").reduce((sum, item) => sum + item.cost, 0);
  const commissionsTotal = commissions.reduce((sum, item) => sum + item.total, 0);
  const taxesTotal = taxes.reduce((sum, item) => sum + item.due, 0);
  const rebatesTotal = rebates.reduce((sum, item) => sum + item.amount, 0);
  
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
      
      // Add payroll if due
      if (checkDay === 5 || checkDay === 20) {
        total += payroll
          .filter(p => p.payDate === checkDay)
          .reduce((sum, p) => sum + p.net, 0);
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
      
      // Add payroll if due
      if (checkDay === 5 || checkDay === 20) {
        const payrollTotal = payroll
          .filter(p => p.payDate === checkDay)
          .reduce((sum, p) => sum + p.net, 0);
        
        if (payrollTotal > 0) {
          payments.push({
            date: checkDate,
            name: `Payroll (${checkDay}th)`,
            amount: payrollTotal,
            category: 'Payroll',
            status: i === 0 ? 'Due Today' : `In ${i} days`
          });
        }
      }
    }
    
    return payments.sort((a, b) => a.date - b.date);
  }
  
  // Generate 30-day forecast data
  function generateForecastData() {
    const data = [];
    let balance = currentCash;
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      const dayOfMonth = date.getDate();
      
      // Add daily revenue
      balance += businessMetrics.avgMonthlyRevenue / 30;
      
      // Subtract expenses for that day
      overhead
        .filter(item => item.day === dayOfMonth)
        .forEach(item => {
          balance -= item.amount;
        });
      
      // Account for payroll
      if (dayOfMonth === 5 || dayOfMonth === 20) {
        balance -= 25000; // Approximate payroll
      }
      
      data.push({
        day: `${date.getMonth() + 1}/${date.getDate()}`,
        balance: Math.round(balance)
      });
    }
    
    return data;
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
  const forecastData = generateForecastData();

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
            {['dashboard', 'overhead', 'payroll', 'cogs', 'commissions', 'taxes', 'rebates', 'forecast', 'analysis'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-transparent text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab === 'cogs' ? 'COGS' : tab === 'taxes' ? 'TPT Taxes' : tab}
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
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Current Cash</div>
                <div className="text-3xl font-bold text-gray-900">{formatCurrency(currentCash)}</div>
                <div className="text-sm text-gray-600 mt-2">Updated: Today 9:00 AM</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Today's Obligations</div>
                <div className="text-3xl font-bold text-red-600">{formatCurrency(todaysDue)}</div>
                <div className="text-sm text-red-600 mt-2">{todaysDue > 0 ? 'Payments due' : 'No payments today'}</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Week Total Due</div>
                <div className="text-3xl font-bold text-gray-900">{formatCurrency(weeklyDue)}</div>
                <div className="text-sm text-gray-600 mt-2">{upcomingPayments.length} payments</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Month Total Due</div>
                <div className="text-3xl font-bold text-gray-900">
                  {formatCurrency(overheadTotal + payrollTotal + cogsTotal + commissionsTotal + taxesTotal)}
                </div>
                <div className="text-sm text-gray-600 mt-2">All categories</div>
              </div>
            </div>

            {/* Cash Flow Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Cash Flow Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">Overhead</div>
                  <div className="text-lg font-bold">{formatCurrency(overheadTotal)}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">Payroll</div>
                  <div className="text-lg font-bold">{formatCurrency(payrollTotal)}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">COGS</div>
                  <div className="text-lg font-bold">{formatCurrency(cogsTotal)}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">Commissions</div>
                  <div className="text-lg font-bold">{formatCurrency(commissionsTotal)}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">Taxes</div>
                  <div className="text-lg font-bold">{formatCurrency(taxesTotal)}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">Rebates</div>
                  <div className="text-lg font-bold text-green-600">-{formatCurrency(rebatesTotal)}</div>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="space-y-3">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>⚠️ Cash Flow Alert:</strong> Heavy payment concentration on the 15th ({formatCurrency(10797)}). Consider negotiating payment date changes.
                    </p>
                  </div>
                </div>
              </div>
              {currentCash < 10000 && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        <strong>🚨 Low Cash Warning:</strong> Current balance below $10,000 threshold.
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
              <p className="text-gray-600">Total Monthly: <strong>{formatCurrency(payrollTotal)}</strong></p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gross Pay</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taxes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Pay</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pay Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {payroll.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium">{item.employee}</td>
                      <td className="px-6 py-4 text-sm">{item.position}</td>
                      <td className="px-6 py-4 text-sm">{item.type}</td>
                      <td className="px-6 py-4 text-sm">{formatCurrency(item.gross)}</td>
                      <td className="px-6 py-4 text-sm">{formatCurrency(item.taxes)}</td>
                      <td className="px-6 py-4 text-sm font-bold">{formatCurrency(item.net)}</td>
                      <td className="px-6 py-4 text-sm">{item.payDate}th</td>
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

        {/* COGS Tab */}
        {activeTab === 'cogs' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">📦 Cost of Goods Sold</h2>
              <p className="text-gray-600">Pending Total: <strong>{formatCurrency(cogsTotal)}</strong></p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Part</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cogs.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{item.date}</td>
                      <td className="px-6 py-4 text-sm font-medium">{item.invoice}</td>
                      <td className="px-6 py-4 text-sm">{item.customer}</td>
                      <td className="px-6 py-4 text-sm">{item.part}</td>
                      <td className="px-6 py-4 text-sm font-bold">{formatCurrency(item.cost)}</td>
                      <td className="px-6 py-4 text-sm">{item.supplier}</td>
                      <td className="px-6 py-4 text-sm">{item.dueDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
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

        {/* Commissions Tab */}
        {activeTab === 'commissions' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">💵 Sales Commissions</h2>
              <p className="text-gray-600">Total Due: <strong>{formatCurrency(commissionsTotal)}</strong></p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales Rep</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bonus</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Payout</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {commissions.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium">{item.rep}</td>
                      <td className="px-6 py-4 text-sm">{item.period}</td>
                      <td className="px-6 py-4 text-sm">{formatCurrency(item.sales)}</td>
                      <td className="px-6 py-4 text-sm">{item.rate}%</td>
                      <td className="px-6 py-4 text-sm">{formatCurrency(item.commission)}</td>
                      <td className="px-6 py-4 text-sm">{formatCurrency(item.bonus)}</td>
                      <td className="px-6 py-4 text-sm font-bold">{formatCurrency(item.total)}</td>
                      <td className="px-6 py-4 text-sm">{item.payDate}th</td>
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
        {activeTab === 'rebates' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">💸 Insurance Rebates</h2>
              <p className="text-gray-600">Expected Income: <strong className="text-green-600">{formatCurrency(rebatesTotal)}</strong></p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Insurance Co</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claim #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rebate %</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rebate Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rebates.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium">{item.insurance}</td>
                      <td className="px-6 py-4 text-sm">{item.claim}</td>
                      <td className="px-6 py-4 text-sm">{item.customer}</td>
                      <td className="px-6 py-4 text-sm">{formatCurrency(item.invoice)}</td>
                      <td className="px-6 py-4 text-sm">{item.rate}%</td>
                      <td className="px-6 py-4 text-sm font-bold text-green-600">{formatCurrency(item.amount)}</td>
                      <td className="px-6 py-4 text-sm">{item.expectedDate}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
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

        {/* Forecast Tab */}
        {activeTab === 'forecast' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📈 Cash Flow Forecast</h2>
              <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 mb-4">30-Day Cash Flow Projection</p>
                  <div className="space-y-2">
                    {forecastData.slice(0, 5).map((item, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">{item.day}:</span> {formatCurrency(item.balance)}
                      </div>
                    ))}
                    <p className="text-xs text-gray-400 mt-2">... and {forecastData.length - 5} more days</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">Daily Cash Position Forecast</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Starting Balance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected Income</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Expenses</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ending Balance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {forecastData.slice(0, 7).map((item, index) => {
                      const dailyIncome = businessMetrics.avgMonthlyRevenue / 30;
                      const startBalance = index === 0 ? currentCash : forecastData[index - 1].balance;
                      const expenses = startBalance + dailyIncome - item.balance;
                      
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm">{item.day}</td>
                          <td className="px-6 py-4 text-sm">{formatCurrency(startBalance)}</td>
                          <td className="px-6 py-4 text-sm text-green-600">{formatCurrency(dailyIncome)}</td>
                          <td className="px-6 py-4 text-sm text-red-600">{formatCurrency(expenses)}</td>
                          <td className="px-6 py-4 text-sm font-bold">{formatCurrency(item.balance)}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              item.balance < 10000 ? 'bg-red-100 text-red-800' : 
                              item.balance < 25000 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-green-100 text-green-800'
                            }`}>
                              {item.balance < 10000 ? 'Critical' : item.balance < 25000 ? 'Low' : 'Healthy'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
      </main>
    </div>
  );
}