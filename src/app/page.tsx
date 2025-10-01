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
    { name: 'Sales Tax', amount: 2000, day: 30, category: 'Tax' }
  ]

  const today = new Date().getDate()
  const todayDue = overhead.filter(i => i.day === today).reduce((s, i) => s + i.amount, 0)
  const weekDue = overhead.filter(i => i.day >= today && i.day <= today + 7).reduce((s, i) => s + i.amount, 0)
  const monthTotal = overhead.reduce((s, i) => s + i.amount, 0)

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 py-4'>
          <h1 className='text-2xl font-bold'>💰 Cash Flow Management System</h1>
        </div>
      </header>

      <div className='max-w-7xl mx-auto px-4 py-6'>
        <div className='flex flex-wrap gap-2 mb-6'>
          <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'px-4 py-2 bg-blue-600 text-white rounded' : 'px-4 py-2 bg-gray-200 rounded'}>Dashboard</button>
          <button onClick={() => setActiveTab('overhead')} className={activeTab === 'overhead' ? 'px-4 py-2 bg-blue-600 text-white rounded' : 'px-4 py-2 bg-gray-200 rounded'}>Overhead</button>
          <button onClick={() => setActiveTab('payroll')} className={activeTab === 'payroll' ? 'px-4 py-2 bg-blue-600 text-white rounded' : 'px-4 py-2 bg-gray-200 rounded'}>Payroll</button>
        </div>
