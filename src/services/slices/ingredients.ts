import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import api from "../../utils/api";
import { IIngredient } from "../../types/types";
import { RootState } from "../store";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetch",
  async () => {
    return await api.fetchIngredients();
  }
);

interface IIngredientsState {
  ingredients: IIngredient[];
  error: SerializedError | null;
  loading: boolean;
}

export const initialState: IIngredientsState = {
  ingredients: [],
  error: null,
  loading: false,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchIngredients.fulfilled,
      (state, { payload }: PayloadAction<IIngredient[]>) => {
        state.ingredients = payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchIngredients.rejected, (state, { error }) => {
      state.ingredients = initialState.ingredients;
      state.error = error;
      state.loading = false;
    });
    builder.addCase(fetchIngredients.pending, (state) => {
      state.error = initialState.error;
      state.loading = true;
    });
  },
});

export default ingredientsSlice.reducer;

export const getIngredients = (state: RootState) =>
  state.ingredients.ingredients;
