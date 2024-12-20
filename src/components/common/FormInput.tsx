import React from 'react';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  isOptional?: boolean;
}

export function FormInput({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder,
  isOptional = false
}: Props) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}{!isOptional && required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}