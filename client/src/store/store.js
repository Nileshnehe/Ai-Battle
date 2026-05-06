import { configureStore } from '@reduxjs/toolkit';
import battleReducer from '../features/battle/battleSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    battle: battleReducer,
    auth: authReducer,
  },
});

/** @typedef {ReturnType<typeof store.getState>} RootState */
/** @typedef {typeof store.dispatch} AppDispatch */
export const selectBattle = (state) => state.battle;
export const selectAuth = (state) => state.auth;
