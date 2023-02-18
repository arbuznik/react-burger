import React, { useEffect } from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import styles from "./RegisterPage.module.css";
import { getCurrentUser, registerUser } from "../../services/slices/user";
import { useDispatch, useSelector } from "react-redux";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const navigate = useNavigate();
  const { values, handleChange } = useForm();
  const { name = "", email = "", password = "" } = values;

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = () => {
    dispatch(registerUser(values));
  };

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <Input
        value={name}
        name="name"
        onChange={handleChange}
        placeholder="Имя"
      />
      <EmailInput value={email} name="email" onChange={handleChange} />
      <PasswordInput value={password} name="password" onChange={handleChange} />
      <Button
        htmlType="submit"
        onClick={handleSubmit}
        extraClass={styles.button}
      >
        Зарегистрироваться
      </Button>
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
