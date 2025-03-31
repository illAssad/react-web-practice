import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "../types/Client.ts";
import BasePage from "./BasePage.tsx";
import useClients from "../hooks/useClientList.ts";
import { useMemo, useState } from "react";

interface RowProps {
    client: Client;
}

interface TableProps {
    clients: Client[];
}

const ClientTableRow = ({ client }: RowProps) => {
    const nav = useNavigate();

    const handleRowClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).tagName !== 'BUTTON') {
            nav(`/clients/${client.id}`);
        }
    };

    return (
        <tr
            onClick={handleRowClick}
            className="cursor-pointer hover:bg-gray-200 text-black border-b border-gray-300"
        >
            <td className="p-2">{client.name}</td>
            <td className="p-2">{client.phone}</td>
            <td className="p-2">{client.status}</td>
            <td className="p-2">
                <button
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                    onClick={(e) => {
                        e.stopPropagation();
                        nav(`/clients/edit/${client.id}`);
                    }}
                >
                    Edit
                </button>
            </td>
        </tr>
    );
};

const ClientsTable = ({ clients }: TableProps) => {
    return (
        <table className="w-full border-collapse border border-gray-300 text-black">
            <thead className="bg-gray-100">
            <tr>
                <th scope="col" className="p-2 text-left">Client</th>
                <th scope="col" className="p-2 text-left">Phone</th>
                <th scope="col" className="p-2 text-left">Status</th>
                <th scope="col" className="p-2 text-left">Edit</th>
            </tr>
            </thead>
            <tbody>
            {clients.length > 0 ? (
                clients.map((client) => (
                    <ClientTableRow key={client.id} client={client} />
                ))
            ) : (
                <tr>
                    <td colSpan={4} className="p-4 text-center">No results found</td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

const ClientsPage = () => {
    const { clients } = useClients();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const sanitizedSearch = search.trim().toLowerCase();

    const filteredClients = useMemo(() => {
        return clients.filter(client =>
            (sanitizedSearch === "" ||
                client.name.toLowerCase().includes(sanitizedSearch) ||
                client.id.toLowerCase().includes(sanitizedSearch)) &&
            (statusFilter === "" || client.status === statusFilter)
        );
    }, [clients, sanitizedSearch, statusFilter]);

    return (
        <BasePage className="bg-gray-50">
            <h1 className="text-2xl font-bold mb-4">Clients</h1>
            <div className="mb-4 flex gap-4">
                <input
                    type="text"
                    placeholder="Search by name or ID"
                    className="p-2 border rounded w-1/2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="p-2 border rounded"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <ClientsTable clients={filteredClients} />
        </BasePage>
    );
};

export default ClientsPage;
