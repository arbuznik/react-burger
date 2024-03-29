import React, { FC } from "react";
import { IOrder } from "../../types/types";
import styles from "./OrderSnippet.module.css";
import clsx from "clsx";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../hooks/hooks";
import { getIngredients } from "../../services/slices/ingredients";
import { calcPrice, getIngredientsByIDs } from "../../utils/helpers";
import IngredientThumbnail from "../ingredient-thumbnail/IngredientThumbnail";
import {
  MAX_INGREDIENTS_FOR_DISPLAY,
  orderStatuses,
} from "../../utils/constants";
import { Link, useLocation } from "react-router-dom";

interface IOrderSnippetProps {
  urlPrefix: string;
  showStatus?: boolean;
  order: IOrder;
}

const OrderSnippet: FC<IOrderSnippetProps> = ({
  urlPrefix,
  showStatus,
  order,
}) => {
  const location = useLocation();
  const ingredients = useAppSelector(getIngredients);
  const price = calcPrice(ingredients, order.ingredients);
  const orderIngredients = getIngredientsByIDs(ingredients, order.ingredients);

  return (
    <Link
      to={`${urlPrefix}/${order._id}`}
      state={{ backgroundLocation: location }}
      className={styles.container}
    >
      <div className={styles.orderCredentials}>
        <span className="text_type_digits-default">#{order.number}</span>
        <span className="text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </span>
      </div>
      <h4 className={clsx(styles.header, "text_type_main-medium")}>
        {order.name}
      </h4>
      {showStatus && (
        <p
          className={clsx(styles.status, "text_type_main-default", {
            text_color_success: order.status === "done",
          })}
        >
          {orderStatuses[order.status]}
        </p>
      )}
      <div className={styles.orderDetails}>
        <div className={styles.ingredients}>
          {orderIngredients
            .slice(0, MAX_INGREDIENTS_FOR_DISPLAY)
            .map((ingredient, i, array) => (
              <IngredientThumbnail
                key={i}
                url={ingredient.image_mobile}
                index={i}
                last={i === array.length - 1}
                count={orderIngredients.length - array.length}
              />
            ))}
        </div>
        <div className={styles.price}>
          <span className="text_type_digits-default">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export default OrderSnippet;
