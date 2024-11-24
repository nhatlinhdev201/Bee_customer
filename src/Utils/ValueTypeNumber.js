const ValueTypeNumber = (value, defaultValue = 0) => {
  try {
    if (typeof value === "string") {
      const parsedValue = parseFloat(value);
      return isNaN(parsedValue) ? defaultValue : parsedValue;
    } else if (typeof value === "number") {
      return value;
    } else {
      return defaultValue;
    }
  } catch {
    return defaultValue;
  }
};

export default ValueTypeNumber;
