import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import api from "../../utils/api";
import jsCookie from "js-cookie";
import {
  IPasswordResetPayload,
  IUser,
  IUserAuthStatusResponse,
  IUserAuthSuccessCurrentUserResponse,
  IUserAuthSuccessUserResponse,
  IUserFullCredentials,
  IUserLoginCredentials,
} from "../../types/types";
import { RootState } from "../store";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data: IUserFullCredentials) => {
    const result = await api.registerUser(data);

    if (!result.success) {
      const registrationErrorResponse = result as IUserAuthStatusResponse;
      return Promise.reject({ error: registrationErrorResponse.message });
    }

    const registrationSuccessResponse = result as IUserAuthSuccessUserResponse;
    api.setCookiesFromResponse(registrationSuccessResponse);
    return registrationSuccessResponse;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data: IUserLoginCredentials) => {
    const result = await api.loginUser(data);

    if (!result.success) {
      const loginErrorResponse = result as IUserAuthStatusResponse;
      return Promise.reject({ error: loginErrorResponse.message });
    }

    const loginSuccessResponse = result as IUserAuthSuccessUserResponse;
    api.setCookiesFromResponse(loginSuccessResponse);
    return loginSuccessResponse;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: IUserFullCredentials) => {
    const result = await api.updateUser(data);

    if (!result.success) {
      const errorResponse = result as IUserAuthStatusResponse;
      return Promise.reject({ error: errorResponse.message });
    }

    return result as IUserAuthSuccessUserResponse;
  }
);

export const getUser = createAsyncThunk("user/getUser", async () => {
  if (!jsCookie.get("accessToken") && !jsCookie.get("refreshToken")) {
    return Promise.reject({ message: "No token" });
  }
  const result = await api.getUser();

  if (!result.success) {
    const errorResponse = result as IUserAuthStatusResponse;
    return Promise.reject({ error: errorResponse.message });
  }

  return result as IUserAuthSuccessCurrentUserResponse;
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
  async (email: string) => {
    return api.resetPassword(email);
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ password, token }: IPasswordResetPayload) => {
    return api.resetPasswordWithToken(password, token);
  }
);

interface IUserState {
  user: IUser | null;
  error: SerializedError | null;
  loginError: SerializedError | null;
  registerError: SerializedError | null;
  logoutError: SerializedError | null;
  updateUserError: SerializedError | null;
  forgotPasswordError: SerializedError | null;
  resetPasswordError: SerializedError | null;
  loading: boolean;
  authChecked: boolean;
}

export const initialState: IUserState = {
  user: null,
  error: null,
  loginError: null,
  registerError: null,
  logoutError: null,
  updateUserError: null,
  forgotPasswordError: null,
  resetPasswordError: null,
  loading: false,
  authChecked: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      registerUser.fulfilled,
      (state, { payload }: PayloadAction<IUserAuthSuccessUserResponse>) => {
        state.user = payload.user;
        state.authChecked = true;
        state.loading = false;
      }
    );
    builder.addCase(registerUser.rejected, (state, { error }) => {
      state.user = initialState.user;
      state.authChecked = true;
      state.registerError = error;
      state.loading = false;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.registerError = initialState.registerError;
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, { payload }: PayloadAction<IUserAuthSuccessUserResponse>) => {
        state.user = payload.user;
        state.authChecked = true;
        state.loading = false;
      }
    );
    builder.addCase(loginUser.rejected, (state, { error }) => {
      state.user = initialState.user;
      state.authChecked = true;
      state.loginError = error;
      state.loading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loginError = initialState.loginError;
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = initialState.user;
    });
    builder.addCase(logoutUser.rejected, (state, { error }) => {
      state.logoutError = error;
      state.loading = false;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.logoutError = initialState.logoutError;
      state.loading = true;
    });
    builder.addCase(
      getUser.fulfilled,
      (
        state,
        { payload }: PayloadAction<IUserAuthSuccessCurrentUserResponse>
      ) => {
        state.loading = false;
        state.authChecked = true;
        state.user = payload.user;
      }
    );
    builder.addCase(getUser.rejected, (state, { error }) => {
      state.authChecked = true;
      state.error = error;
      state.loading = false;
    });
    builder.addCase(getUser.pending, (state) => {
      state.error = initialState.error;
      state.loading = true;
    });
    builder.addCase(
      updateUser.fulfilled,
      (state, { payload }: PayloadAction<IUserAuthSuccessUserResponse>) => {
        state.loading = false;
        state.user = payload.user;
      }
    );
    builder.addCase(updateUser.rejected, (state, { error }) => {
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

export const getCurrentUser = (state: RootState) => state.user.user;
export const isUserLoading = (state: RootState) => state.user.loading;
export const getUserError = (state: RootState) => state.user.error;
export const getLoginError = (state: RootState) => state.user.loginError;
export const getRegisterError = (state: RootState) => state.user.registerError;
export const getLogoutError = (state: RootState) => state.user.logoutError;
export const getUpdateUserError = (state: RootState) =>
  state.user.updateUserError;
export const getForgotPasswordError = (state: RootState) =>
  state.user.forgotPasswordError;
export const getResetPasswordError = (state: RootState) =>
  state.user.resetPasswordError;
export const getAuthChecked = (state: RootState) => state.user.authChecked;
