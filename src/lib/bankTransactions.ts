// Bank transaction data extracted from PDF statements
// Two accounts: Cash App (Cash Lesueur) and Bank of America (William Cash Lesueur)

export interface BankTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  source: 'Cash App' | 'Bank of America';
  category: string;
  fee?: number;
  isCashInfusion: boolean;
}

// Helper to generate unique IDs
const genId = (source: string, date: string, idx: number) =>
  `${source.toLowerCase().replace(/\s/g, '-')}-${date}-${idx}`;

export const bankTransactions: BankTransaction[] = [
  // ============================================
  // CASH APP TRANSACTIONS - March 2025
  // ============================================
  { id: genId('cashapp', '2025-03-02', 1), date: '2025-03-02', description: 'To Melissa Diaz from Bank of America x8532', amount: -105.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-03-06', 1), date: '2025-03-06', description: 'From Lacy Estrada', amount: 200.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-03-06', 2), date: '2025-03-06', description: 'To Visa Debit 8532 x8532 - Instant transfer', amount: -225.00, type: 'withdrawal', source: 'Cash App', category: 'Transfer', fee: 3.94, isCashInfusion: false },
  { id: genId('cashapp', '2025-03-13', 1), date: '2025-03-13', description: 'To Jesse Mostrales from Bank of America x8532', amount: -425.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-03-13', 2), date: '2025-03-13', description: 'To Alison Farmer from Bank of America x8532', amount: -40.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-03-13', 3), date: '2025-03-13', description: 'To Matthew Smith from Bank of America x8532', amount: -600.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-03-16', 1), date: '2025-03-16', description: 'To Alison Farmer from Bank of America x8532', amount: -35.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-03-18', 1), date: '2025-03-18', description: 'To Alison Farmer from Bank of America x8532', amount: -10.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-03-19', 1), date: '2025-03-19', description: 'From Shelly Miller', amount: 340.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-03-20', 1), date: '2025-03-20', description: 'To Nicole Lesueur', amount: -200.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-03-24', 1), date: '2025-03-24', description: 'To Visa Debit 8532 x8532 - Instant transfer', amount: -140.00, type: 'withdrawal', source: 'Cash App', category: 'Transfer', fee: 2.45, isCashInfusion: false },
  { id: genId('cashapp', '2025-03-25', 1), date: '2025-03-25', description: 'To Lacy Estrada from Bank of America x8532', amount: -20.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-03-28', 1), date: '2025-03-28', description: 'To A. Peoples from Bank of America x8532', amount: -100.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-03-29', 1), date: '2025-03-29', description: 'To Jesse Mostrales from Bank of America x8532', amount: -600.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },

  // ============================================
  // CASH APP TRANSACTIONS - April 2025
  // ============================================
  { id: genId('cashapp', '2025-04-02', 1), date: '2025-04-02', description: 'From Jesse Mostrales', amount: 600.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-03', 1), date: '2025-04-03', description: 'To Visa Debit 5391 x5391 - Instant transfer', amount: -600.00, type: 'withdrawal', source: 'Cash App', category: 'Transfer', fee: 10.50, isCashInfusion: false },
  { id: genId('cashapp', '2025-04-11', 1), date: '2025-04-11', description: 'To Jesse Mostrales from Chase Bank x5391', amount: -300.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-11', 2), date: '2025-04-11', description: 'From Nicole Lesueur', amount: 500.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-12', 1), date: '2025-04-12', description: 'To Marc Mendelsohn', amount: -100.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-12', 2), date: '2025-04-12', description: 'To Tony Bradford', amount: -100.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-12', 3), date: '2025-04-12', description: 'To Jessica Herrera', amount: -175.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-15', 1), date: '2025-04-15', description: 'To Thbeuesiwhsb', amount: -100.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-16', 1), date: '2025-04-16', description: 'From Shelly Miller', amount: 340.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-21', 1), date: '2025-04-21', description: 'To Griffin Granberg', amount: -100.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-21', 2), date: '2025-04-21', description: 'To Lacy Estrada', amount: -65.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-21', 3), date: '2025-04-21', description: 'To Lacy Estrada', amount: -200.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-21', 4), date: '2025-04-21', description: 'To Lacy Estrada from Chase Bank x5391', amount: -10.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-24', 1), date: '2025-04-24', description: 'To Guera from Wells Fargo Bank x0668', amount: -560.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-24', 2), date: '2025-04-24', description: 'To Thbeuesiwhsb from Wells Fargo Bank x0668', amount: -40.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-24', 3), date: '2025-04-24', description: 'To Nicole Lesueur from Wells Fargo Bank x0668', amount: -300.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-24', 4), date: '2025-04-24', description: 'To Nicole Lesueur from Wells Fargo Bank x0668', amount: -270.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-26', 1), date: '2025-04-26', description: 'To Nicole Lesueur from Wells Fargo Bank x0668', amount: -100.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-26', 2), date: '2025-04-26', description: 'To Nicole Lesueur from Wells Fargo Bank x0668', amount: -255.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-26', 3), date: '2025-04-26', description: 'To Nicole Lesueur from Bank of America x3575', amount: -80.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-27', 1), date: '2025-04-27', description: 'To Aaron Portwood from Bank of America x3575', amount: -40.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-28', 1), date: '2025-04-28', description: 'To Lacy Estrada from Wells Fargo Bank x0668', amount: -205.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-28', 2), date: '2025-04-28', description: 'To Lacy Estrada from Wells Fargo Bank x0668', amount: -5.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-04-29', 1), date: '2025-04-29', description: 'To Lori Bishop from Wells Fargo Bank x0668', amount: -120.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },

  // ============================================
  // CASH APP TRANSACTIONS - May 2025
  // ============================================
  { id: genId('cashapp', '2025-05-02', 1), date: '2025-05-02', description: 'To Nicole Lesueur from Wells Fargo Bank x0668', amount: -300.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-02', 2), date: '2025-05-02', description: 'From Nicole Lesueur', amount: 300.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-02', 3), date: '2025-05-02', description: 'To Visa Debit 3575 x3575 - Instant transfer', amount: -300.00, type: 'withdrawal', source: 'Cash App', category: 'Transfer', fee: 5.25, isCashInfusion: false },
  { id: genId('cashapp', '2025-05-02', 4), date: '2025-05-02', description: 'To Jessica Ruiz from Bank of America x3575', amount: -935.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-02', 5), date: '2025-05-02', description: 'To Jessica Ruiz from Bank of America x3575', amount: -17.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-03', 1), date: '2025-05-03', description: 'To Nicole Lesueur from Wells Fargo Bank x0668', amount: -250.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-03', 2), date: '2025-05-03', description: 'To Nicole Lesueur from Wells Fargo Bank x0668', amount: -550.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-03', 3), date: '2025-05-03', description: 'To Lacy Estrada from Wells Fargo Bank x0668', amount: -15.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-05', 1), date: '2025-05-05', description: 'To Lacy Estrada from Wells Fargo Bank x0668', amount: -285.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-05', 2), date: '2025-05-05', description: 'To Nicole Lesueur from Wells Fargo Bank x0668', amount: -105.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-05', 3), date: '2025-05-05', description: 'To Nicole Lesueur from Wells Fargo Bank x0668', amount: -60.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-05', 4), date: '2025-05-05', description: 'To Nicole Lesueur from Wells Fargo Bank x0668', amount: -60.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-06', 1), date: '2025-05-06', description: 'To Griffin Granberg from Bank of America x3575', amount: -600.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-07', 1), date: '2025-05-07', description: 'To Lacy Estrada from Wells Fargo Bank x0668', amount: -255.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-07', 2), date: '2025-05-07', description: 'To Nicole Lesueur from Wells Fargo Bank x0668', amount: -500.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-08', 1), date: '2025-05-08', description: 'To Lacy Estrada from Wells Fargo Bank x0668', amount: -365.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-08', 2), date: '2025-05-08', description: 'To Griffin Granberg from Wells Fargo Bank x0668', amount: -500.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-09', 1), date: '2025-05-09', description: 'From Nicole Lesueur', amount: 1500.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-09', 2), date: '2025-05-09', description: 'To Visa Debit 3575 x3575 - Instant transfer', amount: -1500.00, type: 'withdrawal', source: 'Cash App', category: 'Transfer', fee: 26.25, isCashInfusion: false },
  { id: genId('cashapp', '2025-05-09', 3), date: '2025-05-09', description: 'To Lacy Estrada from Bank of America x3575', amount: -422.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-09', 4), date: '2025-05-09', description: 'To Griffin Granberg from Wells Fargo Bank x0668', amount: -500.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-09', 5), date: '2025-05-09', description: 'To Fernando Diaz from Wells Fargo Bank x0668', amount: -265.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-10', 1), date: '2025-05-10', description: 'To Matthew Turner from Wells Fargo Bank x0668', amount: -260.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-13', 1), date: '2025-05-13', description: 'To Nicole Lesueur from Wells Fargo Bank x0668', amount: -155.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-13', 2), date: '2025-05-13', description: 'To Guera from Wells Fargo Bank x0668', amount: -111.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-14', 1), date: '2025-05-14', description: 'From Shelly Miller', amount: 340.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-16', 1), date: '2025-05-16', description: 'To Jesse Mostrales', amount: -222.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-16', 2), date: '2025-05-16', description: 'To Koalaty Marketing', amount: -118.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-16', 3), date: '2025-05-16', description: 'To Koalaty Marketing from Wells Fargo Bank x0668', amount: -122.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-18', 1), date: '2025-05-18', description: 'To Jacob Jiron from Wells Fargo Bank x0668', amount: -200.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-22', 1), date: '2025-05-22', description: 'To Jesse Mostrales from Wells Fargo Bank x0668', amount: -50.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-22', 2), date: '2025-05-22', description: 'To Griffin Granberg from Wells Fargo Bank x0668', amount: -1300.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-25', 1), date: '2025-05-25', description: 'To Abra May from Wells Fargo Bank x0668', amount: -100.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-26', 1), date: '2025-05-26', description: 'To Nicole Lesueur from Wells Fargo Bank x0668', amount: -680.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-05-27', 1), date: '2025-05-27', description: 'To Nicole Lesueur from Wells Fargo Bank x0668', amount: -1060.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },

  // ============================================
  // BANK OF AMERICA TRANSACTIONS - Feb 25 to Mar 25, 2025
  // ============================================
  // Deposits
  { id: genId('bofa', '2025-02-26', 1), date: '2025-02-26', description: 'RETURN OF POSTED CHECK / ITEM (RECEIVED ON 02-25)', amount: 1188.02, type: 'deposit', source: 'Bank of America', category: 'Check Return', isCashInfusion: false },
  { id: genId('bofa', '2025-02-27', 1), date: '2025-02-27', description: 'Online Banking transfer from SAV 6970', amount: 100.00, type: 'deposit', source: 'Bank of America', category: 'Transfer', isCashInfusion: false },
  { id: genId('bofa', '2025-02-28', 1), date: '2025-02-28', description: 'Online Banking transfer from SAV 6970', amount: 1222.22, type: 'deposit', source: 'Bank of America', category: 'Transfer', isCashInfusion: false },
  { id: genId('bofa', '2025-03-03', 1), date: '2025-03-03', description: 'Online Banking transfer from SAV 6970', amount: 222.22, type: 'deposit', source: 'Bank of America', category: 'Transfer', isCashInfusion: false },
  { id: genId('bofa', '2025-03-03', 2), date: '2025-03-03', description: 'Online Banking transfer from SAV 6970', amount: 112.00, type: 'deposit', source: 'Bank of America', category: 'Transfer', isCashInfusion: false },
  { id: genId('bofa', '2025-03-04', 1), date: '2025-03-04', description: 'RETURN OF POSTED CHECK / ITEM (RECEIVED ON 03-03)', amount: 1188.02, type: 'deposit', source: 'Bank of America', category: 'Check Return', isCashInfusion: false },
  { id: genId('bofa', '2025-03-04', 2), date: '2025-03-04', description: 'Online Banking transfer from SAV 6970', amount: 550.00, type: 'deposit', source: 'Bank of America', category: 'Transfer', isCashInfusion: false },
  { id: genId('bofa', '2025-03-06', 1), date: '2025-03-06', description: 'CASH APP*CASH PMNT RCVD - Oakland CA', amount: 221.06, type: 'deposit', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },
  { id: genId('bofa', '2025-03-10', 1), date: '2025-03-10', description: 'BOFA FIN CTR DEPOSIT - Queen Creek AZ', amount: 3800.00, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },
  { id: genId('bofa', '2025-03-10', 2), date: '2025-03-10', description: 'BOFA FIN CTR DEPOSIT - Queen Creek AZ', amount: 490.92, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },
  { id: genId('bofa', '2025-03-24', 1), date: '2025-03-24', description: 'CASH APP*CASH PMNT RCVD - Oakland CA', amount: 137.55, type: 'deposit', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },

  // Withdrawals - Debit Card
  { id: genId('bofa', '2025-02-25', 1), date: '2025-02-25', description: 'SAGE COUNSELING INC', amount: -44.00, type: 'withdrawal', source: 'Bank of America', category: 'Health', isCashInfusion: false },
  { id: genId('bofa', '2025-02-26', 2), date: '2025-02-26', description: 'SHEFFIELD FINANCIAL LLC', amount: -3000.00, type: 'withdrawal', source: 'Bank of America', category: 'Financial', isCashInfusion: false },
  { id: genId('bofa', '2025-02-26', 3), date: '2025-02-26', description: 'SHEFFIELD FINANCIAL LLC', amount: -600.00, type: 'withdrawal', source: 'Bank of America', category: 'Financial', isCashInfusion: false },
  { id: genId('bofa', '2025-03-03', 3), date: '2025-03-03', description: 'SHEFFIELD FINANCIAL LLC', amount: -1164.93, type: 'withdrawal', source: 'Bank of America', category: 'Financial', isCashInfusion: false },
  { id: genId('bofa', '2025-03-03', 4), date: '2025-03-03', description: 'PMNT SENT CASH APP*CASH LESUEUR Oakland CA', amount: -105.00, type: 'withdrawal', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },
  { id: genId('bofa', '2025-03-05', 1), date: '2025-03-05', description: 'IC* INSTACART', amount: -503.82, type: 'withdrawal', source: 'Bank of America', category: 'Groceries', isCashInfusion: false },
  { id: genId('bofa', '2025-03-11', 1), date: '2025-03-11', description: 'Google ADS', amount: -3748.99, type: 'withdrawal', source: 'Bank of America', category: 'Marketing', isCashInfusion: false },
  { id: genId('bofa', '2025-03-14', 1), date: '2025-03-14', description: 'PMNT SENT CASH APP*CASH LESUEUR Oakland CA', amount: -425.00, type: 'withdrawal', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },
  { id: genId('bofa', '2025-03-14', 2), date: '2025-03-14', description: 'PMNT SENT CASH APP*CASH LESUEUR Oakland CA', amount: -40.00, type: 'withdrawal', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },
  { id: genId('bofa', '2025-03-14', 3), date: '2025-03-14', description: 'PMNT SENT CASH APP*CASH LESUEUR Oakland CA', amount: -600.00, type: 'withdrawal', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },
  { id: genId('bofa', '2025-03-17', 1), date: '2025-03-17', description: 'PMNT SENT CASH APP*CASH LESUEUR Oakland CA', amount: -35.00, type: 'withdrawal', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },
  { id: genId('bofa', '2025-03-18', 1), date: '2025-03-18', description: 'IC* INSTACART', amount: -471.21, type: 'withdrawal', source: 'Bank of America', category: 'Groceries', isCashInfusion: false },
  { id: genId('bofa', '2025-03-19', 1), date: '2025-03-19', description: 'PMNT SENT CASH APP*CASH LESUEUR Oakland CA', amount: -10.00, type: 'withdrawal', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },
  { id: genId('bofa', '2025-03-20', 1), date: '2025-03-20', description: 'SAGE COUNSELING INC', amount: -132.00, type: 'withdrawal', source: 'Bank of America', category: 'Health', isCashInfusion: false },
  { id: genId('bofa', '2025-03-24', 2), date: '2025-03-24', description: 'WE-KO-PA CAS FORT MCDOWELL', amount: -1003.00, type: 'withdrawal', source: 'Bank of America', category: 'ATM Withdrawal', isCashInfusion: false },
  { id: genId('bofa', '2025-03-24', 3), date: '2025-03-24', description: 'WE-KO-PA CAS FORT MCDOWELL', amount: -1003.00, type: 'withdrawal', source: 'Bank of America', category: 'ATM Withdrawal', isCashInfusion: false },
  { id: genId('bofa', '2025-03-24', 4), date: '2025-03-24', description: 'WE-KO-PA CAS FORT MCDOWELL', amount: -183.00, type: 'withdrawal', source: 'Bank of America', category: 'ATM Withdrawal', isCashInfusion: false },
  { id: genId('bofa', '2025-03-25', 1), date: '2025-03-25', description: 'JARS MESA', amount: -403.50, type: 'withdrawal', source: 'Bank of America', category: 'ATM Withdrawal', isCashInfusion: false },

  // Zelle Payments (Other subtractions)
  { id: genId('bofa', '2025-03-11', 2), date: '2025-03-11', description: 'Zelle payment to Tony Casteneda - Thanks', amount: -320.58, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-03-24', 5), date: '2025-03-24', description: 'Zelle payment to Babydoll', amount: -40.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-03-25', 2), date: '2025-03-25', description: 'Zelle payment to Branden Davenport - Toy Hauler March 2025 Payment and Insurance', amount: -567.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-03-25', 3), date: '2025-03-25', description: 'Zelle payment to Babydoll', amount: -122.22, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-03-25', 4), date: '2025-03-25', description: 'Zelle payment to SEE-N-CLEAR AUTO GLASS LLC - Thanks', amount: -565.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: true }, // Likely cash infusion to company

  // ============================================
  // BANK OF AMERICA TRANSACTIONS - Mar 26 to Apr 24, 2025
  // ============================================
  // Deposits
  { id: genId('bofa', '2025-03-26', 1), date: '2025-03-26', description: 'Online Banking transfer from SAV 6970', amount: 1000.00, type: 'deposit', source: 'Bank of America', category: 'Transfer', isCashInfusion: false },
  { id: genId('bofa', '2025-03-31', 1), date: '2025-03-31', description: 'Online Banking transfer from SAV 6970', amount: 1300.00, type: 'deposit', source: 'Bank of America', category: 'Transfer', isCashInfusion: false },
  { id: genId('bofa', '2025-03-31', 2), date: '2025-03-31', description: 'Online Banking transfer from SAV 6970', amount: 1000.00, type: 'deposit', source: 'Bank of America', category: 'Transfer', isCashInfusion: false },
  { id: genId('bofa', '2025-04-14', 1), date: '2025-04-14', description: 'BKOFAMERICA ATM DEPOSIT - QUEEN CREEK AZ', amount: 3500.00, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },
  { id: genId('bofa', '2025-04-14', 2), date: '2025-04-14', description: 'Online Banking transfer from SAV 6970', amount: 3000.00, type: 'deposit', source: 'Bank of America', category: 'Transfer', isCashInfusion: false },
  { id: genId('bofa', '2025-04-14', 3), date: '2025-04-14', description: 'Online Banking transfer from SAV 6970', amount: 800.00, type: 'deposit', source: 'Bank of America', category: 'Transfer', isCashInfusion: false },
  { id: genId('bofa', '2025-04-21', 1), date: '2025-04-21', description: 'BKOFAMERICA ATM DEPOSIT - QUEEN CREEK AZ', amount: 1150.00, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },
  { id: genId('bofa', '2025-04-21', 2), date: '2025-04-21', description: 'Online Banking transfer from SAV 6970', amount: 900.00, type: 'deposit', source: 'Bank of America', category: 'Transfer', isCashInfusion: false },
  { id: genId('bofa', '2025-04-22', 1), date: '2025-04-22', description: 'BKOFAMERICA ATM DEPOSIT - JOHNSON RANCH QUEEN CREEK AZ', amount: 1500.00, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },
  { id: genId('bofa', '2025-04-23', 1), date: '2025-04-23', description: 'BKOFAMERICA ATM DEPOSIT - JOHNSON RANCH QUEEN CREEK AZ', amount: 2010.00, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },
  { id: genId('bofa', '2025-04-23', 2), date: '2025-04-23', description: 'BKOFAMERICA ATM DEPOSIT - QUEEN CREEK AZ', amount: 1100.00, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },

  // Withdrawals - Debit Card
  { id: genId('bofa', '2025-03-26', 2), date: '2025-03-26', description: 'GARNER ORTHODONTICS-CH CHANDLER AZ', amount: -300.00, type: 'withdrawal', source: 'Bank of America', category: 'Health', isCashInfusion: false },
  { id: genId('bofa', '2025-03-26', 3), date: '2025-03-26', description: 'CASH APP*LACY ESTRADA', amount: -20.00, type: 'withdrawal', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },
  { id: genId('bofa', '2025-03-27', 1), date: '2025-03-27', description: 'Delias Cleaners Queen Creek AZ', amount: -334.90, type: 'withdrawal', source: 'Bank of America', category: 'Services', isCashInfusion: false },
  { id: genId('bofa', '2025-03-27', 2), date: '2025-03-27', description: 'FRYS-FOOD-DRG CHANDLER AZ', amount: -268.83, type: 'withdrawal', source: 'Bank of America', category: 'Groceries', isCashInfusion: false },
  { id: genId('bofa', '2025-03-27', 3), date: '2025-03-27', description: 'BKOFAMERICA ATM WITHDRWL - CHANDLER AZ', amount: -300.00, type: 'withdrawal', source: 'Bank of America', category: 'ATM Withdrawal', isCashInfusion: false },
  { id: genId('bofa', '2025-03-31', 3), date: '2025-03-31', description: 'PMNT SENT CASH APP*CASH LESUEUR Oakland CA', amount: -100.00, type: 'withdrawal', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },
  { id: genId('bofa', '2025-03-31', 4), date: '2025-03-31', description: 'PMNT SENT CASH APP*CASH LESUEUR Oakland CA', amount: -600.00, type: 'withdrawal', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },
  { id: genId('bofa', '2025-03-31', 5), date: '2025-03-31', description: 'EVI* SANTAN MOUNT CHANDLER', amount: -1003.95, type: 'withdrawal', source: 'Bank of America', category: 'ATM Withdrawal', isCashInfusion: false },
  { id: genId('bofa', '2025-03-31', 6), date: '2025-03-31', description: 'EVI* SANTAN MOUNT CHANDLER', amount: -503.95, type: 'withdrawal', source: 'Bank of America', category: 'ATM Withdrawal', isCashInfusion: false },
  { id: genId('bofa', '2025-04-01', 1), date: '2025-04-01', description: 'SAGE COUNSELING INC', amount: -80.00, type: 'withdrawal', source: 'Bank of America', category: 'Health', isCashInfusion: false },
  { id: genId('bofa', '2025-04-14', 4), date: '2025-04-14', description: 'BKOFAMERICA ATM WITHDRWL - THE PLANT CHANDLER AZ', amount: -1000.00, type: 'withdrawal', source: 'Bank of America', category: 'ATM Withdrawal', isCashInfusion: false },
  { id: genId('bofa', '2025-04-21', 3), date: '2025-04-21', description: 'GOOGLE *ADS', amount: -1100.00, type: 'withdrawal', source: 'Bank of America', category: 'Marketing', isCashInfusion: false },
  { id: genId('bofa', '2025-04-22', 2), date: '2025-04-22', description: 'GOOGLE *ADS', amount: -1100.00, type: 'withdrawal', source: 'Bank of America', category: 'Marketing', isCashInfusion: false },
  { id: genId('bofa', '2025-04-22', 3), date: '2025-04-22', description: 'STARLINK INTERNET', amount: -182.00, type: 'withdrawal', source: 'Bank of America', category: 'Utilities', isCashInfusion: false },
  { id: genId('bofa', '2025-04-24', 1), date: '2025-04-24', description: 'GOOGLE *ADS', amount: -1222.00, type: 'withdrawal', source: 'Bank of America', category: 'Marketing', isCashInfusion: false },

  // Zelle Payments (Apr)
  { id: genId('bofa', '2025-03-26', 4), date: '2025-03-26', description: 'Zelle payment to Alison Farmer - Thanks', amount: -420.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-14', 5), date: '2025-04-14', description: 'Zelle payment to Babydoll', amount: -1000.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-14', 6), date: '2025-04-14', description: 'Zelle payment to Jeremy Rose', amount: -1000.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-14', 7), date: '2025-04-14', description: 'Zelle payment to SEE-N-CLEAR AUTO GLASS LLC', amount: -540.49, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: true }, // Cash infusion to company
  { id: genId('bofa', '2025-04-15', 1), date: '2025-04-15', description: 'Zelle payment to Babydoll', amount: -222.22, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-15', 2), date: '2025-04-15', description: 'Zelle payment to Babydoll', amount: -2222.22, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-16', 1), date: '2025-04-16', description: 'Zelle payment to Jose Vazquez', amount: -205.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-16', 2), date: '2025-04-16', description: 'Zelle payment to SEE-N-CLEAR AUTO GLASS LLC', amount: -299.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: true }, // Cash infusion to company
  { id: genId('bofa', '2025-04-17', 1), date: '2025-04-17', description: 'Zelle payment to Nikki Rice', amount: -222.22, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-18', 1), date: '2025-04-18', description: 'Zelle payment to Mario Ramirez', amount: -100.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-21', 4), date: '2025-04-21', description: 'Zelle payment to Jose Vazquez', amount: -250.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-21', 5), date: '2025-04-21', description: 'Zelle payment to Lacy Sista', amount: -45.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-21', 6), date: '2025-04-21', description: 'Zelle payment to Babydoll', amount: -265.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-22', 4), date: '2025-04-22', description: 'Zelle payment to Jose Vazquez', amount: -254.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-22', 5), date: '2025-04-22', description: 'Zelle payment to Lacy Sista - Gas', amount: -100.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-23', 3), date: '2025-04-23', description: 'Zelle payment to SEE-N-CLEAR AUTO GLASS LLC', amount: -717.91, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: true }, // Cash infusion to company
  { id: genId('bofa', '2025-04-23', 4), date: '2025-04-23', description: 'Zelle payment to Julio Duran', amount: -680.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-23', 5), date: '2025-04-23', description: 'Zelle payment to Julio Duran', amount: -760.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-23', 6), date: '2025-04-23', description: 'Zelle payment to Babydoll', amount: -100.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-04-24', 2), date: '2025-04-24', description: 'Zelle payment to Julio Duran', amount: -370.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },

  // Service Fees
  { id: genId('bofa', '2025-03-25', 5), date: '2025-03-25', description: 'Monthly Maintenance Fee', amount: -25.00, type: 'withdrawal', source: 'Bank of America', category: 'Fee', isCashInfusion: false },
  { id: genId('bofa', '2025-04-24', 3), date: '2025-04-24', description: 'Monthly Maintenance Fee', amount: -25.00, type: 'withdrawal', source: 'Bank of America', category: 'Fee', isCashInfusion: false },
];

// Get unique categories
export const getCategories = (): string[] => {
  const categories = new Set(bankTransactions.map(t => t.category));
  return Array.from(categories).sort();
};

// Get unique sources
export const getSources = (): string[] => {
  const sources = new Set(bankTransactions.map(t => t.source));
  return Array.from(sources).sort();
};

// Get transactions by month
export const getTransactionsByMonth = (year: number, month: number): BankTransaction[] => {
  return bankTransactions.filter(t => {
    const date = new Date(t.date);
    return date.getFullYear() === year && date.getMonth() === month - 1;
  });
};

// Get cash infusion transactions
export const getCashInfusionTransactions = (): BankTransaction[] => {
  return bankTransactions.filter(t => t.isCashInfusion);
};

// Calculate total cash infusions
export const getTotalCashInfusions = (): number => {
  return bankTransactions
    .filter(t => t.isCashInfusion)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
};
