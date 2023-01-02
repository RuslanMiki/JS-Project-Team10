import axios from 'axios';
const TMD_KEY = '78817c69ceeb2b190f57a1a13eaf9936';
const BASE_URL = 'https://api.themoviedb.org/3';

export class FilmsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  async getFilmsByQuery() {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${TMD_KEY}&query=${this.searchQuery}&page=${this.page}`
    );

    return response.data;
  }

  async getFilmsById(movieId) {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}?api_key=${TMD_KEY}`
    );

    return response.data;
  }

  async fetchTrendFilms() {
    return axios
      .get(
        `${BASE_URL}/trending/movie/week?api_key=${TMD_KEY}&page=${this.page}`
      )
      .then(r => {
        this.totalPages = r.data.total_results;
        return r.data;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
