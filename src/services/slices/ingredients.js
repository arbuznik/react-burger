import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from "../../utils/api";

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetch',
    async () => {
            const data = await api.fetchIngredients()
            return data;
    }
)

const initialState = {
    ingredients: [],
    error: null,
}

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.fulfilled, (state, { payload }) => {
            state.ingredients = payload
        })
        builder.addCase(fetchIngredients.rejected, (state, { error }) => {
            console.log(error)
            state.ingredients = initialState.ingredients
            state.error = error
        })
    },
})

export default ingredientsSlice.reducer

export const getIngredients = state => state.ingredients.ingredients
export const getStarterBun = state => state.ingredients.ingredients.find(ingredient => ingredient.type === 'bun')