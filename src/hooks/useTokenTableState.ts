import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSort, setActiveTab, setSelectedToken } from '@/lib/redux/slices/uiSlice';
import { RootState } from '@/lib/redux/store';
import { SortField, TokenCategory } from '@/lib/redux/types';

export const useTokenTableState = () => {
  const dispatch = useDispatch();
  const { activeTab, sortField, sortOrder, selectedTokenId, filters } = useSelector(
    (state: RootState) => state.ui
  );

  const handleSortChange = useCallback((field: SortField) => {
    dispatch(toggleSort(field));
  }, [dispatch]);

  const handleTabChange = useCallback((tab: TokenCategory) => {
    dispatch(setActiveTab(tab));
  }, [dispatch]);

  const handleSelectToken = useCallback((tokenId: string | null) => {
    dispatch(setSelectedToken(tokenId));
  }, [dispatch]);

  return {
    activeTab,
    sortField,
    sortOrder,
    selectedTokenId,
    filters,
    handleSortChange,
    handleTabChange,
    handleSelectToken,
  };
};