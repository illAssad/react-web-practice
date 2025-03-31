import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import clientsReducer from './slices/clientsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        clients: clientsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;