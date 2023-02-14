import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from './slices/ingredients';
import orderReducer from './slices/order';
import ingredientReducer from './slices/ingredient';
import ingredientsConstructorReducer from './slices/ingredients-constructor';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    ingredient: ingredientReducer,
    ingredientsConstructor: ingredientsConstructorReducer,
})
export const store = configureStore({
    reducer: rootReducer,
})