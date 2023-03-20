import React, { FC } from "react";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import styles from "./ForgotPasswordPage.module.css";
import {
  forgotPassword,
  getForgotPasswordError,
} from "../../services/slices/user";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { IUserAuthStatusResponse, IUserEmail } from "../../types/types";

const ForgotPasswordPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(getForgotPasswordError);
  const { values, handleChange } = useForm<IUserEmail>({ email: "" });
  const { email } = values;

  const handleSubmit = () => {
    dispatch(forgotPassword(email)).then(({ payload }) => {
      if ((payload as IUserAuthStatusResponse)?.success) {
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
        <form className={styles.form} onSubmit={handleSubmit}>
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
          <Button htmlType="submit" extraClass={styles.button}>
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
