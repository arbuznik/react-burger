import React from 'react';
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const handleChange = () => {

    }

    return (
        <main className={styles.main}>
            <h1 className='text text_type_main-medium'>Вход</h1>
            <EmailInput value={''} onChange={handleChange} />
            <PasswordInput value={''} onChange={handleChange} />
            <Button htmlType='primary' extraClass={styles.button}>Войти</Button>
            <div className={styles.links}>
                <p className='text text_type_main-default text_color_inactive'>Вы — новый пользователь? <Link to='/register' className='text-link'>Зарегистрироваться</Link></p>
                <p className='text text_type_main-default text_color_inactive'>Забыли пароль? <Link to='/forgot-password' className='text-link'>Восстановить пароль</Link></p>
            </div>
        </main>
    );
};

export default LoginPage;