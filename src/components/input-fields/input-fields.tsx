import { FC } from "react";
import { InputFieldProps } from "../../types/common";

export const InputField: FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type,
  error,
  onBlur,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={`Введите ${label.toLowerCase()}`}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};
