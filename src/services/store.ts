import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredients";
import orderReducer from "./slices/order";
import ingredientReducer from "./slices/ingredient";
import ingredientsConstructorReducer from "./slices/ingredients-constructor";
import userReducer from "./slices/user";
import feedReducer from "./slices/feed";
import userFeedReducer from "./slices/user-feed";
import { websocketMiddleware } from "./middlewares/websocketMiddleware";
import { feedActions, userFeedActions } from "../utils/constants";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  ingredient: ingredientReducer,
  ingredientsConstructor: ingredientsConstructorReducer,
  user: userReducer,
  feed: feedReducer,
  userFeed: userFeedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(websocketMiddleware(feedActions))
      .concat(websocketMiddleware(userFeedActions)),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
