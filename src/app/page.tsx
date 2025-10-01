/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [currentCash] = useState(45320)

  const overhead = [
    { name: 'Office Rent (1st)', amount: 1545.48, day: 1, category: 'Rent' },
    { name: 'SBA Loan', amount: 2268, day: 1, category: 'Debt' },
    { name: 'Brinx Security', amount: 44.99, day: 1, category: 'Security' },
    { name: 'Microsoft Office', amount: 6.78, day: 8, category: 'Software' },
    { name: 'Vonage', amount: 378, day: 8, category: 'Phone' },
    { name: 'Office Rent (10th)', amount: 1545.48, day: 10, category: 'Rent' },
    { name: 'Amur', amount: 1500, day: 10, category: 'Services' },
    { name: 'T-Mobile', amount: 600, day: 15, category: 'Phone' },
    { name: 'Marketing', amount: 5000, day: 15, category: 'Marketing' },
    { name: 'Kemper Insurance', amount: 3206.84, day: 15, category: 'Insurance' },
    { name: 'Channel', amount: 1809, day: 15, category: 'Services' },
    { name: 'Intuit/QB', amount: 106.72, day: 15, category: 'Software' },
    { name: 'Ally Bank', amount: 820, day: 19, category: 'Debt' },
    { name: 'Office Rent (20th)', amount: 1545.48, day: 20, category: 'Rent' },
    { name: 'American Family', amount: 2249.6, day: 20, category: 'Insurance' },
    { name: 'SRP', amount: 500, day: 21, category: 'Utilities' },
    { name: 'AC Service', amount: 322, day: 22, category: 'Maintenance' },
    { name: 'Glassbiller', amount: 2210, day: 25, category: 'Software' },
    { name: 'Ally Equipment', amount: 580, day: 25, category: 'Debt' },
    { name: 'Navatias', amount: 2400, day: 25, category: 'Services' },
    { name: 'Microsoft 365', amount: 113.25, day: 25, category: 'Software' },
    { name: 'Workers Comp', amount: 715.52, day: 26, category: 'Insurance' },
    { name: 'Cox Internet', amount: 500, day: 27, category: 'Utilities' },
    { name: 'Ally Vehicle', amount: 600, day: 27, category: 'Debt' },
    { name: 'Sales Tax', amount: 2000, day: 30, category: 'Tax' }
  ]

  const today = new Date().getDate()
  const todayDue = overhead.filter(i => i.day === today).reduce((s, i) => s + i.amount, 0)
  const weekDue = overhead.filter(i => i.day >= today && i.day <= today + 7).reduce((s, i) => s + i.amount, 0)
  const monthTotal = overhead.reduce((s, i) => s + i.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">💰 Cash Flow Management System</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {['Dashboard', 'Overhead', 'Payroll', 'COGS', 'Forecast'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 py-2 rounded font-medium ${
                activeTab === tab.toLowerCase() 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600">Current Cash</p>
                <p className="text-3xl font-bold">${currentCash.toLocaleString()}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600">Today's Due</p>
                <p className="text-3xl font-bold text-red-600">${todayDue.toLocaleString()}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600">Week Total</p>
                <p className="text-3xl font-bold text-orange-600">${weekDue.toLocaleString()}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600">Month Total</p>
                <p className="text-3xl font-bold text-blue-600">${monthTotal.toFixed(2)}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">⚠️ Alerts</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p>Heavy payment concentration on day 15: $10,797</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Upcoming Payments</h2>
              <div className="space-y-2">
                {overhead
                  .filter(item => item.day >= today && item.day <= today + 7)
                  .slice(0, 5)
                  .map((item, i) => (
                    <div key={i} className="flex justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Day {item.day}</p>
                      </div>
                      <p className="font-bold text-red-600">${item.amount.toLocaleString()}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'overhead' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Monthly Overhead - Total: $32,641.64</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Day</th>
                    <th className="px-4 py-2 text-left">Payment</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-right">Amount</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {overhead.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{item.day}</td>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.category}</td>
                      <td className="px-4 py-2 text-right">${item.amount.toFixed(2)}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.day < today ? 'bg-green-100 text-green-800' :
                          item.day === today ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.day < today ? 'Paid' : item.day === today ? 'Due Today' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payroll' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Payroll Schedule</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">5th - Operations</h3>
                <p className="text-2xl font-bold">$16,040</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">20th - Admin</h3>
                <p className="text-2xl font-bold">$9,318</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cogs' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Cost of Goods Sold</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="text-sm text-gray-600">Monthly Average</h3>
                <p className="text-2xl font-bold">$45,000</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-sm text-gray-600">Pending</h3>
                <p className="text-2xl font-bold text-orange-600">$12,450</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-sm text-gray-600">Net Terms</h3>
                <p className="text-2xl font-bold">Net 30</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'forecast' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">30-Day Forecast</h2>
            <div className="space-y-4">
              <div className="flex justify-between p-3 bg-green-50 rounded">
                <span>Expected Income</span>
                <span className="font-bold text-green-600">+$272,316</span>
              </div>
              <div className="flex justify-between p-3 bg-red-50 rounded">
                <span>Total Expenses</span>
                <span className="font-bold text-red-600">-$162,108</span>
              </div>
              <div className="flex justify-between p-3 bg-blue-50 rounded border-t-2 border-blue-400">
                <span className="font-bold">Net Cash Flow</span>
                <span className="font-bold text-blue-600">+$110,208</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
