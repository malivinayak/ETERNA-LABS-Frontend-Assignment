import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'error' | 'warning';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  const variantClasses = {
    default: 'bg-purple-900/40 text-purple-200 border border-purple-700/40',
    success: 'bg-emerald-900/40 text-emerald-200 border border-emerald-700/40',
    error: 'bg-orange-900/40 text-orange-200 border border-orange-700/40',
    warning: 'bg-amber-900/40 text-amber-200 border border-amber-700/40',
  };

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};