import {configureStore} from '@reduxjs/toolkit';
import storage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
// file import:
import CartSlice from './CartSlice';
import ComSlice from './ComSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
  // A white list is a which slice only update to async storage.
};

const reducer = combineReducers({
  cart: CartSlice,
  commen: ComSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
