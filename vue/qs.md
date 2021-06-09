qs可通过**`npm install qs`**命令进行安装，是一个npm仓库所管理的包。

而qs.stringify()将对象 序列化成URL的形式，以&进行拼接。

JSON是正常类型的JSON，请对比一下输出

例如

```js
var a = {name:'hehe',age:10};
 qs.stringify(a)
// 'name=hehe&age=10'
JSON.stringify(a)
// '{"name":"hehe","age":10}'
```

都是把对象的类型转换成另外一种类型，如果并没有qs的这种需求，还是继续用JSON吧