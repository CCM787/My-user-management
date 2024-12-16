import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormErrors, User } from "../../types/common";
import { required, emailValid, phoneValid, nameValid } from "./validation";
import { Path } from "../../routes";
import { UserButton } from "../../components/user-button/user-button";
import { addUserToDbAndRedux } from "../../utils/user-service";
import { InputField } from "../../components/input-fields/input-fields";
import { toast } from "react-toastify";

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

  const validate = (): boolean => {
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
      try {
        const newUser: User = { name, email, phone, city };
        await addUserToDbAndRedux(newUser, dispatch);

        toast.success("Пользователь успешно добавлен!");

        setName("");
        setEmail("");
        setPhone("");
        setCity("");

        navigate(Path.Home);
      } catch (error) {
        console.error("Ошибка при добавлении пользователя:", error);

        toast.error("Произошла ошибка. Попробуйте снова.");
      }
    } else {
      toast.warn("Пожалуйста, исправьте ошибки в форме.");
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
        <InputField
          label="Имя"
          value={name}
          onChange={setName}
          type="text"
          error={errors.name}
          onBlur={() => setErrors({ ...errors, name: required(name) })}
        />

        <InputField
          label="Электронная почта"
          value={email}
          onChange={setEmail}
          type="email"
          error={errors.email}
          onBlur={() => setErrors({ ...errors, email: emailValid(email) })}
        />

        <InputField
          label="Телефон"
          value={phone}
          onChange={setPhone}
          type="text"
          error={errors.phone}
          onBlur={() => setErrors({ ...errors, phone: phoneValid(phone) })}
        />

        <InputField
          label="Город"
          value={city}
          onChange={setCity}
          type="text"
          error={errors.city}
          onBlur={() => setErrors({ ...errors, city: required(city) })}
        />

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
