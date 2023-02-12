import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from './slices/ingredients';
import orderReducer from './slices/order';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
})
export const store = configureStore({
    reducer: rootReducer,
})