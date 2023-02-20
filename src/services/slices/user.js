import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import jsCookie from "js-cookie";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data) => {
    const result = await api.registerUser(data);

    if (result.success) {
      api.setCookiesFromResponse(result);
    }
    return result;
  }
);

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  const result = await api.loginUser(data);

  if (result.success) {
    api.setCookiesFromResponse(result);
  }
  return result;
});

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  return api.fetchWithRefresh(api.updateUser, data);
});

export const getUser = createAsyncThunk("user/getUser", async () => {
  return api.fetchWithRefresh(api.getUser);
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  const result = await api.logoutUser();

  if (result.success) {
    jsCookie.remove("refreshToken");
    jsCookie.remove("accessToken");
  }
  return result;
});

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email) => {
    return api.resetPassword(email);
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (password, token) => {
    return api.resetPasswordWithToken(password, token);
  }
);

const initialState = {
  user: null,
  error: null,
  loginError: null,
  registerError: null,
  logoutError: null,
  updateUserError: null,
  forgotPasswordError: null,
  resetPasswordError: null,
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
      state.registerError = error;
      state.loading = false;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.registerError = initialState.registerError;
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, { error }) => {
      console.log(error);
      state.user = initialState.user;
      state.loginError = error;
      state.loading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loginError = initialState.loginError;
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
      state.logoutError = error;
      state.loading = false;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.logoutError = initialState.logoutError;
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
      state.updateUserError = error;
      state.loading = false;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.updateUserError = initialState.updateUserError;
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.rejected, (state, { error }) => {
      console.log(error);
      state.forgotPasswordError = error;
      state.loading = false;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.forgotPasswordError = initialState.forgotPasswordError;
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(resetPassword.rejected, (state, { error }) => {
      console.log(error);
      state.resetPasswordError = error;
      state.loading = false;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.resetPasswordError = initialState.resetPasswordError;
      state.loading = true;
    });
  },
});

export default userSlice.reducer;

export const getCurrentUser = (state) => state.user.user;
export const isUserLoading = (state) => state.user.loading;
export const getUserError = (state) => state.user.error;
export const getLoginError = (state) => state.user.loginError;
export const getRegisterError = (state) => state.user.registerError;
export const getLogoutError = (state) => state.user.logoutError;
export const getUpdateUserError = (state) => state.user.updateUserError;
export const getForgotPasswordError = (state) => state.user.forgotPasswordError;
export const getResetPasswordError = (state) => state.user.resetPasswordError;
