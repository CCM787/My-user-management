import { User } from "../types/common";

export const loadUsersFromLocalStorage = (): User[] => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const saveUsersToLocalStorage = (users: User[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};
