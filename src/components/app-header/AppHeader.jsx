import React from "react";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <nav className={styles.menuContainer}>
          <ul className={styles.menu}>
            <li>
              <Link to="/" className={styles.menuLink + " mr-5"}>
                <BurgerIcon type={"primary"} />
                <p className="text text_type_main-default">Конструктор</p>
              </Link>
            </li>
            <li>
              <Link to="/orders" className={styles.menuLink}>
                <ListIcon type={"primary"} />
                <p className="text text_type_main-default">Лента заказов</p>
              </Link>
            </li>
          </ul>
        </nav>
        <Link to="/">
          <Logo />
        </Link>
        <Link to="/profile" className={styles.profileLink}>
          <ProfileIcon type={"primary"} />
          <p className="text text_type_main-default">Личный кабинет</p>
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
