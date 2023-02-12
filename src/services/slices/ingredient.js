import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ingredient: {},
}

const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        setActiveIngredient: (state, { payload }) => {
            state.ingredient = payload
        },
        resetActiveIngredient: (state) => {
            state.ingredient = initialState.ingredient
        },
    },
})

export default ingredientSlice.reducer

export const { setActiveIngredient, resetActiveIngredient } = ingredientSlice.actions

export const getActiveIngredient = state => state.ingredient.ingredient