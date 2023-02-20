import React, { useEffect } from "react";
import styles from "./IngredientDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getActiveIngredient,
  setActiveIngredient,
} from "../../services/slices/ingredient";
import { useParams } from "react-router-dom";
import {
  fetchIngredients,
  getIngredients,
} from "../../services/slices/ingredients";
import clsx from "clsx";

const IngredientDetails = ({ outsideModal }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(getIngredients);
  const ingredient = useSelector(getActiveIngredient);
  const { id } = useParams();

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }

    if (ingredients.length && !ingredient) {
      dispatch(
        setActiveIngredient(
          ingredients.find((ingredient) => {
            return ingredient._id === id;
          })
        )
      );
    }
  }, [dispatch, ingredients, id, ingredient]);

  return (
    <div
      className={clsx(styles.container, {
        [styles.containerOutsideModal]: outsideModal,
      })}
    >
      {outsideModal && (
        <h1 className="text text_type_main-large">Детали ингредиента</h1>
      )}
      <img
        className={styles.image}
        src={ingredient?.image_large}
        alt={ingredient?.name}
      />
      <p className="text text_type_main-medium">{ingredient?.name}</p>
      <div className={styles.nutritions}>
        <div className={styles.nutrition}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient?.calories}
          </p>
        </div>
        <div className={styles.nutrition}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient?.proteins}
          </p>
        </div>
        <div className={styles.nutrition}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient?.fat}
          </p>
        </div>
        <div className={styles.nutrition}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient?.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
