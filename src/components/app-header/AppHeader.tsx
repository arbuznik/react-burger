import React, { FC } from "react";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink } from "react-router-dom";
import styles from "./AppHeader.module.css";
import clsx from "clsx";

const AppHeader: FC = () => {
  const linkClassName = ({ isActive }: { isActive: boolean }) => {
    return clsx(styles.menuLink, "mr-5", {
      [styles.menuLink_inactive]: !isActive,
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <nav className={styles.menuContainer}>
          <ul className={styles.menu}>
            <li>
              <NavLink to="/" className={linkClassName}>
                {({ isActive }) => (
                  <>
                    <BurgerIcon type={isActive ? "primary" : "secondary"} />
                    <p className="text text_type_main-default">Конструктор</p>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/feed" className={linkClassName}>
                {({ isActive }) => (
                  <>
                    <ListIcon type={isActive ? "primary" : "secondary"} />
                    <p className="text text_type_main-default">Лента заказов</p>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
        <Link to="/">
          <Logo />
        </Link>
        <NavLink to="/profile" className={linkClassName}>
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? "primary" : "secondary"} />
              <p className="text text_type_main-default">Личный кабинет</p>
            </>
          )}
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;
