export default function jsonApiSerialize(method, resource) {
  if (resource) {
    const {id, ...attributes} = resource;
    const body = {
      data: {
        type: 'movie',
        attributes
      }
    };

    if (id) {
      body.data.id = id;
    }
    return {
      method,
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify(body)
    };
  }

  return {
    method,
    headers: {
      Accept: 'application/vnd.api+json'
    }
  };
}
