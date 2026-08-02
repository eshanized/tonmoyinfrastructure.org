'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { CapitalAllocation } from '@/lib/types';

const colors = [
  'hsl(var(--brand))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--muted-foreground))',
  'hsl(var(--border))',
];

interface CapitalAllocationChartProps {
  data: CapitalAllocation[];
}

export function CapitalAllocationChart({
  data,
}: CapitalAllocationChartProps) {
  return (
    <div className="flex flex-col items-center gap-6 md:flex-row">
      <div className="h-[220px] w-[220px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="percentage"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={2}
              stroke="hsl(var(--background))"
              strokeWidth={2}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '12px',
              }}
              formatter={(value: number) => [`${value}%`, 'Allocation']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1">
        <ul className="space-y-2">
          {data.map((item, i) => (
            <li key={item.label} className="flex items-center gap-3">
              <span
                className="h-3 w-3 flex-shrink-0"
                style={{ backgroundColor: colors[i % colors.length] }}
              />
              <span className="flex-1 text-sm text-muted-foreground">
                {item.label}
              </span>
              <span className="font-mono text-sm font-medium">
                {item.percentage}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
