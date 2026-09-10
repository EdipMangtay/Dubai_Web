const CURRENCIES = [
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
] as const;

export function formatCurrency(amount: number, currency = 'AED'): string {
  const curr = CURRENCIES.find(c => c.code === currency);
  return `${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ${curr?.code || currency}`;
}
