import { useParams, useNavigate } from "react-router-dom";
import BasePage from "./BasePage";
import { useClientForm } from "../hooks/useClientForm";

const ClientForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
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
    } = useClientForm({ clientId: id });

    const pageTitle = isEditMode ? "Edit Client" : "New Client";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await saveClient();
        if (success) {
            // Navigate back to clients list
            navigate("/clients");
        }
    };

    if (isLoading) {
        return (
            <BasePage>
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading client data...</div>
                </div>
            </BasePage>
        );
    }

    return (
        <BasePage className="bg-gray-50">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                    {/* Name field */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            Name*
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter client name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone field */}
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                            Phone*
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="123-456-7890"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    {/* Address field */}
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                            Address*
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter client address"
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    {/* Birthday field */}
                    <div className="mb-4">
                        <label htmlFor="birthday" className="block text-gray-700 font-medium mb-2">
                            Birthday
                        </label>
                        <input
                            type="date"
                            id="birthday"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    {/* Status field */}
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                            Status*
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="pending">Pending</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                    </div>

                    {/* Allergies field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Allergies
                        </label>
                        <div className="flex mb-2">
                            <input
                                type="text"
                                value={allergyInput}
                                onChange={(e) => setAllergyInput(e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded-l"
                                placeholder="Add an allergy"
                            />
                            <button
                                type="button"
                                onClick={handleAddAllergy}
                                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                            >
                                Add
                            </button>
                        </div>

                        {formData.allergies.length > 0 && (
                            <div className="mt-2">
                                <p className="text-gray-700 mb-1">Current allergies:</p>
                                <ul className="bg-gray-50 p-2 rounded">
                                    {formData.allergies.map((allergy, index) => (
                                        <li key={index} className="flex justify-between items-center mb-1 last:mb-0">
                                            <span>{allergy}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveAllergy(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Notes section */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Notes
                        </label>
                        <div className="flex mb-2">
              <textarea
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-l"
                  placeholder="Add a note"
                  rows={3}
              />
                            <button
                                type="button"
                                onClick={handleAddNote}
                                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 self-stretch"
                            >
                                Add
                            </button>
                        </div>

                        {formData.notes && formData.notes.length > 0 && (
                            <div className="mt-2">
                                <p className="text-gray-700 mb-1">Client notes:</p>
                                <div className="bg-gray-50 p-2 rounded">
                                    {formData.notes.map((note) => (
                                        <div key={note.id} className="mb-3 p-2 bg-white rounded shadow-sm">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(note.date).toLocaleDateString()}
                                                    </p>
                                                    <p className="mt-1">{note.note}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveNote(note.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Form actions */}
                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/clients")}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                        >
                            {isSaving ? (isEditMode ? "Saving..." : "Creating...") : (isEditMode ? "Save Changes" : "Create Client")}
                        </button>
                    </div>
                </form>
            </div>
        </BasePage>
    );
};

export default ClientForm;