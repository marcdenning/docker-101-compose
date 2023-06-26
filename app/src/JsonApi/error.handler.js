export default function jsonApiErrorHandler(responseBody) {
  return Promise.reject(responseBody.errors[0].title);
}
