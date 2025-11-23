'use client';

import React, { useState, useCallback } from 'react';
import { Token } from '@/lib/redux/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';

interface TokenTableRowProps {
  token: Token;
  onSelect: (tokenId: string) => void;
}

export const TokenTableRow: React.FC<TokenTableRowProps> = ({ token, onSelect }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const reducedMotion = useSelector((state: RootState) => state.preferences.reducedMotion);

  const handleClick = useCallback(() => {
    onSelect(token.id);
  }, [token.id, onSelect]);

  // Simulate price flash on update
  React.useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 600);
    return () => clearTimeout(timer);
  }, [token.price]);

  const isPositive = token.change24h >= 0;

  return (
    <tr
      onClick={handleClick}
      className={`border-b border-purple-900/20 cursor-pointer group transition-all duration-300 ${
        reducedMotion
          ? 'hover:bg-purple-900/10'
          : 'hover:bg-purple-900/10 hover:shadow-lg hover:shadow-purple-500/20'
      }`}
    >
      <td className="px-6 py-4 font-mono text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-amber-300 group-hover:from-purple-200 group-hover:to-amber-200">
        {token.symbol}
      </td>
      <td className="px-6 py-4 text-sm text-purple-200/70 group-hover:text-purple-200 truncate">
        {token.name}
      </td>
      <td
        className={`px-6 py-4 font-mono text-sm transition-all duration-500 ${
          isUpdating ? 'text-white' : 'text-purple-200/80'
        }`}
        style={{
          backgroundImage: isUpdating && !reducedMotion
            ? `linear-gradient(90deg, transparent, ${isPositive ? 'rgba(168, 85, 247, 0.3)' : 'rgba(251, 146, 60, 0.3)'}, transparent)`
            : 'none',
          backgroundPosition: isUpdating ? '100% 0' : '0 0',
          backgroundSize: isUpdating ? '200% 100%' : '100% 100%',
          animation: isUpdating && !reducedMotion ? 'gradientWipe 0.6s ease-out' : 'none',
        }}
      >
        ${token.price.toFixed(3)}
      </td>
      <td className={`px-6 py-4 font-mono text-sm ${isPositive ? 'text-emerald-400' : 'text-orange-400'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(token.change24h).toFixed(2)}%
      </td>
      <td className="px-6 py-4 text-sm text-purple-200/60">
        ${(token.volume / 1000000).toFixed(2)}M
      </td>
    </tr>
  );
};