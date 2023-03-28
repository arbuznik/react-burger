import React from "react";
import { useParams } from "react-router-dom";
import styles from "./OrderPage.module.css";
import { mockOrdersData } from "../../utils/constants";
import { IOrder } from "../../types/types";
import clsx from "clsx";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../hooks/hooks";
import { getIngredients } from "../../services/slices/ingredients";
import { calcPrice, getIngredientsByIDs } from "../../utils/helpers";

const OrderPage = () => {
  const { id } = useParams();
  const allIngredients = useAppSelector(getIngredients);
  const order = mockOrdersData.orders[0] as IOrder;

  const orderIngredientsCount: {
    [k: string]: number;
  } = {};

  order.ingredients.forEach((ingredient) => {
    orderIngredientsCount[ingredient] = orderIngredientsCount[ingredient]
      ? orderIngredientsCount[ingredient] + 1
      : 1;
  });

  const uniqueOrderIngredients = getIngredientsByIDs(
    allIngredients,
    Object.keys(orderIngredientsCount)
  );

  const totalPrice = calcPrice(allIngredients, order.ingredients);

  return (
    <div className={styles.container}>
      <p className={clsx(styles.number, 'text_type_digits-default mb-10"')}>
        #{order.number}
      </p>
      <h1 className={clsx(styles.header, "text_type_main-medium mb-3")}>
        {order.name}
      </h1>
      <p className={clsx(styles.status, "text_type_main-default")}>
        {order.status}
      </p>
      <h2 className={clsx(styles.header, "text_type_main-medium")}>Состав:</h2>
      <div className={clsx(styles.ingredients, "mb-10")}>
        {uniqueOrderIngredients.map((ingredient) => (
          <div key={ingredient._id} className={styles.ingredient}>
            <div className={styles.imgContainer}>
              <img
                className={styles.img}
                src={ingredient.image_mobile}
                alt="Ingredient"
              />
            </div>
            <p
              className={clsx(styles.ingredientName, "text_type_main-default")}
            >
              {ingredient.name}
            </p>
            <div className={clsx(styles.price, "text_type_digits-default")}>
              <span>{orderIngredientsCount[ingredient._id]}</span>
              <span> x </span>
              <span>
                {ingredient.price * orderIngredientsCount[ingredient._id]}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.details}>
        <FormattedDate
          date={new Date(order.createdAt)}
          className="text_type_main-default text_color_inactive"
        />
        <div className={styles.price}>
          <span className="text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
