import React from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import styles from "./ResetPasswordPage.module.css";

const ResetPasswordPage = () => {
  const { values, handleChange } = useForm();
  const { password = "", code = "" } = values;

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
          value={code}
          name="code"
          placeholder="Введите код из письма"
          onChange={handleChange}
        />
        <Button htmlType="submit" extraClass={styles.button}>
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
