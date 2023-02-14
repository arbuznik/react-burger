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
    order: null,
    error: null,
    loading: false,
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOrder.fulfilled, (state, { payload }) => {
            state.order = payload
            state.loading = false
        })
        builder.addCase(createOrder.rejected, (state, { error }) => {
            console.log(error)
            state.order = initialState.order
            state.error = error
            state.loading = false
        })
        builder.addCase(createOrder.pending, (state) => {
            state.error = initialState.error
            state.loading = true
        })
    },
})

export default orderSlice.reducer

export const getOrder = state => state.order.order