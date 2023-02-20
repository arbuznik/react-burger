import React, { useEffect } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  getUpdateUserError,
  logoutUser,
  updateUser,
} from "../../services/slices/user";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const error = useSelector(getUpdateUserError);
  const user = useSelector(getCurrentUser);
  const { values, handleChange, setStartingValues } = useForm();
  let { name = "", email = "", password = "" } = values;

  useEffect(() => {
    if (user) {
      setStartingValues(user);
    }
  }, [user, setStartingValues]);

  const linkClassName = ({ isActive }) => {
    return clsx(
      "text text_type_main-medium",
      isActive ? "menu-link_active" : "menu-link_inactive"
    );
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleReset = () => {
    if (user) {
      setStartingValues(user);
    }
  };

  const handleSubmit = () => {
    dispatch(updateUser(values));
  };

  return (
    <main className={styles.main}>
      <div>
        <nav>
          <ul>
            <li className={styles.profileLink}>
              <NavLink to="/profile" className={linkClassName}>
                Профиль
              </NavLink>
            </li>
            <li className={styles.profileLink}>
              <NavLink to="orders" className={linkClassName}>
                История заказов
              </NavLink>
            </li>
            <li className={styles.profileLink}>
              <button
                className={clsx(styles.button, "text text_type_main-medium")}
                onClick={handleLogout}
              >
                Выход
              </button>
            </li>
          </ul>
        </nav>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={styles.form}>
        <Input
          value={name}
          name="name"
          placeholder="Имя"
          onChange={handleChange}
        />
        <Input
          value={email}
          name="email"
          placeholder="Логин"
          onChange={handleChange}
        />
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
        <div className={styles.buttons}>
          <Button onClick={handleReset} htmlType="reset" type="secondary">
            Отмена
          </Button>
          <Button onClick={handleSubmit} htmlType="submit">
            Сохранить
          </Button>
        </div>
      </form>
    </main>
  );
};

export default ProfilePage;
