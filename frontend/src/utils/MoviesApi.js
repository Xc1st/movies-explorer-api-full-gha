class MoviesApi {
    constructor(config) {
        this._url = config.baseUrl;
    }

    _checkResponce(res) { return res.ok ? res.json() : Promise.reject }

    _request(url, options) {
        return fetch(`${this._url}${url}`, options)
            .then(this._checkResponce)
    }

    getMovies() {
        return this._request('/')
    }
}

const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
});

export default moviesApi