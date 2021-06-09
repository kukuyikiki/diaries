在Web领域基于Token的身份验证随处可见。在大多数使用Web API的互联网公司中，tokens 是多用户下处理认证的最佳方式。

## 使用特性

1. 无状态、可扩展
2. 支持移动设备
3. 跨程序调用
4. 安全

## 基于Token的验证原理

基于 Token 的身份验证是无状态的，我们不用将用户信息存在服务器或 Session 中。这种概念解决了在服务端存储信息时的许多问题。没有 session 信息意味着你的程序可以根据需要去增减机器，而不用去担心用户是否登录和已经登录到了哪里。

基于Token的身份验证实现的方式很多

## 大致过程如下:

1. 用户通过用户名和密码发送请求。
2. 程序验证。
3. 程序返回一个签名的 token 给客户端。
4. 客户端储存 token, 并且每次请求都会附带它。
5. 服务端验证 token 并返回数据。

 每一次请求都需要Token。Token 应该在 HTTP的头部发送从而保证了 Http 请求无状态。我们也需要设置服务器属性

```
Access-Control-Allow-Origin: * 
```

来让服务器能接受到来自所有域的请求。需要注意的是，在ACAO头部指定 * 时，不得带有像HTTP认证，客户端SSL证书和cookies的证书。

## 实现思路

![img](https://images2018.cnblogs.com/blog/1350514/201805/1350514-20180504123850641-479661599.png)

​	1.用户登录校验，校验成功后就返回Token给客户端。

​	2.客户端收到数据后保存在客户端

​	3.客户端每次访问API是携带Token到服务器端。

​	4.服务器端采用filter过滤器校验。校验成功则返回请求数据，校验失败则返回错误码

 当我们在程序中认证了信息并取得 token 之后，我们便能通过这个 token 做许多的事情。我们甚至能基于创建一个基于权限的token传给第三方应用程序，这些第三方程序能够获取到我们的数据（当然只限于该 token 被允许访问的数据）。

## Tokens的优势

### 无状态，可扩展

子啊客户端存储的token是无状态的，并且能够被扩展。基于这种无状态和不存储Session信息，负载均衡服务器 能够将用户的请求传递到任何一台服务器上海，因为服务器与用户信息没有关联。相反，在传统方式中，我们必须将请求发送到一台存储了该用户session的服务器上（称为Session亲和性），因此当用户量大时，可能会造成一些拥堵。使用token完美解决了此问题。

### 安全性

请求中发送token而不是cookie，这能够防止CSRF（跨站请求伪造）攻击。及时在客户端使用cookie存储token，cookie也仅仅是一个存储机制而不是用于认真。另外，由于没有session，我们不比在进行基于session的操作。

Token是有时效性的，一段时间只有用户需要重新验证，我们也不一定需要等到token自动失效，token有撤回的操作，通过 token revocataion可以使一个特定的 token 或是一组有相同认证的 token 无效。

### **可扩展性**

使用 Tokens 能够与其它应用共享权限。例如，能将一个博客帐号和自己的QQ号关联起来。当通过一个 第三方平台登录QQ时，我们可以将一个博客发到QQ平台中。

使用 token，可以给第三方应用程序提供自定义的权限限制。当用户想让一个第三方应用程序访问它们的数据时，我们可以通过建立自己的API，给出具有特殊权限的tokens。

### **多平台与跨域**

我们已经讨论了CORS (跨域资源共享)。当我们的应用和服务不断扩大的时候，我们可能需要通过多种不同平台或其他应用来接入我们的服务。

可以让我们的API只提供数据，我们也可以从CDN提供服务（Having our API just serve data, we can also make the design choice to serve assets from a CDN.）。 在为我们的应用程序做了如下简单的配置之后，就可以消除 CORS 带来的问题。只要用户有一个通过了验证的token，数据和资源就能够在任何域上被请求到。