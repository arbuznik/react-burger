import React from "react";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import styles from "./ForgotPasswordPage.module.css";
import api from "../../utils/api";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { values, handleChange } = useForm();
  const { email = "" } = values;

  const handleSubmit = () => {
    api.resetPassword(email).then((data) => {
      if (data.success) {
        navigate("/reset-password", { replace: true });
      }
    });
  };

  return (
    <div>
      <main className={styles.main}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <EmailInput
          value={email}
          name="email"
          placeholder="Укажите e-mail"
          onChange={handleChange}
        />
        <Button
          htmlType="submit"
          extraClass={styles.button}
          onClick={handleSubmit}
        >
          Восстановить
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

export default ForgotPasswordPage;
