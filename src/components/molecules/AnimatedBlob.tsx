'use client';

import React, { useRef } from 'react';
import { useBlobFollower } from '@/hooks/useBlobFollower';

export const AnimatedBlob: React.FC = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  useBlobFollower(blobRef);

  return (
    <div
      ref={blobRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        '--blob-x': '50%',
        '--blob-y': '50%',
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-gradient-to-br from-purple-900/30 via-amber-900/20 to-purple-900/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: 'var(--blob-x)',
            top: 'var(--blob-y)',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute w-72 h-72 bg-gradient-to-br from-amber-800/20 to-purple-900/15 rounded-full blur-3xl animate-pulse"
          style={{
            right: '15%',
            bottom: '10%',
            animationDelay: '1s',
            filter: 'blur(60px)',
          }}
        />
      </div>
    </div>
  );
};