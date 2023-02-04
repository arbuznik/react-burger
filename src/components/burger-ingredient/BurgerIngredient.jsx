import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';
import { ingredientType } from "../../types/prop-types";

const BurgerIngredient = ({ ingredient }) => {
    return (
        <article className={styles.article}>
            <Counter count='5' />
            <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
            <div className={styles.price} >
                <p className="text text_type_digits-default">{ingredient.price}</p>
                <CurrencyIcon type={"primary"} />
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
        </article>
    );
};

BurgerIngredient.propTypes = {
    ingredient: ingredientType,
};

export default BurgerIngredient;