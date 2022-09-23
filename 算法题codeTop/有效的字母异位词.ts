function isAnagram(s: string, t: string): boolean {
  const getMap = function (str: string): Map<string, number> {
    const myMap: Map<string, number> = new Map();
    for (let i = 0, len = str.length; i < len; i++) {
      if (myMap.has(str[i])) {
        myMap.set(str[i], (myMap.get(str[i]) as number) + 1);
      } else {
        myMap.set(str[i], 1);
      }
    }

    return myMap;
  };

  const compareMap = function (
    map1: Map<string, number>,
    map2: Map<string, number>
  ): boolean {
    if (map1.size !== map2.size) return false;
    if (map1.size === 0) return false;
    for (let item of map1) {
      if (map2.has(item[0]) && map2.get(item[0]) === item[1]) {
      } else {
        return false;
      }
    }

    return true;
  };

  return compareMap(getMap(s), getMap(t));
}
