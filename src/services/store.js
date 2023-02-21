import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredients";
import orderReducer from "./slices/order";
import ingredientReducer from "./slices/ingredient";
import ingredientsConstructorReducer from "./slices/ingredients-constructor";
import userReducer from "./slices/user";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  ingredient: ingredientReducer,
  ingredientsConstructor: ingredientsConstructorReducer,
  user: userReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
