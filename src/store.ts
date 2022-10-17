import { configureStore } from '@reduxjs/toolkit';
import blocklyReducer from './ducks/blockly';

export const store = configureStore({
  reducer: {
    blockly: blocklyReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
