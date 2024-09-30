import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { Provider } from 'react-redux';

// Configuration object for Redux Persist
const persistConfig = {
  key: 'root',          // Key in the storage to save the Redux state
  storage,              // The storage engine to use (localStorage)
};

// Enhanced reducer with persist capabilities
const persistedReducer = persistReducer(persistConfig, usersReducer);

// Configuring the store with the persisted reducer
const store = configureStore({
  reducer: {
    users: persistedReducer,
  },
});

// Create a persisted store
const persistor = persistStore(store);

export { store, persistor };
