import reducer, { initialState, createOrder } from "./order";
import { IOrderResponse } from "../../types/types";

const orderResponse: IOrderResponse = {
  success: true,
  name: "Бессмертный люминесцентный флюоресцентный бургер",
  order: {
    number: 1254,
  },
};

test("should add order", () => {
  expect(
    reducer(initialState, {
      type: createOrder.fulfilled,
      payload: orderResponse,
    })
  ).toEqual({
    order: orderResponse,
    error: null,
    loading: false,
  });
});

test("should set pending", () => {
  expect(
    reducer(initialState, {
      type: createOrder.pending,
    })
  ).toEqual({
    order: null,
    error: null,
    loading: true,
  });
});
