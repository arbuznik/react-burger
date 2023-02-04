import React, { useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';
import { ingredientType } from "../../types/prop-types";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";

const BurgerIngredient = ({ ingredient }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleClick = () => {
        setIsModalVisible(true)
    }

    const handleClose = () => {
        setIsModalVisible(false)
    }

    return (
        <>
            <article className={styles.article} onClick={handleClick}>
                <Counter count='5' />
                <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
                <div className={styles.price} >
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type={"primary"} />
                </div>
                <p className="text text_type_main-default">{ingredient.name}</p>
            </article>
            {isModalVisible &&
                <Modal onClose={handleClose} title="Детали ингредиента">
                    <IngredientDetails ingredient={ingredient} />
                </Modal>
            }
        </>
    );
};

BurgerIngredient.propTypes = {
    ingredient: ingredientType,
};

export default BurgerIngredient;