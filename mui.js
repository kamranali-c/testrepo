const convertKeysToCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const camelKey = toCamelCase(key);
      acc[camelKey] = convertKeysToCamelCase(value);
      return acc;
    }, {});
  }
  return obj;
};
