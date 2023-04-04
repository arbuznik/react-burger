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
    return this._request(this.endpoint + "ingredients").then((data) => {
      return data.data;
    });
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
    return this._request(this.endpoint + "password-reset", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
      }),
    });
  }

  resetPasswordWithToken(
    password: string,
    token: string
  ): Promise<IUserAuthStatusResponse> {
    return this._request(this.endpoint + "password-reset/reset", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        password,
        token,
      }),
    });
  }

  registerUser({
    email,
    password,
    name,
  }: IUserFullCredentials): Promise<
    IUserAuthSuccessUserResponse | IUserAuthStatusResponse
  > {
    return this._request(this.endpoint + "auth/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
  }

  loginUser({
    email,
    password,
  }: IUserLoginCredentials): Promise<
    IUserAuthSuccessUserResponse | IUserAuthStatusResponse
  > {
    return this._request(this.endpoint + "auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  refreshToken(): Promise<
    IUserAuthSuccessTokenResponse | IUserAuthStatusResponse
  > {
    return this._request(this.endpoint + "auth/token", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        token: jsCookie.get("refreshToken"),
      }),
    });
  }

  logoutUser(): Promise<IUserAuthStatusResponse> {
    return this._request(this.endpoint + "auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        token: jsCookie.get("refreshToken"),
      }),
    });
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

  private fetchWithRefresh = async (
    url: string,
    options: IFetchWithRefreshOptions
  ) => {
    try {
      return await this._request(url, options);
    } catch (err: IUserAuthStatusResponse | any) {
      if (err?.message === "jwt expired" || err?.message === "jwt malformed") {
        const refreshData = await this.refreshToken();

        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }

        const successRefreshData = refreshData as IUserAuthSuccessTokenResponse;

        this.setCookiesFromResponse(successRefreshData);
        options.headers.Authorization = successRefreshData.accessToken;

        return await this._request(url, options);
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
      jsCookie.set("accessToken", accessToken.substring(7), { expires: 10 });
    }

    if (refreshToken) {
      jsCookie.set("refreshToken", refreshToken, { expires: 30 });
    }
  };

  private handleApiResponse(res: Response) {
    return res.ok
      ? res.json()
      : res.json().then((err: Error) => Promise.reject(err));
  }

  private _request(url: string, options?: object) {
    return fetch(url, options).then(this.handleApiResponse);
  }
}

const api = new Api(API_ENDPOINT);

export default api;
