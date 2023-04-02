import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredients";
import orderReducer from "./slices/order";
import ingredientReducer from "./slices/ingredient";
import ingredientsConstructorReducer from "./slices/ingredients-constructor";
import userReducer from "./slices/user";
import feedReducer from "./slices/feed";
import userFeedReducer from "./slices/user-feed";
import { websocketMiddleware } from "./middlewares/websocketMiddleware";
import {
  ALL_ORDERS_API_ENDPOINT,
  USER_ORDERS_API_ENDPOINT,
  feedActions,
  userFeedActions,
} from "../utils/constants";
import jsCookie from "js-cookie";

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
      .concat(websocketMiddleware(ALL_ORDERS_API_ENDPOINT, feedActions))
      .concat(
        websocketMiddleware(
          USER_ORDERS_API_ENDPOINT,
          userFeedActions,
          jsCookie.get("accessToken")
        )
      ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
