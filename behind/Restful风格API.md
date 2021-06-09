## 什么是REST

REST不是”rest”这个单词，而是几个单词的缩写 REpresentation State Transfer，直接翻译：表现层状态转移，这个翻译不太好理解。网上找到一个比较通俗的说法是：URL定位资源，用HTTP动词（GET，POST，DELETE，PUSH等）描述操作

## 什么是Restful

基于REST构建的API就是Restful风格。

近年随着移动互联网的发展，各种类型的客户端层出不穷，Restful可以通过一套统一的接口为PC、微信(H5)、IOS和Android提供服务，这样的接口不需要前端样式，只提供数据。Restful架构如下：

![img](https://img2018.cnblogs.com/blog/1569730/201903/1569730-20190313194951407-119466374.jpg)

## 如何设计Restful风格的API

RestfulAPI就是由后端(SERVER端)来提供接口，前端来调用。前端调用API向后端发起HTTP请求，后端响应请求将处理结果反馈给前端。也就是说Restful 是典型的基于HTTP的协议。那么RESTful API有哪些特征呢？

### (1).Resource资源

首先是弄清楚资源的概念。资源就是网络上的一个实体、一段文本、一张图片或者一首歌曲。资源总是要通过一种载体来反应它的内容。文本可以用TXT，也可以用HTML或者XML、图片可以用JPG格式或者PNG格式，JSON是现在最常用的资源表现形式。

### (2).统一接口

Restful风格的数据元操作CRUD(create,read,update,delete)分别对应HTTP方法：GET用来获取资源，POST用来新建资源(也可以用于更新资源)，PUT用来更新资源，DELETE用来删除资源，这样就统一了数据操作的接口。

### (3).使用HTTP状态码　

