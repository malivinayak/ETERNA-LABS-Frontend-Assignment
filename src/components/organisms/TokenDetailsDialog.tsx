'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { useTokenTableState } from '@/hooks/useTokenTableState';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/atoms/Button';

export const TokenDetailsDialog: React.FC = () => {
  const { selectedTokenId, handleSelectToken } = useTokenTableState();
  const tokens = useSelector((state: RootState) => state.tokens.items);

  const token = tokens.find(t => t.id === selectedTokenId);

  if (!token) return null;

  return (
    <Dialog open={!!selectedTokenId} onOpenChange={() => handleSelectToken(null)}>
      <DialogContent className="bg-gradient-to-br from-purple-950 to-black border-purple-900/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-amber-300">
            {token.symbol}
          </DialogTitle>
          <DialogDescription className="text-purple-200/60">
            {token.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <DetailRow label="Price" value={`$${token.price.toFixed(4)}`} />
          <DetailRow label="24h Change" value={`${token.change24h > 0 ? '+' : ''}${token.change24h.toFixed(2)}%`} />
          <DetailRow label="24h Volume" value={`$${(token.volume / 1000000).toFixed(2)}M`} />
          <DetailRow label="Liquidity" value={`$${(token.liquidity / 1000000).toFixed(2)}M`} />
          <DetailRow label="Network" value={token.network} />
          <DetailRow
            label="Listed"
            value={new Date(token.timeListed).toLocaleDateString()}
          />
        </div>

        <Button
          onClick={() => handleSelectToken(null)}
          variant="primary"
          className="w-full mt-6"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
  <div className="flex justify-between items-center p-4 bg-purple-900/10 rounded-lg border border-purple-900/20">
    <span className="text-purple-200/70 text-sm">{label}</span>
    <span className="font-mono font-semibold text-white text-sm">{value}</span>
  </div>
);