export default function jsonApiErrorHandler(err) {
  if (err.response && err.response.data) {
    return Promise.reject(err.response.data.errors[0].title);
  }
  return Promise.reject(err.message);
}
