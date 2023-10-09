import React, { FC } from "react";
import styles from "./OrderDetails.module.css";
import checkmarkPath from "../../images/checkmark.svg";
import { useAppSelector } from "../../hooks/hooks";
import { getOrderIsLoading } from "../../services/slices/order";
import Loader from "../loader/Loader";

interface IOrderDetails {
  orderId?: number;
}

const OrderDetails: FC<IOrderDetails> = ({ orderId }) => {
  const isOrderLoading = useAppSelector(getOrderIsLoading);

  if (isOrderLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <p className={"text text_type_digits-large mb-8"}>{orderId}</p>
      <p className="text text_type_main-medium mt-8 mb-15">Order number</p>
      <div className={styles.checkmark}>
        <img src={checkmarkPath} alt="Order received" />
      </div>
      <p className="text text_type_main-default mt-15 mb-2">
        Your order has been placed
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Stand by at the orbital station
      </p>
    </div>
  );
};

export default OrderDetails;
