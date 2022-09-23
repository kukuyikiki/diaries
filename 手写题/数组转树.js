// 代码实现
function arrayToTree(array) {
  let root = array[0];
  array.shift();
  let tree = {
    id: root.id,
    val: root.val,
    children: array.length > 0 ? toTree(root.id, array) : [],
  };
  return tree;
}

function toTree(parenId, array) {
  let children = [];
  let len = array.length;
  for (let i = 0; i < len; i++) {
    let node = array[i];
    if (node.parentId === parenId) {
      children.push({
        id: node.id,
        val: node.val,
        children: toTree(node.id, array),
      });
    }
  }
  return children;
}
let input = [
  {
    id: 1,
    val: '学校',
    parentId: null,
  },
  {
    id: 2,
    val: '班级1',
    parentId: 1,
  },
  {
    id: 3,
    val: '班级2',
    parentId: 1,
  },
  {
    id: 4,
    val: '学生1',
    parentId: 2,
  },
  {
    id: 5,
    val: '学生2',
    parentId: 2,
  },
  {
    id: 6,
    val: '学生3',
    parentId: 3,
  },
];
console.log(arrayToTree(input));

function aa(arr) {
  if (!arr || !arr instanceof Array) {
    return [];
  }

  let node = arr.shift();
  let tree = {
    id: node.id,
    val: node.val,
    children: arr.length ? toTree(node.id, arr) : [],
  };
  return tree;
}

function toTree(parentId, arr) {
  let children = [];
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let node = arr[i];
    if (node.id === parentId) {
      children.push({
        id: node.id,
        val: node.val,
        children: toTree(node.id, arr),
      });
    }
  }
  return children;
}

// let const var 区别
// es6 常用的东西
// 变量提升、暂时性死区

// 转树结构，有children数组
`name,age,parent
Ale,25
Bob,30,Ale
Rose,24,Bob`;

// {
//   name: 'Ale';
//   age: 25;
//   children: [{ name: 'Bob', age: 30, children: [{ name: 'Rose', age: 24 }] }];
// }

// 验证码的倒计时组件（60s倒计时，不可点击状态）
// 怎么设计？
// 我答的是（vue）：
// 1.在data中声明一个响应式的标识，判断验证按钮是否是禁用状态
// 2.说了setTimeout不准和raf，使用raf判断60是调用的次数，定义累加器，达到次数改变标识
// 3.点击按钮要去调用接口，考虑节流，onclick函数用节流函数包裹保证60s不能再请求
// 4.后端不管返回失败还是成功给用户提示
// 5.加loading

// React组件
// 写一个input组件，
// 1.要求有初始值和默认值
// 2.写一个ref
// 3.输入的要有最大长度限制
