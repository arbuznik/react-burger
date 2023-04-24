import reducer, {
  addFeedOrders,
  setFeedActiveOrder,
  setFeedError,
  IFeedState,
} from "./feed";

const initialState: IFeedState = {
  orders: [],
  activeOrder: null,
  total: null,
  totalToday: null,
  error: null,
  loading: false,
};

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(initialState);
});

test("should handle orders add to feed", () => {
  expect(
    reducer(
      initialState,
      addFeedOrders({
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
          {
            _id: "64437ea745c6f2001be6c7a8",
            ingredients: [
              "643d69a5c3f7b9001cfa093c",
              "643d69a5c3f7b9001cfa0943",
              "643d69a5c3f7b9001cfa0945",
              "643d69a5c3f7b9001cfa0943",
              "643d69a5c3f7b9001cfa093c",
            ],
            status: "done",
            name: "Space антарианский краторный бургер",
            createdAt: "2023-04-22T06:28:55.263Z",
            updatedAt: "2023-04-22T06:28:55.359Z",
            number: 1143,
          },
        ],
        total: 770,
        totalToday: 116,
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
      {
        _id: "64437ea745c6f2001be6c7a8",
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0943",
          "643d69a5c3f7b9001cfa0945",
          "643d69a5c3f7b9001cfa0943",
          "643d69a5c3f7b9001cfa093c",
        ],
        status: "done",
        name: "Space антарианский краторный бургер",
        createdAt: "2023-04-22T06:28:55.263Z",
        updatedAt: "2023-04-22T06:28:55.359Z",
        number: 1143,
      },
    ],
    activeOrder: null,
    total: 770,
    totalToday: 116,
    error: null,
    loading: false,
  });
});

test("should add an active feed order", () => {
  const previousState: IFeedState = {
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
      {
        _id: "64437ea745c6f2001be6c7a8",
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0943",
          "643d69a5c3f7b9001cfa0945",
          "643d69a5c3f7b9001cfa0943",
          "643d69a5c3f7b9001cfa093c",
        ],
        status: "done",
        name: "Space антарианский краторный бургер",
        createdAt: "2023-04-22T06:28:55.263Z",
        updatedAt: "2023-04-22T06:28:55.359Z",
        number: 1143,
      },
    ],
    activeOrder: null,
    total: 770,
    totalToday: 116,
    error: null,
    loading: false,
  };

  expect(
    reducer(previousState, setFeedActiveOrder("644399fc45c6f2001be6c7bf"))
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
      {
        _id: "64437ea745c6f2001be6c7a8",
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0943",
          "643d69a5c3f7b9001cfa0945",
          "643d69a5c3f7b9001cfa0943",
          "643d69a5c3f7b9001cfa093c",
        ],
        status: "done",
        name: "Space антарианский краторный бургер",
        createdAt: "2023-04-22T06:28:55.263Z",
        updatedAt: "2023-04-22T06:28:55.359Z",
        number: 1143,
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
    total: 770,
    totalToday: 116,
    error: null,
    loading: false,
  });
});

test("should add feed error", () => {
  const previousState: IFeedState = {
    orders: [],
    activeOrder: null,
    total: null,
    totalToday: null,
    error: null,
    loading: false,
  };

  expect(reducer(previousState, setFeedError("Error"))).toEqual({
    orders: [],
    activeOrder: null,
    total: null,
    totalToday: null,
    error: "Error",
    loading: false,
  });
});
