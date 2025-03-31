import { useEffect, useState } from "react";
import { Client } from "../types/Client.ts";
import { mockClient } from "../services/MockHttpClient.ts";

const useClientDetails = (id: string | undefined) => {
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id) return;

        const fetchClient = async () => {
            try {
                const response = await mockClient.get<Client>(`/clients/${id}`);
                setClient(response.data);
            } catch (error) {
                console.error("Error fetching client:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [id]);

    return { client, loading };
};


export default useClientDetails;