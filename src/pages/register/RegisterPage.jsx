import React from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import styles from "./RegisterPage.module.css";
import { getRegisterError, registerUser } from "../../services/slices/user";
import { useDispatch, useSelector } from "react-redux";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(getRegisterError);
  const { values, handleChange } = useForm();
  const { name = "", email = "", password = "" } = values;

  const handleSubmit = () => {
    dispatch(registerUser(values)).then(({ payload }) => {
      if (payload?.success) {
        navigate("/", {
          replace: true,
        });
      }
    });
  };

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          autoFocus
          value={name}
          name="name"
          onChange={handleChange}
          placeholder="Имя"
        />
        <EmailInput value={email} name="email" onChange={handleChange} />
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
          Зарегистрироваться
        </Button>
      </form>
      <p className={"text text_type_main-default text_color_inactive mt-15"}>
        Уже зарегистрированы?
        <Link to="/login" className="text-link ml-2">
          Войти
        </Link>
      </p>
    </main>
  );
};

export default RegisterPage;
