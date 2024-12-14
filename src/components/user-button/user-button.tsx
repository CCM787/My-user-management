import { FC } from "react";
import { ButtonProps } from "../../types/common";

export const UserButton: FC<ButtonProps> = ({ onClick, label, className }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${
        className || ""
      }`}
    >
      {label}
    </button>
  );
};
