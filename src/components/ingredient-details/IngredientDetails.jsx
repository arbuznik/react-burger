import React from 'react';
import { ingredientType } from "../../types/prop-types";
import styles from './IngredientDetails.module.css';

const IngredientDetails = ({ ingredient }) => {
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

IngredientDetails.propTypes = {
    ingredient: ingredientType.isRequired,
}

export default IngredientDetails;