'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { ExpenseCategory } from '@/lib/types';

interface ExpenseChartProps {
  data: ExpenseCategory[];
  currencySymbol: string;
}

export function ExpenseChart({ data, currencySymbol }: ExpenseChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    label: d.label.length > 25 ? d.label.slice(0, 25) + '...' : d.label,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 8, right: 16, bottom: 8, left: 120 }}
        >
          <XAxis
            type="number"
            tickFormatter={(v) => `${currencySymbol}${(v / 100000).toFixed(1)}L`}
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            fontFamily="var(--font-jetbrains)"
          />
          <YAxis
            type="category"
            dataKey="label"
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            fontFamily="var(--font-jetbrains)"
            width={120}
            tickLine={false}
            axisLine={false}
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
              'Expense',
            ]}
          />
          <Bar dataKey="amount" radius={[0, 2, 2, 0]}>
            {chartData.map((_, i) => (
              <Cell
                key={i}
                fill={i === 0 ? 'hsl(var(--brand))' : 'hsl(var(--chart-3))'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
