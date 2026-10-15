// ─── Precise Decimal Arithmetic & Safe Financial Formatting ───────────────
// Financial amounts must never suffer from binary floating-point roundoff errors.
// All calculations round to 2 decimal places or operate in integer scaled units.

export class DecimalMoney {
  private readonly cents: number; // scaled by 100 as integer

  constructor(value: number | string | DecimalMoney) {
    if (value instanceof DecimalMoney) {
      this.cents = value.cents;
    } else if (typeof value === 'number') {
      if (!Number.isFinite(value)) {
        throw new Error(`Cannot create DecimalMoney from non-finite number: ${value}`);
      }
      this.cents = Math.round(value * 100);
    } else if (typeof value === 'string') {
      const clean = value.trim().replace(/,/g, '').replace(/[₹$€£৳]/g, '');
      if (clean === '' || isNaN(Number(clean))) {
        throw new Error(`Invalid decimal string: "${value}"`);
      }
      const num = parseFloat(clean);
      this.cents = Math.round(num * 100);
    } else {
      throw new Error(`Unsupported type for DecimalMoney: ${typeof value}`);
    }
  }

  static from(value: number | null | undefined): DecimalMoney | null {
    if (value === null || value === undefined || isNaN(value)) {
      return null;
    }
    return new DecimalMoney(value);
  }

  static zero(): DecimalMoney {
    return new DecimalMoney(0);
  }

  add(other: DecimalMoney | number): DecimalMoney {
    const o = other instanceof DecimalMoney ? other : new DecimalMoney(other);
    const result = new DecimalMoney(0);
    (result as any).cents = this.cents + o.cents;
    return result;
  }

  sub(other: DecimalMoney | number): DecimalMoney {
    const o = other instanceof DecimalMoney ? other : new DecimalMoney(other);
    const result = new DecimalMoney(0);
    (result as any).cents = this.cents - o.cents;
    return result;
  }

  mul(factor: number): DecimalMoney {
    if (!Number.isFinite(factor)) {
      throw new Error(`Invalid multiplication factor: ${factor}`);
    }
    const scaled = Math.round(this.cents * factor);
    const result = new DecimalMoney(0);
    (result as any).cents = scaled;
    return result;
  }

  div(divisor: number): DecimalMoney {
    if (!Number.isFinite(divisor) || divisor === 0) {
      throw new Error(`Division by zero or non-finite number: ${divisor}`);
    }
    const scaled = Math.round(this.cents / divisor);
    const result = new DecimalMoney(0);
    (result as any).cents = scaled;
    return result;
  }

  percentageOf(total: DecimalMoney | number): number {
    const totNum = total instanceof DecimalMoney ? total.toNumber() : total;
    if (totNum === 0) return 0;
    const pct = (this.toNumber() / totNum) * 100;
    return Math.round(pct * 100) / 100;
  }

  toNumber(): number {
    return Number(this.cents) / 100;
  }

  toString(): string {
    return this.toNumber().toFixed(2);
  }
}

/**
 * Supported currencies across all financial project portfolio systems
 */
export type SupportedCurrency = 'USD' | 'INR' | 'BDT';
export const SUPPORTED_CURRENCIES: SupportedCurrency[] = ['USD', 'INR', 'BDT'];

export interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  locale: string;
}

export const CURRENCY_CONFIG: Record<SupportedCurrency, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
  BDT: { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', locale: 'en-BD' },
};

/**
 * Standard benchmark exchange rates across USD, INR, and BDT.
 * 1 USD = 84.00 INR = 120.00 BDT
 * 1 INR = 1.42857 BDT (10/7 BDT)
 * 1 BDT = 0.70 INR (7/10 INR)
 */
export const EXCHANGE_RATES: Record<SupportedCurrency, number> = {
  USD: 1,
  INR: 84,
  BDT: 120,
};

export const EXCHANGE_RATE_DISCLOSURE = '1 USD = ₹84.00 INR = ৳120.00 BDT (1 INR = ৳1.43 BDT)';

/**
 * Convert any monetary amount between USD, INR, and BDT.
 * Safe against binary floating point drift with precise rounding.
 */
