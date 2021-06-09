# Spring中bean的四中注入方法

## Set方法注入

如果我们需要使用`set`注入，那么必须要为属性提供`set`方法，`Spring`容器就是通过调用`bean`的`set`方法为属性注入值的。而在`xml`文件中，使用`set`注入的方式就是通过`property`标签

```xml
<!-- 定义car这个bean，id为myCar -->
<bean id="myCar" class="cn.tewuyiang.pojo.Car">
    <!-- 
        为car的属性注入值，因为speed和price都是基本数据类型，所以使用value为属性设置值；
        注意，这里的name为speed和price，不是因为属性名就是speed和price，
        而是set方法分别为setSpeed和setPrice，名称是通过将set删除，然后将第一个字母变小写得出；
    -->
    <property name="speed" value="100"/>
    <property name="price" value="99999.9"/>
</bean>

<!-- 定义user这个bean -->
<bean id="user" class="cn.tewuyiang.pojo.User">
    <property name="name" value="aaa" />
    <property name="age" value="123" />
    <!-- car是引用类型，所以这里使用ref为其注入值，注入的就是上面定义的myCar 
         基本数据类型或Java包装类型使用value，
         而引用类型使用ref，引用另外一个bean的id 
    -->
    <property name="car" ref="myCar" />
</bean>
```

通过上面的配置，就可以为`Car`和`User`这两个类型的`bean`注入值了。需要注意的是，**property的name属性，填写的不是属性的名称，而是set方法去除set，然后将第一个字符小写后的结果。对于基本数据类型，或者是Java的包装类型（比如String），使用value注入值，而对于引用类型，则使用ref，传入其他bean的id。**

## 构造器注入

通过调用`bean`所属类的带参构造器为`bean`的属性注入值。这也就意味着，**我们如果需要使用构造器注入，就得为类提供包含参数的构造方法**。

### **匹配构造器的参数名称**

我们需要通过`constructor-arg`标签为构造器传入参数值，但是每个`constructor-arg`标签对应哪一个参数值呢？这就有多种方式指定了。第一种就是直接匹配参数名，配置如下：

```xml
<bean id="myCar" class="cn.tewuyiang.pojo.Car">
    <!-- 通过constructor-arg的name属性，指定构造器参数的名称，为参数赋值 -->
    <constructor-arg name="speed" value="100" />
    <constructor-arg name="price" value="99999.9"/>
</bean>

<bean id="user" class="cn.tewuyiang.pojo.User">
    <constructor-arg name="name" value="aaa" />
    <constructor-arg name="age" value="123" />
    <!-- 
         和之前一样，基本数据类型或Java包装类型使用value，
         而引用类型使用ref，引用另外一个bean的id 
    -->
    <constructor-arg name="car" ref="myCar" />
</bean>
```

有人看完之后，可能会觉得这里的配置和`set`注入时的配置几乎一样，除了一个使用`property`，一个使用`constructor-arg`。确实，写法上一样，但是表示的含义却完全不同。**property的name属性，是通过set方法的名称得来；而constructor-arg的name，则是构造器参数的名称**。

### **匹配构造器的参数下标**

通过参数在参数列表中的下标进行匹配的方式。

```xml
<bean id="car" class="cn.tewuyiang.pojo.Car">
    <!-- 下标编号从0开始，构造器的第一个参数是speed，为它赋值100 -->
    <constructor-arg index="0" value="100" />
    <!-- 构造器的第二个参数是price，为它赋值99999.9 -->
    <constructor-arg index="1" value="99999.9"/>
</bean>

<bean id="user" class="cn.tewuyiang.pojo.User">
    <!-- 与上面car的配置同理 -->
    <constructor-arg index="0" value="aaa" />
    <constructor-arg index="1" value="123" />
    <constructor-arg index="2" ref="car" />
</bean>
```

**若存在多个构造器匹配bean的定义，Spring容器总是使用最后一个满足条件的构造器**。

### **匹配构造器的参数类型**

```xml
<bean id="car" class="cn.tewuyiang.pojo.Car">
    <!-- 使用type属性匹配类型，car的构造器包含两个参数，一个是int类型，一个是double类型 -->
    <constructor-arg type="int" value="100" />
    <constructor-arg type="double" value="99999.9"/>
</bean>

<bean id="user" class="cn.tewuyiang.pojo.User">
    <!-- 对于引用类型，需要使用限定类名 -->
    <constructor-arg type="java.lang.String" value="aaa" />
    <constructor-arg type="int" value="123" />
    <constructor-arg type="cn.tewuyiang.pojo.Car" ref="car" />
</bean>

```

