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
import { MAX_INGREDIENTS_FOR_DISPLAY } from "../../utils/constants";
import { Link } from "react-router-dom";

interface IOrderSnippetProps {
  showStatus: boolean;
  order: IOrder;
}

const OrderSnippet: FC<IOrderSnippetProps> = ({ showStatus, order }) => {
  const ingredients = useAppSelector(getIngredients);
  const price = calcPrice(ingredients, order.ingredients);
  const orderIngredients = getIngredientsByIDs(ingredients, order.ingredients);

  return (
    <Link to={`/profile/orders/${order._id}`} className={styles.container}>
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
        <p className={clsx(styles.status, "text_type_main-default")}>
          {order.status}
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
