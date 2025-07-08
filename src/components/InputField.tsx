import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, required = false }) => (
  <div className="mb-4">
    <label className="block mb-1">{label}</label>
    <input className="border px-3 py-2 w-full" type={type} value={value} onChange={onChange} required={required} />
  </div>
);

export default InputField;
