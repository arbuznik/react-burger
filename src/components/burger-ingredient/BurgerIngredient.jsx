import React, { useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';
import { ingredientType } from "../../types/prop-types";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import { resetActiveIngredient, setActiveIngredient } from "../../services/slices/ingredient";
import { useDispatch } from "react-redux";

const BurgerIngredient = ({ ingredient }) => {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleClick = () => {
        dispatch(setActiveIngredient(ingredient));
        setIsModalVisible(true)
    }

    const handleClose = () => {
        setIsModalVisible(false)
        dispatch(resetActiveIngredient());
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
                    <IngredientDetails/>
                </Modal>
            }
        </>
    );
};

BurgerIngredient.propTypes = {
    ingredient: ingredientType.isRequired,
};

export default BurgerIngredient;