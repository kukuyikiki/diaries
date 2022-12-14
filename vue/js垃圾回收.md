# js垃圾回收

## 可达性

JS中内存管理的主要概念是可达性

就是那行以某种方式可访问或可用的值，他们被保证存储到内存中。

### 有一组基本的固有可达值，由于显而易见的原因无法删除。例如:

1.本地函数的局部变量和参数

2.当前嵌套调用链上的其他函数的变量和参数

3.全局变量

4.还有一些其他的，内部的

**这些值称为根**

### 如果引用或引用链可以从根访问任何其他值，则认为该值是可访问的

例如，如果局部变量中有对象，并且该对象具有引用另一个对象的属性，则该对象被视为**可达性** 它引用的那些也是可以访问的

JavaScript 引擎中有一个后台进程称为**垃圾回收器**，它监视所有对象，并删除那些不可访问的对象。

## 算法

1.基本的垃圾回收算法称为“标记-清除”，定期执行以下“垃圾回收”步骤:

2.垃圾回收器获取根并“标记”(记住)它们。

3.然后它访问并“标记”所有来自它们的引用。

4.然后它访问标记的对象并标记它们的引用。所有被访问的对象都被记住，以便以后不再访问同一个对象两次。

5.以此类推，直到有未访问的引用(可以从根访问)为止。

6.除标记的对象外，所有对象都被删除。

![图片描述](https://segmentfault.com/img/bVbqd7y)

我们可以清楚地看到右边有一个“不可到达的块”。现在让我们看看“标记并清除”垃圾回收器如何处理它。

**第一步标记根**

![图片描述](https://segmentfault.com/img/bVbqd7V)

**然后标记他们的引用**

![图片描述](https://segmentfault.com/img/bVbqd71)

**以及子孙代的引用:**

![图片描述](https://segmentfault.com/img/bVbqd8a)

**现在进程中不能访问的对象被认为是不可访问的，将被删除:**

![图片描述](https://segmentfault.com/img/bVbqd8A)

### **一些优化:**

**分代回收**——对象分为两组:“新对象”和“旧对象”。许多对象出现，完成它们的工作并迅速结 ，它们很快就会被清理干净。那些活得足够久的对象，会变“老”，并且很少接受检查。

**增量回收**——如果有很多对象，并且我们试图一次遍历并标记整个对象集，那么可能会花费一些时间，并在执行中会有一定的延迟。因此，引擎试图将垃圾回收分解为多个部分。然后，各个部分分别执行。这需要额外的标记来跟踪变化，这样有很多微小的延迟，而不是很大的延迟。

**空闲时间收集**——垃圾回收器只在 CPU 空闲时运行，以减少对执行的可能影响。