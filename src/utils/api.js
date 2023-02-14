import { API_ENDPOINT } from "./constants";

class Api {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    fetchIngredients() {
        return fetch(this.endpoint + 'ingredients')
            .then(res => this._handleApiResponse(res))
            .then(data => data.data)
    }

    createOrder(ingredients) {
        return fetch(this.endpoint + 'orders', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(ingredients)
        })
            .then(res => this._handleApiResponse(res))
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