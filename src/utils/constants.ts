import { ICategoriesNames, IOrderStatuses, IWSActions } from "../types/types";
import { addFeedOrders, setFeedError } from "../services/slices/feed";
import {
  addUserFeedOrders,
  setUserFeedError,
} from "../services/slices/user-feed";

export const API_ENDPOINT: string = "https://norma.nomoreparties.space/api/";
export const ALL_ORDERS_API_ENDPOINT: string =
  "wss://norma.nomoreparties.space/orders/all";
export const USER_ORDERS_API_ENDPOINT: string =
  "wss://norma.nomoreparties.space/orders";

export const MAX_INGREDIENTS_FOR_DISPLAY: number = 5;
export const MAX_ORDER_NUMBERS: number = 10;

export const categoriesNames: ICategoriesNames = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

export const orderStatuses: IOrderStatuses = {
  done: "Выполнен",
  pending: "Готовится",
  created: "Создан",
};

export const feedActions: IWSActions = {
  onMessage: addFeedOrders,
  onError: setFeedError,
};

export const userFeedActions: IWSActions = {
  onMessage: addUserFeedOrders,
  onError: setUserFeedError,
};
