import { API_ENDPOINT } from "./constants";

class Api {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    fetchIngredients() {
        return fetch(this.endpoint + 'ingredients')
            .then(res => this._handleApiResponse(res))
            .then(data => data.data)
            .catch(err => this._handleError(err))
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
            .catch(err => this._handleError(err))
    }

    _handleApiResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}, ${res.message}`);
    }

    _handleError(err) {
        console.log(err)
    }
}

const api = new Api(API_ENDPOINT);

export default api;