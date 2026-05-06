import { configureStore } from '@reduxjs/toolkit';
import battleReducer from '../features/battle/battleSlice';

export const store = configureStore({
  reducer: {
    battle: battleReducer,
  },
});

/** @typedef {ReturnType<typeof store.getState>} RootState */
/** @typedef {typeof store.dispatch} AppDispatch */
export const selectBattle = (state) => state.battle;
