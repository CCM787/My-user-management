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
    <div>
      <label>{label}:</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};
