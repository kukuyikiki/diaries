# Eureka服务注册与发现

## 1.什么是Eureka

- Spring Cloud Eureka 是对Netflix公司的Eureka的二次封装，它实现了服务治理的功能，Spring Cloud Eureka提

- 供服务端与客户端，服务端即是Eureka服务注册中心，客户端完成微服务向Eureka服务的注册与发现。服务端和客户端均采用Java语言编写。下图显示了Eureka Server与Eureka Client的关系：

  ![img](https://upload-images.jianshu.io/upload_images/14591403-95e45aa5f4553785.png?imageMogr2/auto-orient/strip|imageView2/2/w/1197/format/webp)

- Eureka Server是服务端，负责管理各各微服务结点的信息和状态。
- 在微服务上部署Eureka Client程序，远程访问Eureka Server将自己注册在Eureka Server。
- 微服务需要调用另一个微服务时从Eureka Server中获取服务调用地址，进行远程调用。



# 流程

有了注册中心，在pom文件中，要使用Eureka，就需要导入Eureka的包

```xml
<!--        EUREKA-->
        <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-eureka</artifactId>
           <version>1.4.6.RELEASE</version>
        </dependency>
<!--        完善监控信息-->
        <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
```



在application.yml中

注册到哪里

```yml
#Eureka的配置，服务注册到哪里
eureka:
  client:
    server-url:
      defaultZone: http://localhost:7001/eureka/
    instance:
      instance-id: springcloud-provider-dept8001 # 修改eureka上的默认描述信息

# info配置
info:
  app.name: hao-springcloud
  company.name: blog.haostudy.com 
```

在启动类中

开启

```java
@EnableEurekaClient //cs架构，他是客户端的东西，启动之后自动注册到服务端
                    //在服务启动后自动注册到Eureka中！
```



在controller中为自己的服务添加一些消息

```java
//注册进来的微服务！，获取一些消息~
    @GetMapping("/dept/discovery")
    public Object discovery(){
        //获取微服务列表的清单
        List<String> services = client.getServices();
        System.out.println("discovery=>services:"+services);

        //得到一个具体的微服务信息，通过具体的微服务id，applicationName:
        List<ServiceInstance> instances = client.getInstances("SPRINGCLOUD-PROVIDER-DEPT");

        for (ServiceInstance instance : instances) {
            System.out.println(
                    instance.getHost()+"\t"+
                    instance.getPort()+"\t"+
                    instance.getUri()+"\t"+
                    instance.getServiceId()
            );
        }
        return this.client;
    }
```







