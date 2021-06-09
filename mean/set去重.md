# JAVA中

## 先看一段示例

```java
        
import java.util.HashSet;
import java.util.Set;
 
/**
 * 
 * Set去重原理测试
 *
 */
public class JavaSetDemo {
	public static void main(String args[]){
		Set<String> set = new HashSet<String>();
		
		set.add("aaa");
		set.add("bbb");
		set.add("aaa");
		set.add("ccc");
		
		System.out.println(set);
	}
}
 
 它的输出结果为：[aaa, ccc, bbb]

      
```

从结果看出两点：

1.去重了

2.输出是没有顺序的

## 如何实现的去重

跟踪add方法，发现它的实现是这样的

```java
        
 public boolean add(E e) {
        return map.put(e, PRESENT)==null;
 }

```

有一个map

```java
        
    private transient HashMap<E,Object> map;
 
    // Dummy value to associate with an Object in the backing Map
    private static final Object PRESENT = new Object();
 
    /**
     * Constructs a new, empty set; the backing <tt>HashMap</tt> instance has
     * default initial capacity (16) and load factor (0.75).
     */
    public HashSet() {
        map = new HashMap<>();
    }

```

看到了，map是HashMap类型，Hash类型是散列，所以是无序的，在开始的时候又new了一个对象名为PERSENT的Object对象。以传入的e作为key值，PERSENT作为value来存储到map中，如果key值相同，将会覆盖，这就是set为什么能去重的原因（key相同会覆盖）。

## 再看一个示例

```java
        
import java.util.HashSet;
import java.util.Set;
 
/**
 * 
 * Set去重原理测试
 *
 */
class Human{
	private String name;
	private int age;
	
	public Human(String name,int age){
		this.name = name;
		this.age = age;
	}
	
	@Override
	public String toString() {
		return "name = "+this.name+",age ="+this.age;
	}
}
public class JavaSetDemo {
	public static void main(String args[]){
		Set<Human> sh = new HashSet<Human>();
		sh.add(new Human("gao",28));
		sh.add(new Human("gao",28));
		
		System.out.println(sh);
	}
}
[name = gao,age =28, name = gao,age =28]

```

发现输出了两个，new出了两个对象，地址不相同，所以map在计算key的hash值时，将它当成了两个不同的元素。但是按正常的逻辑，这应该是要被当做一个人的，所以这时要重写equals和hashcode两个方法。

```java
        
class Human{
	private String name;
	private int age;
	
	public Human(String name,int age){
		this.name = name;
		this.age = age;
	}
	
	
	public String getName() {
		return name;
	}
 
 
	public void setName(String name) {
		this.name = name;
	}
 
 
	public int getAge() {
		return age;
	}
 
 
	public void setAge(int age) {
		this.age = age;
	}
 
 
	@Override
	public boolean equals(Object obj) {
		
	    Human tmp = (Human)obj;
	    if(tmp.getAge() == this.age && tmp.getName().equals(this.name)){
	    	return true;
	    }else{
	    	return false;
	    }
	}
	
	@Override
	public int hashCode() {
		return this.getName().hashCode()+this.age;
	}
	
	@Override
	public String toString() {
		return "name = "+this.name+",age ="+this.age;
	}
}

```

此时，加入set集合后的元素就只有1个了。

# Python看了一篇觉得写的很好

## 起步

众所周知，set() 是 Python 中的"天然去重因子"。对一串数据如：**lyst = [1, 1, 2, 4, 4]**，我们常常 set 一下，也就是：`set(lyst)`，达到去重目的。

那么，set() 是如何去重的呢？

## 自定义的数据结构

为了贴合实际的开发需求，我们常需要自定义数据结构。拿通用示例 Student 来说。

```python
class Student(object):
    def __init__(self, name, age, sid):
        self.name = name
        self.age = age
        self.sid = sid
```

现在，我们实例两个 Student 对象，分别是 stu1 和 stu2，其名字 name，年龄 age，学号 sid 相同。现实生活中，可以认为这两个学生是同一人。

```python
stu1 = Student("zhong", 15, 11198)
stu2 = Student("zhong", 15, 11198)

print(set([stu1, stu2]))
# 输出：{<__main__.Student object at 0x0030FE10>, <__main__.Student object at 0x0030FAD0>}

```

然而 set() 并不这样认为，因此没有实现去重效果。

## -eq-函数

事实上，我们用比较操作符 `==` 会发现，Python 解释器认为 stu1 并不等于 stu2。

```python
print(stu1 == stu2)  # 输出：False
```

会有上述现象，是因为程序没有按照现实需求运行。现实需求是：如果名字、年龄、学号都相同，那一定就是同一个人，因而我们需要重写魔法方法 `__eq__()`。代码如下所示：

```java
class Student(object):
    def __init__(self, name, age, sid):
        self.name = name
        self.age = age
        self.sid = sid

    def __eq__(self, other):
        return self.name == other.name and \
               self.age == other.age and \
               self.sid == other.sid

stu1 = Student("zhong", 15, 11198)
stu2 = Student("zhong", 15, 11198)
print(stu1 == stu2)  # 输出：True
```

现在我们是不是可以用 set 去重了呢？

```python
print(set([stu1, stu2]))
---------------------------------
Traceback (most recent call last):
  File "xxxxxxxxx", line 18, in <module>
    print(set([stu1, stu2]))
TypeError: unhashable type: 'Student'
```

很遗憾，解释器报错了。它说 Student 类型的对象不能哈希。

## __-hash__-函数

当我们没有为 Student 添加 `__eq__()` 函数时，set() 还不会报错，现在却说不能哈希？好在，我们可以重写 `__hash__()` 方法，改变原来的默认的哈希处理逻辑。

```python
class Student(object):
    def __init__(self, name, age, sid):
        self.name = name
        self.age = age
        self.sid = sid

    def __eq__(self, other):
        return self.name == other.name and \
               self.age == other.age and \
               self.sid == other.sid

    def __hash__(self):
        return hash((self.name, self.age, self.sid))

stu1 = Student("zhong", 15, 11198)
stu2 = Student("zhong", 15, 11198)
print(set([stu1, stu2]))
# 输出：{<__main__.Student object at 0x0030FE10>}

```

为方便起见，这里借助了 tuple 的不可变特性，使其能够正确通过哈希处理。此时我们再用 set() 去重，发现成功了！

倘若在上述代码的基础上，试图把 eq 函数去掉，你会发现 set() 去重失效了。尽管它们的哈希结果相同。

```python
class Student(object):
    def __init__(self, name, age, sid):
        self.name = name
        self.age = age
        self.sid = sid

    def __hash__(self):
        return hash((self.name, self.age, self.sid))

stu1 = Student("zhong", 15, 11198)
stu2 = Student("zhong", 15, 11198)
print(set([stu1, stu2]))  # 输出：{<__main__.Student object at 0x00A9FAD0>, <__main__.Student object at 0x00A9FE10>}
print(hash(stu1) == hash(stu2))  # 输出： True

```

## 去重原理

经过前面一步步推导，我们也得出了 set() 去重原理：

1. set() 函数中会先调用对象的 `__hash__()` 方法，获取 hash 结果；
2. 如果 hash 结果相同，用比较操作符 `==` （也就是调用函数 `__eq__()`）判断二者的值是否相等；
3. 如果都相等，去重；否则，set() 认为二者不同，两个都保留到结果中。