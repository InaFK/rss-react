import { combineReducers } from '@reduxjs/toolkit';
import selectedItemsReducer from '../features/selectedItemsSlice';

export const rootReducer = combineReducers({
  selectedItems: selectedItemsReducer,
});
