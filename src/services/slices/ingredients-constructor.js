import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ingredients: [],
}

const ingredientsConstructorSlice = createSlice({
    name: 'ingredientsConstructor',
    initialState,
    reducers: {
        addIngredient: (state, { payload }) => {
            state.ingredients.push(payload)
        },
        removeIngredient: (state, { payload }) => {
            // return state.ingredients.filter(in)
        }
    }
})

export default ingredientsConstructorSlice.reducer

export const { addIngredient } = ingredientsConstructorSlice.actions

export const getIngredientsConstructor = state => state.ingredients.ingredients