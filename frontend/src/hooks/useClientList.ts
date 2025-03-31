import { useEffect, useState } from "react";
import { Client } from "../types/Client.ts";
import { mockClient } from "../services/MockHttpClient.ts";

const useClients = () => {
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        async function fetchClients() {
            try {
                const response = await mockClient.get<{ clients: Client[] }>(`/clients`);
                setClients(response.data.clients);
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        }

        fetchClients();
    }, []);

    return { clients };
};

export default useClients;