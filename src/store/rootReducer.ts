import { combineReducers } from '@reduxjs/toolkit';
import selectedItemsReducer from './selectedItemsSlice';

export const rootReducer = combineReducers({
  selectedItems: selectedItemsReducer,
});
