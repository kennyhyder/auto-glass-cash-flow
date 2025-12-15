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
  // CASH APP TRANSACTIONS - June 2025
  // ============================================
  { id: genId('cashapp', '2025-06-07', 1), date: '2025-06-07', description: 'From Dylan Johnson', amount: 295.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-06-09', 1), date: '2025-06-09', description: 'To Abra May', amount: -40.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-06-09', 2), date: '2025-06-09', description: 'To Dominique Jarvis', amount: -200.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-06-09', 3), date: '2025-06-09', description: 'To Nicole Lesueur from Wells Fargo Bank x0668', amount: -300.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-06-12', 1), date: '2025-06-12', description: 'To Griffin Granberg from Bank of America x3575', amount: -1222.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-06-17', 1), date: '2025-06-17', description: 'To Thbeuesiwhsb', amount: -55.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-06-24', 1), date: '2025-06-24', description: 'From Tiffany Corona', amount: 50.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-06-29', 1), date: '2025-06-29', description: 'To Jesse Mostrales from Bank of America x1830', amount: -222.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-06-29', 2), date: '2025-06-29', description: 'To Amado Viera', amount: -50.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },

  // ============================================
  // CASH APP TRANSACTIONS - July 2025
  // ============================================
  { id: genId('cashapp', '2025-07-08', 1), date: '2025-07-08', description: 'To Jesse Mostrales from Bank of America x1830', amount: -222.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-07-08', 2), date: '2025-07-08', description: 'To Jesse Mostrales from Bank of America x1830', amount: -477.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-07-08', 3), date: '2025-07-08', description: 'From Jesse Mostrales', amount: 322.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-07-13', 1), date: '2025-07-13', description: 'To Jesse Mostrales', amount: -222.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-07-16', 1), date: '2025-07-16', description: 'To Nicole Lesueur', amount: -22.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-07-16', 2), date: '2025-07-16', description: 'To Visa Debit 1830 x1830 - Instant transfer', amount: -78.00, type: 'withdrawal', source: 'Cash App', category: 'Transfer', fee: 1.36, isCashInfusion: false },
  { id: genId('cashapp', '2025-07-29', 1), date: '2025-07-29', description: 'To Jesse Mostrales from Bank of America x1830', amount: -444.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },

  // ============================================
  // CASH APP TRANSACTIONS - August 2025
  // ============================================
  { id: genId('cashapp', '2025-08-11', 1), date: '2025-08-11', description: 'To Thbeuesiwhsb from Bank of America x1830', amount: -193.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },

  // ============================================
  // CASH APP TRANSACTIONS - September 2025
  // ============================================
  { id: genId('cashapp', '2025-09-11', 1), date: '2025-09-11', description: 'From Nina Stokes', amount: 450.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-09-12', 1), date: '2025-09-12', description: 'From Nina Stokes', amount: 450.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-09-15', 1), date: '2025-09-15', description: 'To Brandie Larange', amount: -75.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-09-15', 2), date: '2025-09-15', description: 'To Jesse Mostrales', amount: -422.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-09-15', 3), date: '2025-09-15', description: 'To Brandie Larange', amount: -200.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-09-18', 1), date: '2025-09-18', description: 'To Visa Debit 1830 x1830 - Instant transfer', amount: -203.00, type: 'withdrawal', source: 'Cash App', category: 'Transfer', fee: 3.55, isCashInfusion: false },
  { id: genId('cashapp', '2025-09-19', 1), date: '2025-09-19', description: 'To Nicole Lesueur from Bank of America x1830', amount: -100.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },

  // ============================================
  // CASH APP TRANSACTIONS - October 2025
  // ============================================
  { id: genId('cashapp', '2025-10-04', 1), date: '2025-10-04', description: 'From Nicole Lesueur', amount: 486.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-10-05', 1), date: '2025-10-05', description: 'To Visa Debit 5391 x5391 - Instant transfer', amount: -200.00, type: 'withdrawal', source: 'Cash App', category: 'Transfer', fee: 3.50, isCashInfusion: false },
  { id: genId('cashapp', '2025-10-05', 2), date: '2025-10-05', description: 'To Nicole Lesueur', amount: -200.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-10-15', 1), date: '2025-10-15', description: 'To Visa Debit 5391 x5391 - Instant transfer', amount: -86.00, type: 'withdrawal', source: 'Cash App', category: 'Transfer', fee: 1.50, isCashInfusion: false },

  // ============================================
  // CASH APP TRANSACTIONS - November 2025
  // ============================================
  { id: genId('cashapp', '2025-11-03', 1), date: '2025-11-03', description: 'To Jesse Mostrales from Bank of America x9116', amount: -400.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-05', 1), date: '2025-11-05', description: 'From Thbeuesiwhsb', amount: 1000.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-05', 2), date: '2025-11-05', description: 'To Visa Debit 1807 x1807 - Standard transfer', amount: -1000.00, type: 'withdrawal', source: 'Cash App', category: 'Transfer', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-05', 3), date: '2025-11-05', description: 'From Thbeuesiwhsb', amount: 1000.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-05', 4), date: '2025-11-05', description: 'To Nicole Lesueur', amount: -1000.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-05', 5), date: '2025-11-05', description: 'From Nicole Lesueur', amount: 950.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-06', 1), date: '2025-11-06', description: 'To Visa Debit 5391 x5391 - Instant transfer', amount: -950.00, type: 'withdrawal', source: 'Cash App', category: 'Transfer', fee: 16.62, isCashInfusion: false },
  { id: genId('cashapp', '2025-11-07', 1), date: '2025-11-07', description: 'From Thbeuesiwhsb', amount: 1000.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-07', 2), date: '2025-11-07', description: 'To Nicole Lesueur', amount: -50.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-07', 3), date: '2025-11-07', description: 'To Nicole Lesueur', amount: -50.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-08', 1), date: '2025-11-08', description: 'Circle K Gilbert AZ - Cash App Card', amount: -8.23, type: 'withdrawal', source: 'Cash App', category: 'Retail', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-08', 2), date: '2025-11-08', description: 'To Nicole Lesueur', amount: -800.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-08', 3), date: '2025-11-08', description: 'Uber San Francisco CA - Cash App Card', amount: -33.29, type: 'withdrawal', source: 'Cash App', category: 'Transport', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-12', 1), date: '2025-11-12', description: 'To Nicole Lesueur', amount: -25.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-13', 1), date: '2025-11-13', description: 'To Nicole Lesueur', amount: -25.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-13', 2), date: '2025-11-13', description: 'From Thbeuesiwhsb', amount: 750.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-13', 3), date: '2025-11-13', description: 'To Thbeuesiwhsb', amount: -200.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-13', 4), date: '2025-11-13', description: 'To Jesse Mostrales', amount: -400.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-13', 5), date: '2025-11-13', description: 'To Nicole Lesueur', amount: -126.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-18', 1), date: '2025-11-18', description: 'From Thbeuesiwhsb', amount: 380.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-19', 1), date: '2025-11-19', description: 'To Lacy Estrada', amount: -412.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-22', 1), date: '2025-11-22', description: 'From Lacy Estrada', amount: 1000.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-22', 2), date: '2025-11-22', description: 'Uber San Francisco CA - Cash App Card', amount: -65.02, type: 'withdrawal', source: 'Cash App', category: 'Transport', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-23', 1), date: '2025-11-23', description: 'To Jesse Mostrales', amount: -400.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-23', 2), date: '2025-11-23', description: 'Qt Inside Mesa AZ - Cash App Card', amount: -30.60, type: 'withdrawal', source: 'Cash App', category: 'Retail', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-23', 3), date: '2025-11-23', description: 'To Nicole Lesueur', amount: -450.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-24', 1), date: '2025-11-24', description: 'Qt Queen Creek AZ - Cash App Card', amount: -39.51, type: 'withdrawal', source: 'Cash App', category: 'Retail', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-24', 2), date: '2025-11-24', description: 'From Lacy Estrada', amount: 1200.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-24', 3), date: '2025-11-24', description: 'To Visa Debit 9116 x9116 - Instant transfer', amount: -1215.35, type: 'withdrawal', source: 'Cash App', category: 'Transfer', fee: 21.27, isCashInfusion: false },
  { id: genId('cashapp', '2025-11-24', 4), date: '2025-11-24', description: 'From Bank of America x9116 - Standard transfer', amount: 100.00, type: 'deposit', source: 'Cash App', category: 'Transfer', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-24', 5), date: '2025-11-24', description: 'Speedway Mesa AZ - Cash App Card', amount: -13.74, type: 'withdrawal', source: 'Cash App', category: 'Retail', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-25', 1), date: '2025-11-25', description: 'Starbucks Store Gilbert AZ - Cash App Card', amount: -67.47, type: 'withdrawal', source: 'Cash App', category: 'Retail', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-25', 2), date: '2025-11-25', description: 'Qt Outside Mesa AZ - Cash App Card', amount: -18.79, type: 'withdrawal', source: 'Cash App', category: 'Retail', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-25', 3), date: '2025-11-25', description: 'From Bank of America x9116 - Standard transfer', amount: 100.00, type: 'deposit', source: 'Cash App', category: 'Transfer', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-25', 4), date: '2025-11-25', description: 'Qt Mesa AZ - Cash App Card', amount: -4.27, type: 'withdrawal', source: 'Cash App', category: 'Retail', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-25', 5), date: '2025-11-25', description: 'Qt Outside Mesa AZ - Cash App Card', amount: -39.09, type: 'withdrawal', source: 'Cash App', category: 'Retail', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-28', 1), date: '2025-11-28', description: 'Shell Mesa AZ - Cash App Card', amount: -31.55, type: 'withdrawal', source: 'Cash App', category: 'Retail', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-28', 2), date: '2025-11-28', description: 'Shell Mesa AZ - Cash App Card', amount: -15.89, type: 'withdrawal', source: 'Cash App', category: 'Retail', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-28', 3), date: '2025-11-28', description: 'From Bank of America x9116 - Standard transfer', amount: 500.00, type: 'deposit', source: 'Cash App', category: 'Transfer', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-28', 4), date: '2025-11-28', description: 'Tillys Queen Creek AZ - Cash App Card', amount: -462.20, type: 'withdrawal', source: 'Cash App', category: 'Retail', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-28', 5), date: '2025-11-28', description: 'Tillys Queen Creek AZ - Cash App Card', amount: -34.62, type: 'withdrawal', source: 'Cash App', category: 'Retail', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-28', 6), date: '2025-11-28', description: 'From Bank of America x9116 - Standard transfer', amount: 100.00, type: 'deposit', source: 'Cash App', category: 'Transfer', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-28', 7), date: '2025-11-28', description: 'McDonalds Queen Creek AZ - Cash App Card', amount: -59.00, type: 'withdrawal', source: 'Cash App', category: 'Retail', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-29', 1), date: '2025-11-29', description: 'Qt Outside Queen Creek AZ - Cash App Card', amount: -30.26, type: 'withdrawal', source: 'Cash App', category: 'Retail', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-30', 1), date: '2025-11-30', description: 'From Bank of America x9116 - Standard transfer', amount: 200.00, type: 'deposit', source: 'Cash App', category: 'Transfer', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-30', 2), date: '2025-11-30', description: 'From Patricia Garcia', amount: 250.00, type: 'deposit', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },
  { id: genId('cashapp', '2025-11-30', 3), date: '2025-11-30', description: 'To Nicole Lesueur', amount: -42.00, type: 'withdrawal', source: 'Cash App', category: 'Cash App Payment', isCashInfusion: false },

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

  // ============================================
  // BANK OF AMERICA TRANSACTIONS - Jul 26 to Aug 25, 2025
  // ============================================
  // Deposits
  { id: genId('bofa', '2025-07-28', 1), date: '2025-07-28', description: 'BKOFAMERICA ATM DEPOSIT RURAL & BASELINE TEMPE AZ', amount: 3200.00, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },
  { id: genId('bofa', '2025-07-29', 1), date: '2025-07-29', description: 'Online Banking transfer from SAV 6970', amount: 222.22, type: 'deposit', source: 'Bank of America', category: 'Transfer', isCashInfusion: false },
  { id: genId('bofa', '2025-07-30', 1), date: '2025-07-30', description: 'Online Banking transfer from SAV 6970', amount: 400.00, type: 'deposit', source: 'Bank of America', category: 'Transfer', isCashInfusion: false },
  { id: genId('bofa', '2025-07-30', 2), date: '2025-07-30', description: 'Zelle payment from AMADO VIERA - Thank you', amount: 200.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-07-31', 1), date: '2025-07-31', description: 'Online Banking transfer from SAV 6970', amount: 100.00, type: 'deposit', source: 'Bank of America', category: 'Transfer', isCashInfusion: false },
  { id: genId('bofa', '2025-08-01', 1), date: '2025-08-01', description: 'BKOFAMERICA ATM DEPOSIT JOHNSON RANCH QUEEN CREEK AZ', amount: 700.00, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },
  { id: genId('bofa', '2025-08-04', 1), date: '2025-08-04', description: 'BKOFAMERICA ATM DEPOSIT RITTENHOUSE QUEEN CREEK AZ', amount: 4997.83, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },
  { id: genId('bofa', '2025-08-05', 1), date: '2025-08-05', description: 'Zelle payment from ESMA KRASNIQI - auto glass', amount: 250.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-06', 1), date: '2025-08-06', description: 'BKOFAMERICA ATM DEPOSIT RITTENHOUSE QUEEN CREEK AZ', amount: 830.00, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },
  { id: genId('bofa', '2025-08-11', 1), date: '2025-08-11', description: 'BKOFAMERICA ATM DEPOSIT JOHNSON RANCH QUEEN CREEK AZ', amount: 4000.00, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },
  { id: genId('bofa', '2025-08-11', 2), date: '2025-08-11', description: 'Zelle payment from JULIO C DURAN - glass job', amount: 250.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-12', 1), date: '2025-08-12', description: 'Zelle payment from JUAN P CALDERA - fuel reimbursement', amount: 300.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-18', 1), date: '2025-08-18', description: 'BKOFAMERICA ATM DEPOSIT RITTENHOUSE QUEEN CREEK AZ', amount: 4200.00, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },
  { id: genId('bofa', '2025-08-18', 2), date: '2025-08-18', description: 'Zelle payment from JAIME MARTINEZ', amount: 950.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-19', 1), date: '2025-08-19', description: 'Zelle payment from JULIO C DURAN', amount: 60.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-20', 1), date: '2025-08-20', description: 'Zelle payment from EXTREME AUTO GLASS LLC', amount: 155.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-21', 1), date: '2025-08-21', description: 'Zelle payment from JULIO C DURAN', amount: 300.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-21', 2), date: '2025-08-21', description: 'Zelle payment from EXTREME AUTO GLASS LLC', amount: 265.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-22', 1), date: '2025-08-22', description: 'Zelle payment from KAYLEA C IORNS', amount: 300.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-25', 1), date: '2025-08-25', description: 'BKOFAMERICA ATM DEPOSIT RITTENHOUSE QUEEN CREEK AZ', amount: 1400.00, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },
  { id: genId('bofa', '2025-08-25', 2), date: '2025-08-25', description: 'Zelle payment from KAYLEA C IORNS', amount: 500.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },

  // Withdrawals - Key items
  { id: genId('bofa', '2025-07-28', 2), date: '2025-07-28', description: 'PMNT SENT VENMO *Kenny H Visa Direct', amount: -2000.00, type: 'withdrawal', source: 'Bank of America', category: 'Venmo', isCashInfusion: false },
  { id: genId('bofa', '2025-07-29', 2), date: '2025-07-29', description: 'PMNT SENT CASH APP*JESSE MOSTRALES', amount: -444.00, type: 'withdrawal', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },
  { id: genId('bofa', '2025-07-31', 2), date: '2025-07-31', description: 'PMNT SENT VENMO *Kenny H Visa Direct', amount: -222.00, type: 'withdrawal', source: 'Bank of America', category: 'Venmo', isCashInfusion: false },
  { id: genId('bofa', '2025-08-07', 1), date: '2025-08-07', description: 'BKOFAMERICA ATM WITHDRWL MESA MAIN', amount: -300.00, type: 'withdrawal', source: 'Bank of America', category: 'ATM Withdrawal', isCashInfusion: false },
  { id: genId('bofa', '2025-08-12', 2), date: '2025-08-12', description: 'GOOGLE *ADS cc@google.com', amount: -2000.00, type: 'withdrawal', source: 'Bank of America', category: 'Marketing', isCashInfusion: false },
  { id: genId('bofa', '2025-08-12', 3), date: '2025-08-12', description: 'PMNT SENT CASH APP*THBEUESIWHSB', amount: -193.00, type: 'withdrawal', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },
  { id: genId('bofa', '2025-08-15', 1), date: '2025-08-15', description: 'GOOGLE *ADS cc@google.com', amount: -700.00, type: 'withdrawal', source: 'Bank of America', category: 'Marketing', isCashInfusion: false },
  { id: genId('bofa', '2025-08-18', 3), date: '2025-08-18', description: 'GOOGLE *ADS cc@google.com', amount: -1100.00, type: 'withdrawal', source: 'Bank of America', category: 'Marketing', isCashInfusion: false },
  { id: genId('bofa', '2025-08-19', 2), date: '2025-08-19', description: 'GOOGLE *ADS cc@google.com', amount: -1500.00, type: 'withdrawal', source: 'Bank of America', category: 'Marketing', isCashInfusion: false },
  { id: genId('bofa', '2025-08-25', 3), date: '2025-08-25', description: 'PMNT SENT CASH APP*BRANDIE LARANG', amount: -100.00, type: 'withdrawal', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },
  { id: genId('bofa', '2025-08-25', 4), date: '2025-08-25', description: 'SHEFFIELD FINANCIAL LLC', amount: -222.22, type: 'withdrawal', source: 'Bank of America', category: 'Financial', isCashInfusion: false },

  // Zelle Payments (Aug)
  { id: genId('bofa', '2025-08-01', 2), date: '2025-08-01', description: 'Zelle payment to JT sanctuary - AG2020 Rebate', amount: -100.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-04', 2), date: '2025-08-04', description: 'Zelle payment to ESMA KRASNIQI', amount: -250.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-05', 2), date: '2025-08-05', description: 'Zelle payment to Julio Duran', amount: -400.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-05', 3), date: '2025-08-05', description: 'Zelle payment to brianna dearman', amount: -122.22, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-06', 2), date: '2025-08-06', description: 'Zelle payment to Julio Duran - Garage and Life', amount: -422.22, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-11', 3), date: '2025-08-11', description: 'Zelle payment to KELLY JOHNSON - Team Auto Glass settlement', amount: -300.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-11', 4), date: '2025-08-11', description: 'Zelle payment to RICHARD TAYLOR - Rebate', amount: -122.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-11', 5), date: '2025-08-11', description: 'Zelle payment to Steve Montoya - Rebate', amount: -100.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-12', 4), date: '2025-08-12', description: 'Zelle payment to Jaime Install and Recal Technician - Glass', amount: -750.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-12', 5), date: '2025-08-12', description: 'Zelle payment to Jaime Install and Recal Technician - Glass', amount: -380.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-13', 1), date: '2025-08-13', description: 'Zelle payment to DIANE GREGG - Rebate', amount: -250.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-18', 4), date: '2025-08-18', description: 'Zelle payment to CONNIE KROSS - David Kross Rebate', amount: -140.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-18', 5), date: '2025-08-18', description: 'Zelle payment to KELLY JOHNSON - Team Auto Glass settlement', amount: -300.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-19', 3), date: '2025-08-19', description: 'Zelle payment to Amado Technician', amount: -100.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-19', 4), date: '2025-08-19', description: 'Zelle payment to Julio Duran', amount: -60.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-20', 2), date: '2025-08-20', description: 'Zelle payment to Jaime Install and Recal Technician', amount: -150.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-20', 3), date: '2025-08-20', description: 'Zelle payment to Alison Farmer', amount: -35.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-21', 3), date: '2025-08-21', description: 'Zelle payment to Chris Malave - Rebate', amount: -70.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-22', 2), date: '2025-08-22', description: 'Zelle payment to Julio Duran - glass', amount: -600.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-25', 5), date: '2025-08-25', description: 'Zelle payment to Julio Duran', amount: -555.55, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-25', 6), date: '2025-08-25', description: 'Zelle payment to Julio Duran - Glass', amount: -500.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-25', 7), date: '2025-08-25', description: 'Monthly Maintenance Fee', amount: -25.00, type: 'withdrawal', source: 'Bank of America', category: 'Fee', isCashInfusion: false },

  // ============================================
  // BANK OF AMERICA TRANSACTIONS - Aug 26 to Sep 24, 2025
  // ============================================
  // Deposits
  { id: genId('bofa', '2025-08-26', 1), date: '2025-08-26', description: 'Zelle payment from EXTREME AUTO GLASS LLC - FOR JOBS', amount: 1421.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-26', 2), date: '2025-08-26', description: 'Zelle payment from EXTREME AUTO GLASS LLC', amount: 212.22, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-27', 1), date: '2025-08-27', description: 'Zelle payment from EXTREME AUTO GLASS LLC - PAYBACK FOR JOBS', amount: 685.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-29', 1), date: '2025-08-29', description: 'BKOFAMERICA ATM DEPOSIT RITTENHOUSE QUEEN CREEK AZ', amount: 700.00, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },
  { id: genId('bofa', '2025-08-29', 2), date: '2025-08-29', description: 'Zelle payment from TARA APPELT - Windshield', amount: 400.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-02', 1), date: '2025-09-02', description: 'Zelle payment from TILLIE POORTHUNDER', amount: 390.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-02', 2), date: '2025-09-02', description: 'Zelle payment from NICKOLAS KITCHEYAN', amount: 250.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-02', 3), date: '2025-09-02', description: 'Zelle payment from NICKOLAS KITCHEYAN', amount: 50.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-02', 4), date: '2025-09-02', description: 'Zelle payment from TILLIE POORTHUNDER', amount: 50.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-02', 5), date: '2025-09-02', description: 'Zelle payment from TRYSHA BRAUN', amount: 50.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-03', 1), date: '2025-09-03', description: 'Zelle payment from EXTREME AUTO GLASS LLC', amount: 464.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-03', 2), date: '2025-09-03', description: 'Zelle payment from SONDRA C HALE - windshield', amount: 399.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-03', 3), date: '2025-09-03', description: 'Zelle payment from MACEY COOK - Windshield', amount: 259.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-04', 1), date: '2025-09-04', description: 'Zelle payment from JASON OAKLEY', amount: 3500.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-04', 2), date: '2025-09-04', description: 'Zelle payment from SAMONE FLORES - WINDSHIELD', amount: 420.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-04', 3), date: '2025-09-04', description: 'Zelle payment from EXTREME AUTO GLASS LLC', amount: 293.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-05', 1), date: '2025-09-05', description: 'Zelle payment from JASON OAKLEY', amount: 1500.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-05', 2), date: '2025-09-05', description: 'Zelle payment from NICOLE K LESUEUR - for u', amount: 847.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-09', 1), date: '2025-09-09', description: 'Zelle payment from NICOLE K LESUEUR - Auto Glass 2020', amount: 5000.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: true },
  { id: genId('bofa', '2025-09-15', 1), date: '2025-09-15', description: 'BKOFAMERICA ATM DEPOSIT JOHNSON RANCH QUEEN CREEK AZ', amount: 3400.00, type: 'deposit', source: 'Bank of America', category: 'Cash Deposit', isCashInfusion: false },
  { id: genId('bofa', '2025-09-18', 1), date: '2025-09-18', description: 'Zelle payment from RANDALL JUSTICE', amount: 280.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-18', 2), date: '2025-09-18', description: 'CASH APP*CASH PMNT RCVD', amount: 199.45, type: 'deposit', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },
  { id: genId('bofa', '2025-09-19', 1), date: '2025-09-19', description: 'Zelle payment from EXTREME AUTO GLASS LLC', amount: 400.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-22', 1), date: '2025-09-22', description: 'APPLE CASH PMNT RCVD', amount: 795.88, type: 'deposit', source: 'Bank of America', category: 'Apple Cash', isCashInfusion: false },
  { id: genId('bofa', '2025-09-22', 2), date: '2025-09-22', description: 'VENMO*LeSueur PMNT RCVD', amount: 378.27, type: 'deposit', source: 'Bank of America', category: 'Venmo', isCashInfusion: false },
  { id: genId('bofa', '2025-09-23', 1), date: '2025-09-23', description: 'Zelle payment from NICOLE K LESUEUR - love u', amount: 273.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-23', 2), date: '2025-09-23', description: 'Zelle payment from LACY MICHELE ESTRADA', amount: 60.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-23', 3), date: '2025-09-23', description: 'Zelle payment from LACY MICHELE ESTRADA', amount: 25.00, type: 'deposit', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },

  // Withdrawals - Key items
  { id: genId('bofa', '2025-08-26', 3), date: '2025-08-26', description: 'GOOGLE *ADS cc@google.com', amount: -1000.00, type: 'withdrawal', source: 'Bank of America', category: 'Marketing', isCashInfusion: false },
  { id: genId('bofa', '2025-09-10', 1), date: '2025-09-10', description: 'SHEFFIELD FINANCIAL LLC', amount: -2678.24, type: 'withdrawal', source: 'Bank of America', category: 'Financial', isCashInfusion: false },
  { id: genId('bofa', '2025-09-10', 2), date: '2025-09-10', description: 'PMNT SENT VENMO *Kenny H Visa Direct', amount: -4000.00, type: 'withdrawal', source: 'Bank of America', category: 'Venmo', isCashInfusion: false },
  { id: genId('bofa', '2025-09-15', 2), date: '2025-09-15', description: 'Google ADS', amount: -500.00, type: 'withdrawal', source: 'Bank of America', category: 'Marketing', isCashInfusion: false },
  { id: genId('bofa', '2025-09-15', 3), date: '2025-09-15', description: 'BKOFAMERICA ATM WITHDRWL FINANCIAL PLAZA MESA', amount: -500.00, type: 'withdrawal', source: 'Bank of America', category: 'ATM Withdrawal', isCashInfusion: false },
  { id: genId('bofa', '2025-09-22', 3), date: '2025-09-22', description: 'PMNT SENT CASH APP*NICOLE LESUEUR', amount: -100.00, type: 'withdrawal', source: 'Bank of America', category: 'Cash App', isCashInfusion: false },
  { id: genId('bofa', '2025-09-22', 4), date: '2025-09-22', description: 'BKOFAMERICA ATM WITHDRWL JOHNSON RANCH QUEEN CREEK', amount: -1460.00, type: 'withdrawal', source: 'Bank of America', category: 'ATM Withdrawal', isCashInfusion: false },

  // Zelle Payments (Sep)
  { id: genId('bofa', '2025-08-26', 4), date: '2025-08-26', description: 'Zelle payment to Julio Duran', amount: -200.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-26', 5), date: '2025-08-26', description: 'Zelle payment to Julio Duran - Glass warehouse', amount: -125.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-27', 2), date: '2025-08-27', description: 'Zelle payment to Lacy Sista - Groceries', amount: -275.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-28', 1), date: '2025-08-28', description: 'Zelle payment to Jaime Install and Recal Technician - IGC', amount: -240.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-28', 2), date: '2025-08-28', description: 'Zelle payment to Julio Duran', amount: -80.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-29', 3), date: '2025-08-29', description: 'Zelle payment to Lacy Sista - Rebate', amount: -100.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-29', 4), date: '2025-08-29', description: 'Zelle payment to Julio Duran - Glass Needed IGC', amount: -245.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-08-29', 5), date: '2025-08-29', description: 'Zelle payment to Lacy Sista', amount: -150.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-02', 6), date: '2025-09-02', description: 'Zelle payment to Julio Duran - Glass Cut off IGC', amount: -85.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-02', 7), date: '2025-09-02', description: 'Zelle payment to A&D ESTATES LLC - Rebate', amount: -150.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-02', 8), date: '2025-09-02', description: 'Zelle payment to Celeste Lowry - Rebate', amount: -75.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-02', 9), date: '2025-09-02', description: 'Zelle payment to Julio Duran - IGC Parts', amount: -290.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-02', 10), date: '2025-09-02', description: 'Zelle payment to MAX MILLAR - Rebate', amount: -188.61, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-03', 4), date: '2025-09-03', description: 'Zelle payment to VIRGEL JR - Rebate', amount: -100.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-03', 5), date: '2025-09-03', description: 'Zelle payment to Linzy Granger', amount: -75.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-03', 6), date: '2025-09-03', description: 'Zelle payment to Julio Duran - Needed Glass', amount: -265.24, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-03', 7), date: '2025-09-03', description: 'Zelle payment to Melcher Honda CRV - Rebate', amount: -200.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-04', 4), date: '2025-09-04', description: 'Zelle payment to Brent Technician - Add Ons', amount: -200.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-04', 5), date: '2025-09-04', description: 'Zelle payment to LYNN NAVA - Rebate', amount: -165.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-05', 3), date: '2025-09-05', description: 'Zelle payment to KELLY JOHNSON - Payment 3 of 6', amount: -300.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-08', 1), date: '2025-09-08', description: 'Zelle payment to Mantra Mantra - Rebate', amount: -250.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-08', 2), date: '2025-09-08', description: 'Zelle payment to RUDY RIVAS - Rebate', amount: -175.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-08', 3), date: '2025-09-08', description: 'Zelle payment to Chris Malave - Rebate', amount: -70.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-09', 2), date: '2025-09-09', description: 'Zelle payment to KASEY TURNER', amount: -50.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-09', 3), date: '2025-09-09', description: 'Zelle payment to brianna dearman', amount: -200.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-12', 1), date: '2025-09-12', description: 'Zelle payment to WENDY LAU', amount: -90.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-15', 4), date: '2025-09-15', description: 'Zelle payment to KELLY JOHNSON - settlement', amount: -300.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-17', 1), date: '2025-09-17', description: 'Zelle payment to Babydoll - Marketing', amount: -1700.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-17', 2), date: '2025-09-17', description: 'Zelle payment to Rich CPA - Past Due Accounting', amount: -400.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-18', 3), date: '2025-09-18', description: 'Zelle payment to THE ESTATE WATCH AND JEWELRY CO', amount: -370.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-19', 2), date: '2025-09-19', description: 'Zelle payment to Linzy Granger - Rebate', amount: -75.00, type: 'withdrawal', source: 'Bank of America', category: 'Zelle', isCashInfusion: false },
  { id: genId('bofa', '2025-09-24', 1), date: '2025-09-24', description: 'Monthly Maintenance Fee', amount: -25.00, type: 'withdrawal', source: 'Bank of America', category: 'Fee', isCashInfusion: false },
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
