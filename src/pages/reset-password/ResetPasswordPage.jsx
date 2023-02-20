import React, { useEffect } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import styles from "./ResetPasswordPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getResetPasswordError,
  resetPassword,
} from "../../services/slices/user";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector(getResetPasswordError);
  const { values, handleChange } = useForm();
  const { password = "", token = "" } = values;

  useEffect(() => {
    if (!location.state.fromResetPassword) {
      navigate("/");
    }
  });

  const handleSubmit = () => {
    dispatch(resetPassword(password, token)).then(({ payload }) => {
      if (payload?.success) {
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
