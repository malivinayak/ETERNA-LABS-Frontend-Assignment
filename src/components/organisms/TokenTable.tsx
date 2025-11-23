'use client';

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { useTokenTableState } from '@/hooks/useTokenTableState';
import { SortField, Token, TokenCategory } from '@/lib/redux/types';
import { TokenTableRow } from '@/components/molecules/TokenTableRow';
import { SkeletonRow } from '@/components/molecules/SkeletonRow';
import { SortIcon } from '@/components/atoms/SortIcon';
import { Button } from '@/components/atoms/Button';

interface TokenTableProps {
  tokens: Token[];
  isLoading: boolean;
  isError: boolean;
}

export const TokenTable: React.FC<TokenTableProps> = ({ tokens, isLoading, isError }) => {
  const { sortField, sortOrder, activeTab, handleSortChange, handleSelectToken } = useTokenTableState();

  const filteredTokens = useMemo(() => {
    return tokens.filter(t => t.category === activeTab);
  }, [tokens, activeTab]);

  const sortedTokens = useMemo(() => {
    const sorted = [...filteredTokens].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      return 0;
    });

    return sorted;
  }, [filteredTokens, sortField, sortOrder]);

  const categoryLabels: Record<TokenCategory, string> = {
    'new-pairs': 'New Pairs',
    'final-stretch': 'Final Stretch',
    'migrated': 'Migrated',
  };

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Error loading tokens</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-amber-300">
          {categoryLabels[activeTab]}
        </h3>
        {!isLoading && <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />}
      </div>

      <div className="overflow-x-auto rounded-lg border border-purple-900/30 bg-purple-950/30 backdrop-blur-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-purple-900/30 bg-purple-900/20">
              {(['symbol', 'name', 'price', 'change24h', 'volume'] as SortField[]).map(field => (
                <th key={field} className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSortChange(field)}
                    className="flex items-center gap-2 font-semibold text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    {field === 'symbol' && 'Symbol'}
                    {field === 'name' && 'Name'}
                    {field === 'price' && 'Price'}
                    {field === 'change24h' && '24h Change'}
                    {field === 'volume' && 'Volume'}
                    <SortIcon isActive={sortField === field} order={sortOrder} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => <SkeletonRow key={i} />)
            ) : (
              sortedTokens.map(token => (
                <TokenTableRow
                  key={token.id}
                  token={token}
                  onSelect={handleSelectToken}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};