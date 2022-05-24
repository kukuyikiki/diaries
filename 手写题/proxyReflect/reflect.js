let user = {
  _name: "张三",
  get name() {
      return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
      return Reflect.get(target, prop);
      // return target[prop]; // (*) target = user
  }
});

let admin = {
  __proto__: userProxy,
  _name: "李四"
};

// 期待 『李四』，却输出了 『张三』(?!?)
console.log(admin.name); // => 张三

