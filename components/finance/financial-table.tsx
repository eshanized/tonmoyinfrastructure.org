import { cn } from '@/lib/utils';

interface FinancialTableProps {
  headers: string[];
  rows: { label: string; amount: number; bold?: boolean }[];
  currencySymbol: string;
  totalLabel?: string;
  totalAmount?: number;
  className?: string;
}

function formatAmount(amount: number, symbol: string): string {
  const lakh = amount / 100000;
  return `${symbol}${lakh.toFixed(1)} lakh`;
}

export function FinancialTable({
  headers,
  rows,
  currencySymbol,
  totalLabel,
  totalAmount,
  className,
}: FinancialTableProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            {headers.map((header, i) => (
              <th
                key={i}
                className={cn(
                  'pb-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground',
                  i === headers.length - 1 && 'text-right'
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                'border-b border-border/50',
                row.bold && 'font-semibold text-foreground'
              )}
            >
              <td
                className={cn(
                  'py-2.5 text-sm',
                  row.bold ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {row.label}
              </td>
              <td
                className={cn(
                  'py-2.5 text-right font-mono text-sm tabular-nums',
                  row.bold ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {formatAmount(row.amount, currencySymbol)}
              </td>
            </tr>
          ))}
          {totalLabel && totalAmount !== undefined && (
            <tr className="border-t-2 border-border">
              <td className="pt-3 font-display text-base font-semibold">
                {totalLabel}
              </td>
              <td className="pt-3 text-right font-mono text-base font-semibold tabular-nums text-brand">
                {formatAmount(totalAmount, currencySymbol)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
