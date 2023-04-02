import React, { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";
import OrderSnippet from "../../components/order-snippet/OrderSnippet";
import styles from "./OrdersPage.module.css";
import ProfileMenu from "../../components/profile-menu/ProfileMenu";
import {
  getUserFeedError,
  getUserOrders,
} from "../../services/slices/user-feed";

const OrdersPage: FC = () => {
  const orders = useAppSelector(getUserOrders);
  const error = useAppSelector(getUserFeedError);

  if (error) {
    return (
      <main className={styles.main}>
        <p className="text text_type_main-default text_color_error">
          Ошибка загрузки заказов
        </p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.menu}>
        <ProfileMenu />
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете просмотреть свою историю заказов
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
