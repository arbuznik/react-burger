import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fillings: [],
    bun: null,
    counters: {},
}

const ingredientsConstructorSlice = createSlice({
    name: 'ingredientsConstructor',
    initialState,
    reducers: {
        addIngredient: (state, { payload }) => {
            if (payload.type === 'bun') {
                if (state.bun) {
                    state.counters[state.bun._id] = 0
                }
                state.bun = payload
                state.counters[payload._id] = 2
            }

            if (payload.type !== 'bun') {
                state.fillings.push(payload)
                state.counters[payload._id] = state.counters[payload._id] ? state.counters[payload._id] + 1 : 1
            }
        },
        removeFilling: (state, { payload }) => {
            state.fillings = state.fillings.filter(filling => (
                filling.uuid !== payload.uuid
            ))

            state.counters[payload._id] = state.counters[payload._id] ? state.counters[payload._id] - 1 : 0
        },
        sortIngredients: (state, { payload }) => {
            const { dragIndex, hoverIndex } = payload;
            const dragFilling = state.fillings[dragIndex]

            state.fillings.splice(dragIndex, 1);
            state.fillings.splice(hoverIndex, 0, dragFilling);
        },
        resetConstructor: (state) => {
            state.fillings = initialState.fillings
            state.counters = initialState.counters
        }
    }
})

export default ingredientsConstructorSlice.reducer

export const { addIngredient, removeFilling, sortIngredients, resetConstructor } = ingredientsConstructorSlice.actions

export const getConstructorBun = state => state.ingredientsConstructor.bun
export const getConstructorFillings = state => state.ingredientsConstructor.fillings
export const getTotalPrice = state => {
    let totalPrice = 0;

    if (state.ingredientsConstructor.fillings.length > 0) {
        totalPrice += state.ingredientsConstructor.fillings.reduce((sum, filling) => {
            return sum + filling?.price
        }, 0);
    }

    if (state.ingredientsConstructor.bun) {
        totalPrice += state.ingredientsConstructor.bun.price * 2;
    }

    return totalPrice;
}

export const getCounterById = (state, id) => {
    return state.ingredientsConstructor.counters[id]
}