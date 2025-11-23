'use client';

import React from 'react';
import { useTokenTableState } from '@/hooks/useTokenTableState';
import { TokenCategory } from '@/lib/redux/types';
import { Button } from '@/components/atoms/Button';

const TABS: Array<{ id: TokenCategory; label: string }> = [
  { id: 'new-pairs', label: 'New Pairs' },
  { id: 'final-stretch', label: 'Final Stretch' },
  { id: 'migrated', label: 'Migrated' },
];

export const TabNav: React.FC = () => {
  const { activeTab, handleTabChange } = useTokenTableState();

  return (
    <div className="flex gap-4 mb-8 flex-wrap">
      {TABS.map(tab => (
        <Button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          variant={activeTab === tab.id ? 'primary' : 'secondary'}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};