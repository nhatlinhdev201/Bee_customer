const CheckNewData = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const map1 = new Map();
  const map2 = new Map();

  for (let i = 0; i < arr1.length; i++) {
    const key1 = JSON.stringify(arr1[i]);
    const key2 = JSON.stringify(arr2[i]);

    map1.set(key1, (map1.get(key1) || 0) + 1);
    map2.set(key2, (map2.get(key2) || 0) + 1);
  }

  if (map1.size !== map2.size) {
    return false;
  }

  for (let [key, count] of map1) {
    if (map2.get(key) !== count) {
      return false;
    }
  }

  return true;
};

export default CheckNewData;
