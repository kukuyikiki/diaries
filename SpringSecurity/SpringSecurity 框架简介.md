# SpringSecurity 框架简介  

## 概要

关于安全方面的两个主要区域是“认证” 和“授权” （或者访问控
制）， 一般来说， Web 应用的安全性包括用户认证（ Authentication）和用户授权
（ Authorization） 两个部分， 这两点也是 Spring Security 重要核心功能。  

（ 1）用户认证指的是：验证某个用户是否为系统中的合法主体，也就是说用户能否访问
该系统。用户认证一般要求用户提供用户名和密码。系统通过校验用户名和密码来完成认
证过程。 通俗点说就是系统认为用户是否能登录
（ 2）用户授权指的是验证某个用户是否有权限执行某个操作。在一个系统中，不同用户
所具有的权限是不同的。比如对一个文件来说，有的用户只能进行读取，而有的用户可以
进行修改。一般来说，系统会为不同的用户分配不同的角色，而每个角色则对应一系列的
权限。 通俗点讲就是系统判断用户是否有权限去做某些事情。  

# 权限管理中的相关概念

## 主体

英文单词： principal

使用系统的用户或设备或从其他系统远程登录的用户等等。简单说就是谁使用系统谁就是主体。  

## 认证

英文单词： authentication 

权限管理系统确认一个主体的身份，允许主体进入系统。简单说就是“主体”证明自己是谁。

笼统的认为就是以前所做的登录操作。  

## 授权

英文单词： authorization

将操作系统的“权力”“授予”“主体”，这样主体就具备了操作系统中特定功能的能力。

所以简单来说，授权就是给用户分配权限。  

# 添加一个控制器进行访问

```java
package com.atguigu.controller;

@Controller
public class IndexController {
    
@GetMapping("index")
@ResponseBody
public String index(){
return "success";
	}
}
```

![image-20210122112349377](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210122112349377.png)

# SpringSecurity基本原理

SpringSecurity 本质是一个过滤器链：
从启动是可以获取到过滤器链：  

代码底层流程：重点看三个过滤器：  

**FilterSecurityInterceptor：是一个方法级的权限过滤器, 基本位于过滤链的最底部。**  

![image-20210122112452085](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210122112452085.png)

super.beforeInvocation(fi) 表示查看之前的 filter 是否通过。  

fi.getChain().doFilter(fi.getRequest(), fi.getResponse());表示真正的调用后台的服务。  



**ExceptionTranslationFilter：是个异常过滤器，用来处理在认证授权过程中抛出的异常**  

![image-20210122112546795](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210122112546795.png)



**UsernamePasswordAuthenticationFilter ：对/login 的 POST 请求做拦截，校验表单中用户**
**名，密码。**  

![image-20210122112625485](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210122112625485.png)



**springBoot帮我们自动配置了SpringSecurity，里面的实现过程是这样的**

![image-20210122112808164](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210122112808164.png)





# UserDetailsService接口详解

当什么也没有配置的时候，账号和密码是由 Spring Security 定义生成的。而在实际项目中
账号和密码都是从数据库中查询出来的。 所以我们要通过自定义逻辑控制认证逻辑。  



如果需要自定义逻辑时，只需要实现 UserDetailsService 接口即可。接口定义如下：  

![image-20210122144839212](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210122144839212.png)

返回值 UserDetails  

这个类是系统默认的用户“主体”  

```
// 表示获取登录用户所有权限
Collection<? extends GrantedAuthority> getAuthorities();

// 表示获取密码
String getPassword();

// 表示获取用户名
String getUsername();

// 表示判断账户是否过期
boolean isAccountNonExpired();

// 表示判断账户是否被锁定
boolean isAccountNonLocked();

// 表示凭证{密码}是否过期
boolean isCredentialsNonExpired();

// 表示当前用户是否可用
boolean isEnabled();
```



**以下是 UserDetails 实现类**  

![image-20210122163529655](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210122163529655.png)

**以后我们只需要使用 User 这个实体类即可！**

![image-20210122164306862](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210122164306862.png)  



# 实现数据库认证来完成用户登录

## 引入依赖

```xml
<dependencies>
<dependency>
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-test</artifactId>
<scope>test</scope>
</dependency>
<!--mybatis-plus-->
<dependency>
<groupId>com.baomidou</groupId>
<artifactId>mybatis-plus-boot-starter</artifactId>
<version>3.0.5</version>
</dependency>
<!--mysql-->
<dependency>
<groupId>mysql</groupId>
<artifactId>mysql-connector-java</artifactId>
</dependency>
<!--lombok 用来简化实体类-->
<dependency>
<groupId>org.projectlombok</groupId>
<artifactId>lombok</artifactId>
</dependency>
</dependencies>
```

## 创建实体类

```java
@Data
public class Users {
	private Integer id;
	private String username;
	private String password;
}
```

## 整合MybatisPlus制作mapper

在UserMapper里

