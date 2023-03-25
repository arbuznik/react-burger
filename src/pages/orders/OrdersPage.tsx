import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchOrders, getOrders } from "../../services/slices/feed";
import OrderSnippet from "../../components/order-snippet/OrderSnippet";
import styles from "./OrdersPage.module.css";
import ProfileMenu from "../../components/profile-menu/ProfileMenu";

const OrdersPage: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <div className={styles.menu}>
        <ProfileMenu />
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      <div className={styles.feed}>
        {orders.map((order) => (
          <OrderSnippet key={order._id} order={order} showStatus />
        ))}
      </div>
    </main>
  );
};

export default OrdersPage;
