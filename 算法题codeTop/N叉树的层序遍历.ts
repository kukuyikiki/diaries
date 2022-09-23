/**
 * Definition for node.
 * class Node {
 *     val: number
 *     children: Node[]
 *     constructor(val?: number) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = []
 *     }
 * }
 */

(() => {
  class Node {
    val: number;
    children: Node[];
    constructor(val?: number) {
      this.val = val === undefined ? 0 : val;
      this.children = [];
    }
  }

  function levelOrder(root: Node | null): number[][] {
    const tempArr: Node[] = [];
    const ans: number[][] = [];
    if (root) {
      tempArr.push(root);
    }

    while (tempArr.length) {
      let len = tempArr.length;
      let targetArr: number[] = [];
      for (let i = 0; i < len; i++) {
        let temp: Node = tempArr.shift() as Node;
        targetArr.push(temp.val);
        if (temp.children) {
          temp.children &&
            temp.children.length > 0 &&
            tempArr.push(...temp.children);
        }
      }
      ans.push(targetArr);
    }

    return ans;
  }
})();
