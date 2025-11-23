import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setReducedMotion } from '@/lib/redux/slices/preferencesSlice';

export const useReducedMotionPreference = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      dispatch(setReducedMotion(e.matches));
    };

    dispatch(setReducedMotion(mediaQuery.matches));
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch]);
};