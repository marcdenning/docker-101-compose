export default function jsonApiDeserialize(response) {
  if (response.data instanceof Array) {
    return response.data.map(deserializeResource);
  }
  return deserializeResource(response.data.data);
};

function deserializeResource(resource) {
  const model = resource.attributes;

  model.id = resource.id;
  return model;
}
