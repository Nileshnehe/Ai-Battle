import { createAsyncThunk } from '@reduxjs/toolkit';
import { postGenerate } from '../../services/api';

export const generateBattle = createAsyncThunk(
  'battle/generate',
  async (question, { rejectWithValue }) => {
    try {
      const data = await postGenerate(question);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || err.message || 'Request failed'
      );
    }
  }
);
