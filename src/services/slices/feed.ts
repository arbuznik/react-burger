import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeedSuccessResponse, IOrder } from "../../types/types";
import { RootState } from "../store";

export interface IFeedState {
  orders: IOrder[];
  activeOrder: IOrder | null | undefined;
  total: number | null;
  totalToday: number | null;
  error: string | null;
  loading: boolean;
}

const initialState: IFeedState = {
  orders: [],
  activeOrder: null,
  total: null,
  totalToday: null,
  error: null,
  loading: false,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeedOrders: (
      state,
      { payload }: PayloadAction<IFeedSuccessResponse>
    ) => {
      state.orders = payload.orders;
      state.totalToday = payload.totalToday;
      state.total = payload.total;
      state.error = initialState.error;
    },
    setFeedActiveOrder: (state, { payload }: PayloadAction<string>) => {
      state.activeOrder = state.orders.find((order) => order._id === payload);
    },
    setFeedError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    openSocket: () => {},
    closeSocket: () => {},
  },
});

export default feedSlice.reducer;

export const {
  addFeedOrders,
  setFeedActiveOrder,
  setFeedError,
  openSocket,
  closeSocket,
} = feedSlice.actions;

export const getOrders = (state: RootState) => state.feed.orders;
export const getTotalOrders = (state: RootState) => state.feed.total;
export const getTotalTodayOrders = (state: RootState) => state.feed.totalToday;
export const getActiveOrder = (state: RootState) => state.feed.activeOrder;
export const getDoneOrders = (state: RootState) =>
  state.feed.orders.filter((order) => order.status === "done");
export const getPendingOrders = (state: RootState) =>
  state.feed.orders.filter((order) => order.status === "pending");
export const getFeedError = (state: RootState) => state.feed.error;
