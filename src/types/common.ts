export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  city: string;
}
export interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: string;
  error: string | null;
  onBlur: () => void;
}

export interface FormErrors {
  name: string | null | undefined;
  email: string | null | undefined;
  phone: string | null | undefined;
  city: string | null | undefined;
}

export interface ButtonProps {
  onClick: () => void;
  label: string;
  className?: string
}
