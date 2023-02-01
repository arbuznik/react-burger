import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';
import PropTypes from "prop-types";

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
    ingredient: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
    })
}

export default BurgerIngredient;