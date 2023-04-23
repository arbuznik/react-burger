import reducer, {
  initialState,
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
} from "./user";
import { IUserAuthSuccessUserResponse } from "../../types/types";

const validUser: IUserAuthSuccessUserResponse = {
  success: true,
  accessToken: "token",
  refreshToken: "token",
  user: {
    email: "user@yandex.ru",
    name: "user",
  },
};

test("should add registered user", () => {
  expect(
    reducer(initialState, {
      type: registerUser.fulfilled,
      payload: validUser,
    })
  ).toEqual({
    user: validUser.user,
    error: null,
    loginError: null,
    registerError: null,
    logoutError: null,
    updateUserError: null,
    forgotPasswordError: null,
    resetPasswordError: null,
    loading: false,
    authChecked: true,
  });
});

test("should add logined user", () => {
  expect(
    reducer(initialState, {
      type: loginUser.fulfilled,
      payload: validUser,
    })
  ).toEqual({
    user: validUser.user,
    error: null,
    loginError: null,
    registerError: null,
    logoutError: null,
    updateUserError: null,
    forgotPasswordError: null,
    resetPasswordError: null,
    loading: false,
    authChecked: true,
  });
});

test("should remove user on logout", () => {
  expect(
    reducer(initialState, {
      type: logoutUser.fulfilled,
    })
  ).toEqual({
    user: initialState.user,
    error: null,
    loginError: null,
    registerError: null,
    logoutError: null,
    updateUserError: null,
    forgotPasswordError: null,
    resetPasswordError: null,
    loading: false,
    authChecked: false,
  });
});

test("should add current user", () => {
  expect(
    reducer(initialState, {
      type: getUser.fulfilled,
      payload: {
        success: true,
        user: {
          email: "user@yandex.ru",
          name: "user",
        },
      },
    })
  ).toEqual({
    user: {
      email: "user@yandex.ru",
      name: "user",
    },
    error: null,
    loginError: null,
    registerError: null,
    logoutError: null,
    updateUserError: null,
    forgotPasswordError: null,
    resetPasswordError: null,
    loading: false,
    authChecked: true,
  });
});

test("should update current user", () => {
  expect(
    reducer(initialState, {
      type: updateUser.fulfilled,
      payload: validUser,
    })
  ).toEqual({
    user: validUser.user,
    error: null,
    loginError: null,
    registerError: null,
    logoutError: null,
    updateUserError: null,
    forgotPasswordError: null,
    resetPasswordError: null,
    loading: false,
    authChecked: false,
  });
});
