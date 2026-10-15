'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  type SupportedCurrency,
  SUPPORTED_CURRENCIES,
  CURRENCY_CONFIG,
  EXCHANGE_RATE_DISCLOSURE,
  convertCurrency,
  formatCurrency,
  formatMultiCurrency,
  getCurrencySymbol,
} from '@/lib/portfolio-economics/decimal';

interface PortfolioCurrencyContextType {
  currency: SupportedCurrency;
  setCurrency: (currency: SupportedCurrency) => void;
  currencies: SupportedCurrency[];
  exchangeRateDisclosure: string;
  convert: (amount: number | null | undefined, fromCurrency?: string) => number | null;
  format: (amount: number | null | undefined, fromCurrency?: string, placeholder?: string) => string;
  formatMulti: (amount: number | null | undefined, fromCurrency?: string) => {
    usd: string;
    inr: string;
    bdt: string;
  };
  symbol: string;
}

const defaultContext: PortfolioCurrencyContextType = {
  currency: 'INR',
  setCurrency: () => {},
  currencies: SUPPORTED_CURRENCIES,
  exchangeRateDisclosure: EXCHANGE_RATE_DISCLOSURE,
  convert: (amt, from = 'INR') => convertCurrency(amt, from, 'INR'),
  format: (amt, from = 'INR', placeholder = 'Not Tracked') =>
    formatCurrency(convertCurrency(amt, from, 'INR'), 'INR', placeholder),
  formatMulti: (amt, from = 'INR') => formatMultiCurrency(amt, from),
  symbol: '₹',
};

const PortfolioCurrencyContext = createContext<PortfolioCurrencyContextType>(defaultContext);

export function PortfolioCurrencyProvider({
  children,
  defaultCurrency = 'INR',
}: {
  children: React.ReactNode;
  defaultCurrency?: SupportedCurrency;
}) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>(defaultCurrency);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tiv-portfolio-currency');
      if (saved && (saved === 'USD' || saved === 'INR' || saved === 'BDT')) {
        setCurrencyState(saved as SupportedCurrency);
      }
    } catch {
      // Ignore localStorage errors (e.g. iframe or incognito)
    }
  }, []);

  const setCurrency = (c: SupportedCurrency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('tiv-portfolio-currency', c);
    } catch {
      // Ignore
    }
  };

  const convert = (amount: number | null | undefined, fromCurrency = 'INR'): number | null => {
    return convertCurrency(amount, fromCurrency, currency);
  };

  const format = (
    amount: number | null | undefined,
    fromCurrency = 'INR',
    placeholder = 'Not Tracked'
  ): string => {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return placeholder;
    }
    const converted = convertCurrency(amount, fromCurrency, currency);
    return formatCurrency(converted, currency, placeholder);
  };

  const formatMulti = (amount: number | null | undefined, fromCurrency = 'INR') => {
    return formatMultiCurrency(amount, fromCurrency);
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <PortfolioCurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencies: SUPPORTED_CURRENCIES,
        exchangeRateDisclosure: EXCHANGE_RATE_DISCLOSURE,
        convert,
        format,
        formatMulti,
        symbol,
      }}
    >
      {children}
    </PortfolioCurrencyContext.Provider>
  );
}

export function usePortfolioCurrency() {
  return useContext(PortfolioCurrencyContext);
}
