# @RequestBody的使用

## 基础知识介绍

@RequestBody主要用来接收前端传递给后端的json字符串中的数据的(请求体中的数据的)；GET方式无请求体，所以使用@RequestBody接收数据时，前端不能使用GET方式提交数据，而是用POST方式进行提交。在后端的同一个接收方法里，@RequestBody与@RequestParam()可以同时使用，@RequestBody最多只能有一个，而@RequestParam()可以有多个。

注：一个请求，只有一个RequestBody；一个请求，可以有多个RequestParam。

注：当同时使用@RequestParam（）和@RequestBody时，@RequestParam（）指定的参数可以是普通元素、

​    数组、集合、对象等等(即:当，@RequestBody 与@RequestParam()可以同时使用时，原SpringMVC接收
​    参数的机制不变，只不过RequestBody 接收的是请求体里面的数据；而RequestParam接收的是key-value
​    里面的参数，所以它会被切面进行处理从而可以用普通元素、数组、集合、对象等接收)。
​    即：如果参数时放在请求体中，application/json传入后台的话，那么后台要用@RequestBody才能接收到；
​       如果不是放在请求体中的话，那么后台接收前台传过来的参数时，要用@RequestParam来接收，或
​       则形参前 什么也不写也能接收。



注：如果参数前写了@RequestParam(xxx)，那么前端必须有对应的xxx名字才行(不管其是否有值，当然可以通
    过设置该注解的required属性来调节是否必须传)，如果没有xxx名的话，那么请求会出错，报400。

注：如果参数前不写@RequestParam(xxx)的话，那么就前端可以有可以没有对应的xxx名字才行，如果有xxx名的话，那么就会自动匹配；没有的话，请求也能正确发送