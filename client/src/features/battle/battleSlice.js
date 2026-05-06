import { createSlice } from '@reduxjs/toolkit';
import { generateBattle } from './battleThunks';

const initialState = {
  status: 'idle',        // 'idle' | 'loading' | 'succeeded' | 'failed'
  result: null,
  error: null,
  history: [],           // [{ id, question, result, timestamp }]
  activeHistoryId: null,
};

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    loadHistoryItem(state, action) {
      const item = state.history.find((h) => h.id === action.payload);
      if (item) {
        state.result = item.result;
        state.activeHistoryId = item.id;
        state.status = 'succeeded';
        state.error = null;
      }
    },
    clearResult(state) {
      state.result = null;
      state.status = 'idle';
      state.error = null;
      state.activeHistoryId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateBattle.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.result = null;
        state.activeHistoryId = null;
      })
      .addCase(generateBattle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;

        const newItem = {
          id: Date.now().toString(),
          question: action.payload.problem,
          result: action.payload,
          timestamp: new Date().toISOString(),
        };
        state.history.unshift(newItem);
        state.activeHistoryId = newItem.id;
      })
      .addCase(generateBattle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong. Please try again.';
      });
  },
});

export const { loadHistoryItem, clearResult } = battleSlice.actions;
export default battleSlice.reducer;
