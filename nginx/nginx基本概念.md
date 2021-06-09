# nginx基本概念

## nginx是什么

Nginx 是高性能的 HTTP 和反向代理的服务器，处理高并发能力是十分强大的，能经受高负 载的考验,有报告表明能支持高达 50,000 个并发连接数。

## 反向代理

### 正向代理

需要在客户端配置代理服务器进行指定网站访问

![image-20210120141354010](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210120141354010.png)

### 反向代理

暴露的是代理服务器地址，隐藏了真实服务器 IP 地址。

![image-20210120141830526](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210120141830526.png)

## 负载均衡

增加服务器的数量，然后将请求分发到各个服务器上，将原先请求集中到单个服务器上的 情况改为将请求分发到多个服务器上，将负载分发到不同的服务器，也就是我们所说的负 载均衡

![image-20210120142415407](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210120142415407.png)

## 动静分离

为了加快网站的解析速度，可以把动态页面和静态页面有不同的服务器来解析，加快解析速度。降低原来单个服务器的压力。

![image-20210120142857551](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210120142857551.png).



## 高可用

# Nginx的安装

```
（1）安装 pcre 依赖
第一步 联网下载 pcre 压缩文件依赖
wget http://downloads.sourceforge.net/project/pcre/pcre/8.37/pcre-8.37.tar.gz
第二步 解压压缩文件
使用命令 tar –xvf pcre-8.37.tar.gz
第三步./configure 完成后，回到 pcre 目录下执行 make，最后执行 make install
（2）安装 openssl 、zlib 、 gcc 依赖
yum -y install make zlib zlib-devel gcc-c++ libtool openssl openssl-devel
（3）安装 nginx
* 使用命令解压
需要先 yum -y install gcc-c++
* ./configure
* make && make install
安装之后 pcre-config --version  查看版本号
进入目录 /usr/local/nginx/sbin/nginx 启动服务

（2）安装 openssl 、zlib 、 gcc 依赖
yum -y install make zlib zlib-devel gcc-c++ libtool openssl openssl-devel

（3）安装 nginx
* 使用命令解压   tar -xvf nginx..
cd 到该文件下
* 解压之后 ./configure
* make && make install

安装成功之后，在usr多出了一个文件夹local/nginx，在nginx有sbin有启动脚本
进入目录 /usr/local/nginx/sbin/nginx 启动服务

关闭vm防火墙
systemctl stop firewalld.service   #停止firewall
systemctl disable firewalld.service   #禁止firewall开机启动
访问ip可见

```

```
在 windows 系统中访问 linux 中 nginx，默认不能访问的，因为防火墙问题
（1）关闭防火墙
（2）开放访问的端口号， 80 端口
查看开放的端口号
firewall-cmd --list-all
设置开放的端口号
firewall-cmd --add-service=http –permanent
firewall-cmd --add-port=80/tcp --permanent
重启防火墙
firewall-cmd –reload
```

![image-20210121153552003](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121153552003.png)

# Nginx常用命令

```
进入 nginx 目录中
cd /usr/local/nginx/sbin


1、查看 nginx 版本号
./nginx -v
```

![image-20210121153922118](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121153922118.png)

```
2、启动 nginx
./nginx
3、停止 nginx
./nginx -s stop
4、重新加载 nginx
./nginx -s reload
```

# Nginx的配置文件

## 1. nginx配置文件位置

```
cd /usr/local/nginx/conf/nginx.conf
```

![image-20210121154545958](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121154545958.png)

## 2、配置文件中的内容

包含三部分内容 

（1）全局块：配置服务器整体运行的配置指令 

​	比如 worker_processes 1;处理并发数的配置 

（2） events 块：影响 Nginx 服务器与用户的网络连接 

​	比如 worker_connections 1024; 支持的最大连接数为 1024 

（3） http 块 还包含两部分： http 全局块 server 块

# Nginx配置实例-反向代理

```
1、实现效果
（1）打开浏览器，在浏览器地址栏输入地址 www.123.com，跳转到 liunx 系统 tomcat 主页
面中

2、准备工作
（1）在 liunx 系统安装 tomcat， 使用默认端口 8080
* tomcat 安装文件放到 liunx 系统中，解压
* 进入 tomcat 的 bin 目录中， ./startup.sh 启动 tomcat 服务器

（2）对外开放访问的端口
firewall-cmd --add-port=8080/tcp --permanent
firewall-cmd –reload

查看已经开放的端口号
firewall-cmd --list-all

（3）在 windows 系统中通过浏览器访问 tomcat 服务器
```

3.访问过程的分析

