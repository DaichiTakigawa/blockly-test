import { createSelector } from '@reduxjs/toolkit';
import { type AppState } from '../../store';

function getWorkSpaceDpends(state: AppState) {
  return state.blockly.workspace;
}

export const selectWorkSpace = createSelector(
  [getWorkSpaceDpends],
  (workspace) => {
    return workspace;
  }
);

function getCodeDepends(state: AppState) {
  return state.blockly.code;
}

export const selectCode = createSelector([getCodeDepends], (code) => {
  return code;
});

function getResultDepends(state: AppState) {
  return state.blockly.result;
}

export const selectResult = createSelector([getResultDepends], (result) => {
  return result;
});
