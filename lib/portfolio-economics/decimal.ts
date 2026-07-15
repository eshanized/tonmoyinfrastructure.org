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
      const clean = value.trim().replace(/,/g, '').replace(/[₹$€£]/g, '');
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
 * Format currency in Indian Numbering System (Lakhs / Crores) or standard ISO format.
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

  const symbol = currency === 'INR' ? '₹' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : `${currency} `;
  const isNegative = amount < 0;
  const absVal = Math.abs(amount);

  if (currency === 'INR') {
    // Format using Indian grouping
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
