import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { IFeedResponse, IOrder } from "../../types/types";
import { RootState } from "../store";
import { mockOrdersData } from "../../utils/constants";

export const fetchOrders = createAsyncThunk("feed/getOrders", async () => {
  return mockOrdersData;
});

interface IFeedState {
  orders: IOrder[];
  total: number | null;
  totalToday: number | null;
  error: SerializedError | null;
  loading: boolean;
}

const initialState: IFeedState = {
  orders: [],
  total: null,
  totalToday: null,
  error: null,
  loading: false,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchOrders.fulfilled,
      (state, { payload }: PayloadAction<IFeedResponse>) => {
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
        state.loading = false;
      }
    );
    builder.addCase(fetchOrders.rejected, (state, { error }) => {
      state.orders = initialState.orders;
      state.error = error;
      state.loading = false;
    });
    builder.addCase(fetchOrders.pending, (state) => {
      state.error = initialState.error;
      state.loading = true;
    });
  },
});

export default feedSlice.reducer;

export const getOrders = (state: RootState) => state.feed.orders;
export const getTotalOrders = (state: RootState) => state.feed.total;
export const getTotalTodayOrders = (state: RootState) => state.feed.totalToday;
