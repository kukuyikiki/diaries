function majorityElement(nums: number[]): number {
  const len: number = nums.length;
  const target: number = len / 2;
  const myMap: Map<number, number> = new Map();
  nums.map((cur, index) => {
    if (myMap.has(cur)) {
      myMap.set(cur, (myMap.get(cur) as number) + 1);
      if ((myMap.get(cur) as number) > target) {
        return cur;
      }
    } else {
      myMap.set(cur, 1);
    }
  });

  return 0;
}
