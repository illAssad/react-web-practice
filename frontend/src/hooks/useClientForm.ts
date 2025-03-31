import { useState, useEffect } from "react";
import { Client, Note } from "../types/Client";
import { mockClient } from "../services/MockHttpClient";

// Form validation types
export type ValidationErrors = {
    [key: string]: string;
};

// Initial empty form state
export const emptyClient: Omit<Client, "id"> = {
    name: "",
    phone: "",
    address: "",
    birthday: "",
    allergies: [],
    notes: [],
    status: "active"
};

export type ClientFormData = Omit<Client, "id">;

type UseClientFormProps = {
    clientId?: string;
};

export const useClientForm = ({ clientId }: UseClientFormProps) => {
    const [formData, setFormData] = useState<ClientFormData>(emptyClient);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [allergyInput, setAllergyInput] = useState("");
    const [noteInput, setNoteInput] = useState("");

    const isEditMode = !!clientId;

    // Fetch client data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            setIsLoading(true);

            const fetchClient = async () => {
                try {
                    const response = await mockClient.get<Client>(`/clients/${clientId}`);

                    // The MockHttpClient returns the client directly in response.data
                    const client = response.data;

                    console.log("Fetched client data:", client);

                    // Skip the destructuring and set the whole client (except ID)
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { id, ...clientFormData } = client;
                    setFormData(clientFormData);

                } catch (error) {
                    console.error("Failed to fetch client:", error);
                    // Show error notification or handle error state
                } finally {
                    setIsLoading(false);
                }
            };

            fetchClient();
        }
    }, [clientId, isEditMode]);

    // Form validation
    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) {
            newErrors.phone = "Phone must be in format: 123-456-7890";
        }

        // Address validation
        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        // Status validation
        if (!formData.status) {
            newErrors.status = "Status is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when field is edited
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleAddAllergy = () => {
        if (allergyInput.trim()) {
            setFormData(prev => ({
                ...prev,
                allergies: [...prev.allergies, allergyInput.trim()]
            }));
            setAllergyInput("");
        }
    };

    const handleRemoveAllergy = (index: number) => {
        setFormData(prev => ({
            ...prev,
            allergies: prev.allergies.filter((_, i) => i !== index)
        }));
    };

    // Note management functions
    const handleAddNote = () => {
        if (noteInput.trim()) {
            const newNote: Note = {
                id: Math.random().toString(36).substr(2, 9), // Generate a random ID
                date: new Date().toISOString(),
                note: noteInput.trim()
            };

            setFormData(prev => ({
                ...prev,
                notes: [...prev.notes, newNote]
            }));
            setNoteInput("");
        }
    };

    const handleRemoveNote = (id: string) => {
        setFormData(prev => ({
            ...prev,
            notes: prev.notes.filter(note => note.id !== id)
        }));
    };

    const saveClient = async (): Promise<boolean> => {
        if (!validateForm()) {
            return false;
        }

        setIsSaving(true);

        try {
            if (isEditMode && clientId) {
                // Update existing client
                await mockClient.put(`/clients/${clientId}`, formData);
            } else {
                // Create new client
                await mockClient.post("/clients", formData);
            }

            return true;
        } catch (error) {
            console.error("Failed to save client:", error);
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    return {
        formData,
        errors,
        isLoading,
        isSaving,
        allergyInput,
        noteInput,
        isEditMode,
        setAllergyInput,
        setNoteInput,
        handleChange,
        handleAddAllergy,
        handleRemoveAllergy,
        handleAddNote,
        handleRemoveNote,
        saveClient
    };
};