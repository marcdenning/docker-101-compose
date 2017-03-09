export default function jsonApiDeserialize(response) {
  if (!response.data) {
    return response;
  }
  if (response.data.data instanceof Array) {
    response.data = response.data.data.map(deserializeResource);
  } else {
    response.data = deserializeResource(response.data.data);
  }
  return response;
};

function deserializeResource(resource) {
  const model = resource.attributes;

  model.id = resource.id;
  return model;
}
