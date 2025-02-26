import { configureStore } from '@reduxjs/toolkit';
import { api } from '../features/api';
import selectedItemsReducer from '../features/selectedItemsSlice';
import currentPageReducer from '../features/currentPageSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    selection: selectedItemsReducer,
    currentPage: currentPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
