# SpringSecurity认证流程

## 外层-正常登陆调用

项目启动后会自动寻找 UserDetailsService 实现类；

执行 UserDetailsService 的唯一方法 loadUserByName(String username) 并返回 UserDetail 类，注意，返回的 UserDetail 是根据用户名去数据库查询到用户信息；

拿到 UserDetail 后会对 UserDetail 进行一个预检查；

**预检查啥？**

用户是否存在，是否被锁定等等等；



全部认证成功后会调用 AuthenticationSuccess 成功处理类，失败则调用 AuthenticationFailHandler 类；

此时对于前后端分离项目而言，调用成功处理类，通常是返回由 JWT 等生成的 token json 字符串，前台拿到返回信息后，保存 token 致本地，然后每次请求都会拼接到 head 中。



## 内层-源码级别

以访问某个项目中已有的链接为例：

![img](https://img2018.cnblogs.com/blog/1104426/201906/1104426-20190602114634704-451746737.png)

输入用户名、密码后点击登录按钮，首先进入 UsernamePassworkAuthenticationFilter 的父类
AbstractAuthenticationProcessingFilter 调用 doFilter() 方法，然后再执行 UsernamePasswordAuthenticationFilter 的 attemptAuthentication() 方法进行验证；

![image-20210126111002092](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210126111002092.png)

UsernamePassworkAuthenticationFilter 类，顾名思义，表单登陆过滤器，该类中重点是 attemptAuthentication() 方法：

![image-20210126111029472](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210126111029472.png)

该方法中通过 **用户名+密码=** 实例化一个 **UsernamePasswordAuthenticationToken** 的对象，作用是将用户请求的信息（用户名、密码、seeesion等）封装到该对象中，我们点击进入该对象的构造器如下图所示：

![image-20210126111045236](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210126111045236.png)

需要说明一点的是，**super((Collection)null);** collection 代表权限列表，在这传了一个 null 进去是因为刚开始并没有进行认证，因此用户此时没有任何权限，并且设置没有认证的信息 **setAuthenticated(false)** ；

再回到 UsernamePassworkAuthenticationFilter attemptAuthentication() 方法，可以看到方法最后调用了 getAuthenticationManager() 方法，然后就进入了 AuthenticationManager 接口的实现类 ProviderManager 中。

补充：AuthenticationManager 不包含验证用户名以及密码的功能，只是用来管理 AuthenticationProvider，所有的校验规则都是写在 AuthenticationProvider 中的；

继续走，在 ProviderManager 这个实现类中，它会调用AuthenticationProvider 接口的实现类获取用户的信息，用户的信息权限的验证就在该类中校验。

进入 ProviderManager 类后会调用 authenticate(Authentication authentication) 方法，它通过 AuthenticationProvider 实现类获取用户的登录的方式，然后会有一个 while 迭代器模式的循环遍历，检查它是否支持这种登录方式，具体的登录方式有表单登录，qq登录，微信登录等。如果最终都不支持会抛出相应的异常信息，如果支持则会进入AuthenticationProvider 接口的抽象实现类 AbstractUserDetailsAuthenticationProvider 中。

![image-20210126111111700](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210126111111700.png)

进入 AbstractUserDetailsAuthenticationProvider 类后会调用 authenticate(Authentication authentication) 方法对用户的身份进行校验，首先是判断用户是否为空，这个 user 是 UserDetail 的对象，如果为空，表示还没有认证，就需要调用 retrieveUser 方法去获取用户的信息，这个方法是抽象类 AbstractUserDetailsAuthenticationProvider 的扩展类DaoAuthenticationProvider 的一个方法。

![image-20210126111125079](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210126111125079.png)

在该扩展类的 retrieveUser 方法中调用 UserDetailsService 这个接口的实现类的 loadUserByUsername 方法去获取用户信息，而这里我自己编写了实现类 UserDetailsServiceImpl 类，在这个实现类中，我们可以编写自己的逻辑，从数据库中获取用户密码等权限信息返回。

![image-20210126111141097](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210126111141097.png)

本地 UserDetailService 实现类 UserDetailsServiceImpl：

![image-20210126111201910](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210126111201910.png)

在拿到用户的信息后，返回到 AbstractUserDetailsAuthenticationProvider 类中调用 createSuccessAuthentication(principalToReturn, authentication, user) 方法，在该方法中会调用三个参数的UsernamePasswordAuthenticationToken 构造器，不同于前面调用两个参数的，因为这里已经验证了用户的信息和权限，因此不再是给父类构造器中传null 值了，而是用户的权限集合，并且设置认证通过**setAuthenticated(true)**

![image-20210126111214774](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210126111214774.png)

如下是 UsernamePasswordAuthenticationToken 构造器：

![image-20210126111224444](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210126111224444.png)

此时 authorities 不再为空了。

在 UsernamePasswordAuthenticationToken 的父类中，它会检查用的权限，如果有一个为 null，表示权限没有相应的权限，抛出异常。

![image-20210126111323722](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210126111323722.png)

然后在 createSuccessAuthentication 方法返回后回到 ProvioderManager 的 authenticate 方法中返回 result，最后回到UsernamePasswordAuthenticationFilter 的刚开始进入的 attemptAuthentication 方法中返回。

![image-20210126111339816](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210126111339816.png)

attemptAuthentication() 方法中的返回，返回到哪？

再回到第一张图，UsernamePasswordAuthenticationFilter 父类 doFilter() 方法，返回值就是 authResult，如果过程中发现存在异常则执行 unsuccessfulAuthentication.onAuthenticationFailure() 方法，如果认证成功则执行 successfulAuthentication.onAuthenticationSuccess() 方法，再结合上边提到的自定义 成功/失败处理类。

## 最后总结

流程大致是，首先进入 UsernamePasswordAuthenticationFilter 父类 AbstractAuthenticationProcessingFilter 执行 doFilter() 方法，这个 doFilter() 方法呢执行如下：

1. 判断当前的 filter 是否可以处理当前请求，不可以的话则交给下一个 filter 处理；
2. 抽象方法由子类 UsernamePasswordAuthenticationFilter 实现；
3. 认证成功后，调用 sessionStrategy.onAuthentication() 处理一些与 session 相关的方法，最后再调用认证成功处理类，主要将当前的认证放到SecurityContextHolder中；
4. 认证失败后则调用 认证失败处理类；



