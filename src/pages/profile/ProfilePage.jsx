import React from "react";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const { values, handleChange } = useForm();
  const { name = "", login = "", password = "" } = values;

  return (
    <main className={styles.main}>
      <div>
        <nav>
          <ul>
            <li className={styles.profileLink}>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text text_type_main-medium menu-link_active"
                    : "text text_type_main-medium menu-link_inactive"
                }
              >
                Профиль
              </NavLink>
            </li>
            <li className={styles.profileLink}>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive
                    ? "text text_type_main-medium menu-link_active"
                    : "text text_type_main-medium menu-link_inactive"
                }
              >
                История заказов
              </NavLink>
            </li>
            <li className={styles.profileLink}>
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  isActive
                    ? "text text_type_main-medium menu-link_active"
                    : "text text_type_main-medium menu-link_inactive"
                }
              >
                Выход
              </NavLink>
            </li>
          </ul>
        </nav>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={styles.inputs}>
        <Input
          value={name}
          name="name"
          placeholder="Имя"
          onChange={handleChange}
        />
        <Input
          value={login}
          name="login"
          placeholder="Логин"
          onChange={handleChange}
        />
        <PasswordInput
          value={password}
          name="password"
          onChange={handleChange}
        />
      </div>
    </main>
  );
};

export default ProfilePage;
