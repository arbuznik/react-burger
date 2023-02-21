import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetch",
  async () => {
    const data = await api.fetchIngredients();
    return data;
  }
);

const initialState = {
  ingredients: [],
  error: null,
  loading: false,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, { payload }) => {
      state.ingredients = payload;
      state.loading = false;
    });
    builder.addCase(fetchIngredients.rejected, (state, { error }) => {
      console.log(error);
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

export const getIngredients = (state) => state.ingredients.ingredients;
export const getStarterBun = (state) =>
  state.ingredients.ingredients.find((ingredient) => ingredient.type === "bun");
