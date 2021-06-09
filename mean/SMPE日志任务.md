## @SIF4j是用作日志输出的，一般会在项目每个类的开头加入该注解

添加了该注释之后，就可以在代码中直接引用log.info()打印日志了。



## controller中存在 @ApiOperation注解

不是spring自带的注解，是swagger里的

@ApiOperation和@ApiParam为添加的API相关注解

@ApiOperation(value = “接口说明”, httpMethod = “接口请求方式”, response = “接口返回参数类型”, notes = “接口发布说明”）；



## @PreAuthorize可以在方法调用前进行权限调用

@PreAuthorize可以用来控制一个方法是否能够被调用。

```java
@PreAuthorize("@smpe.check('user:list','dept:list')")
```



## @ApiModel

使用场景：在实体类上边使用，标记类时swagger的解析类。
概述：提供有关swagger模型的其它信息，类将在操作中用作类型时自动内省。

![img](https://img2020.cnblogs.com/blog/397648/202005/397648-20200518152915502-1667156516.png)

## @ApiModelProperty()用于方法，字段； 表示对model属性的说明或者数据操作更改 

value–字段说明 
name–重写属性名字 
dataType–重写属性类型 
required–是否必填 
example–举例说明 
hidden–隐藏



## @TableId

“value”：设置数据库字段值
“type”：设置主键类型

| 类型          | 解释                                                     |
| ------------- | -------------------------------------------------------- |
| AUTO          | 数据库自增ID                                             |
| NONE          | 数据库未设置主键类型（将会跟随全局）                     |
| INPUT         | 用户输入ID（该类型可以通过自己注册自动填充插件进行填充） |
| ID_WORKER     | 全局唯一ID (idWorker)                                    |
| UUID          | 全局唯一ID（UUID）                                       |
| ID_WORKER_STR | 字符串全局唯一ID（idWorker 的字符串表示）                |



## @Around--AOP增强处理

@Around的作用

- **既可以在目标方法之前织入增强动作，也可以在执行目标方法之后织入增强动作；**
- **可以决定目标方法在什么时候执行，如何执行，甚至可以完全阻止目标目标方法的执行；**
- **可以改变执行目标方法的参数值，也可以改变执行目标方法之后的返回值； 当需要改变目标方法的返回值时，只能使用Around方法；**



java.time.Instant.toEpochMilli()方法将此瞬间转换为1970-01-01T00：00：00Z的纪元的毫秒数。