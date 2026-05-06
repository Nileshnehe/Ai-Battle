import { createSlice } from '@reduxjs/toolkit';
import { generateBattle, fetchChats, fetchChatById } from './battleThunks';

const initialState = {
  status: 'idle',        // 'idle' | 'loading' | 'succeeded' | 'failed'
  result: null,
  error: null,
  historyStatus: 'idle',
  historyError: null,
  history: [],
  selectedChat: null,
  selectedChatId: null,
};

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
      state.selectedChatId = action.payload?.id || null;
      state.status = 'succeeded';
      state.error = null;
    },
    clearSelectedChat(state) {
      state.selectedChat = null;
      state.selectedChatId = null;
      state.status = 'idle';
      state.error = null;
    },
    loadHistoryItem(state, action) {
      const item = state.history.find((h) => h.id === action.payload);
      if (item) {
        state.selectedChat = item;
        state.selectedChatId = item.id;
        state.status = 'succeeded';
        state.error = null;
      }
    },
    clearResult(state) {
      state.result = null;
      state.status = 'idle';
      state.error = null;
      state.selectedChat = null;
      state.selectedChatId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.historyStatus = 'loading';
        state.historyError = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.historyStatus = 'succeeded';
        state.history = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.historyStatus = 'failed';
        state.historyError = action.payload || 'Unable to load chat history.';
      })
      .addCase(generateBattle.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.result = null;
        state.selectedChat = null;
        state.selectedChatId = null;
      })
      .addCase(generateBattle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;

        const newItem = {
          id: action.payload.id,
          question: action.payload.question,
          solution_1: action.payload.solution_1,
          solution_2: action.payload.solution_2,
          judge: action.payload.judge,
          createdAt: action.payload.createdAt,
        };
        state.history.unshift(newItem);
        state.selectedChat = newItem;
        state.selectedChatId = newItem.id;
      })
      .addCase(generateBattle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong. Please try again.';
      })
      .addCase(fetchChatById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchChatById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedChat = action.payload;
        state.selectedChatId = action.payload.id;

        const exists = state.history.some((item) => item.id === action.payload.id);
        if (!exists) {
          state.history.unshift(action.payload);
        }
      })
      .addCase(fetchChatById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to load selected chat.';
      });
  },
});

export const { setSelectedChat, clearSelectedChat, loadHistoryItem, clearResult } = battleSlice.actions;
export default battleSlice.reducer;

