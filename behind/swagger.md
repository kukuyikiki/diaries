# swagger使用

## 来源

由于Spring Boot能够快速开发、便捷部署等特性，相信有很大一部分Spring Boot的用户会用来构建RESTful API。而我们构建RESTful API的目的通常都是由于多终端的原因，这些终端会共用很多底层业务逻辑，因此我们会抽象出这样一层来同时服务于多个移动端或者Web前端。

这样一来，我们的RESTful API就有可能要面对多个开发人员或多个开发团队：IOS开发、Android开发或是Web开发等。为了减少与其他团队平时开发期间的频繁沟通成本，传统做法我们会创建一份RESTful API文档来记录所有接口细节，然而这样的做法有以下几个问题：

- 由于接口众多，并且细节复杂（需要考虑不同的HTTP请求类型、HTTP头部信息、HTTP请求内容等），高质量地创建这份文档本身就是件非常吃力的事，下游的抱怨声不绝于耳。
- 随着时间推移，不断修改接口实现的时候都必须同步修改接口文档，而文档与代码又处于两个不同的媒介，除非有严格的管理机制，不然很容易导致不一致现象。

为了解决上面这样的问题，本文将介绍RESTful API的重磅好伙伴Swagger2，它可以轻松的整合到Spring Boot中，并与Spring MVC程序配合组织出强大RESTful API文档。它既可以减少我们创建文档的工作量，同时说明内容又整合入实现代码中，让维护文档和修改代码整合为一体，可以让我们在修改代码逻辑的同时方便的修改文档说明。另外Swagger2也提供了强大的页面测试功能来调试每个RESTful API。具体效果如下图所示：

