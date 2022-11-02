export const paramsToObject = (params) => {
  return Object.fromEntries(new URLSearchParams(params));
};
export const objectToParams = (obj) => {
  if (!obj) return "";
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined || obj[key] === 0) {
      delete obj[key];
    }
  });
  return Object.keys(obj)
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");
};