export function convertCurrency(
  amount: number | null | undefined,
  fromCurrency: string = 'INR',
  toCurrency: string = 'INR'
): number | null {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return null;
  }

  const from = (fromCurrency.toUpperCase() as SupportedCurrency);
  const to = (toCurrency.toUpperCase() as SupportedCurrency);

  if (from === to) {
    return amount;
  }

  // Rates relative to 1 USD
  const fromRate = EXCHANGE_RATES[from] ?? (from === 'EUR' as any ? 0.92 : 84);
  const toRate = EXCHANGE_RATES[to] ?? (to === 'EUR' as any ? 0.92 : 84);

  // Convert to USD first, then to target currency
  const inUSD = amount / fromRate;
  const inTarget = inUSD * toRate;

  // Round to nearest integer or 2 decimal places depending on scale
  if (Math.abs(inTarget) >= 100) {
    return Math.round(inTarget);
  }
  return Math.round(inTarget * 100) / 100;
}

/**
 * Get the currency symbol for a currency code.
 */
export function getCurrencySymbol(currency: string = 'INR'): string {
  const norm = currency.toUpperCase();
  if (norm === 'INR') return '₹';
  if (norm === 'USD') return '$';
  if (norm === 'BDT') return '৳';
  if (norm === 'EUR') return '€';
  return `${currency} `;
}

/**
 * Format currency in Indian Numbering System (Lakhs / Crores), Bangladeshi format, or standard ISO format.
 * STRICT PRINCIPLE: If value is null or undefined, returns a designated placeholder (e.g. "Not Tracked"),
 * NEVER returns ₹0.
 */
export function formatCurrency(
  amount: number | null | undefined,
  currency = 'INR',
  placeholder = 'Not Tracked'
): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return placeholder;
  }

  const norm = currency.toUpperCase();
  const symbol = getCurrencySymbol(norm);
  const isNegative = amount < 0;
  const absVal = Math.abs(amount);

  if (norm === 'INR' || norm === 'BDT') {
    // Format using South Asian grouping (thousands, then lakhs, then crores)
    const formatted = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(absVal);
    return `${isNegative ? '-' : ''}${symbol}${formatted}`;
  }

  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(absVal);
  return `${isNegative ? '-' : ''}${symbol}${formatted}`;
}

/**
 * Multi-currency representation of an amount across USD, INR, and BDT.
 */
export function formatMultiCurrency(
  amount: number | null | undefined,
  baseCurrency = 'INR'
): { usd: string; inr: string; bdt: string; raw: { usd: number | null; inr: number | null; bdt: number | null } } {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return {
      usd: 'Not Tracked',
      inr: 'Not Tracked',
      bdt: 'Not Tracked',
      raw: { usd: null, inr: null, bdt: null },
    };
  }

  const usdVal = convertCurrency(amount, baseCurrency, 'USD');
  const inrVal = convertCurrency(amount, baseCurrency, 'INR');
  const bdtVal = convertCurrency(amount, baseCurrency, 'BDT');

  return {
    usd: formatCurrency(usdVal, 'USD'),
    inr: formatCurrency(inrVal, 'INR'),
    bdt: formatCurrency(bdtVal, 'BDT'),
    raw: { usd: usdVal, inr: inrVal, bdt: bdtVal },
  };
}

/**
 * Validate that an array of percentages sums to 100% within a tolerance of 0.05%
 */
export function validatePercentageSum(
  percentages: number[],
  tolerance = 0.05
): { isValid: boolean; sum: number; difference: number } {
  const sum = percentages.reduce((acc, p) => acc + (Number.isFinite(p) ? p : 0), 0);
  const roundedSum = Math.round(sum * 100) / 100;
  const difference = Math.round(Math.abs(roundedSum - 100) * 100) / 100;
  const isValid = difference <= tolerance;
  return { isValid, sum: roundedSum, difference };
}

/**
 * Format hours with safe null/undefined handling.
 */
export function formatHours(
  hours: number | null | undefined,
  placeholder = 'Not Tracked'
): string {
  if (hours === null || hours === undefined || isNaN(hours)) {
    return placeholder;
  }
  return `${new Intl.NumberFormat('en-IN').format(hours)} hrs`;
}

/**
 * Format percentage.
 */
export function formatPercentage(
  pct: number | null | undefined,
  placeholder = '—'
): string {
  if (pct === null || pct === undefined || isNaN(pct)) {
    return placeholder;
  }
  return `${pct.toFixed(1)}%`;
}
