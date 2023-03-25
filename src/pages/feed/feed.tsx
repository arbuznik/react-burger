import React, { FC, useEffect } from "react";
import { fetchOrders, getOrders } from "../../services/slices/feed";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  return <div>sdf</div>;
};

export default Feed;
