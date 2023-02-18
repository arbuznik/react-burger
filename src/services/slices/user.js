import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import jsCookie from "js-cookie";

const setCookiesFromResponse = (res) => {
  const { accessToken, refreshToken } = res;

  if (accessToken) {
    jsCookie.set("accessToken", accessToken.substring(7), { expires: 1 });
  }

  if (refreshToken) {
    jsCookie.set("refreshToken", refreshToken, { expires: 30 });
  }
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data) => {
    const result = await api.registerUser(data);

    if (result.success) {
      setCookiesFromResponse(result);
    }
    return result;
  }
);

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  const result = await api.loginUser(data);

  if (result.success) {
    setCookiesFromResponse(result);
  }
  return result;
});

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  const result = await api.updateUser(data);
  return result;
});

export const getUser = createAsyncThunk("user/getUser", async () => {
  const result = await api.getUser();
  return result;
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  const refreshToken = jsCookie.get("refreshToken");
  const result = await api.logoutUser(refreshToken);

  if (result.success) {
    jsCookie.remove("refreshToken");
    jsCookie.remove("accessToken");
  }
  return result;
});

export const refreshToken = createAsyncThunk("user/refreshToken", async () => {
  const refreshToken = jsCookie.get("refreshToken");
  const result = await api.refreshToken(refreshToken);

  if (result.success) {
    setCookiesFromResponse(result);
  }
  return result;
});

const initialState = {
  user: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, { error }) => {
      console.log(error);
      state.user = initialState.user;
      state.error = error;
      state.loading = false;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.error = initialState.error;
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, { error }) => {
      console.log(error);
      state.user = initialState.user;
      state.error = error;
      state.loading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.error = initialState.error;
      state.loading = true;
    });
    builder.addCase(refreshToken.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(refreshToken.rejected, (state, { error }) => {
      console.log(error);
      state.error = error;
      state.loading = false;
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.error = initialState.error;
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.success) {
        state.user = initialState.user;
      }
    });
    builder.addCase(logoutUser.rejected, (state, { error }) => {
      console.log(error);
      state.error = error;
      state.loading = false;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.error = initialState.error;
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.success) {
        state.user = payload.user;
      }
    });
    builder.addCase(getUser.rejected, (state, { error }) => {
      console.log(error);
      state.error = error;
      state.loading = false;
    });
    builder.addCase(getUser.pending, (state) => {
      state.error = initialState.error;
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.success) {
        state.user = payload.user;
      }
    });
    builder.addCase(updateUser.rejected, (state, { error }) => {
      console.log(error);
      state.error = error;
      state.loading = false;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.error = initialState.error;
      state.loading = true;
    });
  },
});

export default userSlice.reducer;

export const getCurrentUser = (state) => state.user.user;
export const isUserLoading = (state) => state.user.loading;
