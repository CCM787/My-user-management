export const required = (value: string) =>
  value ? "" : "Это поле обязательно";

export const emailValid = (value: string) =>
  /\S+@\S+\.\S+/.test(value) ? "" : "Введите корректный email";

export const phoneValid = (value: string) =>
  /^[8]\d{10}$/.test(value)
    ? ""
    : "Номер телефона вводится согласно шаблону 8XXXXXXXXXX";

export const nameValid = (value: string) =>
  /^[ЁёА-я]+[ЁёА-я ]*?$/.test(value) ? "" : "Введите данные кириллицей";
