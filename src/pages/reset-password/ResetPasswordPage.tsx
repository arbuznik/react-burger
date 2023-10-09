import React, { useEffect } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import styles from "./ResetPasswordPage.module.css";
import {
  getResetPasswordError,
  resetPassword,
} from "../../services/slices/user";
import {
  IPasswordResetPayload,
  IUserAuthSuccessUserResponse,
} from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useAppSelector(getResetPasswordError);
  const { values, handleChange } = useForm<IPasswordResetPayload>({
    password: "",
    token: "",
  });
  const { password, token } = values;

  useEffect(() => {
    if (!location?.state?.fromResetPassword) {
      navigate("/");
    }
  });

  const handleSubmit = () => {
    dispatch(resetPassword({ password, token })).then(({ payload }) => {
      if ((payload as IUserAuthSuccessUserResponse)?.success) {
        navigate("/login", { replace: true });
      }
    });
  };

  return (
    <div>
      <main className={styles.main}>
        <h1 className="text text_type_main-medium">Password recovery</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <PasswordInput
            autoFocus
            value={password}
            name="password"
            placeholder="Enter a new password"
            onChange={handleChange}
          />
          <Input
            value={token}
            name="token"
            placeholder="Enter the code from the email"
            onChange={handleChange}
          />
          {error && (
            <p className="text text_type_main-default text_color_error">
              {error.message}
            </p>
          )}
          <Button htmlType="submit" extraClass={styles.button}>
            Save
          </Button>
        </form>
        <p className={"text text_type_main-default text_color_inactive mt-15"}>
          Remember password?
          <Link to="/login" className="text-link ml-2">
            Login
          </Link>
        </p>
      </main>
    </div>
  );
};

export default ResetPasswordPage;
