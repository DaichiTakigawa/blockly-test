/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { State } from './state';

const name = 'blockly';

const initialState: State = {};

export const blocklySlice = createSlice({
  name,
  initialState,
  reducers: {
    saveWorkspace: (
      state: State,
      action: PayloadAction<{
        workspace: { [key: string]: any };
        definition: string;
        code: string;
      }>
    ) => {
      state.workspace = action.payload.workspace;
      state.definition = action.payload.definition;
      state.code = action.payload.code;
    },
    setResult: (state: State, action: PayloadAction<{ result: string }>) => {
      state.result = action.payload.result;
    },
  },
});
