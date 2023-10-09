import {
  ICategoriesNames,
  IIngredientsEnNamesMap,
  IOrderStatuses,
  IWSActions,
} from "../types/types";

import {
  addFeedOrders,
  closeSocket,
  initSocket,
  openSocket,
  setFeedError,
} from "../services/slices/feed";

import {
  addUserFeedOrders,
  closeUserSocket,
  initUserSocket,
  openUserSocket,
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
  bun: "Buns",
  sauce: "Sauces",
  main: "Fillings",
};

export const orderStatuses: IOrderStatuses = {
  done: "Ready",
  pending: "Preparing",
  created: "Created",
};

export const feedActions: IWSActions = {
  onMessage: addFeedOrders,
  onError: setFeedError,
  open: openSocket,
  close: closeSocket,
  initSocket: initSocket,
};

export const userFeedActions: IWSActions = {
  onMessage: addUserFeedOrders,
  onError: setUserFeedError,
  open: openUserSocket,
  close: closeUserSocket,
  initSocket: initUserSocket,
};

export const ingredientsEnNamesMap: IIngredientsEnNamesMap = {
  "643d69a5c3f7b9001cfa093c": "N-200i Crator Bun",
  "643d69a5c3f7b9001cfa0941": "Martian Magnolia Biocottage",
  "643d69a5c3f7b9001cfa093e": "Luminescent Tetraodontimform fillet",
  "643d69a5c3f7b9001cfa0942": "Spicy-X Sauce",
  "643d69a5c3f7b9001cfa0943": "Specialty Space Sauce",
  "643d69a5c3f7b9001cfa093f": "Immortal Protostomia mollusk meat",
  "643d69a5c3f7b9001cfa0940": "Beef Meteorite",
  "643d69a5c3f7b9001cfa093d": "R2-D3 fluorescent bun",
  "643d69a5c3f7b9001cfa0944": "Traditional Galactic Sauce",
  "643d69a5c3f7b9001cfa0945": "Antarian flatwalker spiked sauce",
  "643d69a5c3f7b9001cfa0946": "Crispy Mineral Rings",
  "643d69a5c3f7b9001cfa0947": "Fallen fruit of the Fallenian tree",
  "643d69a5c3f7b9001cfa0948": "Martian alpha-saccharide crystals",
  "643d69a5c3f7b9001cfa0949": "Exo-Plantago Mini Salad",
  "643d69a5c3f7b9001cfa094a": "Asteroid mold cheese",
};
