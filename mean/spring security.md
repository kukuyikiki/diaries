# Spring Security简介

  spring security 的核心功能主要包括：

- 认证 （你是谁）
- 授权 （你能干什么）
- 攻击防护 （防止伪造身份）

其核心就是一组过滤器链，项目启动后将会自动配置。最核心的就是 Basic Authentication Filter 用来认证用户的身份，一个在spring security中一种过滤器处理一种认证方式。

![img](https://img-blog.csdnimg.cn/20190116102342618.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIyMTcyMTMz,size_16,color_FFFFFF,t_70)

比如，对于username password认证过滤器来说， 

会检查是否是一个登录请求；

是否包含username 和 password （也就是该过滤器需要的一些认证信息） ；

如果不满足则放行给下一个。

   下一个按照自身职责判定是否是自身需要的信息，basic的特征就是在请求头中有 Authorization:Basic eHh4Onh4 的信息。中间可能还有更多的认证过滤器。**最后一环是 FilterSecurityInterceptor**，这里会判定该请求是否能进行访问rest服务，判断的依据是 BrowserSecurityConfig中的配置，如果被拒绝了就会抛出不同的异常（根据具体的原因）。Exception Translation Filter 会捕获抛出的错误，然后根据不同的认证方式进行信息的返回提示。

**注意**：绿色的过滤器可以配置是否生效，其他的都不能控制。

# 参数详解

## 注解 @EnableWebSecurity

   在 Spring boot 应用中使用 Spring Security，用到了 @EnableWebSecurity注解，官方说明为，该注解和 @Configuration 注解一起使用, 注解 WebSecurityConfigurer 类型的类，或者利用@EnableWebSecurity 注解继承 WebSecurityConfigurerAdapter的类，这样就构成了 Spring Security 的配置。

## 抽象类 WebSecurityConfigurerAdapter

   一般情况，会选择继承 WebSecurityConfigurerAdapter 类，其官方说明为：WebSecurityConfigurerAdapter 提供了一种便利的方式去创建 WebSecurityConfigurer的实例，只需要重写 WebSecurityConfigurerAdapter 的方法，即可配置拦截什么URL、设置什么权限等安全控制。

## 方法 configure(AuthenticationManagerBuilder auth) 和 configure(HttpSecurity http)

## final 类 HttpSecurity

HttpSecurity 常用方法及说明：

| 方法                  | 说明                                                         |
| :-------------------- | :----------------------------------------------------------- |
| `openidLogin()`       | 用于基于 OpenId 的验证                                       |
| `headers()`           | 将安全标头添加到响应                                         |
| `cors()`              | 配置跨域资源共享（ CORS ）                                   |
| `sessionManagement()` | 允许配置会话管理                                             |
| `portMapper()`        | 允许配置一个`PortMapper`(`HttpSecurity#(getSharedObject(class))`)，其他提供`SecurityConfigurer`的对象使用 `PortMapper` 从 HTTP 重定向到 HTTPS 或者从 HTTPS 重定向到 HTTP。默认情况下，Spring Security使用一个`PortMapperImpl`映射 HTTP 端口8080到 HTTPS 端口8443，HTTP 端口80到 HTTPS 端口443 |
| `jee()`               | 配置基于容器的预认证。 在这种情况下，认证由Servlet容器管理   |
| `x509()`              | 配置基于x509的认证                                           |
| `rememberMe`          | 允许配置“记住我”的验证                                       |
| `authorizeRequests()` | 允许基于使用`HttpServletRequest`限制访问                     |
| `requestCache()`      | 允许配置请求缓存                                             |
| `exceptionHandling()` | 允许配置错误处理                                             |
| `securityContext()`   | 在`HttpServletRequests`之间的`SecurityContextHolder`上设置`SecurityContext`的管理。 当使用`WebSecurityConfigurerAdapter`时，这将自动应用 |
| `servletApi()`        | 将`HttpServletRequest`方法与在其上找到的值集成到`SecurityContext`中。 当使用`WebSecurityConfigurerAdapter`时，这将自动应用 |
| `csrf()`              | 添加 CSRF 支持，使用`WebSecurityConfigurerAdapter`时，默认启用 |
| `logout()`            | 添加退出登录支持。当使用`WebSecurityConfigurerAdapter`时，这将自动应用。默认情况是，访问URL”/ logout”，使HTTP Session无效来清除用户，清除已配置的任何`#rememberMe()`身份验证，清除`SecurityContextHolder`，然后重定向到”/login?success” |
| `anonymous()`         | 允许配置匿名用户的表示方法。 当与`WebSecurityConfigurerAdapter`结合使用时，这将自动应用。 默认情况下，匿名用户将使用`org.springframework.security.authentication.AnonymousAuthenticationToken`表示，并包含角色 “ROLE_ANONYMOUS” |
| `formLogin()`         | 指定支持基于表单的身份验证。如果未指定`FormLoginConfigurer#loginPage(String)`，则将生成默认登录页面 |
| `oauth2Login()`       | 根据外部OAuth 2.0或OpenID Connect 1.0提供程序配置身份验证    |
| `requiresChannel()`   | 配置通道安全。为了使该配置有用，必须提供至少一个到所需信道的映射 |
| `httpBasic()`         | 配置 Http Basic 验证                                         |
| `addFilterAt()`       | 在指定的Filter类的位置添加过滤器                             |

## 类 AuthenticationManagerBuilder

 意思是，AuthenticationManagerBuilder 用于创建一个 AuthenticationManager，让我能够轻松的实现内存验证、LADP验证、基于JDBC的验证、添加UserDetailsService、添加AuthenticationProvider。

# 原理

![img](https://img-blog.csdnimg.cn/20190813175708861.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIyMTcyMTMz,size_16,color_FFFFFF,t_70)