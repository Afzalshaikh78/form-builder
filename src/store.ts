import { create } from "zustand";

interface formFields{
  label: string;
  type: 'text' | 'number' | 'textarea' | 'password' | 'date' | 'file';
  value: string;
}

interface FormStore {
  formFields: formFields[];
  addField: (field: formFields) => void;
  removeField: (index: number) => void;
  updateField: (index: number, updatedField: formFields) => void;
  resetForm: () => void;
}


export const useFormStore = create<FormStore>((set) => ({
  formFields: [],
  addField: (field) => set((state) => ({
    formFields: [...state.formFields,field]
  }))
  ,
  removeField: (index) => set((state) => ({
    formFields : state.formFields.filter((_,indexField) => indexField !== index)
  })),
  updateField: (index, updatedField) => set((state) => ({
    formFields: state.formFields.map((field, indexField) => indexField === index ? updatedField : field)
  })),
  resetForm: () => set(() => ({
    formFields: []
  }))
}))