```java
@Repository
public interface UsersMapper extends BaseMapper<Users> {
}
```

在配置文件添加数据库配置

```sql
#mysql 数据库连接
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/demo?serverTimezone=GMT%2B8
spring.datasource.username=root
spring.datasource.password=root
```

制作登录实现类

```java
@Service("userDetailsService")
public class MyUserDetailsService implements UserDetailsService {
@Autowired
private UsersMapper usersMapper;
@Override
public UserDetails loadUserByUsername(String s) throws
UsernameNotFoundException {
QueryWrapper<Users> wrapper = new QueryWrapper();
wrapper.eq("username",s);
Users users = usersMapper.selectOne(wrapper);
if(users == null) {
throw new UsernameNotFoundException("用户名不存在！ ");
}
System.out.println(users);
List<GrantedAuthority> auths =
AuthorityUtils.commaSeparatedStringToAuthorityList("role");
return new User(users.getUsername(),
new BCryptPasswordEncoder().encode(users.getPassword()),auths);
}
}
```

# 未认证请求跳转到登录页

## 引入前端模板依赖  

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

## 引入登录页面

将准备好的登录页面导入项目中  



## 编写控制器

```java
@Controller
public class IndexController {
@GetMapping("index")
public String index(){
return "login";
}
@GetMapping("findAll")
@ResponseBody
public String findAll(){
return "findAll";
}
}
```

## 编写配置类放行登陆页面以及静态资源

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
// 注入 PasswordEncoder 类到 spring 容器中
@Bean
public PasswordEncoder passwordEncoder(){
return new BCryptPasswordEncoder();
}
@Override
protected void configure(HttpSecurity http) throws Exception {
http.authorizeRequests()
.antMatchers("/layui/**","/index") //表示配置请求路径
.permitAll() // 指定 URL 无需保护。
.anyRequest() // 其他请求
.authenticated(); //需要认证
} }
```

## 设置未授权的请求跳转到登录页

```java
配置类
    
@Override
protected void configure(HttpSecurity http) throws Exception {
// 配置认证
http.formLogin()
	.loginPage("/index") // 配置哪个 url 为登录页面
.loginProcessingUrl("/login") // 设置哪个是登录的 url。
.successForwardUrl("/success") // 登录成功之后跳转到哪个 url
.failureForwardUrl("/fail");// 登录失败之后跳转到哪个 url
http.authorizeRequests()
    //表示配置请求路径 
	.antMatchers("/layui/**","/index").permitAll() // 指定 URL 无需保护。
.anyRequest() // 其他请求
.authenticated(); //需要认证
// 关闭 csrf
http.csrf().disable();
}
```

```java
控制器
    
@PostMapping("/success")
public String success(){
return "success";
}
@PostMapping("/fail")
public String fail(){
return "fail";
}
```

```html
<form action="/login"method="post">
用户名:<input type="text"name="username"/><br/>
密码： <input type="password"name="password"/><br/>
<input type="submit"value="提交"/>
</form>
```

**注意：页面提交方式必须为 post 请求，所以上面的页面不能使用，用户名，密码必须为
username,password**



**原因：**
在执行登录的时候会走一个过滤器 UsernamePasswordAuthenticationFilter  

![image-20210123112541085](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210123112541085.png)



**如果修改配置可以调用 usernameParameter()和 passwordParameter()方法。**  

```html
<form action="/login"method="post">
用户名:<input type="text"name="loginAcct"/><br/>
密码： <input type="password"name="userPswd"/><br/>
<input type="submit"value="提交"/>
</form>
```

![image-20210123112619543](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210123112619543.png)

# 基于角色或权限进行访问控制

## hasAuthority 方法  

如果当前的主体具有指定的权限，则返回 true,否则返回 false  

### 修改配置类  

![image-20210123202034812](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210123202034812.png)

### 添加一个控制器  

```java
@GetMapping("/find")
@ResponseBody
public String find(){
return "find";
}
```

### 给用户登录主体赋予权限  

![image-20210123202118774](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210123202118774.png)

##   hasAnyAuthority 方法  

如果当前的主体有任何提供的角色（给定的作为一个逗号分隔的字符串列表）的话，返回
true.  

## hasRole 方法  

如果用户具备给定角色就允许访问,否则出现 403。
如果当前主体具有指定的角色，则返回 true。  



### 底层源码：  

![image-20210123202311386](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210123202311386.png)

### 给用户添加角色：  

![image-20210123202335183](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210123202335183.png)

### 修改配置文件：

注意配置文件中不需要添加” ROLE_“，因为上述的底层代码会自动添加与之进行匹配。  

![image-20210123202411924](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210123202411924.png)

## hasAnyRole  

表示用户具备任何一个条件都可以访问。

### 给用户添加角色：  

![image-20210123202443254](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210123202443254.png)

### 修改配置文件：  

![image-20210123202501820](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210123202501820.png)









# 基于数据库的记住我

![image-20210124100107858](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210124100107858.png) 