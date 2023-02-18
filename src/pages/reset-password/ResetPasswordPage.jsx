import React from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import api from "../../utils/api";
import styles from "./ResetPasswordPage.module.css";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { values, handleChange } = useForm();
  const { password = "", token = "" } = values;

  const handleSubmit = () => {
    api.resetPasswordWithToken(password, token).then((data) => {
      if (data.success) {
        navigate("/login", { replace: true });
      }
    });
  };

  return (
    <div>
      <main className={styles.main}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput
          value={password}
          name="password"
          placeholder="Введите новый пароль"
          onChange={handleChange}
        />
        <Input
          value={token}
          name="token"
          placeholder="Введите код из письма"
          onChange={handleChange}
        />
        <Button
          htmlType="submit"
          extraClass={styles.button}
          onClick={handleSubmit}
        >
          Сохранить
        </Button>
        <p className={"text text_type_main-default text_color_inactive mt-15"}>
          Вспомнили пароль?
          <Link to="/login" className="text-link ml-2">
            Войти
          </Link>
        </p>
      </main>
    </div>
  );
};

export default ResetPasswordPage;
