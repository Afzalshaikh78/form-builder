import React, { type ChangeEvent } from "react";
import { useFormStore } from "../store";
import { useState } from "react";
import FormField from "./FormField";

interface newField {
  label: string;
  type: "text" | "number" | "textarea" | "password" | "date" | "file";
  value: string;
}

const FormBuilider = () => {
  const { formFields, addField, removeField, updateField, resetForm } =
    useFormStore();

  const [newField, setNewField] = useState<newField>({
    label: "",
    type: "text",
    value: "",
  });

  const handleAddField = () => {
    addField(newField);
    setNewField({ label: "", type: "text", value: "" });
  };

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewField((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldUpdate = (index: number, updatedField: newField) => {
    updateField(index, updatedField);
  };

  const handleFieldRemove = (index: number) => {
    removeField(index);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded">
      <h1 className="text-2xl font-bold mb-5 text-center">Form Builder</h1>
      <div className="flex flex-col mb-6">
        <input
          type="text"
          name="label"
          placeholder="filed label"
          value={newField.label}
          onChange={handleFieldChange}
          className="p-2 mb-2 border border-gray-300 rounded-lg "
        />

        <select
          name="type"
          value={newField.type}
          onChange={handleFieldChange}
          className="p-2 mb-4 border border-gray-300 rounded-lg"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="textarea">Textarea</option>
          <option value="password">Password</option>
          <option value="data">Date</option>
        </select>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddField}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Field
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Reset Form
          </button>
        </div>
      </div>

      <form>
        {formFields.map((field, index) => (
          <FormField
            key={index}
            field={field}
            onUpdate={handleFieldUpdate}
            onRemove={handleFieldRemove}
            index={index}
          />
        ))}
      </form>
    </div>
  );
};

export default FormBuilider;
