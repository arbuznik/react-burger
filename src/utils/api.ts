import { API_ENDPOINT } from "./constants";
import jsCookie from "js-cookie";
import {
  IIngredient,
  IOrderResponse,
  IUserFullCredentials,
  IUserLoginCredentials,
  IUserAuthStatusResponse,
  IUserAuthSuccessUserResponse,
  IUserAuthSuccessTokenResponse,
  IUserAuthSuccessCurrentUserResponse,
  IFetchWithRefreshOptions,
  ICreateOrderPayload,
} from "../types/types";

interface IApi {
  readonly endpoint: string;
  fetchIngredients: () => Promise<IIngredient[]>;
  createOrder: (ingredients: ICreateOrderPayload) => Promise<IOrderResponse>;
  resetPassword: (email: string) => Promise<IUserAuthStatusResponse>;
  resetPasswordWithToken: (
    password: string,
    token: string
  ) => Promise<IUserAuthStatusResponse>;
  registerUser: (
    userData: IUserFullCredentials
  ) => Promise<IUserAuthSuccessUserResponse | IUserAuthStatusResponse>;
  loginUser: (
    userData: IUserLoginCredentials
  ) => Promise<IUserAuthSuccessUserResponse | IUserAuthStatusResponse>;
  refreshToken: () => Promise<
    IUserAuthSuccessTokenResponse | IUserAuthStatusResponse
  >;
  logoutUser: () => Promise<IUserAuthStatusResponse>;
  getUser: () => Promise<
    IUserAuthSuccessCurrentUserResponse | IUserAuthStatusResponse
  >;
  updateUser: (
    userData: IUserFullCredentials
  ) => Promise<IUserAuthSuccessCurrentUserResponse | IUserAuthStatusResponse>;
  setCookiesFromResponse: (res: IUserAuthSuccessUserResponse) => void;
}

class Api implements IApi {
  public readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  fetchIngredients(): Promise<IIngredient[]> {
    return fetch(this.endpoint + "ingredients")
      .then((res) => this.handleApiResponse(res))
      .then((data) => data.data);
  }

  createOrder(ingredients: ICreateOrderPayload): Promise<IOrderResponse> {
    return this.fetchWithRefresh(this.endpoint + "orders", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jsCookie.get("accessToken"),
      },
      method: "POST",
      body: JSON.stringify(ingredients),
    });
  }

  resetPassword(email: string): Promise<IUserAuthStatusResponse> {
    return fetch(this.endpoint + "password-reset", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
      }),
    }).then((res) => this.handleApiResponse(res));
  }

  resetPasswordWithToken(
    password: string,
    token: string
  ): Promise<IUserAuthStatusResponse> {
    return fetch(this.endpoint + "password-reset/reset", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        password,
        token,
      }),
    }).then((res) => this.handleApiResponse(res));
  }

  registerUser({
    email,
    password,
    name,
  }: IUserFullCredentials): Promise<
    IUserAuthSuccessUserResponse | IUserAuthStatusResponse
  > {
    return fetch(this.endpoint + "auth/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then((res) => this.handleApiResponse(res));
  }

  loginUser({
    email,
    password,
  }: IUserLoginCredentials): Promise<
    IUserAuthSuccessUserResponse | IUserAuthStatusResponse
  > {
    return fetch(this.endpoint + "auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => this.handleApiResponse(res));
  }

  refreshToken(): Promise<
    IUserAuthSuccessTokenResponse | IUserAuthStatusResponse
  > {
    return fetch(this.endpoint + "auth/token", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        token: jsCookie.get("refreshToken"),
      }),
    }).then((res) => this.handleApiResponse(res));
  }

  logoutUser(): Promise<IUserAuthStatusResponse> {
    return fetch(this.endpoint + "auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        token: jsCookie.get("refreshToken"),
      }),
    }).then((res) => this.handleApiResponse(res));
  }

  getUser(): Promise<
    IUserAuthSuccessCurrentUserResponse | IUserAuthStatusResponse
  > {
    return this.fetchWithRefresh(this.endpoint + "auth/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + jsCookie.get("accessToken"),
      },
      method: "GET",
    });
  }

  updateUser({
    name,
    email,
    password,
  }: IUserFullCredentials): Promise<
    IUserAuthSuccessCurrentUserResponse | IUserAuthStatusResponse
  > {
    return this.fetchWithRefresh(this.endpoint + "auth/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + jsCookie.get("accessToken"),
      },
      method: "PATCH",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  }

  private handleApiResponse(res: Response) {
    return res.ok
      ? res.json()
      : res.json().then((err: Error) => Promise.reject(err));
  }

  private fetchWithRefresh = async (
    url: string,
    options: IFetchWithRefreshOptions
  ) => {
    try {
      const res = await fetch(url, options);
      return await this.handleApiResponse(res);
    } catch (err: IUserAuthStatusResponse | any) {
      if (err?.message === "jwt expired" || err?.message === "jwt malformed") {
        const refreshData = await this.refreshToken();

        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }

        const successRefreshData = refreshData as IUserAuthSuccessTokenResponse;

        this.setCookiesFromResponse(successRefreshData);
        options.headers.Authorization = successRefreshData.accessToken;

        const res = await fetch(url, options);
        return await this.handleApiResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

  setCookiesFromResponse = (
    res: IUserAuthSuccessUserResponse | IUserAuthSuccessTokenResponse
  ) => {
    const { accessToken, refreshToken } = res;

    if (accessToken) {
      jsCookie.set("accessToken", accessToken.substring(7), { expires: 1 });
    }

    if (refreshToken) {
      jsCookie.set("refreshToken", refreshToken, { expires: 30 });
    }
  };
}

const api = new Api(API_ENDPOINT);

export default api;