## 静态工厂注入

静态工厂注入就是我们编写一个静态的工厂方法，这个工厂方法会返回一个我们需要的值，然后在配置文件中，我们指定使用这个工厂方法创建`bean`。首先我们需要一个静态工厂，如下所示：

```java
public class SimpleFactory {

    /**
     * 静态工厂，返回一个Car的实例对象
     */
    public static Car getCar() {
        return new Car(12345, 5.4321);
    }
}
```

 下面我们需要在`xml`中配置car这个bean，并指定它由工厂方法进行创建。配置如下：

```xml
<!-- 
	注意，这里的配置并不是创建一个SimpleFactory对象，取名为myCar，
    这一句配置的意思是，调用SimpleFactory的getCar方法，创建一个car实例对象，
    将这个car对象取名为myCar。
-->
<bean id="car" class="cn.tewuyiang.factory.SimpleFactory" factory-method="getCar"/>

<bean id="user" class="cn.tewuyiang.pojo.User">
    <!-- name和age使用set注入 -->
    <property name="name" value="aaa"/>
    <property name="age" value="123"/>
    <!-- 将上面配置的car，注入到user的car属性中 -->
    <property name="car" ref="car"/>
</bean>

```

## 实例工厂注入

静态工厂调用工厂方法不需要先创建工厂类的对象，因为静态方法可以直接通过类调用，所以没有什么静态工厂类的bean。但是，实例工厂需要一个实例对象，才能调用他的工厂方法。

```java
public class SimpleFactory {

    /**
     * 实例工厂方法，返回一个Car的实例对象
     */
    public Car getCar() {
        return new Car(12345, 5.4321);
    }

    /**
     * 实例工厂方法，返回一个String
     */
    public String getName() {
        return "tewuyiang";
    }

    /**
     * 实例工厂方法，返回一个int，在Spring容器中会被包装成Integer
     */
    public int getAge() {
        return 128;
    }
}

```

在上面的工厂类中，共定义了三个工厂方法，分别用来返回`user`所需的`car`，`name`以及`age`，而配置文件如下：

```xml
<!-- 声明实例工厂bean，Spring容器需要先创建一个SimpleFactory对象，才能调用工厂方法 -->
<bean id="factory" class="cn.tewuyiang.factory.SimpleFactory" />

<!-- 
    通过实例工厂的工厂方法，创建三个bean，通过factory-bean指定工厂对象，
    通过factory-method指定需要调用的工厂方法
-->
<bean id="name" factory-bean="factory" factory-method="getName" />
<bean id="age" factory-bean="factory" factory-method="getAge" />
<bean id="car" factory-bean="factory" factory-method="getCar" />

<bean id="user" class="cn.tewuyiang.pojo.User">
    <!-- 将上面通过实例工厂方法创建的bean，注入到user中 -->
    <property name="name" ref="name"/>
    <property name="age" ref="age"/>
    <property name="car" ref="car"/>
</bean>
```

## 使用注解注入

假如需要使用注解的方式为`bean`注入属性值，应该这么操作呢？首先，如果`bean`依赖于其他`bean`（比如`User`依赖`Car`），那么我们可以使用`@Autowired`或者`@Resource`这两个注解进行依赖注入，这个大家应该都知道。但是如果要为基本数据类型或者是`Java`的封装类型（比如`String`）赋值呢？这时候可以使用`@Value`注解。

**实例化Bean有四个注解**

- **@Component**
- **@Service**：业务层
- **@Controller**：WEB层
- **@Repository**：持久层

**bean的作用域配置**

　　Spring中可以使用scope属性来配置bean的作用域：

　　singleton:单例，在初始化配置文件时生成单例bean对象

　　prototype：原型的，在初始化配置文件时不生成bean对象，使用时返回不同的bean对象

　　request：web环境下每一个request请求都会返回一个不同的bean，只在本次请求中有效

　　session：web环境下每一个request请求都会返回一个不同的bean，在session中有效

**@Autowired** 

它可以对类成员变量、方法及构造函数进行标注，完成自动装配的工作。 通过 @Autowired的使用来消除 set ，get方法。

