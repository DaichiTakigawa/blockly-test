import { blocklySlice } from './slice';

export * from './state';
export * from './selectors';

export const { saveWorkspace, setResult } = blocklySlice.actions;

export default blocklySlice.reducer;
