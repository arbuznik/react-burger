import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IFillingDragIndexes,
  IIngredient,
  IIngredientWithUUID,
} from "../../types/types";
import { RootState } from "../store";

export interface IIngredientsConstructorState {
  fillings: IIngredientWithUUID[];
  bun: IIngredient | null;
  counters: {
    [name: string]: number;
  };
}

const initialState: IIngredientsConstructorState = {
  fillings: [],
  bun: null,
  counters: {},
};

const ingredientsConstructorSlice = createSlice({
  name: "ingredientsConstructor",
  initialState,
  reducers: {
    addIngredient: (
      state,
      { payload }: PayloadAction<IIngredientWithUUID | IIngredient>
    ) => {
      if (payload.type === "bun") {
        if (state.bun) {
          state.counters[state.bun._id] = 0;
        }
        state.bun = payload;
        state.counters[payload._id] = 2;
      }

      if (payload.type !== "bun") {
        state.fillings.push(payload as IIngredientWithUUID);
        state.counters[payload._id] = state.counters[payload._id]
          ? state.counters[payload._id] + 1
          : 1;
      }
    },
    removeFilling: (state, { payload }: PayloadAction<IIngredientWithUUID>) => {
      state.fillings = state.fillings.filter(
        (filling) => filling.uuid !== payload.uuid
      );

      state.counters[payload._id] = state.counters[payload._id]
        ? state.counters[payload._id] - 1
        : 0;
    },
    sortIngredients: (
      state,
      { payload }: PayloadAction<IFillingDragIndexes>
    ) => {
      const { dragIndex, hoverIndex } = payload;
      const dragFilling = state.fillings[dragIndex];

      state.fillings.splice(dragIndex, 1);
      state.fillings.splice(hoverIndex, 0, dragFilling);
    },
    resetConstructor: () => initialState,
  },
});

export default ingredientsConstructorSlice.reducer;

export const {
  addIngredient,
  removeFilling,
  sortIngredients,
  resetConstructor,
} = ingredientsConstructorSlice.actions;

export const getConstructorBun = (state: RootState): IIngredient | null =>
  state.ingredientsConstructor.bun;
export const getConstructorFillings = (
  state: RootState
): IIngredientWithUUID[] => state.ingredientsConstructor.fillings;

export const getTotalPrice = (state: RootState): number => {
  let totalPrice = 0;

  if (state.ingredientsConstructor.fillings.length > 0) {
    totalPrice += state.ingredientsConstructor.fillings.reduce(
      (sum, filling) => {
        return sum + filling?.price;
      },
      0
    );
  }

  if (state.ingredientsConstructor.bun) {
    totalPrice += state.ingredientsConstructor.bun.price * 2;
  }

  return totalPrice;
};

export const getCounterById = (state: RootState, id: string): number => {
  return state.ingredientsConstructor.counters[id];
};
