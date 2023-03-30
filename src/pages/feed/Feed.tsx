import React, { FC, useEffect } from "react";
import {
  fetchOrders,
  getOrders,
  getTotalOrders,
  getTotalTodayOrders,
} from "../../services/slices/feed";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./Feed.module.css";
import OrderSnippet from "../../components/order-snippet/OrderSnippet";
import clsx from "clsx";

const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrders);
  const totalOrders = useAppSelector(getTotalOrders);
  const totalTodayOrders = useAppSelector(getTotalTodayOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <h1 className={styles.title + " text text_type_main-large mt-10 mb-5"}>
        Лента заказов
      </h1>
      <section className={styles.feed}>
        {orders.map((order) => (
          <OrderSnippet key={order._id} urlPrefix={"/feed"} order={order} />
        ))}
      </section>
      <section className={styles.info}>
        <div className={styles.statuses}>
          <div className={styles.status}>
            <h4 className={clsx(styles.statusName, "text_type_main-medium")}>
              Готовы:
            </h4>
            <span className="text_type_digits-default text_color_success">
              034533
            </span>
            <span className="text_type_digits-default text_color_success">
              034533
            </span>
            <span className="text_type_digits-default text_color_success">
              034533
            </span>
            <span className="text_type_digits-default text_color_success">
              034533
            </span>
          </div>
          <div className={styles.status}>
            <h4 className={clsx(styles.statusName, "text_type_main-medium")}>
              В работе:
            </h4>
            <span className="text_type_digits-default">034533</span>
            <span className="text_type_digits-default">034533</span>
            <span className="text_type_digits-default">034533</span>
          </div>
        </div>
        <div className={styles.infoSection}>
          <h4 className={clsx(styles.sectionHeader, "text_type_main-medium")}>
            Выполнено за все время:
          </h4>
          <p className={clsx(styles.sectionValue, "text_type_digits-large")}>
            {totalOrders}
          </p>
        </div>
        <div className={styles.infoSection}>
          <h4 className={clsx(styles.sectionHeader, "text_type_main-medium")}>
            Выполнено за сегодня:
          </h4>
          <p className={clsx(styles.sectionValue, "text_type_digits-large")}>
            {totalTodayOrders}
          </p>
        </div>
      </section>
    </main>
  );
};

export default Feed;
