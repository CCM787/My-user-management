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
  name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
}

export interface ButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

export interface UserState {
  users: User[];
  selectedUser: User | null;
}
