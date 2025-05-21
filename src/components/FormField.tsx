import React from "react";

interface FormFieldProps {
  field: {
    label: string;
    type: "text" | "number" | "password" | "textarea" | "date" | "file";
    value: string;
  };
  index: number;
  onUpdate: (
    index: number,
    updatedField: {
      label: string;
      type: "text" | "number" | "password" | "textarea" | "date" | "file";
      value: string;
    }
  ) => void;
  onRemove: (index: number) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  index,
  onUpdate,
  onRemove,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onUpdate(index, { ...field, value: e.target.value });
  };

  return (
    <div className="mb-4 border p-4 rounded-lg shadow-sm bg-gray-50">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
      </label>

      {field.type === "textarea" ? (
        <textarea
          value={field.value}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md resize-none"
        />
      ) : field.type === "file" ? (
        <input
          type="file"
          onChange={(e) =>
            onUpdate(index, {
              ...field,
              value: e.target.files
                ? Array.from(e.target.files)
                    .map((file) => file.name)
                    .join(", ")
                : "",
            })
          }
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      ) : (
        <input
          type={field.type}
          value={field.value}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      )}

      <button
        type="button"
        onClick={() => onRemove(index)}
        className="mt-2 text-red-600 hover:text-red-800 text-sm"
      >
        Remove
      </button>
    </div>
  );
};

export default FormField;
