import axios from 'axios';

import jsonApiSerializer from '../../JsonApi/resource.serializer';
import jsonApiDeserializer from '../../JsonApi/resource.deserializer';
import jsonApiErrorHandler from '../../JsonApi/error.handler';

export default function configureAxiosInstance(location, baseUrl) {
  const port = location.port !== 80 && location.port !== 443 ? `:${location.port}` : '';
  const url = `${location.protocol}//${location.hostname}${port}${baseUrl}`;
  const axiosInstance = axios.create({
    baseURL: url,
    headers: {
      Accept: 'application/vnd.api+json'
    }
  });

  axiosInstance.interceptors.request.use(jsonApiSerializer);
  axiosInstance.interceptors.response.use(jsonApiDeserializer, jsonApiErrorHandler);

  return axiosInstance;
};
