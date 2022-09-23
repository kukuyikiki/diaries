function generateParenthesis(n: number): string[] {
  if (!n || n < 1) {
    return [];
  }

  let ans: string[] = [];

  const dfs = function (res: string, left: number, right: number): void {
    if (left > n || right > left) {
      return;
    }

    if (res.length === n * 2) {
      ans.push(res);
      return;
    }

    dfs(res + ')', left, right + 1);
    dfs(res + '(', left + 1, right);
  };

  dfs('', 0, 0);

  return ans;
}
