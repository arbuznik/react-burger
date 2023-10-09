import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import OrderSnippet from "../../components/order-snippet/OrderSnippet";
import styles from "./OrdersPage.module.css";
import ProfileMenu from "../../components/profile-menu/ProfileMenu";
import {
  closeUserSocket,
  getUserFeedError,
  getUserOrders,
  initUserSocket,
} from "../../services/slices/user-feed";
import { USER_ORDERS_API_ENDPOINT } from "../../utils/constants";
import jsCookie from "js-cookie";

const OrdersPage: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getUserOrders);
  const error = useAppSelector(getUserFeedError);

  useEffect(() => {
    dispatch(
      initUserSocket(
        USER_ORDERS_API_ENDPOINT + `?token=${jsCookie.get("accessToken")}`
      )
    );

    return () => {
      dispatch(closeUserSocket());
    };
  }, [dispatch]);

  if (error) {
    return (
      <main className={styles.main}>
        <p className="text text_type_main-default text_color_error">
          Error loading orders
        </p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.menu}>
        <ProfileMenu />
        <p className="text text_type_main-default text_color_inactive mt-20">
          In this section you can view your order history
        </p>
      </div>
      <div className={styles.feed}>
        {orders.length > 0 &&
          orders.map((order) => (
            <OrderSnippet
              key={order._id}
              urlPrefix={"/profile/orders"}
              order={order}
              showStatus
            />
          ))}
      </div>
    </main>
  );
};

export default OrdersPage;
