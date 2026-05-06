import { createAsyncThunk } from '@reduxjs/toolkit';
import { postChat, getChats, getChat } from '../../services/api';

export const generateBattle = createAsyncThunk(
  'battle/generate',
  async (question, { rejectWithValue }) => {
    try {
      const data = await postChat(question);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || err.message || 'Request failed'
      );
    }
  }
);

export const fetchChats = createAsyncThunk(
  'battle/fetchChats',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getChats();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || err.message || 'Failed to load chat history'
      );
    }
  }
);

export const fetchChatById = createAsyncThunk(
  'battle/fetchChatById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getChat(id);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || err.message || 'Failed to load chat');
    }
  }
);
