/**
 * Utility functions for the Cash Flow Management System
 */

/**
 * Format a number as currency (USD)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format a date for display
 */
export function formatDate(date: Date, short = false): string {
  if (short) {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Calculate days until a given date
 */
export function daysUntil(date: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  const diffTime = date.getTime() - today.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get status based on days remaining
 */
export function getPaymentStatus(daysRemaining: number): {
  label: string;
  className: string;
} {
  if (daysRemaining < 0) {
    return { label: 'Overdue', className: 'bg-red-100 text-red-800' };
  } else if (daysRemaining === 0) {
    return { label: 'Due Today', className: 'bg-orange-100 text-orange-800' };
  } else if (daysRemaining <= 3) {
    return { label: `Due in ${daysRemaining}d`, className: 'bg-yellow-100 text-yellow-800' };
  } else {
    return { label: `In ${daysRemaining}d`, className: 'bg-gray-100 text-gray-800' };
  }
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}