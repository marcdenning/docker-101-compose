export default function jsonApiSerialize(request) {
  const resource = {};

  if (!request.data) {
    return request;
  }
  request.headers['Content-Type'] = 'application/vnd.api+json';
  resource.type = request.jsonApiType;
  delete request.jsonApiType;
  if (request.data.id) {
    resource.id = request.data.id;
    delete request.data.id;
  }
  resource.attributes = request.data;
  request.data = {
    data: resource
  };
  return request;
}
