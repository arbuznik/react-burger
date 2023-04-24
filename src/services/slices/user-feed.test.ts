import reducer, {
  addUserFeedOrders,
  setUserFeedActiveOrder,
  setUserFeedError,
} from "./user-feed";
import { IFeedState } from "./feed";

test("should add user feed orders", () => {
  const initialState: IFeedState = {
    orders: [],
    activeOrder: null,
    total: null,
    totalToday: null,
    error: null,
    loading: false,
  };

  expect(
    reducer(
      initialState,
      addUserFeedOrders({
        success: true,
        orders: [
          {
            _id: "644399fc45c6f2001be6c7bf",
            ingredients: [
              "643d69a5c3f7b9001cfa093d",
              "643d69a5c3f7b9001cfa093e",
              "643d69a5c3f7b9001cfa093e",
              "643d69a5c3f7b9001cfa093d",
            ],
            status: "done",
            name: "Люминесцентный флюоресцентный бургер",
            createdAt: "2023-04-22T08:25:32.149Z",
            updatedAt: "2023-04-22T08:25:32.254Z",
            number: 1144,
          },
        ],
        total: 850,
        totalToday: 80,
      })
    )
  ).toEqual({
    orders: [
      {
        _id: "644399fc45c6f2001be6c7bf",
        ingredients: [
          "643d69a5c3f7b9001cfa093d",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa093d",
        ],
        status: "done",
        name: "Люминесцентный флюоресцентный бургер",
        createdAt: "2023-04-22T08:25:32.149Z",
        updatedAt: "2023-04-22T08:25:32.254Z",
        number: 1144,
      },
    ],
    activeOrder: null,
    total: 850,
    totalToday: 80,
    error: null,
    loading: false,
  });
});

test("should add user feed active order", () => {
  const initialState: IFeedState = {
    orders: [
      {
        _id: "644399fc45c6f2001be6c7bf",
        ingredients: [
          "643d69a5c3f7b9001cfa093d",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa093d",
        ],
        status: "done",
        name: "Люминесцентный флюоресцентный бургер",
        createdAt: "2023-04-22T08:25:32.149Z",
        updatedAt: "2023-04-22T08:25:32.254Z",
        number: 1144,
      },
    ],
    activeOrder: null,
    total: 850,
    totalToday: 80,
    error: null,
    loading: false,
  };

  expect(
    reducer(initialState, setUserFeedActiveOrder("644399fc45c6f2001be6c7bf"))
  ).toEqual({
    orders: [
      {
        _id: "644399fc45c6f2001be6c7bf",
        ingredients: [
          "643d69a5c3f7b9001cfa093d",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa093d",
        ],
        status: "done",
        name: "Люминесцентный флюоресцентный бургер",
        createdAt: "2023-04-22T08:25:32.149Z",
        updatedAt: "2023-04-22T08:25:32.254Z",
        number: 1144,
      },
    ],
    activeOrder: {
      _id: "644399fc45c6f2001be6c7bf",
      ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093d",
      ],
      status: "done",
      name: "Люминесцентный флюоресцентный бургер",
      createdAt: "2023-04-22T08:25:32.149Z",
      updatedAt: "2023-04-22T08:25:32.254Z",
      number: 1144,
    },
    total: 850,
    totalToday: 80,
    error: null,
    loading: false,
  });
});

test("should add user feed error", () => {
  const initialState: IFeedState = {
    orders: [
      {
        _id: "644399fc45c6f2001be6c7bf",
        ingredients: [
          "643d69a5c3f7b9001cfa093d",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa093d",
        ],
        status: "done",
        name: "Люминесцентный флюоресцентный бургер",
        createdAt: "2023-04-22T08:25:32.149Z",
        updatedAt: "2023-04-22T08:25:32.254Z",
        number: 1144,
      },
    ],
    activeOrder: null,
    total: 850,
    totalToday: 80,
    error: null,
    loading: false,
  };

  expect(reducer(initialState, setUserFeedError("Error"))).toEqual({
    orders: [
      {
        _id: "644399fc45c6f2001be6c7bf",
        ingredients: [
          "643d69a5c3f7b9001cfa093d",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa093d",
        ],
        status: "done",
        name: "Люминесцентный флюоресцентный бургер",
        createdAt: "2023-04-22T08:25:32.149Z",
        updatedAt: "2023-04-22T08:25:32.254Z",
        number: 1144,
      },
    ],
    activeOrder: null,
    total: 850,
    totalToday: 80,
    error: "Error",
    loading: false,
  });
});
