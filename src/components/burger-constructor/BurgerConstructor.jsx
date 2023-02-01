import React from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { mockData } from "../../utils/data";
import styles from './BurgerConstructor.module.css';

const BurgerConstructor = () => {
    const totalPrice = mockData.reduce((sum, el) => (sum + el.price), 0);

    return (
        <section className={styles.ingredientsContainer}>
            {mockData.map((ingredient, index, arr) => (
                <div key={ingredient._id} className={styles.ingredientContainer}>
                    <DragIcon type={"primary"} />
                    <ConstructorElement
                        type={index === 0 ? 'top' : index === arr.length - 1 ? 'bottom' : 'undefined'}
                        text={ingredient.name}
                        thumbnail={ingredient.image}
                        price={ingredient.price}
                    />
                </div>
            ))}
            <div className={styles.checkout}>
                <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
                <CurrencyIcon type={"primary"} />
                <Button extraClass="ml-10" htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

export default BurgerConstructor;