export interface Note {
    id: string;
    date: string;
    note: string;
    writtenBy?: string;
}


export interface Client {
    id: string;
    name: string;
    phone: string;
    address: string;
    birthday: string;
    notes: Note[];
    allergies: string[];
    status: "active" | "inactive";
}

export interface ClientList {
    Clients: Client[];
}

