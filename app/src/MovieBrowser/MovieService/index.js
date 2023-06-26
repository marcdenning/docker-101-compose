import jsonApiErrorHandler from '../../JsonApi/error.handler';
import jsonApiDeserialize from '../../JsonApi/resource.deserializer';
import jsonApiSerialize from '../../JsonApi/resource.serializer';

class MovieService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  findAll() {
    return this.makeRequest('', 'get');
  }

  findOne(id) {
    return this.makeRequest(id, 'get');
  }

  save(movie) {
    if (movie.id) {
      return this.makeRequest(movie.id, 'patch', movie);
    }
    return this.makeRequest('', 'post', movie);
  }

  delete(id) {
    return this.makeRequest(id, 'delete');
  }

  makeRequest(path, method, data) {
    const url = `${this.baseUrl}/${path}`;
    const requestOptions = jsonApiSerialize(method, data);

    return fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          return response.json()
            .then(jsonApiErrorHandler);
        } else {
          return response.json()
            .then(jsonApiDeserialize);
        }
      });
  }
}

export default MovieService;
