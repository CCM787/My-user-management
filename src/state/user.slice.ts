import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/common";

interface UserState {
  users: User[];
  selectedUser: User | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    selectUser(state, action: PayloadAction<number>) {
      state.selectedUser =
        state.users.find((user) => user.id === action.payload) || null;
    },
  },
});

export const { setUsers, addUser, selectUser } = userSlice.actions;
export default userSlice.reducer;
