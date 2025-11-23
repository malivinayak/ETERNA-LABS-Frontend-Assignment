import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { SortOrder } from '@/lib/redux/types';

interface SortIconProps {
  isActive: boolean;
  order?: SortOrder;
}

export const SortIcon: React.FC<SortIconProps> = ({ isActive, order = 'asc' }) => {
  if (!isActive) return <div className="w-4 h-4" />;
  return order === 'asc' ? (
    <ChevronUp size={16} className="text-purple-300" />
  ) : (
    <ChevronDown size={16} className="text-purple-300" />
  );
};