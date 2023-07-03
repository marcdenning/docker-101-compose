import jsonApiErrorHandler from '../../JsonApi/error.handler';
import jsonApiDeserialize from '../../JsonApi/resource.deserializer';
import jsonApiSerialize from '../../JsonApi/resource.serializer';

class MovieService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  findAll() {
    return this.makeRequest('', 'GET');
  }

  findOne(id) {
    return this.makeRequest(id, 'GET');
  }

  save(movie) {
    if (movie.id) {
      return this.makeRequest(movie.id, 'PATCH', movie);
    }
    return this.makeRequest('', 'POST', movie);
  }

  delete(id) {
    return this.makeRequest(id, 'DELETE');
  }

  makeRequest(path, method, data) {
    const url = `${this.baseUrl}/${path}`;
    const requestOptions = jsonApiSerialize(method, data);

    return fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          return response.json()
            .then(jsonApiErrorHandler);
        } else if (response.status === 204) {
          return;
        } else {
          return response.json()
            .then(jsonApiDeserialize);
        }
      });
  }
}

export default MovieService;
