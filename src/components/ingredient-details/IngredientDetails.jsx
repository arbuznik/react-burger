import React from 'react';
import styles from './IngredientDetails.module.css';
import { useSelector } from "react-redux";
import { getActiveIngredient } from "../../services/slices/ingredient";

const IngredientDetails = () => {
    const ingredient = useSelector(getActiveIngredient);

    return (
        <div className={styles.container}>
            <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
            <p className="text text_type_main-medium">{ingredient.name}</p>
            <div className={styles.nutritions}>
                <div className={styles.nutrition}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                </div>
                <div className={styles.nutrition}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                </div>
                <div className={styles.nutrition}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
                </div>
                <div className={styles.nutrition}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
};

export default IngredientDetails;