'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  businessMetrics,
  staticOverhead,
  samplePayroll,
  sampleDebts,
  monthlyMarketingCosts,
  weeklyPerformanceStats,
  monthlyPerformance2025,
  calculateForecast,
  calculateAdSpendFromJobs,
  getWeeklyFixedOverhead,
  getMonthlyFixedOverhead,
  novDecPerformance
} from '@/lib/data';
import {
  bankTransactions,
  BankTransaction,
  getCategories,
  getSources
} from '@/lib/bankTransactions';

type Tab = 'dashboard' | 'overhead' | 'payroll' | 'debt' | 'forecast' | '2025-performance' | 'bank-statements';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  // Handle URL hash routing for tabs
  useEffect(() => {
    // Set initial tab from URL hash
    const hash = window.location.hash.slice(1) as Tab;
    const validTabs: Tab[] = ['dashboard', 'overhead', 'payroll', 'debt', 'forecast', '2025-performance', 'bank-statements'];
    if (hash && validTabs.includes(hash)) {
      setActiveTab(hash);
    }

    // Listen for hash changes (back/forward navigation)
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1) as Tab;
      if (newHash && validTabs.includes(newHash)) {
        setActiveTab(newHash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL hash when tab changes
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  // Bank statements state
  const [transactions, setTransactions] = useState<BankTransaction[]>(bankTransactions);
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showOnlyCashInfusions, setShowOnlyCashInfusions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Forecast tool state - jobs is primary driver
  const [forecastJobsPerWeek, setForecastJobsPerWeek] = useState(73); // Default to actual avg
  const [forecastWeeks, setForecastWeeks] = useState(8);
  const [forecastAvgJobRevenue, setForecastAvgJobRevenue] = useState(weeklyPerformanceStats.avgRevenuePerJob);
  const [forecastMarginPercent, setForecastMarginPercent] = useState(weeklyPerformanceStats.marginPercent);
  const [includeOverhead, setIncludeOverhead] = useState(false); // Default OFF to match Performance tab

  // Calculate expected ad spend from jobs
  const expectedAdSpend = useMemo(() => {
    return calculateAdSpendFromJobs(forecastJobsPerWeek);
  }, [forecastJobsPerWeek]);

  // Get weekly and monthly overhead
  const weeklyOverhead = useMemo(() => getWeeklyFixedOverhead(), []);
  const monthlyOverhead = useMemo(() => getMonthlyFixedOverhead(), []);

  // Calculate forecast based on inputs
  const forecastResults = useMemo(() => {
    return calculateForecast(forecastJobsPerWeek, forecastWeeks, {
      avgJobRevenue: forecastAvgJobRevenue,
      marginPercent: forecastMarginPercent,
      includeOverhead: includeOverhead
    });
  }, [forecastJobsPerWeek, forecastWeeks, forecastAvgJobRevenue, forecastMarginPercent, includeOverhead]);

  // Calculate forecast totals (use last week's cumulative values)
  const forecastTotals = useMemo(() => {
    const lastWeek = forecastResults[forecastResults.length - 1];
    if (!lastWeek) return { jobs: 0, revenue: 0, grossMargin: 0, netProfit: 0, adSpend: 0, overhead: 0 };
    return {
      jobs: lastWeek.cumJobs,
      revenue: lastWeek.cumRevenue,
      grossMargin: lastWeek.cumGrossMargin,
      netProfit: lastWeek.cumNetProfit,
      adSpend: lastWeek.cumAdSpend,
      overhead: lastWeek.cumOverhead
    };
  }, [forecastResults]);

  // Load saved cash infusion selections from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cashInfusionSelections');
    if (saved) {
      const selections = JSON.parse(saved) as Record<string, boolean>;
      setTransactions(prev =>
        prev.map(t => ({
          ...t,
          isCashInfusion: selections[t.id] ?? t.isCashInfusion
        }))
      );
    }
  }, []);

  // Save cash infusion selections to localStorage
  const saveCashInfusionSelections = (updatedTransactions: BankTransaction[]) => {
    const selections: Record<string, boolean> = {};
    updatedTransactions.forEach(t => {
      if (t.isCashInfusion) {
        selections[t.id] = true;
      }
    });
    localStorage.setItem('cashInfusionSelections', JSON.stringify(selections));
  };

  // Toggle cash infusion status
  const toggleCashInfusion = (id: string) => {
    setTransactions(prev => {
      const updated = prev.map(t =>
        t.id === id ? { ...t, isCashInfusion: !t.isCashInfusion } : t
      );
      saveCashInfusionSelections(updated);
      return updated;
    });
  };

  // Filtered and sorted transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    if (sourceFilter !== 'all') {
      filtered = filtered.filter(t => t.source === sourceFilter);
    }
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }
    if (typeFilter !== 'all') {
      filtered = filtered.filter(t => t.type === typeFilter);
    }
    if (showOnlyCashInfusions) {
      filtered = filtered.filter(t => t.isCashInfusion);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(term)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortField === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortDirection === 'asc'
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
    });

    return filtered;
  }, [transactions, sourceFilter, categoryFilter, typeFilter, showOnlyCashInfusions, searchTerm, sortField, sortDirection]);

  // Calculate totals
  const totalCashInfusions = useMemo(() => {
    return transactions
      .filter(t => t.isCashInfusion)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  }, [transactions]);

  const filteredTotals = useMemo(() => {
    const deposits = filteredTransactions
      .filter(t => t.type === 'deposit')
      .reduce((sum, t) => sum + t.amount, 0);
    const withdrawals = filteredTransactions
      .filter(t => t.type === 'withdrawal')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    return { deposits, withdrawals, net: deposits - withdrawals };
  }, [filteredTransactions]);

  // Calculate cash infusions by month for performance reporting
  const cashInfusionsByMonth = useMemo(() => {
    const byMonth: { [key: string]: { total: number; items: { date: string; amount: number; description: string }[] } } = {};

    transactions
      .filter(t => t.isCashInfusion)
      .forEach(t => {
        const date = new Date(t.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!byMonth[monthKey]) {
          byMonth[monthKey] = { total: 0, items: [] };
        }

        byMonth[monthKey].total += Math.abs(t.amount);
        byMonth[monthKey].items.push({
          date: t.date,
          amount: Math.abs(t.amount),
          description: t.description
        });
      });

    return byMonth;
  }, [transactions]);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'overhead', label: 'Overhead' },
    { id: 'payroll', label: 'Payroll' },
    { id: 'debt', label: 'Debt' },
    { id: 'forecast', label: 'Forecast' },
    { id: '2025-performance', label: '2025 Performance' },
    { id: 'bank-statements', label: 'Bank Statements' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Auto Glass Cash Flow Management</h1>
          <p className="text-sm text-gray-500">Extreme Auto Glass LLC - Financial Dashboard</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Avg Monthly Revenue</h3>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(businessMetrics.avgMonthlyRevenue)}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Gross Margin</h3>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(businessMetrics.avgMonthlyGrossMargin)}</p>
                <p className="text-sm text-gray-500">{businessMetrics.grossMarginPercent}%</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Monthly Overhead</h3>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(businessMetrics.monthlyOverhead)}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Net Profit</h3>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(businessMetrics.netProfit)}</p>
                <p className="text-sm text-gray-500">{businessMetrics.netMarginPercent}% margin</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Transaction Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Transaction Size</span>
                    <span className="font-medium">{formatCurrency(businessMetrics.avgTransactionSize)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Transactions</span>
                    <span className="font-medium">{businessMetrics.monthlyTransactions}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Cash Infusions (Owner)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Marked</span>
                    <span className="font-medium text-purple-600">{formatCurrency(totalCashInfusions)}</span>
                  </div>
                  <p className="text-xs text-gray-500">Go to Bank Statements tab to mark cash infusion payments</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overhead Tab */}
        {activeTab === 'overhead' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Monthly Fixed Overhead</h2>
              <p className="text-sm text-gray-500">Total: {formatCurrency(staticOverhead.reduce((sum, item) => sum + item.amount, 0))}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Day</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Auto Pay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {staticOverhead.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.vendor}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.day}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">{formatCurrency(item.amount)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${item.autoPay ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {item.autoPay ? 'Yes' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payroll Tab */}
        {activeTab === 'payroll' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Weekly Payroll</h2>
              <p className="text-sm text-gray-500">Total Weekly: {formatCurrency(samplePayroll.reduce((sum, emp) => sum + emp.gross, 0))}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pay Frequency</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Gross Pay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {samplePayroll.map((emp, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{emp.employee}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.payDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">{formatCurrency(emp.gross)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Debt Tab */}
        {activeTab === 'debt' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Outstanding Debt</h2>
              <p className="text-sm text-gray-500">Total Balance: {formatCurrency(sampleDebts.reduce((sum, d) => sum + d.current, 0))}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Creditor</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Original</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Current</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Interest</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Min Payment</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Due Day</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sampleDebts.map((debt, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{debt.creditor}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">{formatCurrency(debt.original)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-red-600">{formatCurrency(debt.current)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">{debt.interest}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{formatCurrency(debt.minimum)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{debt.dueDay}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">{formatCurrency(debt.paid)}</td>
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
            {/* Real Performance Reference */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Actual Performance Data (Nov-Dec 2025)</h2>
              <p className="text-sm text-blue-600 mb-4">Based on real margin report data - 457 jobs over 44 days</p>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-gray-500">Avg Jobs/Week</p>
                  <p className="text-xl font-bold text-gray-900">72.7</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-gray-500">Avg Revenue/Job</p>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(690.51)}</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-gray-500">Margin %</p>
                  <p className="text-xl font-bold text-blue-600">57.8%</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-gray-500">Weekly Ad Spend</p>
                  <p className="text-xl font-bold text-red-600">~$15k</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-gray-500">Weekly Overhead</p>
                  <p className="text-xl font-bold text-orange-600">{formatCurrency(weeklyOverhead)}</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-gray-500">Cost per Job (Ads)</p>
                  <p className="text-xl font-bold text-purple-600">~$206</p>
                </div>
              </div>
            </div>

            {/* Interactive Forecast Controls */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-2">Job-Driven Forecast</h2>
              <p className="text-sm text-gray-500 mb-6">Set your target jobs per week - ad spend and other costs are calculated automatically</p>

              {/* Primary Control: Jobs Per Week */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-green-800 mb-2">
                      Jobs Per Week: <span className="text-3xl font-bold text-green-600">{forecastJobsPerWeek}</span>
                    </label>
                    <input
                      type="range"
                      min="40"
                      max="120"
                      step="1"
                      value={forecastJobsPerWeek}
                      onChange={(e) => setForecastJobsPerWeek(Number(e.target.value))}
                      className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                    <div className="flex justify-between text-xs text-green-600 mt-1">
                      <span>40 (Slow)</span>
                      <span>73 (Actual Avg)</span>
                      <span>120 (Aggressive)</span>
                    </div>
                  </div>
                  <div className="text-center md:text-right bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Required Ad Spend</p>
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(expectedAdSpend)}/wk</p>
                    <p className="text-xs text-gray-400">{formatCurrency(expectedAdSpend / forecastJobsPerWeek)}/job</p>
                  </div>
                </div>
              </div>

              {/* Secondary Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {/* Avg Revenue Per Job */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Avg Revenue/Job: <span className="text-blue-600 font-bold">{formatCurrency(forecastAvgJobRevenue)}</span>
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="900"
                    step="10"
                    value={forecastAvgJobRevenue}
                    onChange={(e) => setForecastAvgJobRevenue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>$500</span>
                    <span>$691</span>
                    <span>$900</span>
                  </div>
                </div>

                {/* Margin Percent */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Margin %: <span className="text-blue-600 font-bold">{forecastMarginPercent.toFixed(1)}%</span>
                  </label>
                  <input
                    type="range"
                    min="45"
                    max="65"
                    step="0.5"
                    value={forecastMarginPercent}
                    onChange={(e) => setForecastMarginPercent(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>45%</span>
                    <span>57.8%</span>
                    <span>65%</span>
                  </div>
                </div>

                {/* Forecast Weeks */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Forecast Period: <span className="text-blue-600 font-bold">{forecastWeeks} weeks</span>
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="16"
                    step="1"
                    value={forecastWeeks}
                    onChange={(e) => setForecastWeeks(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>4 wks</span>
                    <span>8 wks</span>
                    <span>16 wks</span>
                  </div>
                </div>

                {/* Include Overhead Toggle */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeOverhead}
                      onChange={(e) => setIncludeOverhead(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Include Fixed Overhead</span>
                  </label>
                  <p className="text-xs text-gray-500">
                    {includeOverhead ? `${formatCurrency(weeklyOverhead)}/week overhead included` : 'Overhead excluded from net profit'}
                  </p>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-500 mr-2">Presets:</span>
                <button
                  onClick={() => {
                    setForecastJobsPerWeek(50);
                    setForecastMarginPercent(55);
                  }}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 hover:bg-red-200"
                >
                  Conservative (50 jobs/wk)
                </button>
                <button
                  onClick={() => {
                    setForecastJobsPerWeek(73);
                    setForecastAvgJobRevenue(691);
                    setForecastMarginPercent(57.8);
                  }}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  Actual Avg (73 jobs/wk)
                </button>
                <button
                  onClick={() => {
                    setForecastJobsPerWeek(90);
                    setForecastMarginPercent(55);
                  }}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 hover:bg-green-200"
                >
                  Growth (90 jobs/wk)
                </button>
              </div>
            </div>

            {/* Forecast Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Jobs</h3>
                <p className="text-2xl font-bold text-gray-900">{forecastTotals.jobs}</p>
                <p className="text-xs text-gray-500">{forecastJobsPerWeek}/week</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(forecastTotals.revenue)}</p>
                <p className="text-xs text-gray-500">{formatCurrency(forecastTotals.revenue / forecastWeeks)}/week</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Gross Margin</h3>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(forecastTotals.grossMargin)}</p>
                <p className="text-xs text-gray-500">{forecastMarginPercent.toFixed(1)}% of revenue</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Ad Spend</h3>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(forecastTotals.adSpend)}</p>
                <p className="text-xs text-gray-500">{formatCurrency(forecastTotals.adSpend / forecastWeeks)}/week</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Overhead</h3>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(forecastTotals.overhead)}</p>
                <p className="text-xs text-gray-500">{formatCurrency(forecastTotals.overhead / forecastWeeks)}/week</p>
              </div>
              <div className={`rounded-lg shadow p-4 ${forecastTotals.netProfit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                <h3 className="text-sm font-medium text-gray-500">Net Profit</h3>
                <p className={`text-2xl font-bold ${forecastTotals.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(forecastTotals.netProfit)}
                </p>
                <p className="text-xs text-gray-500">{formatCurrency(forecastTotals.netProfit / forecastWeeks)}/week</p>
              </div>
            </div>

            {/* Weekly Forecast Table with Cumulative Totals */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Weekly Breakdown with Cumulative Totals</h3>
                <p className="text-sm text-gray-500">Net Profit = Gross Margin - Ad Spend - Fixed Overhead</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Week</th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Jobs</th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Revenue</th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Gross Margin</th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ad Spend</th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Overhead</th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">Net Profit</th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-blue-500 uppercase bg-blue-50">Cum. Jobs</th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-blue-500 uppercase bg-blue-50">Cum. Revenue</th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-blue-500 uppercase bg-blue-50">Cum. Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {forecastResults.map((week) => (
                      <tr key={week.week} className="hover:bg-gray-50">
                        <td className="px-3 py-3 text-sm font-medium text-gray-900">Week {week.week}</td>
                        <td className="px-3 py-3 text-sm text-right text-gray-900">{week.jobs}</td>
                        <td className="px-3 py-3 text-sm text-right text-green-600">{formatCurrency(week.revenue)}</td>
                        <td className="px-3 py-3 text-sm text-right text-blue-600">{formatCurrency(week.grossMargin)}</td>
                        <td className="px-3 py-3 text-sm text-right text-red-600">{formatCurrency(week.adSpend)}</td>
                        <td className="px-3 py-3 text-sm text-right text-orange-600">{formatCurrency(week.overhead)}</td>
                        <td className={`px-3 py-3 text-sm text-right font-medium ${week.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(week.netProfit)}
                        </td>
                        <td className="px-3 py-3 text-sm text-right text-blue-700 bg-blue-50 font-medium">{week.cumJobs}</td>
                        <td className="px-3 py-3 text-sm text-right text-blue-700 bg-blue-50">{formatCurrency(week.cumRevenue)}</td>
                        <td className={`px-3 py-3 text-sm text-right bg-blue-50 font-medium ${week.cumNetProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                          {formatCurrency(week.cumNetProfit)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-100 font-semibold">
                    <tr>
                      <td className="px-3 py-3 text-sm text-gray-900">Totals</td>
                      <td className="px-3 py-3 text-sm text-right text-gray-900">{forecastTotals.jobs}</td>
                      <td className="px-3 py-3 text-sm text-right text-green-600">{formatCurrency(forecastTotals.revenue)}</td>
                      <td className="px-3 py-3 text-sm text-right text-blue-600">{formatCurrency(forecastTotals.grossMargin)}</td>
                      <td className="px-3 py-3 text-sm text-right text-red-600">{formatCurrency(forecastTotals.adSpend)}</td>
                      <td className="px-3 py-3 text-sm text-right text-orange-600">{formatCurrency(forecastTotals.overhead)}</td>
                      <td className={`px-3 py-3 text-sm text-right ${forecastTotals.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(forecastTotals.netProfit)}
                      </td>
                      <td className="px-3 py-3 text-sm text-right text-blue-700 bg-blue-50">{forecastTotals.jobs}</td>
                      <td className="px-3 py-3 text-sm text-right text-blue-700 bg-blue-50">{formatCurrency(forecastTotals.revenue)}</td>
                      <td className={`px-3 py-3 text-sm text-right bg-blue-50 ${forecastTotals.netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                        {formatCurrency(forecastTotals.netProfit)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2025 Performance Tab */}
        {activeTab === '2025-performance' && (
          <div className="space-y-6">
            {/* YTD Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">YTD Jobs</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.jobs, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">YTD Revenue</h3>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.revenue, 0))}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">YTD Gross Margin</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.grossMargin, 0))}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">YTD Net Margin</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.netMargin, 0))}
                </p>
                <p className="text-xs text-gray-400">After ad spend</p>
              </div>
              <div className={`rounded-lg shadow p-4 ${
                Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.netMargin, 0) - (monthlyOverhead * Object.keys(monthlyPerformance2025).length) >= 0
                  ? 'bg-green-50 border-2 border-green-200'
                  : 'bg-red-50 border-2 border-red-200'
              }`}>
                <h3 className="text-sm font-medium text-gray-500">YTD Net Profit</h3>
                <p className={`text-2xl font-bold ${
                  Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.netMargin, 0) - (monthlyOverhead * Object.keys(monthlyPerformance2025).length) >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {formatCurrency(Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.netMargin, 0) - (monthlyOverhead * Object.keys(monthlyPerformance2025).length))}
                </p>
                <p className="text-xs text-gray-400">After overhead</p>
              </div>
              <div className="bg-purple-50 rounded-lg shadow p-4 border-2 border-purple-200">
                <h3 className="text-sm font-medium text-purple-700">YTD Cash Infusions</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(totalCashInfusions)}
                </p>
                <p className="text-xs text-purple-500">{transactions.filter(t => t.isCashInfusion).length} transactions</p>
              </div>
            </div>

            {/* Nov-Dec 2025 Highlight */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-4">Nov 1 - Dec 14, 2025 Actual Performance</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div>
                  <p className="text-sm text-blue-600">Total Jobs</p>
                  <p className="text-xl font-bold text-gray-900">{novDecPerformance.totalJobs}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Total Revenue</p>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(novDecPerformance.totalRevenue)}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Total Margin</p>
                  <p className="text-xl font-bold text-blue-600">{formatCurrency(novDecPerformance.totalMargin)}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Margin %</p>
                  <p className="text-xl font-bold text-gray-900">{novDecPerformance.marginPercent}%</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Avg Revenue/Job</p>
                  <p className="text-xl font-bold text-gray-900">{formatCurrency(novDecPerformance.avgJobRevenue)}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Avg Margin/Job</p>
                  <p className="text-xl font-bold text-gray-900">{formatCurrency(novDecPerformance.avgJobMargin)}</p>
                </div>
              </div>
            </div>

            {/* Monthly Performance Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold">2025 Monthly Performance</h2>
                <p className="text-sm text-gray-500">Complete breakdown by month including Nov-Dec actual data and cash infusions</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Jobs</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Revenue</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Gross Margin</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Margin %</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ad Spend</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Net Margin</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-orange-500 uppercase">Overhead</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Net Profit</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-purple-500 uppercase">Cash Infusion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(monthlyPerformance2025).map(([key, data]) => {
                      const infusion = cashInfusionsByMonth[key];
                      const netProfit = data.netMargin - monthlyOverhead;
                      return (
                        <tr key={key} className={`hover:bg-gray-50 ${key.includes('11') || key.includes('12') ? 'bg-blue-50' : ''}`}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{data.month}</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900">{data.jobs.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-right text-green-600">{formatCurrency(data.revenue)}</td>
                          <td className="px-4 py-3 text-sm text-right text-blue-600">{formatCurrency(data.grossMargin)}</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-600">{data.marginPercent.toFixed(1)}%</td>
                          <td className="px-4 py-3 text-sm text-right text-red-600">{formatCurrency(data.adSpend)}</td>
                          <td className={`px-4 py-3 text-sm text-right font-medium ${data.netMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(data.netMargin)}
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-orange-600">{formatCurrency(monthlyOverhead)}</td>
                          <td className={`px-4 py-3 text-sm text-right font-medium ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(netProfit)}
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-purple-600 font-medium">
                            {infusion ? formatCurrency(infusion.total) : '-'}
                            {infusion && <span className="text-xs text-purple-400 block">({infusion.items.length})</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-gray-100 font-semibold">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">YTD Total</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.jobs, 0).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-green-600">
                        {formatCurrency(Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.revenue, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-blue-600">
                        {formatCurrency(Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.grossMargin, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">
                        {(Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.grossMargin, 0) /
                          Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.revenue, 0) * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-red-600">
                        {formatCurrency(Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.adSpend, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-green-600">
                        {formatCurrency(Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.netMargin, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-orange-600">
                        {formatCurrency(monthlyOverhead * Object.keys(monthlyPerformance2025).length)}
                      </td>
                      <td className={`px-4 py-3 text-sm text-right ${
                        Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.netMargin, 0) - (monthlyOverhead * Object.keys(monthlyPerformance2025).length) >= 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {formatCurrency(Object.values(monthlyPerformance2025).reduce((sum, m) => sum + m.netMargin, 0) - (monthlyOverhead * Object.keys(monthlyPerformance2025).length))}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-purple-600">
                        {formatCurrency(totalCashInfusions)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Cash Infusion Details */}
            {totalCashInfusions > 0 && (
              <div className="bg-purple-50 rounded-lg shadow overflow-hidden border border-purple-200">
                <div className="px-6 py-4 border-b border-purple-200">
                  <h2 className="text-lg font-semibold text-purple-800">Cash Infusion Details</h2>
                  <p className="text-sm text-purple-600">Owner cash infusions marked in Bank Statements tab</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-purple-200">
                    <thead className="bg-purple-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-purple-700 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-purple-700 uppercase">Description</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-purple-700 uppercase">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-100">
                      {transactions
                        .filter(t => t.isCashInfusion)
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((t) => (
                          <tr key={t.id} className="hover:bg-purple-100/50">
                            <td className="px-4 py-3 text-sm text-gray-900">{formatDate(t.date)}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 max-w-md truncate">{t.description}</td>
                            <td className="px-4 py-3 text-sm text-right font-medium text-purple-600">{formatCurrency(Math.abs(t.amount))}</td>
                          </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-purple-100 font-semibold">
                      <tr>
                        <td className="px-4 py-3 text-sm text-purple-800" colSpan={2}>Total Cash Infusions</td>
                        <td className="px-4 py-3 text-sm text-right text-purple-800">{formatCurrency(totalCashInfusions)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* Marketing Costs Detail */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">2025 Monthly Marketing/Ad Spend</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ad Spend</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">% of Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(monthlyMarketingCosts).map(([month, cost]) => {
                      const totalSpend = Object.values(monthlyMarketingCosts).reduce((a, b) => a + b, 0);
                      return (
                        <tr key={month} className={`hover:bg-gray-50 ${month.includes('11') || month.includes('12') ? 'bg-blue-50' : ''}`}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {new Date(month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-red-600">{formatCurrency(cost)}</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-600">
                            {(cost / totalSpend * 100).toFixed(1)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">Total</td>
                      <td className="px-4 py-3 text-sm text-right font-bold text-red-600">
                        {formatCurrency(Object.values(monthlyMarketingCosts).reduce((a, b) => a + b, 0))}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-bold text-gray-600">100%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bank Statements Tab */}
        {activeTab === 'bank-statements' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Transactions</h3>
                <p className="text-2xl font-bold text-gray-900">{filteredTransactions.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Deposits</h3>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(filteredTotals.deposits)}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Withdrawals</h3>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(filteredTotals.withdrawals)}</p>
              </div>
              <div className="bg-purple-50 rounded-lg shadow p-4 border-2 border-purple-200">
                <h3 className="text-sm font-medium text-purple-700">Cash Infusions Marked</h3>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalCashInfusions)}</p>
                <p className="text-xs text-purple-500">{transactions.filter(t => t.isCashInfusion).length} transactions</p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Search</label>
                  <input
                    type="text"
                    placeholder="Search description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Source</label>
                  <select
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Sources</option>
                    {getSources().map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Categories</option>
                    {getCategories().map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="deposit">Deposits</option>
                    <option value="withdrawal">Withdrawals</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Sort By</label>
                  <select
                    value={`${sortField}-${sortDirection}`}
                    onChange={(e) => {
                      const [field, dir] = e.target.value.split('-') as ['date' | 'amount', 'asc' | 'desc'];
                      setSortField(field);
                      setSortDirection(dir);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="date-desc">Date (Newest)</option>
                    <option value="date-asc">Date (Oldest)</option>
                    <option value="amount-desc">Amount (High-Low)</option>
                    <option value="amount-asc">Amount (Low-High)</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showOnlyCashInfusions}
                      onChange={(e) => setShowOnlyCashInfusions(e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Cash Infusions Only</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-purple-800 mb-1">Mark Cash Infusion Payments</h3>
              <p className="text-sm text-purple-700">
                Use the checkboxes below to mark transactions that represent personal cash infusions back into the company.
                Look for Zelle payments to SEE-N-CLEAR AUTO GLASS LLC or similar company payments.
                Your selections are automatically saved.
              </p>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        Cash Infusion
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredTransactions.map((t) => (
                      <tr
                        key={t.id}
                        className={`hover:bg-gray-50 ${t.isCashInfusion ? 'bg-purple-50' : ''}`}
                      >
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={t.isCashInfusion}
                            onChange={() => toggleCashInfusion(t.id)}
                            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(t.date)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            t.source === 'Cash App'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {t.source}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 max-w-md truncate" title={t.description}>
                          {t.description}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {t.category}
                        </td>
                        <td className={`px-4 py-3 whitespace-nowrap text-sm text-right font-medium ${
                          t.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {t.type === 'deposit' ? '+' : ''}{formatCurrency(t.amount)}
                          {t.fee && <span className="text-xs text-gray-400 block">Fee: {formatCurrency(t.fee)}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredTransactions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No transactions match your filters
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
