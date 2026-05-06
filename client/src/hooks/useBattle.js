import { useDispatch, useSelector } from 'react-redux';
import { generateBattle } from '../features/battle/battleThunks';
import { loadHistoryItem, clearResult } from '../features/battle/battleSlice';

export function useBattle() {
  const dispatch = useDispatch();
  const { status, result, error, history, activeHistoryId } = useSelector(
    (state) => state.battle
  );

  const submitQuestion = (question) => {
    if (question.trim()) dispatch(generateBattle(question.trim()));
  };

  const loadHistory = (id) => dispatch(loadHistoryItem(id));
  const reset = () => dispatch(clearResult());

  return {
    status,
    result,
    error,
    history,
    activeHistoryId,
    isLoading: status === 'loading',
    isSuccess: status === 'succeeded',
    submitQuestion,
    loadHistory,
    reset,
  };
}
