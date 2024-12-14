import { AppDispatch } from "./store";
import { setUsers } from "./user.slice";
import { getAllUsers } from "../utils/db";

export const initializeData = async (dispatch: AppDispatch) => {
  const usersFromDB = await getAllUsers();
  dispatch(setUsers(usersFromDB));
};
