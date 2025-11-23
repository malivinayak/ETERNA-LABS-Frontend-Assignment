import { configureStore } from '@reduxjs/toolkit';
import { tokensSlice } from './slices/tokensSlice';
import { uiSlice } from './slices/uiSlice';
import { preferencesSlice } from './slices/preferencesSlice';

export const store = configureStore({
  reducer: {
    tokens: tokensSlice.reducer,
    ui: uiSlice.reducer,
    preferences: preferencesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;