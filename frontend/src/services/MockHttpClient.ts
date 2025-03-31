import { HttpClient, ApiResponse, RequestOptions } from './Http';
import { Client, Note } from "../types/Client.ts";

export class SimpleMockHttpClient implements HttpClient {
    // In-memory data store
    private mockData: {
        clients: Client[];
    };

    constructor(initialData?: { clients?: Client[] }) {
        this.mockData = {
            clients: initialData?.clients || []
        };
    }

    // GET requests
    async get<T = unknown>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
        // Simple delay to mimic network
        await new Promise(resolve => setTimeout(resolve, 100));

        // Match URL patterns
        if (url === '/clients') {
            return {
                data: { clients: this.mockData.clients } as unknown as T,
                status: 200
            };
        }

        // Match /clients/:id pattern
        if (url.match(/^\/clients\/[a-zA-Z0-9-]+$/)) {
            const id = url.split('/').pop() as string;
            const client = this.mockData.clients.find(c => c.id === id);

            if (client) {
                return {
                    data: client as unknown as T,
                    status: 200
                };
            } else {
                return {
                    data: { error: 'Client not found' } as unknown as T,
                    status: 404
                };
            }
        }

        // Default response if no route matches
        return {
            data: { error: 'Not Found' } as unknown as T,
            status: 404
        };
    }

    // POST requests
    async post<T = unknown, D = unknown>(url: string, data?: D, options?: RequestOptions): Promise<ApiResponse<T>> {
        // Simple delay to mimic network
        await new Promise(resolve => setTimeout(resolve, 100));

        // Match URL patterns
        if (url === '/clients') {
            // Add a new client
            const newClient = data as unknown as Client;

            // Ensure it has an ID
            if (!newClient.id) {
                newClient.id = Math.random().toString(36).substr(2, 9);
            }

            this.mockData.clients.push(newClient);

            return {
                data: newClient as unknown as T,
                status: 201
            };
        }

        // Match /clients/:id/notes pattern
        if (url.match(/^\/clients\/[a-zA-Z0-9-]+\/notes$/)) {
            const clientId = url.split('/')[2];
            const client = this.mockData.clients.find(c => c.id === clientId);

            if (client) {
                const newNote = data as unknown as Note;

                // Ensure note has an ID
                if (!newNote.id) {
                    newNote.id = Math.random().toString(36).substr(2, 9);
                }

                // Ensure note has a date
                if (!newNote.date) {
                    newNote.date = new Date().toISOString();
                }

                // Add note to client
                client.notes.push(newNote);

                return {
                    data: newNote as unknown as T,
                    status: 201
                };
            } else {
                return {
                    data: { error: 'Client not found' } as unknown as T,
                    status: 404
                };
            }
        }

        // Default response if no route matches
        return {
            data: { error: 'Not Found' } as unknown as T,
            status: 404
        };
    }

    // PUT requests
    async put<T = unknown, D = unknown>(url: string, data?: D, options?: RequestOptions): Promise<ApiResponse<T>> {
        // Simple delay to mimic network
        await new Promise(resolve => setTimeout(resolve, 100));

        // Match /clients/:id pattern
        if (url.match(/^\/clients\/[a-zA-Z0-9-]+$/)) {
            const id = url.split('/').pop() as string;
            const clientIndex = this.mockData.clients.findIndex(c => c.id === id);

            if (clientIndex >= 0) {
                // Update client, preserving the ID
                const updatedClient = {
                    ...this.mockData.clients[clientIndex],
                    ...data as object,
                    id // Ensure ID doesn't change
                } as Client;

                this.mockData.clients[clientIndex] = updatedClient;

                return {
                    data: updatedClient as unknown as T,
                    status: 200
                };
            } else {
                return {
                    data: { error: 'Client not found' } as unknown as T,
                    status: 404
                };
            }
        }

        // Default response if no route matches
        return {
            data: { error: 'Not Found' } as unknown as T,
            status: 404
        };
    }

    // DELETE requests
    async del<T = unknown>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
        // Simple delay to mimic network
        await new Promise(resolve => setTimeout(resolve, 100));

        // Match /clients/:id pattern
        if (url.match(/^\/clients\/[a-zA-Z0-9-]+$/)) {
            const id = url.split('/').pop() as string;
            const clientIndex = this.mockData.clients.findIndex(c => c.id === id);

            if (clientIndex >= 0) {
                // Remove client
                this.mockData.clients.splice(clientIndex, 1);

                return {
                    data: { success: true } as unknown as T,
                    status: 204
                };
            } else {
                return {
                    data: { error: 'Client not found' } as unknown as T,
                    status: 404
                };
            }
        }

        // Match /clients/:clientId/notes/:noteId pattern
        if (url.match(/^\/clients\/[a-zA-Z0-9-]+\/notes\/[a-zA-Z0-9-]+$/)) {
            const parts = url.split('/');
            const clientId = parts[2];
            const noteId = parts[4];

            const client = this.mockData.clients.find(c => c.id === clientId);

            if (client) {
                const noteIndex = client.notes.findIndex(n => n.id === noteId);

                if (noteIndex >= 0) {
                    // Remove note
                    client.notes.splice(noteIndex, 1);

                    return {
                        data: { success: true } as unknown as T,
                        status: 204
                    };
                } else {
                    return {
                        data: { error: 'Note not found' } as unknown as T,
                        status: 404
                    };
                }
            } else {
                return {
                    data: { error: 'Client not found' } as unknown as T,
                    status: 404
                };
            }
        }

        // Default response if no route matches
        return {
            data: { error: 'Not Found' } as unknown as T,
            status: 404
        };
    }

    // Helper to reset or modify mock data (useful for testing)
    public setMockData(data: { clients: Client[] }): void {
        this.mockData = data;
    }
}

// Create a mock client with initial data
export const mockClient = new SimpleMockHttpClient({
    clients: [
        {
            id: '1',
            name: 'John Doe',
            phone: '123-456-7890',
            address: '123 Main St',
            birthday: '1980-01-01',
            notes: [],
            allergies: ['Peanuts'],
            status: 'active'
        }, {
            id: '2',
            name: 'John Doe2',
            phone: '222-456-7890',
            address: '123 Main St',
            birthday: '1980-01-01',
            notes: [],
            allergies: ['Peanuts'],
            status: 'active'
        }, {
            id: '3',
            name: 'John Doe3',
            phone: '333-456-7890',
            address: '123 Main St',
            birthday: '1980-01-01',
            notes: [],
            allergies: ['Peanuts'],
            status: 'active'
        }
    ]
});