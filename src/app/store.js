import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { testsApi } from './testsApi';
import userSlice from './reducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['token'],
};
const persReducer = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    [testsApi.reducerPath]: testsApi.reducer,
    [userSlice.name]: persReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(testsApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
