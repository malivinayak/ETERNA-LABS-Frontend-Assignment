'use client';

import React, { useRef } from 'react';
import { useCursorTrail } from '@/hooks/useCursorTrail';

export const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useCursorTrail(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ backgroundColor: 'transparent' }}
    />
  );
};