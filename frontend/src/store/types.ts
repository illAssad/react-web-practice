// Define the shape of our application state
export interface User {
    username: string;
    token: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
}

export interface Client {
    id: string;
    name: string;
    phone: string;
    address: string;
    birthday: string;
    notes: Array<{
        id: string;
        date: string;
        note: string;
        writtenBy?: string;
    }>;
    allergies: string[];
    status: "active" | "inactive";
}

export interface ClientsState {
    clients: Client[];
}

export interface RootState {
    auth: AuthState;
    clients: ClientsState;
}