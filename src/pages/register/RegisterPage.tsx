import React, { FC } from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import styles from "./RegisterPage.module.css";
import { getRegisterError, registerUser } from "../../services/slices/user";
import { IUserFullCredentials } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(getRegisterError);
  const { values, handleChange } = useForm<IUserFullCredentials>({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = values;

  const handleSubmit = () => {
    dispatch(registerUser(values));
  };

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium">Registration</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          autoFocus
          value={name}
          name="name"
          onChange={handleChange}
          placeholder="Name"
        />
        <EmailInput value={email} name="email" onChange={handleChange} />
        <PasswordInput
          value={password}
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        {error && (
          <p className="text text_type_main-default text_color_error">
            {error.message}
          </p>
        )}
        <Button htmlType="submit" extraClass={styles.button}>
          Register
        </Button>
      </form>
      <p className={"text text_type_main-default text_color_inactive mt-15"}>
        Already registered?
        <Link to="/login" className="text-link ml-2">
          Login
        </Link>
      </p>
    </main>
  );
};

export default RegisterPage;
