import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./OrderPage.module.css";
import clsx from "clsx";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getIngredients } from "../../services/slices/ingredients";
import { calcPrice, getIngredientsByIDs } from "../../utils/helpers";
import {
  closeSocket,
  getActiveOrder,
  getOrders,
  initSocket,
  setFeedActiveOrder,
} from "../../services/slices/feed";
import { ALL_ORDERS_API_ENDPOINT, orderStatuses } from "../../utils/constants";
import Loader from "../../components/loader/Loader";

interface IOrderPageProps {
  outsideModal?: boolean;
}

const OrderPage: FC<IOrderPageProps> = ({ outsideModal }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const allIngredients = useAppSelector(getIngredients);
  const orders = useAppSelector(getOrders);
  const order = useAppSelector(getActiveOrder);
  const orderIngredientsCount: {
    [k: string]: number;
  } = {};

  useEffect(() => {
    if (!orders.length) {
      dispatch(initSocket(ALL_ORDERS_API_ENDPOINT));

      return () => {
        dispatch(closeSocket());
      };
    }
  }, [dispatch, orders.length]);

  useEffect(() => {
    if (id && orders.length) {
      dispatch(setFeedActiveOrder(id));
    }
  }, [id, dispatch, orders]);

  if (!orders.length) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.container}>
        <p className="text_type_main-medium">Order not found</p>
      </div>
    );
  }

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
      {outsideModal && (
        <p className={clsx(styles.number, "text_type_digits-default")}>
          #{order.number}
        </p>
      )}
      <h1 className={clsx(styles.header, "text_type_main-medium")}>
        {order.name}
      </h1>
      <p
        className={clsx(styles.status, "text_type_main-default", {
          text_color_success: order.status === "done",
        })}
      >
        {orderStatuses[order.status]}
      </p>
      <h2 className={clsx(styles.header, "text_type_main-medium")}>
        Ingredients:
      </h2>
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
