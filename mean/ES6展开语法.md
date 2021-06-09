# 展开语法

展开语法用"..."进行表示，展开语法将可迭代的对象拆分成单个的值（语法层面展开）。

## 函数传参中的应用

ES6之前，如果我们希望将数组作为参数分别传递给函数中的参数，我们可以使用Function的apply()方法。如下段代码所示：

![img](https://pics6.baidu.com/feed/3801213fb80e7bec744b49bd5418dc3c9a506b97.jpeg?token=17ee9501f8df3b0ead1510f15e3ef352&s=398E7C324B624D201EF1B5DB000050B2)

从上述代码，apply方法接受一个数组，将它们分拆成单个参数传递给函数进行调用。

ES6的展开语法能让我们以更简洁的方式进行调用，如下段代码所示：

![img](https://pics3.baidu.com/feed/8cb1cb13495409235ba66dfee96eb40db2de4919.jpeg?token=f3e1f1263b02db78a573a18733acf92c&s=19807D324B62452416F5BDDA0000C0B3)

代码运行期间，JavaScript解释器调用myFunction之前，将会用1,4表达式替换...运算符:

let result = myFunction(...data);

上述代码将会进行如下替换：

let result = myFunction(1,4);

替换后，函数中的代码将会继续执行。

## 数组的相关应用

### 数组的合并

展开语法可将数组添加到另外一个数组中，成为其中的一部分。

![img](https://pics6.baidu.com/feed/86d6277f9e2f0708950364a89212dd9da801f2cb.jpeg?token=9ea4b541aa5c9f1e5aa55a88d089b765)

代码运行期间，如下代码：

let array2 = [1, ...array1, 5, 6, 7];

上述代码将会替换成如下代码：

let array2 = [1, 2, 3, 4, 5, 6, 7];

### 在push方法中的运用

有时候，我们需要将一个数组的内容追加到另一个数组中，ES6之前我们可以这么做，如下段代码所示：

![img](https://pics6.baidu.com/feed/34fae6cd7b899e513265c6fc3891bc37c9950d2d.jpeg?token=a8970c8e79aaac1184a9ab3d1b4d5d86&s=38807C324F264D2016F5B9DB0000C0B2)

ES6的展开语法能以更简洁的形式实现，如下段代码所示：

![img](https://pics5.baidu.com/feed/9f510fb30f2442a74140ba04a875c84fd01302fb.jpeg?token=ffa4900c2dd234c6aca345a1c7603836&s=39867C324F234B201C79B5DA000090B2)

代码运行期间，如下代码：

array2.push(...array1);

上述代码将会替换成如下代码:

array2.push(2, 3, 4);

### 传递多个数组参数

我们可以使用展开语法传递多个数组进行参数传递，如下段代码所示：

![img](https://pics3.baidu.com/feed/b7fd5266d0160924628ea33da83150fee6cd3423.jpeg?token=9bb8f7622dfce6d92bc9dc10018b85e7&s=F9867D338374482354D4E1DE000090B3)

## 剩余参数的应用

我们知道JS函数内部有个arguments对象，可以拿到全部实参。现在ES6给我们带来了一个新的对象，可以拿到除开始参数外的参数，即剩余参数，我们可以使用展开语法...进行获取。

ES6之前，我们可以这样获取剩余参数，如下段代码所示：

![img](https://pics2.baidu.com/feed/c83d70cf3bc79f3d1836d03ac197a815738b299b.jpeg?token=276ecb03a3dad36f7af6fc5cde3d4186&s=39A47C32CD264D205EF105DE0000C0B1)

ES6中，上述代码我们可以这样改下，如下段代码所示：

![img](https://pics0.baidu.com/feed/0b46f21fbe096b63ebf222267705e240eaf8ac93.jpeg?token=0b116bef83f32f02a5a2aaa1de62f39b&s=39A47D324F6367205C7544DA0000C0B3)

是不是很简单，有个我们需要注意的事项，一旦函数中的参数第一个参数使用剩余参数，便不能添加任何参数，否则将会抛出错误。例如下段代码所示:

function fn(...rest,foo) {}

//Output "SyntaxError: Rest parameter must be last formal parameter"

