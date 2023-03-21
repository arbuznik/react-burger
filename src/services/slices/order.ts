import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import api from "../../utils/api";
import { ICreateOrderPayload, IOrder } from "../../types/types";
import { RootState } from "../store";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (ingredients: ICreateOrderPayload) => {
    return await api.createOrder(ingredients);
  }
);

interface IOrderState {
  order: IOrder | null;
  error: SerializedError | null;
  loading: boolean;
}

const initialState: IOrderState = {
  order: null,
  error: null,
  loading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      createOrder.fulfilled,
      (state, { payload }: PayloadAction<IOrder>) => {
        state.order = payload;
        state.loading = false;
      }
    );
    builder.addCase(createOrder.rejected, (state, { error }) => {
      state.order = initialState.order;
      state.error = error;
      state.loading = false;
    });
    builder.addCase(createOrder.pending, (state) => {
      state.error = initialState.error;
      state.loading = true;
    });
  },
});

export default orderSlice.reducer;

export const getOrder = (state: RootState) => state.order.order;
