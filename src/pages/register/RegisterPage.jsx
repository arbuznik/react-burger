import React from 'react';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./RegisterPage.module.css";


const RegisterPage = () => {
    const handleChange = () => {

    }

    return (
        <main className={styles.main}>
            <h1 className='text text_type_main-medium'>Регистрация</h1>
            <Input value={''} onChange={handleChange} placeholder='Имя' />
            <EmailInput value={''} onChange={handleChange} />
            <PasswordInput value={''} onChange={handleChange} />
            <Button htmlType='primary' extraClass={styles.button}>Зарегистрироваться</Button>
            <p className={styles.text + ' text text_type_main-default text_color_inactive'}>Уже зарегистрированы? <Link to='/register' className='text-link'>Войти</Link></p>
        </main>
    );
};

export default RegisterPage;