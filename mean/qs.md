# qs.parse(), qs.stringify()使用方法

qs是一个npm仓库所管理的包,可通过`npm install qs`命令进行安装.

> 1.qs.parse()将URL解析成对象的形式

```js
const Qs = require('qs');
let url = 'method=query_sql_dataset_data&projectId=85&appToken=7d22e38e-5717-11e7-907b-a6006ad3dba0';
Qs.parse(url);
console.log(Qs.parse(url));
```

如上面代码所示,输出结果如下:

![这里写图片描述](https://img-blog.csdnimg.cn/img_convert/9072ec19004e242eccba517b2fae8bc8.png)

> 2. qs.stringify()将对象 序列化成URL的形式，以&进行拼接

```js
const Qs = require('qs');
let obj= {
     method: "query_sql_dataset_data",
     projectId: "85",
     appToken: "7d22e38e-5717-11e7-907b-a6006ad3dba0",
     datasetId: " 12564701"
   };
Qs.stringify(obj);
console.log(Qs.stringify(obj));
```

如上面代码所示,输出结果如下:

![这里写图片描述](https://img-blog.csdnimg.cn/img_convert/a0e7ae60fdb63224debd600847ecf398.png)

那么当我们需要传递数组的时候，我们就可以通过下面方式进行处理：
默认情况下，它们给出明确的索引，如下代码：

```js
qs.stringify({ a: ['b', 'c', 'd'] });
// 'a[0]=b&a[1]=c&a[2]=d'
```

也可以进行重写这种默认方式为`false`

```js
qs.stringify({ a: ['b', 'c', 'd'] }, { indices: false });
// 'a=b&a=c&a=d'
```

当然，也可以通过`arrayFormat` 选项进行格式化输出，如下代码所示：

```js
qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' })
// 'a[0]=b&a[1]=c'
qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' })
// 'a[]=b&a[]=c'
qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' })
// 'a=b&a=c'
```

在这里需要注意的是，JSON中同样存在stringify方法，但是两者之间的区别是很明显的，如下所示：

```js
{"uid":"cs11","pwd":"000000als","username":"cs11","password":"000000als"}
uid=cs11&pwd=000000als&username=cs11&password=000000als
```

如上所示，前者是采用JSON.stringify(param)进行处理，后者是采用Qs.stringify(param)进行处理的。