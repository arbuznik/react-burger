import React from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerConstructor.module.css';
import PropTypes from "prop-types";
import { ingredientType } from "../../types/prop-types";

const BurgerConstructor = ({ ingredients }) => {
    const totalPrice = ingredients.reduce((sum, el) => (sum + el.price), 0);

    return (
        <section className={styles.ingredientsContainer}>
            {ingredients.map((ingredient, index, arr) => (
                <div key={ingredient._id} className={styles.ingredientContainer}>
                    {index !== 0 && index !== arr.length - 1 && <DragIcon type={"primary"}/>}
                    <ConstructorElement
                        type={index === 0 ? 'top' : index === arr.length - 1 ? 'bottom' : 'undefined'}
                        isLocked={index === 0 || index === arr.length - 1}
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

BurgerConstructor.propTypes = {
    ingredient: PropTypes.arrayOf(ingredientType),
}

export default BurgerConstructor;