import React from 'react';
import { ingredientType } from "../../types/prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { removeIngredientById } from "../../services/slices/ingredients-constructor";
import { useDispatch } from "react-redux";
import styles from './BurgerConstructorFilling.module.css';

const BurgerConstructorFilling = ({ filling }) => {
    const dispatch = useDispatch();

    const handleDeleteIngredient = (id) => {
        dispatch(removeIngredientById(id))
    }

    return (
        <div className={styles.fillingContainer}>
            <div className={styles.dragHandle}>
                <DragIcon type={"primary"} />
            </div>
            <ConstructorElement
                text={filling.name}
                thumbnail={filling.image}
                price={filling.price}
                handleClose={() => handleDeleteIngredient(filling.constructorIngredientId)}
            />
        </div>
    );
};

BurgerConstructorFilling.propTypes = {
    filling: ingredientType.isRequired,
}

export default BurgerConstructorFilling;