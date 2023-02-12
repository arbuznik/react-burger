import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from "../../utils/api";

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (ingredients) => {
            const data = await api.createOrder(ingredients)
            return data;
    }
)

const initialState = {
    order: {},
    error: null,
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOrder.fulfilled, (state, { payload }) => {
            state.order = payload
        })
        builder.addCase(createOrder.rejected, (state, { error }) => {
            console.log(error)
            state.error = error
        })
    },
})

export default orderSlice.reducer

export const getOrder = state => state.order.order