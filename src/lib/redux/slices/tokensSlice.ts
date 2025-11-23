import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, PriceUpdate } from '../types';

interface TokensState {
  items: Token[];
  loading: boolean;
  error: string | null;
  wsConnected: boolean;
}

const initialState: TokensState = {
  items: [],
  loading: true,
  error: null,
  wsConnected: false,
};

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateTokenPrice: (state, action: PayloadAction<PriceUpdate>) => {
      const token = state.items.find(t => t.id === action.payload.tokenId);
      if (token) {
        token.price = action.payload.newPrice;
      }
    },
    setWSConnected: (state, action: PayloadAction<boolean>) => {
      state.wsConnected = action.payload;
    },
  },
});

export const { setTokens, setLoading, setError, updateTokenPrice, setWSConnected } = tokensSlice.actions;
