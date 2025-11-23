import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';

export const useBlobFollower = (blobRef: React.RefObject<HTMLDivElement>) => {
  const reducedMotion = useSelector((state: RootState) => state.preferences.reducedMotion);

  useEffect(() => {
    if (!blobRef.current || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!blobRef.current) return;
      const rect = blobRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      blobRef.current.style.setProperty('--blob-x', `${x}px`);
      blobRef.current.style.setProperty('--blob-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [blobRef, reducedMotion]);
};