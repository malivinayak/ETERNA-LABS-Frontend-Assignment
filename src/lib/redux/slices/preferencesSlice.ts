import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
  reducedMotion: boolean;
  cursorEnabled: boolean;
}

const initialPreferencesState: PreferencesState = {
  reducedMotion: false,
  cursorEnabled: true,
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: initialPreferencesState,
  reducers: {
    setReducedMotion: (state: { reducedMotion: any; }, action: PayloadAction<boolean>) => {
      state.reducedMotion = action.payload;
    },
    setCursorEnabled: (state: { cursorEnabled: any; }, action: PayloadAction<boolean>) => {
      state.cursorEnabled = action.payload;
    },
  },
});

export const { setReducedMotion, setCursorEnabled } = preferencesSlice.actions;
