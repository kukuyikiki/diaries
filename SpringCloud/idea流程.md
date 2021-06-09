# 流程

### 1.创建maven项目

![image-20201021220239681](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201021220239681.png)

![image-20201021220326715](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201021220326715.png)

### 2.删除src，配置pom文件

![image-20201022164919095](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201022164919095.png)

```xml
<!--    打包方式-->
    <packaging>pom</packaging>

    <properties>
        <junit.version>4.12</junit.version>
        <lombok.version>1.16.10</lombok.version>
    </properties>

    <dependencyManagement>
        <dependencies>
<!--            springCloud的依赖-->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>Greenwich.SR1</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
<!--            SpringBoot-->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>2.1.4.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
<!--            数据库-->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>5.1.47</version>
            </dependency>
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid</artifactId>
                <version>1.1.10</version>
            </dependency>
            <!--SpringBoot启动器-->
            <dependency>
                <groupId>org.mybatis.spring.boot</groupId>
                <artifactId>mybatis-spring-boot-starter</artifactId>
                <version>1.3.2</version>
            </dependency>
<!--            junit-->
            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>${junit.version}</version>
            </dependency>
<!--            lombok-->
            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
            </dependency>
<!--            log4j-->
            <dependency>
                <groupId>log4j</groupId>
                <artifactId>log4j</artifactId>
                <version>1.2.17</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
```

### 3.new maven普通项目

![image-20201022210056281](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201022210056281.png)

### 4.配置新建module

![image-20201022211112200](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201022211112200.png)

### 5.写pojo类

链式写法：

​	可以连着写

```java
Dept dept = new Dept();
dept.setDeptName(11).setDname('ssss').setDb_source('001');
```

![image-20201023144352724](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201023144352724.png)



### 6.这个微服务就完了

删除test

微服务，拆分嘛，就这个模块专门做这个事情



## 创建这个服务的提供者

![image-20201023145007921](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201023145007921.png)

在pom文件中

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>springcloud</artifactId>
        <groupId>com.hao</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

<artifactId>springcloud-provider-dept-8001</artifactId>
<!--    我们需要拿到实体类，所以要配置api module-->
    <dependencies>
<!--        我们需要拿到实体类，所以要配置api module-->
        <dependency>
           <groupId>com.hao</groupId>
           <artifactId>springcloud-api</artifactId>
           <version>1.0-SNAPSHOT</version>
        </dependency>
<!--        junit-->
        <dependency>
           <groupId>junit</groupId>
           <artifactId>junit</artifactId>
        </dependency>
<!--        数据库-->
        <dependency>
           <groupId>mysql</groupId>
           <artifactId>mysql-connector-java</artifactId>
        </dependency>
<!--        数据源-->
        <dependency>
           <groupId>com.alibaba</groupId>
           <artifactId>druid</artifactId>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-core</artifactId>
        </dependency>
        <dependency>
           <groupId>org.mybatis.spring.boot</groupId>
           <artifactId>mybatis-spring-boot-starter</artifactId>
        </dependency>
        <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-test</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
<!--        jetty-->
        <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-jetty</artifactId>
        </dependency>
<!--        热部署工具-->
        <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-devtools</artifactId>
        </dependency>
    </dependencies>
```



### 8.配置提供者的 yml文件

删除test，在resource文件夹下新建 application.yml文件

```yml
server:
  port: 8001

