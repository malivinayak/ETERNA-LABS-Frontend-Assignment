import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setTokens, setError } from '@/lib/redux/slices/tokensSlice';
import { Token } from '@/lib/redux/types';

export const useTokens = () => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ['tokens'],
    queryFn: async () => {
      const res = await fetch('/api/tokens');
      if (!res.ok) throw new Error('Failed to fetch tokens');
      const data: Token[] = await res.json();
      dispatch(setTokens(data));
      return data;
    },
    staleTime: 30000,
    gcTime: 10 * 60 * 1000,
  });
};