import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NetworkFilter, SortField, SortOrder, TokenCategory } from "../types";

interface UIState {
  activeTab: TokenCategory;
  sortField: SortField;
  sortOrder: SortOrder;
  selectedTokenId: string | null;
  filters: {
    network: NetworkFilter;
    minLiquidity: number;
    maxVolume: number;
  };
}

const initialUIState: UIState = {
  activeTab: 'new-pairs',
  sortField: 'timeListed',
  sortOrder: 'desc',
  selectedTokenId: null,
  filters: {
    network: 'all',
    minLiquidity: 0,
    maxVolume: Infinity,
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUIState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<TokenCategory>) => {
      state.activeTab = action.payload;
    },
    setSortField: (state, action: PayloadAction<SortField>) => {
      state.sortField = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
    },
    toggleSort: (state, action: PayloadAction<SortField>) => {
      if (state.sortField === action.payload) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortField = action.payload;
        state.sortOrder = 'asc';
      }
    },
    setSelectedToken: (state, action: PayloadAction<string | null>) => {
      state.selectedTokenId = action.payload;
    },
    setNetworkFilter: (state, action: PayloadAction<NetworkFilter>) => {
      state.filters.network = action.payload;
    },
  },
});

export const { setActiveTab, setSortField, setSortOrder, toggleSort, setSelectedToken, setNetworkFilter } = uiSlice.actions;
