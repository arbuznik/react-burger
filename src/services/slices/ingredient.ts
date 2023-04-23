import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../../types/types";
import { RootState } from "../store";

export interface IIngredientState {
  ingredient: IIngredient | undefined | null;
}

const initialState: IIngredientState = {
  ingredient: null,
};

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    setActiveIngredient: (
      state,
      { payload }: PayloadAction<IIngredient | undefined>
    ) => {
      state.ingredient = payload;
    },
    resetActiveIngredient: (state) => {
      state.ingredient = initialState.ingredient;
    },
  },
});

export default ingredientSlice.reducer;

export const { setActiveIngredient, resetActiveIngredient } =
  ingredientSlice.actions;

export const getActiveIngredient = (state: RootState) =>
  state.ingredient.ingredient;
