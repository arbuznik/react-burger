import React from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { useForm } from "../../hooks/useForm";
import { getLoginError, loginUser } from "../../services/slices/user";
import { IUserLoginCredentials } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(getLoginError);
  const { values, handleChange } = useForm<IUserLoginCredentials>({
    email: "",
    password: "",
  });
  const { email, password } = values;

  const handleSubmit = () => {
    dispatch(loginUser(values));
  };

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <EmailInput
          autoFocus
          value={email}
          name="email"
          onChange={handleChange}
        />
        <PasswordInput
          value={password}
          name="password"
          onChange={handleChange}
        />
        {error && (
          <p className="text text_type_main-default text_color_error">
            {error.message}
          </p>
        )}
        <Button htmlType="submit" extraClass={styles.button}>
          Войти
        </Button>
      </form>
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
