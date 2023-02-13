import React, { useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';
import { ingredientType } from "../../types/prop-types";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import { getActiveIngredient, resetActiveIngredient, setActiveIngredient } from "../../services/slices/ingredient";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { getCounterById } from "../../services/slices/ingredients-constructor";

const BurgerIngredient = ({ ingredient }) => {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const counterValue = useSelector(state => getCounterById(state, ingredient._id))
    const activeIngredient = useSelector(getActiveIngredient);

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient
    })

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
                {counterValue > 0 && <Counter count={counterValue}/>}
                <img ref={dragRef} className={styles.image} src={ingredient.image} alt={ingredient.name}/>
                <div className={styles.price} >
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type={"primary"} />
                </div>
                <p className="text text_type_main-default">{ingredient.name}</p>
            </article>
            {isModalVisible && activeIngredient &&
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