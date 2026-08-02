'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';
import type { BalanceSheetItem } from '@/lib/types';

interface BalanceSheetChartProps {
  assets: BalanceSheetItem[];
  liabilities: BalanceSheetItem[];
  equity: BalanceSheetItem[];
  currencySymbol: string;
}

export function BalanceSheetChart({
  assets,
  liabilities,
  equity,
  currencySymbol,
}: BalanceSheetChartProps) {
  const data = [
    {
      category: 'Assets',
      items: assets,
      color: 'hsl(var(--chart-2))',
    },
    {
      category: 'Liabilities',
      items: liabilities,
      color: 'hsl(var(--destructive))',
    },
    {
      category: 'Equity',
      items: equity,
      color: 'hsl(var(--brand))',
    },
  ];

  const chartData = data.map((d) => ({
    category: d.category,
    total: d.items.reduce((sum, item) => sum + item.amount, 0),
    color: d.color,
  }));

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
        >
          <XAxis
            dataKey="category"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            fontFamily="var(--font-jetbrains)"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${currencySymbol}${(v / 100000).toFixed(0)}L`}
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            fontFamily="var(--font-jetbrains)"
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '12px',
            }}
            formatter={(value: number) => [
              `${currencySymbol}${(value / 100000).toFixed(2)} lakh`,
              'Total',
            ]}
          />
          <Bar dataKey="total" radius={[2, 2, 0, 0]}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
