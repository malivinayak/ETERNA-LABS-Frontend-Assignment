'use client';

import React, { useEffect } from 'react';
import { CursorTrail } from '@/components/molecules/CursorTrail';
import { AnimatedBlob } from '@/components/molecules/AnimatedBlob';
import { TabNav } from '@/components/organisms/TabNav';
import { TokenTable } from '@/components/organisms/TokenTable';
import { TokenDetailsDialog } from '@/components/organisms/TokenDetailsDialog';
import { useTokens } from '@/hooks/useTokens';
import { useLivePrices } from '@/hooks/useLivePrices';
import { useReducedMotionPreference } from '@/hooks/useReducedMotion';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';

export default function PulsePage() {
  useReducedMotionPreference();
  const { data: tokens = [], isLoading, isError } = useTokens();
  useLivePrices();

  const cursorEnabled = useSelector((state: RootState) => state.preferences.cursorEnabled);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black overflow-hidden">
      {cursorEnabled && <CursorTrail />}
      <AnimatedBlob />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-amber-300 to-purple-300 mb-2">
              Spectral Orderbook
            </h1>
            <p className="text-purple-200/60 text-lg">Discover emerging tokens with precision and insight</p>
          </div>

          {/* Tab Navigation */}
          <TabNav />

          {/* Token Table */}
          <TokenTable tokens={tokens} isLoading={isLoading} isError={isError} />
        </div>
      </div>

      {/* Token Details Modal */}
      <TokenDetailsDialog />
    </div>
  );
}