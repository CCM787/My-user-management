import Dexie from "dexie";
import { User } from "../types/common";

export class MyDatabase extends Dexie {
  users: Dexie.Table<User, number>;

  constructor() {
    super("MyDatabase");
    this.version(1).stores({
      users: "++id, name, email, phone, city",
    });

    this.users = this.table("users");
  }
}

export const db = new MyDatabase();

export const getAllUsers = async (): Promise<User[]> => {
  return db.users.toArray();
};

export const addUser = async (user: User): Promise<number> => {
  const userId = await db.users.add(user);
  return userId;
};
