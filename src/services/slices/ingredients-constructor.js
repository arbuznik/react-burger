import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ingredients: [],
}

const ingredientsConstructorSlice = createSlice({
    name: 'ingredientsConstructor',
    initialState,
    reducers: {
        addIngredient: (state, { payload }) => {
            const bun = state.ingredients.find(ingredient => ingredient.type === 'bun')

            if (bun && payload.type === 'bun') {
                state.ingredients = state.ingredients.filter(ingredient => (
                    ingredient.type !== 'bun'
                ))

                state.ingredients.push(payload)
                state.ingredients.push(payload)
            } else {
                state.ingredients.push(payload)
            }
        },
        removeIngredientById: (state, { payload }) => {
            state.ingredients = state.ingredients.filter(ingredient => (
                ingredient.constructorIngredientId !== payload
            ))
        },
        sortIngredients: (state, { payload }) => {
            const { dragId, hoverId } = payload;

            let dragIngredientIndex;
            const dragIngredient = state.ingredients.find((ingredient, i) => {
                if (ingredient.constructorIngredientId === dragId) {
                    dragIngredientIndex = i;
                }
                return ingredient.constructorIngredientId === dragId
            })

            const hoverIndex = state.ingredients.findIndex(ingredient => {
                return ingredient.constructorIngredientId === hoverId
            })

            state.ingredients.splice(dragIngredientIndex, 1);
            state.ingredients.splice(hoverIndex, 0, dragIngredient);
        }
    }
})

export default ingredientsConstructorSlice.reducer

export const { addIngredient, removeIngredientById, sortIngredients } = ingredientsConstructorSlice.actions

export const getConstructorBun = state => state.ingredientsConstructor.ingredients.find(ingredient => ingredient.type === 'bun')
export const getConstructorFillings = state => state.ingredientsConstructor.ingredients.filter(ingredient => ingredient.type !== 'bun')
export const getTotalPrice = state => {
    if (state.ingredientsConstructor.ingredients.length > 0) {
        return state.ingredientsConstructor.ingredients.reduce((sum, ingredient) => {
            return sum + ingredient?.price
        }, 0);
    }

    return 0;
}

export const getCounterById = (state, id) => {
    return state.ingredientsConstructor.ingredients.filter(ingredient => ingredient._id === id).length
}