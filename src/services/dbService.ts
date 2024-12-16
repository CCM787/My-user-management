import { User } from "../types/common";

export const saveUsersToLocalStorage = (users: User[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};
export const loadUsersFromLocalStorage = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const initializeData = () => {
  const existingData = loadUsersFromLocalStorage();
  if (existingData.length === 0) {
    const initialUsers = [
      {
        id: 1,
        name: "Иван Петров",
        email: "123@gmail.com",
        phone: "88005553535",
        city: "Москва",
      },
      {
        id: 2,
        name: "Петр Иванов",
        email: "321@gmail.com",
        phone: "81231232323",
        city: "Пермь",
      },
    ];
    saveUsersToLocalStorage(initialUsers);
  }
};
