import React, { FC, useEffect } from "react";
import styles from "./IngredientDetails.module.css";
import {
  getActiveIngredient,
  setActiveIngredient,
} from "../../services/slices/ingredient";
import { useParams } from "react-router-dom";
import { getIngredients } from "../../services/slices/ingredients";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

interface IIngredientDetailsProps {
  outsideModal?: boolean;
}

const IngredientDetails: FC<IIngredientDetailsProps> = ({ outsideModal }) => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getIngredients);
  const ingredient = useAppSelector(getActiveIngredient);
  const { id } = useParams();

  useEffect(() => {
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
