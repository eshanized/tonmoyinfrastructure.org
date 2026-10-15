'use client';

import React from 'react';
import {
  type SupportedCurrency,
  SUPPORTED_CURRENCIES,
  CURRENCY_CONFIG,
  EXCHANGE_RATE_DISCLOSURE,
} from '@/lib/portfolio-economics/decimal';
import { usePortfolioCurrency } from './currency-context';
import { ArrowLeftRight, Coins } from 'lucide-react';

interface CurrencySelectorProps {
  value?: SupportedCurrency;
  onChange?: (currency: SupportedCurrency) => void;
  showDisclosure?: boolean;
  compact?: boolean;
  className?: string;
  label?: string;
}

export function CurrencySelector({
  value,
  onChange,
  showDisclosure = false,
  compact = false,
  className = '',
  label = 'Currency',
}: CurrencySelectorProps) {
  const context = usePortfolioCurrency();
  const activeCurrency = value ?? context.currency;
  const setCurrency = onChange ?? context.setCurrency;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center gap-2">
        {label && (
          <span className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            <Coins className="h-3 w-3 text-brand" />
            {label}:
          </span>
        )}
        <div
          role="group"
          aria-label="Currency selection"
          className="inline-flex items-center border border-border bg-card p-0.5"
        >
          {SUPPORTED_CURRENCIES.map((code) => {
            const config = CURRENCY_CONFIG[code];
            const isActive = activeCurrency === code;
            return (
              <button
                key={code}
                type="button"
                aria-pressed={isActive}
                onClick={() => setCurrency(code)}
                className={`relative px-2.5 py-1 text-xs font-mono font-medium transition-all ${
                  compact ? 'px-2 py-0.5 text-[11px]' : ''
                } ${
                  isActive
                    ? 'bg-brand text-brand-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
                title={`Convert view to ${config.name} (${config.symbol})`}
              >
                <span>{config.code}</span>
                <span className="ml-1 opacity-80">({config.symbol})</span>
              </button>
            );
          })}
        </div>
      </div>

      {showDisclosure && (
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
          <ArrowLeftRight className="h-3 w-3 text-brand/70 shrink-0" />
          <span>{EXCHANGE_RATE_DISCLOSURE}</span>
        </div>
      )}
    </div>
  );
}
