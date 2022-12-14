# Nosql

NoSQL = Not Only SQL （不仅仅是SQL） 

关系型数据库：表格 ，行 ，列 

泛指非关系型数据库的，随着web2.0互联网的诞生！传统的关系型数据库很难对付web2.0时代！尤其 是超大规模的高并发的社区！ 暴露出来很多难以克服的问题，NoSQL在当今大数据环境下发展的十分迅 速，Redis是发展最快的，而且是我们当下必须要掌握的一个技术！

 很多的数据类型用户的个人信息，社交网络，地理位置。这些数据类型的存储不需要一个固定的格式！ 不需要多月的操作就可以横向扩展的 ！ Map 使用键值对来控制！



## Nosql特点

解耦！

1、方便扩展（数据之间没有关系，很好扩展！） 

2、大数据量高性能（Redis 一秒写8万次，读取11万，NoSQL的缓存记录级，是一种细粒度的缓存，性 能会比较高！） 

3、数据类型是多样型的！（不需要事先设计数据库！随取随用！如果是数据量十分大的表，很多人就无 法设计了！） 

4、传统 RDBMS 和 NoSQL

```
传统的 RDBMS
- 结构化组织
- SQL
- 数据和关系都存在单独的表中 row col
- 操作操作，数据定义语言
- 严格的一致性
- 基础的事务
- .....
```

```
Nosql
- 不仅仅是数据
- 没有固定的查询语言
- 键值对存储，列存储，文档存储，图形数据库（社交关系）
- 最终一致性，
- CAP定理和BASE （异地多活） 初级架构师！（狂神理念：只要学不死，就往死里学！）
- 高性能，高可用，高可扩
- ....
```



## 了解：3V+3高

大数据时代的3V：主要是描述问题的 

1. 海量Volume 
2. 多样Variety 
3. 实时Velocity 

大数据时代的3高：主要是对程序的要求 

1. 高并发 
2. 高可扩 
3. 高性能

真正在公司中的实践：NoSQL + RDBMS 一起使用才是最强的，阿里巴巴的架构演进！ 

技术没有高低之分，就看你如何去使用！（提升内功，思维的提高！）



# Nosql的四大分类

**KV键值对**

- 新浪：Redis
- 美团：Redis + Tair
- 阿里，百度：Redis + memecache



**文档型数据库（bson格式和json一样长的）：**

- MongoDB（一般必须掌握）
  - MongoDB 是一个基于分布式文件存储的数据库，C++ 编写，主要用来处理大量的文档！
  - MongoDB 是一个介于关系型数据库和非关系型数据中中间的产品！MongoDB 是非关系型数 据库中功能最丰富，最像关系型数据库的！
- ConthDB

**列存储数据库**

- HBase
- 分布式文件系统

![image-20201123155202309](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201123155202309.png)

- 他不是存图形，放的是关系，比如：朋友圈社交网络，广告推荐！
- Neo4j，InfoGrid；

![image-20201123155744332](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201123155744332.png)



















































 