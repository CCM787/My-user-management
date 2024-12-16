import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser as addUserRedux } from "../../state/user.slice";
import { addUser as addUserDb } from "../../utils/db";
import { FormErrors, User } from "../../types/common";
import { required, emailValid, phoneValid, nameValid } from "./validation";
import { useNavigate } from "react-router-dom";
import { Path } from "../../routes";
import { UserButton } from "../../components/user-button/user-button";

export const AddUserPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState<FormErrors>({
    name: null,
    email: null,
    phone: null,
    city: null,
  });

  const validate = () => {
    const newErrors: FormErrors = {
      name: required(name) || nameValid(name),
      email: required(email) || emailValid(email),
      phone: required(phone) || phoneValid(phone),
      city: required(city),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async () => {
    if (validate()) {
      const newUser: User = { name, email, phone, city };
      const userId = await addUserDb(newUser);

      dispatch(
        addUserRedux({
          ...newUser,
          id: userId,
        })
      );

      alert("Пользователь добавлен!");
      navigate(Path.Home);
      setName("");
      setEmail("");
      setPhone("");
      setCity("");
    } else {
      alert("Пожалуйста, исправьте ошибки.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        Добавить нового пользователя
      </h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Имя</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center"
            placeholder="Введите имя"
            onBlur={() => setErrors({ ...errors, name: required(name) })}
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Электронная почта
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center"
            placeholder="Введите email"
            onBlur={() => setErrors({ ...errors, email: emailValid(email) })}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Телефон
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center"
            placeholder="Введите номер телефона"
            onBlur={() => setErrors({ ...errors, phone: phoneValid(phone) })}
          />
          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Город
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center"
            placeholder="Введите город"
            onBlur={() => setErrors({ ...errors, city: required(city) })}
          />
          {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
        </div>

        <UserButton
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          label="Добавить"
        />
        <div className="mt-6 text-center">
          <UserButton
            onClick={() => window.history.back()}
            label="Вернуться назад"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          />
        </div>
      </form>
    </div>
  );
};
