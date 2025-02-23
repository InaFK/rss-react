import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { pokemonApi } from '../features/pokemonApi';

export const store = configureStore({
  reducer: {
    ...rootReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
