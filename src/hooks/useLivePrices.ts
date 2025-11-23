import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTokenPrice, setWSConnected } from '@/lib/redux/slices/tokensSlice';
import { RootState } from '@/lib/redux/store';

export const useLivePrices = () => {
  const dispatch = useDispatch();
  const tokens = useSelector((state: RootState) => state.tokens.items);

  useEffect(() => {
    if (tokens.length === 0) return;

    dispatch(setWSConnected(true));

    const interval = setInterval(() => {
      tokens.forEach(token => {
        if (Math.random() < 0.3) {
          const change = (Math.random() - 0.5) * 0.15;
          const newPrice = Math.max(token.price + change, 0.001);
          const direction = newPrice > token.price ? 'up' : 'down';

          dispatch(updateTokenPrice({
            tokenId: token.id,
            newPrice,
            direction: direction as 'up' | 'down',
          }));
        }
      });
    }, 2500);

    return () => {
      clearInterval(interval);
      dispatch(setWSConnected(false));
    };
  }, [tokens, dispatch]);
};