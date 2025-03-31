import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientsState, Client } from '../types';

const initialState: ClientsState = {
    clients: [],
};

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        addClient: (state, action: PayloadAction<Client>) => {
            state.clients.push(action.payload);
        },
        updateClient: (state, action: PayloadAction<Client>) => {
            const index = state.clients.findIndex(client => client.id === action.payload.id);
            if (index !== -1) {
                state.clients[index] = action.payload;
            }
        },
        removeClient: (state, action: PayloadAction<string>) => {
            state.clients = state.clients.filter(client => client.id !== action.payload);
        },
    },
});

export const { addClient, updateClient, removeClient } = clientsSlice.actions;
export default clientsSlice.reducer;