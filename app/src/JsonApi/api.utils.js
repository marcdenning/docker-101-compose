export function getBaseUrl(location, basePath) {
  const port = location.port !== 80 && location.port !== 443 ? `:${location.port}` : '';
  const url = `${location.protocol}//${location.hostname}${port}${basePath}`;
  
  return url;
};
