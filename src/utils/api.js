import { API_ENDPOINT } from "./constants";
import jsCookie from "js-cookie";

class Api {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  fetchIngredients() {
    return fetch(this.endpoint + "ingredients")
      .then((res) => this._handleApiResponse(res))
      .then((data) => data.data);
  }

  createOrder(ingredients) {
    return fetch(this.endpoint + "orders", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(ingredients),
    }).then((res) => this._handleApiResponse(res));
  }

  resetPassword(email) {
    return fetch(this.endpoint + "password-reset", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
      }),
    }).then((res) => this._handleApiResponse(res));
  }

  resetPasswordWithToken(password, token) {
    return fetch(this.endpoint + "password-reset/reset", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        password,
        token,
      }),
    }).then((res) => this._handleApiResponse(res));
  }

  registerUser({ email, password, name }) {
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
    }).then((res) => this._handleApiResponse(res));
  }

  loginUser({ email, password }) {
    return fetch(this.endpoint + "auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => this._handleApiResponse(res));
  }

  refreshToken() {
    return fetch(this.endpoint + "auth/token", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        token: jsCookie.get("refreshToken"),
      }),
    }).then((res) => this._handleApiResponse(res));
  }

  logoutUser() {
    return fetch(this.endpoint + "auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        token: jsCookie.get("refreshToken"),
      }),
    }).then((res) => this._handleApiResponse(res));
  }

  getUser() {
    return this._fetchWithRefresh(this.endpoint + "auth/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + jsCookie.get("accessToken"),
      },
      method: "GET",
    });
  }

  updateUser({ name, email, password }) {
    return this._fetchWithRefresh(this.endpoint + "auth/user", {
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

  _handleApiResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  _fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await this._handleApiResponse(res);
    } catch (err) {
      if (err.message === "jwt expired" || err.message === "jwt malformed") {
        const refreshData = await this.refreshToken();

        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }

        this.setCookiesFromResponse(refreshData);
        options.headers.Authorization = refreshData?.accessToken;

        const res = await fetch(url, options);
        return await this._handleApiResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

  setCookiesFromResponse = (res) => {
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
