import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  generateBattle,
  fetchChats,
  fetchChatById,
} from '../features/battle/battleThunks';
import { loadHistoryItem, clearSelectedChat, setSelectedChat } from '../features/battle/battleSlice';

const SELECTED_CHAT_KEY = 'ai-battle-selected-chat-id';

export function useBattle() {
  const dispatch = useDispatch();
  const {
    status,
    selectedChat,
    error,
    history,
    selectedChatId,
    historyStatus,
    historyError,
  } = useSelector((state) => state.battle);

  useEffect(() => {
    if (historyStatus === 'idle') {
      dispatch(fetchChats());
    }
  }, [dispatch, historyStatus]);

  useEffect(() => {
    if (historyStatus === 'succeeded' && history.length > 0 && !selectedChat) {
      const storedId = localStorage.getItem(SELECTED_CHAT_KEY);
      if (storedId) {
        const storedChat = history.find((chat) => chat.id === storedId);
        if (storedChat) {
          dispatch(setSelectedChat(storedChat));
        } else {
          // If stored chat not found, try to fetch it
          dispatch(fetchChatById(storedId));
        }
      } else {
        // No stored chat, select the latest one
        dispatch(setSelectedChat(history[0]));
      }
    }
  }, [dispatch, historyStatus, history, selectedChat]);

  const submitQuestion = (question) => {
    if (question.trim()) dispatch(generateBattle(question.trim()));
  };

  const loadHistory = (id) => {
    const item = history.find((h) => h.id === id);
    if (item) {
      dispatch(setSelectedChat(item));
      localStorage.setItem(SELECTED_CHAT_KEY, id);
    } else {
      dispatch(fetchChatById(id));
    }
  };

  const reset = () => {
    dispatch(clearSelectedChat());
    localStorage.removeItem(SELECTED_CHAT_KEY);
  };

  return {
    status,
    selectedChat,
    error,
    history,
    selectedChatId,
    historyStatus,
    historyError,
    isLoading: status === 'loading',
    isSuccess: status === 'succeeded',
    submitQuestion,
    loadHistory,
    reset,
  };
}
