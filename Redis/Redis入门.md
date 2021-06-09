# 概述

Redis（Remote Dictionary Server )，即远程字典服务 !

是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库， 并提供多种语言的API。

![image-20201123160450816](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201123160450816.png)

redis会周期性的把更新的数据写入磁盘或者把修改操作写入追加的记录文件，并且在此基础上实现了 master-slave(主从)同步。

免费和开源！是当下最热门的 NoSQL 技术之一！也被人们称之为结构化数据库！

# Redis能干啥

1. 内存存储、持久化，内存中是断电即失、所以说持久化很重要（rdb、aof）
2. 效率高，可以用于高速缓存
3. 发布订阅系统
4. 地图信息分析
5. 计时器、计数器（浏览量！）

# 特性

1、多样的数据类型

2、持久化

3、集群 

4、事务

# 学习

Redis推荐都是在Linux服务器上搭建的，我们是基于Linux学习！

官网：https://redis.io/

中文网：https://www.redis.cn/

# linux安装

1.下载安装包

















