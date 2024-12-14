import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "../../routes";
import { UserButton } from "../user-button/user-button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { initializeData } from "../../state/init-data";
import { User } from "../../types/common";

export const UserList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const navigate = useNavigate();

  useEffect(() => {
    initializeData(dispatch);
  }, [dispatch]);

  const handleUserClick = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  const handleClick = () => {
    navigate(Path.AddUser);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Список пользователей
      </h1>
      <ul className="space-y-4">
        {users?.map((user: User) => (
          <li
            key={user.id}
            onClick={() => handleUserClick(user.id!)}
            className="p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <div className="font-medium text-lg text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
          </li>
        ))}
      </ul>
      <UserButton
        onClick={handleClick}
        label="Добавить нового пользователя"
        className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      />
    </div>
  );
};
