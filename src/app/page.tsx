'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { 
  staticOverhead, 
  samplePayroll, 
  sampleDebts, 
  businessMetrics 
} from '@/lib/data';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentCash] = useState(45320);
  
  // Calculate metrics
  const overheadTotal = staticOverhead.reduce((sum, item) => sum + item.amount, 0);
  const payrollTotal = samplePayroll.reduce((sum, item) => sum + item.net, 0);
  const debtTotal = sampleDebts.reduce((sum, item) => sum + item.current, 0);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            💰 Auto Glass Cash Flow Management System
          </h1>
        </div>
      </header>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'bg-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('overhead')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'overhead'
                  ? 'bg-blue-600 text-white'
                  : 'bg-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              Overhead
            </button>
            <button
              onClick={() => setActiveTab('payroll')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'payroll'
                  ? 'bg-blue-600 text-white'
                  : 'bg-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              Payroll
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Current Cash</div>
                <div className="text-3xl font-bold text-gray-900">{formatCurrency(currentCash)}</div>
                <div className="text-sm text-gray-600 mt-2">Updated today</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Monthly Overhead</div>
                <div className="text-3xl font-bold text-gray-900">{formatCurrency(overheadTotal)}</div>
                <div className="text-sm text-gray-600 mt-2">Fixed expenses</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Monthly Revenue</div>
                <div className="text-3xl font-bold text-green-600">{formatCurrency(businessMetrics.avgMonthlyRevenue)}</div>
                <div className="text-sm text-gray-600 mt-2">Average</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 uppercase mb-2">Net Profit</div>
                <div className="text-3xl font-bold text-green-600">{formatCurrency(businessMetrics.netProfit)}</div>
                <div className="text-sm text-gray-600 mt-2">40.5% margin</div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Cash Flow Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Overhead</div>
                  <div className="text-xl font-bold">{formatCurrency(overheadTotal)}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Payroll</div>
                  <div className="text-xl font-bold">{formatCurrency(payrollTotal)}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Total Debt</div>
                  <div className="text-xl font-bold">{formatCurrency(debtTotal)}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Gross Margin</div>
                  <div className="text-xl font-bold">{businessMetrics.grossMarginPercent}%</div>
                </div>
              </div>
            </div>

            {/* Alert */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Payment Concentration Alert:</strong> Heavy payments on the 15th of each month. Consider spreading payment dates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'overhead' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Fixed Monthly Overhead</h2>
              <p className="text-gray-600">Total: {formatCurrency(overheadTotal)}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auto-Pay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {staticOverhead.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{item.day}</td>
                      <td className="px-6 py-4 text-sm font-medium">{item.name}</td>
                      <td className="px-6 py-4 text-sm font-bold">{formatCurrency(item.amount)}</td>
                      <td className="px-6 py-4 text-sm">{item.category}</td>
                      <td className="px-6 py-4 text-sm">{item.autoPay ? '✓' : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payroll' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Payroll Schedule</h2>
              <p className="text-gray-600">Total Monthly: {formatCurrency(payrollTotal)}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gross</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pay Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {samplePayroll.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium">{item.employee}</td>
                      <td className="px-6 py-4 text-sm">{item.position}</td>
                      <td className="px-6 py-4 text-sm">{formatCurrency(item.gross)}</td>
                      <td className="px-6 py-4 text-sm font-bold">{formatCurrency(item.net)}</td>
                      <td className="px-6 py-4 text-sm">{item.payDate}th</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}