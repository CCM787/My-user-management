import { AppDispatch } from "../state/store";
import { addUser as addUserRedux } from "../state/user.slice";
import { addUser as addUserDb } from "./db";
import { User } from "../types/common";

export const addUserToDbAndRedux = async (
  user: User,
  dispatch: AppDispatch
): Promise<number> => {
  const userId = await addUserDb(user);

  dispatch(
    addUserRedux({
      ...user,
      id: userId,
    })
  );

  return userId;
};
