import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  generateBattle,
  fetchChats,
  fetchChatById,
} from '../features/battle/battleThunks';
import { loadHistoryItem, clearResult } from '../features/battle/battleSlice';

export function useBattle() {
  const dispatch = useDispatch();
  const {
    status,
    result,
    error,
    history,
    activeHistoryId,
    historyStatus,
    historyError,
  } = useSelector((state) => state.battle);

  useEffect(() => {
    if (historyStatus === 'idle') {
      dispatch(fetchChats());
    }
  }, [dispatch, historyStatus]);

  const submitQuestion = (question) => {
    if (question.trim()) dispatch(generateBattle(question.trim()));
  };

  const loadHistory = (id) => {
    const item = history.find((h) => h.id === id);
    if (item) {
      dispatch(loadHistoryItem(id));
    } else {
      dispatch(fetchChatById(id));
    }
  };

  const reset = () => dispatch(clearResult());

  return {
    status,
    result,
    error,
    history,
    activeHistoryId,
    historyStatus,
    historyError,
    isLoading: status === 'loading',
    isSuccess: status === 'succeeded',
    submitQuestion,
    loadHistory,
    reset,
  };
}
