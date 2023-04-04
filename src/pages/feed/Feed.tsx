import React, { FC, useEffect } from "react";
import {
  closeSocket,
  getDoneOrders,
  getFeedError,
  getOrders,
  getPendingOrders,
  getTotalOrders,
  getTotalTodayOrders,
  initSocket,
} from "../../services/slices/feed";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./Feed.module.css";
import OrderSnippet from "../../components/order-snippet/OrderSnippet";
import clsx from "clsx";
import {
  ALL_ORDERS_API_ENDPOINT,
  MAX_ORDER_NUMBERS,
} from "../../utils/constants";

const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrders);
  const doneOrders = useAppSelector(getDoneOrders).slice(0, MAX_ORDER_NUMBERS);
  const pendingOrders = useAppSelector(getPendingOrders).slice(
    0,
    MAX_ORDER_NUMBERS
  );
  const totalOrders = useAppSelector(getTotalOrders);
  const totalTodayOrders = useAppSelector(getTotalTodayOrders);
  const error = useAppSelector(getFeedError);

  useEffect(() => {
    dispatch(initSocket(ALL_ORDERS_API_ENDPOINT));

    return () => {
      dispatch(closeSocket());
    };
  }, [dispatch]);

  if (error) {
    return (
      <p className="text text_type_main-default text_color_error">{error}</p>
    );
  }

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
            <ul className={styles.numbers}>
              {doneOrders.map((order) => (
                <li key={order._id}>
                  <span className="text_type_digits-default text_color_success">
                    {order.number}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.status}>
            <h4 className={clsx(styles.statusName, "text_type_main-medium")}>
              В работе:
            </h4>
            <ul className={styles.numbers}>
              {pendingOrders.map((order) => (
                <span key={order._id} className="text_type_digits-default">
                  {order.number}
                </span>
              ))}
            </ul>
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