# mybatis的配置
mybatis:
  type-aliases-package: com.hao.springcloud.pojo
  config-location: classpath:mybatis/mybatis-config.xml
  #config-location:  mybatis的核心配置
  mapper-locations: classpath:mybatis/mapper/*.xml

#spring的配置
spring:
  application:
    name: springcloud-provider-dept
    datasource:
      type: com.alibaba.druid.pool.DruidDataSource
      driver-class-name: org.gjt.mm.mysql.Driver
      url: jdbc:mysql://localhost:3306/db01?useUnicode=true
      # ?useUnicode=true 在从数据库中取数据时，数据库会先将数据库中的数据按照GBK格式解码成字节码，然后再将解析后的字节码重新按UTF-8格式编码数据，最后再将数据返回给客户端
      username: root
      password: 064530
```

### 9.在mybatis-config.xml中写

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--        开启二级缓存-->
        <setting name="cacheEnable" value="true"></setting>
    </settings>
</configuration>
<!--这玩意儿可以不要，主要就是用于演示配置mabits-->
```

### 10.在java中新建dao层

![image-20201024114120730](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201024114120730.png)

```java
package com.hao.springcloud.dao;

import com.hao.springcloud.pojo.Dept;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface DeptDao {

    public boolean addDept(Dept dept);

    public Dept queryById(Long id);

    public List<Dept> queryAll();
}

```

### 11.在java中新建service层

```
package com.hao.springcloud.service;

import com.hao.springcloud.pojo.Dept;

import java.util.List;

public interface DeptService {
    public boolean addDept(Dept dept);

    public Dept queryById(Long id);

    public List<Dept> queryAll();
}
```

serviceImpl中

```
package com.hao.springcloud.service;

import com.hao.springcloud.dao.DeptDao;
import com.hao.springcloud.pojo.Dept;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class DeptServiceImpl implements DeptService {

    @Autowired
    private DeptDao deptDao;

    public boolean addDept(Dept dept) {
        return deptDao.addDept(dept);
    }

    public Dept queryById(Long id) {
        return deptDao.queryById(id);
    }

    public List<Dept> queryAll() {
        return deptDao.queryAll();
    }
}
```

### 12.在java中新建controller层

写DeptController

```java
package com.hao.springcloud.controller;

import com.hao.springcloud.pojo.Dept;
import com.hao.springcloud.service.DeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//提供Restful服务
@RestController
public class DeptController {

    @Autowired
    private DeptService deptService;

    @PostMapping("/dept/add")
    public boolean addDept(Dept dept){
        return deptService.addDept(dept);
    }

    @GetMapping("/dept/get/{id}")
    public Dept get(@PathVariable("id") Long id){
        return deptService.queryById(id);
    }

    @GetMapping("/dept/list")
    public List<Dept> queryAll(){
        return deptService.queryAll();
    }

}
```

### 13.在springcloud文件夹中新DeptProvider_8001

```java
package com.hao.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

//启动类
@SpringBootApplication
public class DeptProvider_8001 {
    public static void main(String[] args) {
        SpringApplication.run(DeptProvider_8001.class,args);
    }
}

```

## 创建这个服务的消费者

### 14.新建模块 

new module ->  springcloud-consumer-dept.80

在java.com.hao.springcloud 新建 config

### 15.新建ConfigBean类

```java
package com.hao.springcloud.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ConfigBean {  //@Configuration -- spring applicationContext.xml

    @Bean
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
}
```

### 16.新建controller包下DeptConsumerController类

```java
package com.hao.springcloud.controller;

import com.hao.springcloud.pojo.Dept;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Controller
public class DeptConsumerController {

    //理解：消费者，不应该有service层
    //RestTemplate ... 供我们直接调用就可以了！ 注册到Spring中
    //(url, 实体：Map, Class<T> responseType)

    @Autowired
    private RestTemplate restTemplate; //提供多种便捷访问远程http服务的方法，简单的restful服务模板

    private static final String REST_URL_PREFIX = "http://localhost:8081";

    @RequestMapping
    public boolean add(Dept dept){
        return restTemplate.postForObject(REST_URL_PREFIX+"/dept/add",dept,Boolean.class);
    }

    @RequestMapping("/consumer/dept/get/{id}")
    public Dept get(@PathVariable("id") Long id){
        return restTemplate.getForObject(REST_URL_PREFIX+"/dept/get/"+id,Dept.class);
    }

    public List<Dept> list(){
        return restTemplate.getForObject(REST_URL_PREFIX+"dept/list/",List.class);
    }
}
```



### 17.在springcloud下 新建DeptConsumer_80

```java
package com.hao.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DeptConsumer_80 {
    public static void main(String[] args) {
        SpringApplication.run(DeptConsumer_80.class,args);
    }
}
```

### 18新建Eureka中心

在springcloud中新建module

springcloud-eureka-7001



```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>springcloud</artifactId>
        <groupId>com.hao</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>springcloud-eureka-7001</artifactId>

<!--    导包-->
    <dependencies>
        <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-eureka-server</artifactId>
           <version>1.4.6.RELEASE</version>
        </dependency>
<!--        热部署-->
        <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-devtools</artifactId>
        </dependency>
    </dependencies>

</project>
```

在resources下	新建application.yml

```java
server:
  port: 7001

#Eureka配置
eureka:
  instance:
    hostname: localhost #Eureka服务端的实例名称
  client:
    register-with-eureka: false #表示是否向eureka注册中心注册自己
    fetch-registry: false #fetch-registry如果为false，则表示自己为注册中心
    service-url:
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
```



在自己的springcloud包下新建 EurekaServer_7001.class文件

```java
package com.hao.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

//启动之后，访问 http://localhost:7001/
@SpringBootApplication
@EnableEurekaServer //EnableEurekaServer 服务端的启动类，可以接受别人注册进来
public class EurekaServer_7001 {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServer_7001.class,args);
    }
}
```





















