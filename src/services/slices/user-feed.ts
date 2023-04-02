import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeedSuccessResponse } from "../../types/types";
import { RootState } from "../store";
import { IFeedState } from "./feed";

const initialState: IFeedState = {
  orders: [],
  activeOrder: null,
  total: null,
  totalToday: null,
  error: null,
  loading: false,
};

const userFeedSlice = createSlice({
  name: "userFeed",
  initialState,
  reducers: {
    addUserFeedOrders: (
      state,
      { payload }: PayloadAction<IFeedSuccessResponse>
    ) => {
      state.orders = payload.orders.reverse();
      state.totalToday = payload.totalToday;
      state.total = payload.total;
      state.error = initialState.error;
    },
    setUserFeedActiveOrder: (state, { payload }: PayloadAction<string>) => {
      state.activeOrder = state.orders.find((order) => order._id === payload);
    },
    setUserFeedError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    openUserSocket: () => {},
    closeUserSocket: () => {},
  },
});

export default userFeedSlice.reducer;

export const {
  addUserFeedOrders,
  setUserFeedActiveOrder,
  setUserFeedError,
  openUserSocket,
  closeUserSocket,
} = userFeedSlice.actions;

export const getUserOrders = (state: RootState) => state.userFeed.orders;
export const getUserActiveOrder = (state: RootState) =>
  state.userFeed.activeOrder;
export const getUserFeedError = (state: RootState) => state.feed.error;
