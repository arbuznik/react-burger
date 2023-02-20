import React from "react";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import styles from "./ForgotPasswordPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  getForgotPasswordError,
} from "../../services/slices/user";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(getForgotPasswordError);
  const { values, handleChange } = useForm();
  const { email = "" } = values;

  const handleSubmit = () => {
    dispatch(forgotPassword()).then(({ payload }) => {
      if (payload?.success) {
        navigate("/reset-password", {
          state: {
            fromResetPassword: true,
          },
          replace: true,
        });
      }
    });
  };

  return (
    <div>
      <main className={styles.main}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <form className={styles.form}>
          <EmailInput
            autoFocus
            value={email}
            name="email"
            placeholder="Укажите e-mail"
            onChange={handleChange}
          />
          {error && (
            <p className="text text_type_main-default text_color_error">
              {error.message}
            </p>
          )}
          <Button
            htmlType="submit"
            extraClass={styles.button}
            onClick={handleSubmit}
          >
            Восстановить
          </Button>
        </form>
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