![image-20210121161100367](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121161100367.png)

4.具体配置

第一步 在 windows 系统的 host 文件进行域名和 ip 对应关系的配置

![image-20210121163814064](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121163814064.png)

（1）添加内容在 host 文件中

​									主机ip

![image-20210121163832457](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121163832457.png)

第二步 在 nginx 进行请求转发的配置（反向代理配置）

![image-20210121164023170](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121164023170.png)

5、最终测试

![image-20210121164038355](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121164038355.png)



# Nginx配置实例-反向代理实例2

```
1、实现效果 使用 nginx 反向代理，根据访问的路径跳转到不同端口的服务中 nginx 监听端口为 9001，
访问 http://192.168.17.129:9001/edu/ 直接跳转到 127.0.0.1:8080
访问 http:// 192.168.17.129:9001/vod/ 直接跳转到 127.0.0.1:8081

2、准备工作
（1）准备两个 tomcat 服务器，一个 8080 端口，一个 8081 端口
（2）创建文件夹和测试页面

```

```
3、具体配置
（1）找到 nginx 配置文件，进行反向代理配置
```

![image-20210121164821202](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121164821202.png)

（2）开放对外访问的端口号 9001 8080 8081

4、最终测试

![image-20210121164849409](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121164849409.png)

![image-20210121164856697](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121164856697.png)

***location 指令说明***  

该指令用于匹配 URL。
语法如下：  

![image-20210121200006549](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121200006549.png)

```
1、 = ：用于不含正则表达式的 uri 前，要求请求字符串与 uri 严格匹配，如果匹配
成功，就停止继续向下搜索并立即处理该请求。
2、 ~：用于表示 uri 包含正则表达式，并且区分大小写。
3、 ~*：用于表示 uri 包含正则表达式，并且不区分大小写。
4、 ^~：用于不含正则表达式的 uri 前，要求 Nginx 服务器找到标识 uri 和请求字
符串匹配度最高的 location 后，立即使用此 location 处理请求，而不再使用 location
块中的正则 uri 和请求字符串做匹配。
注意：如果 uri 包含正则表达式，则必须要有 ~ 或者 ~* 标识。
```

#   Nginx配置实例-负载均衡

```
1、实现效果
（1）浏览器地址栏输入地址 http://192.168.17.129/edu/a.html，负载均衡效果，平均 8080
和 8081 端口中

2、准备工作
（1）准备两台 tomcat 服务器，一台 8080，一台 8081
（2）在两台 tomcat 里面 webapps 目录中，创建名称是 edu 文件夹，在 edu 文件夹中创建
页面 a.html，用于测试

```

3、在 nginx 的配置文件中进行负载均衡的配置
			在http里面

![image-20210121201548181](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121201548181.png)

​              在server里面

![image-20210121201619909](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121201619909.png)



4、 nginx 分配服务器策略

```
第一种 轮询（默认）
每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器 down 掉，能自动剔除。

第二种 weight
weight 代表权重默认为 1,权重越高被分配的客户端越多

第三种 ip_hash
每个请求按访问 ip 的 hash 结果分配，这样每个访客固定访问一个后端服务器

第四种 fair（第三方）
按后端服务器的响应时间来分配请求，响应时间短的优先分配。
```

# Nginx配置实例-动静分离

1.什么是动静分离

![image-20210121203002287](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121203002287.png)

 通过 location 指定不同的后缀名实现不同的请求转发。通过 expires 参数设置，可以使浏 览器缓存过期时间，减少与服务器之前的请求和流量。具体 Expires 定义：是给一个资源 设定一个过期时间，也就是说无需去服务端验证，直接通过浏览器自身确认是否过期即可， 所以不会产生额外的流量。此种方法非常适合不经常变动的资源。（如果经常更新的文件， 不建议使用 Expires 来缓存），我这里设置 3d，表示在这 3 天之内访问这个 URL，发送一 个请求，比对服务器该文件最后更新时间没有变化，则不会从服务器抓取，返回状态码 304， 如果有修改，则直接从服务器重新下载，返回状态码 200。



2、准备工作

（1）在 liunx 系统中准备静态资源，用于进行访问

![image-20210121204140159](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121204140159.png)

3、具体配置

（1）在 nginx 配置文件中进行配置

![image-20210121204205990](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121204205990.png)

4、最终测试

（1）浏览器中输入地址

http://192.168.17.129/image/01.jpg

![image-20210121204229087](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121204229087.png)

![image-20210121204238894](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121204238894.png)

（2）在浏览器地址栏输入地址

http://192.168.17.129/www/a.html

![image-20210121204254688](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210121204254688.png)