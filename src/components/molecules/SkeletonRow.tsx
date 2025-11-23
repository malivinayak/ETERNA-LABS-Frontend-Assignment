import React from 'react';

export const SkeletonRow: React.FC = () => (
  <tr className="border-b border-purple-900/20 hover:bg-purple-900/5 transition-colors">
    {[1, 2, 3, 4, 5].map(i => (
      <td key={i} className="px-6 py-4">
        <div className="h-4 bg-gradient-to-r from-purple-900/30 to-purple-900/10 rounded animate-shimmer w-24" />
      </td>
    ))}
  </tr>
);