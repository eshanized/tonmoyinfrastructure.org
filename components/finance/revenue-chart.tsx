'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import type { RevenueStream } from '@/lib/types';
import type { SupportedCurrency } from '@/lib/portfolio-economics/decimal';
import { useContainerWidth } from '@/components/shared/use-container-width';

interface RevenueChartProps {
  data: RevenueStream[];
  currencySymbol: string;
  currency?: SupportedCurrency;
}

function formatChartValue(value: number, symbol: string, currency?: SupportedCurrency): string {
  const isSouthAsian = currency === 'INR' || currency === 'BDT' || symbol === '₹' || symbol === '৳';
  if (isSouthAsian) {
    const lakh = value / 100000;
    return `${symbol}${lakh.toFixed(1)}L`;
  }
  if (value >= 1000000) {
    return `${symbol}${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${symbol}${(value / 1000).toFixed(0)}K`;
  }
  return `${symbol}${value}`;
}

export function RevenueChart({ data, currencySymbol, currency = 'INR' }: RevenueChartProps) {
  const { containerRef, width: containerWidth } = useContainerWidth(600);

  const chartData = data.map((d) => ({
    ...d,
    label: d.label.length > 25 ? d.label.slice(0, 25) + '...' : d.label,
  }));

  const isSouthAsian = currency === 'INR' || currency === 'BDT' || currencySymbol === '₹' || currencySymbol === '৳';

  return (
    <div ref={containerRef} className="h-[300px] w-full min-w-0 overflow-hidden">
      <BarChart
        width={containerWidth}
        height={300}
        data={chartData}
        layout="vertical"
        margin={{ top: 8, right: 16, bottom: 8, left: 120 }}
      >
        <XAxis
          type="number"
          tickFormatter={(v) => formatChartValue(v, currencySymbol, currency)}
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
          fontFamily="var(--font-fira-sans)"
        />
        <YAxis
          type="category"
          dataKey="label"
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
          fontFamily="var(--font-fira-sans)"
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
            fontFamily: 'var(--font-fira-sans)',
            fontSize: '12px',
          }}
          formatter={(value: number) => [
            isSouthAsian
              ? `${currencySymbol}${(value / 100000).toFixed(2)} lakh`
              : `${currencySymbol}${Math.round(value).toLocaleString('en-US')}`,
            'Revenue',
          ]}
        />
        <Bar dataKey="amount" minPointSize={0} radius={[0, 2, 2, 0]}>
          {chartData.map((_, i) => (
            <Cell
              key={i}
              fill={i === 0 ? 'hsl(var(--brand))' : 'hsl(var(--chart-2))'}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
