import React from 'react';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './AppHeader.module.css';

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <nav className={styles.menuContainer}>
                    <ul className={styles.menu}>
                        <li>
                            <a className={styles.menuLink + ' mr-5'} href="#">
                                <BurgerIcon type={"primary"} />
                                <p className="text text_type_main-default">Конструктор</p>
                            </a>
                        </li>
                        <li>
                            <a className={styles.menuLink} href="#">
                                <ListIcon type={"primary"} />
                                <p className="text text_type_main-default">Лента заказов</p>
                            </a>
                        </li>
                    </ul>
                </nav>
                <Logo />
                <a className={styles.profileLink} href="#">
                    <ProfileIcon type={"secondary"} />
                    <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
                </a>
            </div>
        </header>
    );
};

export default AppHeader;