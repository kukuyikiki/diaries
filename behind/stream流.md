# Stream流

java8新特性

## Stream定义

```
A sequence of elements supporting sequential and parallel aggregate operations.
```

我们来解读一下上面的那句话：

1. Stream是元素的集合，这点让Stream看起来用些类似Iterator；
2. 可以支持顺序和并行的对原Stream进行汇聚的操作；



Stream，用户只要给出需要对其包含的元素执行什么操作，比如“过滤掉长度大于10的字符串”、“获取每个字符串的首字母”等，具体这些操作如何应用到每个元素上，就给Stream就好了

```java
List<Integer> nums = Lists.newArrayList(1,null,3,4,null,6);

nums.stream().filter(num -> num != null).count();
```

上面这段代码是获取一个List中，元素不为null的个数。

![img](https://img-blog.csdnimg.cn/20190413091145183.jpeg)

红色框中的语句是一个Stream的生命开始的地方，负责创建一个Stream实例；绿色框中的语句是赋予Stream灵魂的地方，把一个Stream转换成另外一个Stream，红框的语句生成的是一个包含所有nums变量的Stream，进过绿框的filter方法以后，重新生成了一个过滤掉原nums列表所有null以后的Stream；蓝色框中的语句是丰收的地方，把Stream的里面包含的内容按照某种算法来汇聚成一个值，例子中是获取Stream中包含的元素个数



在此我们总结一下使用Stream的基本步骤：

1. 创建Stream；
2. 转换Stream，每次转换原有Stream对象不改变，返回一个新的Stream对象（**可以有多次转换**）；
3. 对Stream进行聚合（Reduce）操作，获取想要的结果；

## 创建Stream

最常用的创建Stream有两种途径：

1. 通过Stream接口的静态工厂方法（注意：Java8里接口可以带静态方法）；
2. 通过Collection接口的默认方法（默认方法：Default method，也是Java8中的一个新特性，就是接口中的一个带有实现的方法，后续文章会有介绍）–stream()，把一个Collection对象转换成Stream

### 通过Stream接口的静态工厂方法

#### of方法：有两个overload方法，一个接受变长参数，一个接口单一值

```java
1.Stream<Integer> integerStream = Stream.of(1, 2, 3, 5);

2.Stream<String> stringStream = Stream.of("taobao");
```

#### generator方法：生成一个无限长度的Stream，其元素的生成是通过给定的Supplier（这个接口可以看成一个对象的工厂，每次调用返回一个给定类型的对象）

```java
Stream.generate(new Supplier<Double>() {
@Override

public Double get() {
	return Math.random();

}

});

Stream.generate(() -> Math.random());

Stream.generate(Math::random);
```

三条语句的作用都是一样的，只是使用了lambda表达式和方法引用的语法来简化代码。每条语句其实都是生成一个无限长度的Stream，其中值是随机的。这个无限长度Stream是懒加载，一般这种无限长度的Stream都会配合Stream的limit()方法来用。

#### iterate方法

也是生成无限长度的Stream，和generator不同的是，其元素的生成是重复对给定的种子值(seed)调用用户指定函数来生成的。其中包含的元素可以认为是：seed，f(seed),f(f(seed))无限循环

```java
Stream.iterate(1, item -> item + 1).limit(10).forEach(System.out::println);
```

这段代码就是先获取一个无限长度的正整数集合的Stream，然后取出前10个打印。千万记住使用limit方法，不然会无限打印下去。

### 通过Collection子类获取Stream

Collection接口有一个stream方法，所以其所有子类都可以获取对应的Stream对象。

```java
public interface Collection<E> extends Iterable<E> {
 //其他方法省略

 default Stream<E> stream() {
 return StreamSupport.stream(spliterator(), false);

 }

}
```

## 转换Stream

转换Stream其实就是把一个Stream通过某些行为转换成一个新的Stream。

### distinct

对于Stream中包含的元素进行去重操作（去重逻辑依赖元素的equals方法），新生成的Stream中没有重复的元素；

![img](https://img-blog.csdnimg.cn/20190413091145238.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODI5NDk5OQ==,size_16,color_FFFFFF,t_70)

### filter

对于Stream中包含的元素使用给定的过滤函数进行过滤操作，新生成的Stream只包含符合条件的元素；

![img](https://img-blog.csdnimg.cn/20190413091145229.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODI5NDk5OQ==,size_16,color_FFFFFF,t_70)

### map

对于Stream中包含的元素使用给定的转换函数进行转换操作，新生成的Stream只包含转换生成的元素。这个方法有三个对于原始类型的变种方法，分别是：mapToInt，mapToLong和mapToDouble。这三个方法也比较好理解，比如mapToInt就是把原始Stream转换成一个新的Stream，这个新生成的Stream中的元素都是int类型。之所以会有这样三个变种方法，可以免除自动装箱/拆箱的额外消耗；

![img](https://img-blog.csdnimg.cn/20190413091145283.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODI5NDk5OQ==,size_16,color_FFFFFF,t_70)

### flatMap

和map类似，不同的是其每个元素转换得到的是Stream对象，会把子Stream中的元素压缩到父集合中；

![img](https://img-blog.csdnimg.cn/20190413091145279.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODI5NDk5OQ==,size_16,color_FFFFFF,t_70)

### peek

生成一个包含原Stream的所有元素的新Stream，同时会提供一个消费函数（Consumer实例），新Stream每个元素被消费的时候都会执行给定的消费函数；

![img](https://img-blog.csdnimg.cn/20190413091145274.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODI5NDk5OQ==,size_16,color_FFFFFF,t_70)

### 性能问题

在对于一个Stream进行多次转换操作，每次都对Stream的每个元素进行转换，而且是执行多次，这样时间复杂度就是一个for循环里把所有操作都做掉的N（转换的次数）倍啊。其实不是这样的，转换操作都是lazy的，多个转换操作只会在汇聚操作（见下节）的时候融合起来，一次循环完成。我们可以这样简单的理解，Stream里有个操作函数的集合，每次转换操作就是把转换函数放入这个集合中，在汇聚操作的时候循环Stream对应的集合，然后对每个元素执行所有的函数。

## 汇聚（Reduce）Stream

### 定义

```
A reduction operation (also called a fold) takes a sequence of input elements and combines them into a single summary result by repeated application of a combining operation, such as finding the sum or maximum of a set of numbers, or accumulating elements into a list. The streams classes have multiple forms of general reduction operations, called reduce() and collect(), as well as multiple specialized reduction forms such as sum(), max(), or count().
```

汇聚操作（也称为折叠）接受一个元素序列为输入，反复使用某个合并操作，把序列中的元素合并成一个汇总的结果。比如查找一个数字列表的总和或者最大值，或者把这些数字累积成一个List对象。Stream接口有一些通用的汇聚操作，比如reduce()和collect()；也有一些特定用途的汇聚操作，比如sum(),max()和count()。注意：sum方法不是所有的Stream对象都有的，只有IntStream、LongStream和DoubleStream是实例才有。

### 分两部分来介绍汇聚操作：

1. 可变汇聚：把输入的元素们累积到一个可变的容器中，比如Collection或者StringBuilder；
2. 其他汇聚：除去可变汇聚剩下的，一般都不是通过反复修改某个可变对象，而是通过把前一次的汇聚结果当成下一次的入参，反复如此。比如reduce，count，allMatch；

#### 可变汇聚

可变汇聚对应的只有一个方法：collect，正如其名字显示的，它可以把Stream中的要有元素收集到一个结果容器中（比如Collection）。先看一下最通用的collect方法的定义（还有其他override方法）：

```java
1<R> R collect(Supplier<R> supplier,

2 BiConsumer<R, ? super T> accumulator,

3 BiConsumer<R, R> combiner);
```

先来看看这三个参数的含义：Supplier supplier是一个工厂函数，用来生成一个新的容器；BiConsumer accumulator也是一个函数，用来把Stream中的元素添加到结果容器中；BiConsumer combiner还是一个函数，用来把中间状态的多个结果容器合并成为一个（并发的时候会用到）

```java
1List<Integer> nums = Lists.newArrayList(1,1,null,2,3,4,null,5,6,7,8,9,10);

2 List<Integer> numsWithoutNull = nums.stream().filter(num -> num != null).

3 collect(() -> new ArrayList<Integer>(),

4 (list, item) -> list.add(item),

5 (list1, list2) -> list1.addAll(list2));
```

上面这段代码就是对一个元素是Integer类型的List，先过滤掉全部的null，然后把剩下的元素收集到一个新的List中。进一步看一下collect方法的三个参数，都是lambda形式的函数

- 第一个函数生成一个新的ArrayList实例；
- 第二个函数接受两个参数，第一个是前面生成的ArrayList对象，二个是stream中包含的元素，函数体就是把stream中的元素加入ArrayList对象中。第二个函数被反复调用直到原stream的元素被消费完毕；
- 第三个函数也是接受两个参数，这两个都是ArrayList类型的，函数体就是把第二个ArrayList全部加入到第一个中；

#### 其他汇聚

 reduce方法：reduce方法非常的通用，后面介绍的count，sum等都可以使用其实现。reduce方法有三个override的方法，本文介绍两个最常用的，最后一个留给读者自己学习。先来看reduce方法的第一种形式，其方法定义如下

```java
1Optional<T> reduce(BinaryOperator<T> accumulator);

接受一个BinaryOperator类型的参数，在使用的时候我们可以用lambda表达式来。

1List<Integer> ints = Lists.newArrayList(1,2,3,4,5,6,7,8,9,10);

2System.out.println("ints sum is:" + ints.stream().reduce((sum, item) -> sum + item).get());
```

可以看到reduce方法接受一个函数，这个函数有两个参数，第一个参数是上次函数执行的返回值（也称为中间结果），第二个参数是stream中的元素，这个函数把这两个值相加，得到的和会被赋值给下次执行这个函数的第一个参数。要注意的是：**第一次执行的时候第一个参数的值是Stream的第一个元素，第二个参数是Stream的第二个元素**。这个方法返回值类型是Optional，这是Java8防止出现NPE的一种可行方法，后面的文章会详细介绍，这里就简单的认为是一个容器，其中可能会包含0个或者1个对象。

![img](https://img-blog.csdnimg.cn/20190413091145280.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODI5NDk5OQ==,size_16,color_FFFFFF,t_70)