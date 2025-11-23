'use client';

import React from 'react';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface FilterPopoverProps {
  onNetworkChange?: (network: string) => void;
}

export const FilterPopover: React.FC<FilterPopoverProps> = ({ onNetworkChange }) => {
  const networks = ['all', 'ethereum', 'solana', 'polygon', 'arbitrum'];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="sm">
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 bg-purple-950 border-purple-900/30 text-purple-200">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-purple-300 mb-2">Networks</p>
            <div className="flex flex-wrap gap-2">
              {networks.map(net => (
                <Badge
                  key={net}
                  variant="default"
                  onClick={() => onNetworkChange?.(net)}
                  className="cursor-pointer hover:bg-purple-900/60 transition-colors"
                >
                  {net.charAt(0).toUpperCase() + net.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};