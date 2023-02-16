import React from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { useForm } from "../../hooks/useForm";

const LoginPage = () => {
  const { values, handleChange } = useForm();
  const { email = "", password = "" } = values;

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <EmailInput value={email} name="email" onChange={handleChange} />
      <PasswordInput value={password} name="password" onChange={handleChange} />
      <Button htmlType="submit" extraClass={styles.button}>
        Войти
      </Button>
      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
          <Link to="/register" className="text-link ml-2">
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link to="/forgot-password" className="text-link ml-2">
            Восстановить пароль
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
