import { JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BasePage from "./BasePage.tsx";
import useClientDetails from "../hooks/useClientDetails.ts";

const ClientDetailsPage = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const nav = useNavigate();
    const { client, loading } = useClientDetails(id);

    if (loading) return <div className="text-center p-6">Loading...</div>;
    if (!client) return <div className="text-center p-6">Client not found</div>;

    return (
        <BasePage title="Client Details" className="p-6 shadow rounded">
            <h2 className="text-2xl font-bold mb-4">{client.name}</h2>
            <p><strong>Phone:</strong> {client.phone}</p>
            <p><strong>Address:</strong> {client.address}</p>
            <p><strong>Birthday:</strong> {client.birthday}</p>
            <p><strong>Status:</strong> {client.status}</p>
            <p><strong>Allergies:</strong> {client.allergies.length > 0 ? client.allergies.join(", ") : "None"}</p>
            <h3 className="text-xl font-bold mt-4">Notes</h3>
            {client.notes.length > 0 ? (
                <ul className="list-disc pl-5">
                    {client.notes.map((note) => (
                        <li key={note.id}>
                            <p><strong>Date:</strong> {note.date}</p>
                            <p><strong>Note:</strong> {note.note}</p>
                            {note.writtenBy && <p><strong>Written By:</strong> {note.writtenBy}</p>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No notes available.</p>
            )}
            <button
                onClick={() => nav(-1)}
                className="mt-4 px-4 py-2 text-gray-700 border rounded transition hover:bg-gray-200"
            >
                Back
            </button>
        </BasePage>
    );
};

export default ClientDetailsPage;
