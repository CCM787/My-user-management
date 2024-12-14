import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { User } from "../../types/common";
import { getAllUsers } from "../../utils/db";
import { UserButton } from "../../components/user-button/user-button";

export const UserDetailsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);

        const userFromRedux = users.find((user) => user.id === Number(userId));

        if (userFromRedux) {
          setUser(userFromRedux);
        } else {
          const usersFromDB = await getAllUsers();
          const foundUser = usersFromDB.find(
            (user) => user.id === Number(userId)
          );
          if (foundUser) {
            setUser(foundUser);
          } else {
            setError("Пользователь не найден");
          }
        }
      } catch (error) {
        setError("Произошла ошибка при загрузке данных.");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, users]);

  if (isLoading)
    return <p className="text-center text-lg text-gray-500">Загрузка...</p>;
  if (error || !user)
    return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Данные пользователя
      </h1>
      <div className="space-y-4">
        <div>
          <p className="font-medium text-lg text-gray-700">
            <strong>Имя:</strong> {user.name}
          </p>
        </div>
        <div>
          <p className="font-medium text-lg text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <div>
          <p className="font-medium text-lg text-gray-700">
            <strong>Телефон:</strong> {user.phone}
          </p>
        </div>
        <div>
          <p className="font-medium text-lg text-gray-700">
            <strong>Город:</strong> {user.city}
          </p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <UserButton
          onClick={() => window.history.back()}
          label="Вернуться назад"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        />
      </div>
    </div>
  );
};