![alt=](http://blog.didispace.com/content/images/2016/04/swagger2_1.png)

## 实现

### 在pom.xml中加入Swagger2的依赖

```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.2.2</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.2.2</version>
</dependency>
```

### 创建Swagger2配置类

在`Application.java`同级创建Swagger2的配置类`Swagger2`。

```java
@Configuration
@EnableSwagger2
public class Swagger2 {

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.didispace.web"))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Spring Boot中使用Swagger2构建RESTful APIs")
                .description("更多Spring Boot相关文章请关注：http://blog.didispace.com/")
                .termsOfServiceUrl("http://blog.didispace.com/")
                .contact("程序猿DD")
                .version("1.0")
                .build();
    }

}
```

如上代码所示，通过`@Configuration`注解，让Spring来加载该类配置。再通过`@EnableSwagger2`注解来启用Swagger2。

再通过`createRestApi`函数创建`Docket`的Bean之后，`apiInfo()`用来创建该Api的基本信息（这些基本信息会展现在文档页面中）。`select()`函数返回一个`ApiSelectorBuilder`实例用来控制哪些接口暴露给Swagger来展现，本例采用指定扫描的包路径来定义，Swagger会扫描该包下所有Controller定义的API，并产生文档内容（除了被`@ApiIgnore`指定的请求）

添加文档内容



在完成了上述配置后，其实已经可以生产文档内容，但是这样的文档主要针对请求本身，而描述主要来源于函数等命名产生，对用户并不友好，我们通常需要自己增加一些说明来丰富文档内容。如下所示，我们通过`@ApiOperation`注解来给API增加说明、通过`@ApiImplicitParams`、`@ApiImplicitParam`注解来给参数增加说明。

```java
@RestController
@RequestMapping(value="/users")     // 通过这里配置使下面的映射都在/users下，可去除
public class UserController {

    static Map<Long, User> users = Collections.synchronizedMap(new HashMap<Long, User>());

    @ApiOperation(value="获取用户列表", notes="")
    @RequestMapping(value={""}, method=RequestMethod.GET)
    public List<User> getUserList() {
        List<User> r = new ArrayList<User>(users.values());
        return r;
    }

    @ApiOperation(value="创建用户", notes="根据User对象创建用户")
    @ApiImplicitParam(name = "user", value = "用户详细实体user", required = true, dataType = "User")
    @RequestMapping(value="", method=RequestMethod.POST)
    public String postUser(@RequestBody User user) {
        users.put(user.getId(), user);
        return "success";
    }

    @ApiOperation(value="获取用户详细信息", notes="根据url的id来获取用户详细信息")
    @ApiImplicitParam(name = "id", value = "用户ID", required = true, dataType = "Long")
    @RequestMapping(value="/{id}", method=RequestMethod.GET)
    public User getUser(@PathVariable Long id) {
        return users.get(id);
    }

    @ApiOperation(value="更新用户详细信息", notes="根据url的id来指定更新对象，并根据传过来的user信息来更新用户详细信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "用户ID", required = true, dataType = "Long"),
            @ApiImplicitParam(name = "user", value = "用户详细实体user", required = true, dataType = "User")
    })
    @RequestMapping(value="/{id}", method=RequestMethod.PUT)
    public String putUser(@PathVariable Long id, @RequestBody User user) {
        User u = users.get(id);
        u.setName(user.getName());
        u.setAge(user.getAge());
        users.put(id, u);
        return "success";
    }

    @ApiOperation(value="删除用户", notes="根据url的id来指定删除对象")
    @ApiImplicitParam(name = "id", value = "用户ID", required = true, dataType = "Long")
    @RequestMapping(value="/{id}", method=RequestMethod.DELETE)
    public String deleteUser(@PathVariable Long id) {
        users.remove(id);
        return "success";
    }

}
```

完成上述代码添加上，启动Spring Boot程序，访问：http://localhost:8080/swagger-ui.html



就能看到前文所展示的RESTful API的页面。我们可以再点开具体的API请求，以POST类型的/users请求为例，可找到上述代码中我们配置的Notes信息以及参数user的描述信息，如下图所示。

![alt](http://blog.didispace.com/content/images/2016/04/swagger2_2.png)



## Swagger2注解整体说明

### 用于controller类上

| 注解 | 说明           |
| ---- | -------------- |
| @Api | 对请求类的说明 |

```
@Api：放在 请求的类上，与 @Controller 并列，说明类的作用，如用户模块，订单类等。
	tags="说明该类的作用"
	value="该参数没什么意义，所以不需要配置"
```

eg：

```
@Api(tags="订单模块")
@Controller
public class OrderController {

}
```

**`@Api` 其它属性配置：**

| 属性名称       | 备注                                    |
| -------------- | --------------------------------------- |
| value          | url的路径值                             |
| tags           | 如果设置这个值、value的值会被覆盖       |
| description    | 对api资源的描述                         |
| basePath       | 基本路径                                |
| position       | 如果配置多个Api 想改变显示的顺序位置    |
| produces       | 如, “application/json, application/xml” |
| consumes       | 如, “application/json, application/xml” |
| protocols      | 协议类型，如: http, https, ws, wss.     |
| authorizations | 高级特性认证时配置                      |
| hidden         | 配置为true ，将在文档中隐藏             |



### 用于方法上面的(说明参数的含义)

| 注解                                  | 说明                                                       |
| ------------------------------------- | ---------------------------------------------------------- |
| @ApiOperation                         | 方法的说明                                                 |
| @ApiImplicitParams、@ApiImplicitParam | 方法的参数的说明；@ApiImplicitParam 用于指定单个参数的说明 |

#### @ApiOperation：方法的说明

```
@ApiOperation："用在请求的方法上，说明方法的作用"
	value="说明方法的作用"
	notes="方法的备注说明"
```

#### @ApiImplicitParams、@ApiImplicitParam：方法参数的说明

```java
@ApiImplicitParams：用在请求的方法上，包含一组参数说明
	@ApiImplicitParam：对单个参数的说明	    
	    name：参数名
	    value：参数的说明、描述
	    required：参数是否必须必填
	    paramType：参数放在哪个地方
	        · query --> 请求参数的获取：@RequestParam
	        · header --> 请求参数的获取：@RequestHeader	      
	        · path（用于restful接口）--> 请求参数的获取：@PathVariable
	        · body（请求体）-->  @RequestBody User user
	        · form（普通表单提交）	   
	    dataType：参数类型，默认String，其它值dataType="Integer"	   
	    defaultValue：参数的默认值
```

eg：

```java
@Api(tags="用户模块")
@Controller
public class UserController {

	@ApiOperation(value="用户登录",notes="随边说点啥")
	@ApiImplicitParams({
		@ApiImplicitParam(name="mobile",value="手机号",required=true,paramType="form"),
		@ApiImplicitParam(name="password",value="密码",required=true,paramType="form"),
		@ApiImplicitParam(name="age",value="年龄",required=true,paramType="form",dataType="Integer")
	})
	@PostMapping("/login")
	public JsonResult login(@RequestParam String mobile, @RequestParam String password,
	@RequestParam Integer age){
		//...
	    return JsonResult.ok(map);
	}
}

```



### **用于方法上面（返回参数或对象的说明）：**

| 注解                        | 说明                                                    |
| --------------------------- | ------------------------------------------------------- |
| @ApiResponses、@ApiResponse | 方法返回值的说明 ；@ApiResponses 用于指定单个参数的说明 |

#### @ApiResponses、@ApiResponse：方法返回值的状态码说明

```
@ApiResponses：方法返回对象的说明
	@ApiResponse：每个参数的说明
	    code：数字，例如400
	    message：信息，例如"请求参数没填好"
	    response：抛出异常的类

```

eg：

```java
@Api(tags="用户模块")
@Controller
public class UserController {

	@ApiOperation("获取用户信息")
	@ApiImplicitParams({
		@ApiImplicitParam(paramType="query", name="userId", dataType="String", required=true, value="用户Id")
	}) 
	@ApiResponses({
		@ApiResponse(code = 200, message = "请求成功"),
		@ApiResponse(code = 400, message = "请求参数没填好"),
		@ApiResponse(code = 404, message = "请求路径没有或页面跳转路径不对")
	}) 
	@ResponseBody
	@RequestMapping("/list")
	public JsonResult list(@RequestParam String userId) {
		...
		return JsonResult.ok().put("page", pageUtil);
	}
}

```



### **对象类：**

| 注解              | 说明                                         |
| ----------------- | -------------------------------------------- |
| @ApiModel         | 用在JavaBean类上，说明JavaBean的 用途        |
| @ApiModelProperty | 用在JavaBean类的属性上面，说明此属性的的含议 |

#### @ApiModel：用于JavaBean上面，表示对JavaBean 的功能描述

`@ApiModel`的用途有2个：

1. 当请求数据描述，即 `@RequestBody` 时， 用于封装请求（包括数据的各种校验）数据；
2. 当响应值是对象时，即 `@ResponseBody` 时，用于返回值对象的描述。

#### 当请求数据描述时， `@RequestBody` 时的使用

```java
@ApiModel(description = "用户登录")
public class UserLoginVO implements Serializable {

	private static final long serialVersionUID = 1L;

	@ApiModelProperty(value = "用户名",required=true)	
	private String username;

	@ApiModelProperty(value = "密码",required=true)	
	private String password;
	
	// getter/setter省略
}
```

```java
@Api(tags="用户模块")
@Controller
public class UserController {

	@ApiOperation(value = "用户登录", notes = "")	
	@PostMapping(value = "/login")
	public R login(@RequestBody UserLoginVO userLoginVO) {
		User user=userSerivce.login(userLoginVO);
		return R.okData(user);
	}
}
```

eg：

![image-20210126115300089](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210126115300089.png)

#### @ApiModelProperty：用在JavaBean类的属性上面，说明属性的含义

```java
@ApiModel(description= "返回响应数据")
public class RestMessage implements Serializable{

	@ApiModelProperty(value = "是否成功",required=true)
	private boolean success=true;	
	
	@ApiModelProperty(value = "错误码")
	private Integer errCode;
	
	@ApiModelProperty(value = "提示信息")
	private String message;
	
    @ApiModelProperty(value = "数据")
	private Object data;
		
	/* getter/setter 略*/
}

```

