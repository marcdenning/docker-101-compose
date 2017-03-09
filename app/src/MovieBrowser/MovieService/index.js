class MovieService {
  constructor(axios, baseUrl) {
    this.axios = axios;
    this.baseUrl = baseUrl;
  }

  findAll() {
    return this.makeRequest('', 'get')
      .then((response) => response.data);
  }

  findOne(id) {
    return this.makeRequest(id, 'get')
      .then((response) => response.data);
  }

  save(movie) {
    if (movie.id) {
      return this.makeRequest(movie.id, 'patch', movie)
        .then((response) => response.data);
    }
    return this.makeRequest('', 'post', movie)
      .then((response) => response.data);
  }

  delete(id) {
    return this.makeRequest(id, 'delete');
  }

  makeRequest(url, method, data) {
    const request = {
      url: `${this.baseUrl}/${url}`,
      method
    };

    if (data) {
      request.data = data;
      request.jsonApiType = 'movie';
    }
    return this.axios.request(request);
  }
}

export default MovieService;
