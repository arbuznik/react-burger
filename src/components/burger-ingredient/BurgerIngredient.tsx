import React, { FC } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredient.module.css";
import { useDrag } from "react-dnd";
import { getCounterById } from "../../services/slices/ingredients-constructor";
import { IIngredient } from "../../types/types";
import { useAppSelector } from "../../hooks/hooks";

interface IBurgerIngredientProps {
  ingredient: IIngredient;
}

const BurgerIngredient: FC<IBurgerIngredientProps> = ({ ingredient }) => {
  const counterValue = useAppSelector((state) =>
    getCounterById(state, ingredient._id)
  );

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <>
      <article className={styles.article}>
        {counterValue > 0 && <Counter count={counterValue} />}
        <img
          ref={dragRef}
          className={styles.image}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={styles.price}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type={"primary"} />
        </div>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </article>
    </>
  );
};

export default BurgerIngredient;
