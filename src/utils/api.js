import { API_ENDPOINT } from "./constants";
import jsCookie from "js-cookie";

class Api {
  constructor(endpoint) {
    this.endpoint = endpoint;
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

  refreshToken(token) {
    return fetch(this.endpoint + "auth/token", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        token,
      }),
    }).then((res) => this._handleApiResponse(res));
  }

  logoutUser(token) {
    return fetch(this.endpoint + "auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        token,
      }),
    }).then((res) => this._handleApiResponse(res));
  }

  getUser() {
    return fetch(this.endpoint + "auth/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + jsCookie.get("accessToken"),
      },
      method: "GET",
    }).then((res) => this._handleApiResponse(res));
  }

  updateUser({ name, email, password }) {
    return fetch(this.endpoint + "auth/user", {
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
    }).then((res) => this._handleApiResponse(res));
  }

  _handleApiResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api(API_ENDPOINT);

export default api;
