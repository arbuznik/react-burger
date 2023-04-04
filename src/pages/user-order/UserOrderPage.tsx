import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserOrderPage.module.css";
import clsx from "clsx";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getIngredients } from "../../services/slices/ingredients";
import { calcPrice, getIngredientsByIDs } from "../../utils/helpers";
import { orderStatuses, USER_ORDERS_API_ENDPOINT } from "../../utils/constants";
import Loader from "../../components/loader/Loader";
import {
  closeUserSocket,
  getUserActiveOrder,
  getUserOrders,
  initUserSocket,
  setUserFeedActiveOrder,
} from "../../services/slices/user-feed";
import jsCookie from "js-cookie";

interface IUserOrderPageProps {
  outsideModal?: boolean;
}

const UserOrderPage: FC<IUserOrderPageProps> = ({ outsideModal }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const allIngredients = useAppSelector(getIngredients);
  const orders = useAppSelector(getUserOrders);
  const order = useAppSelector(getUserActiveOrder);
  const orderIngredientsCount: {
    [k: string]: number;
  } = {};

  useEffect(() => {
    if (!orders.length) {
      dispatch(
        initUserSocket(
          USER_ORDERS_API_ENDPOINT + `?token=${jsCookie.get("accessToken")}`
        )
      );

      return () => {
        dispatch(closeUserSocket());
      };
    }
  }, [dispatch, orders.length]);

  useEffect(() => {
    if (id && orders.length > 0) {
      dispatch(setUserFeedActiveOrder(id));
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

export default UserOrderPage;
