## 一、Flyway

Flyway是独立于数据库的应用、管理并跟踪数据库变更的数据库版本管理工具。用通俗的话讲，Flyway可以像Git管理不同人的代码那样，管理不同人的sql脚本，从而做到数据库同步。

### 1.流程

>1、 首先配置好flyway的基本信息后，运行项目，会在数据库表中默认新建一个数据表用于存储flyway的运行信息，默认的数据库名：flyway_schema_history
>
>2、 紧接着Flyway将开始扫描文件系统或应用程序的类路径进行迁移。然后，Flyway的数据迁移将基于对用sql脚本的版本号进行排序，并按顺序应用：
>
>可以看到执行数据库表后在checksum中储存一个数值，用于在之后运行过程中对比sql文件执行是否有变化。

注意：

flyway在执行脚本时，会在源数据表中检查checksum值，并确定上次运行到哪一个脚本文件，本次执行时从下一条脚本文件开始执行。所以编写脚本的时候不要去修改原有的脚本内容，并且新的脚本版本号要连续

### 1.  导入依赖

```xml
<!-- flyway依赖开始 -->
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>
<!-- postgresql驱动包 -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
 <!-- flyway依赖结束 -->
<build>
    <plugins>
        <plugin>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-maven-plugin</artifactId>
            <version>5.2.1</version>
        </plugin>
    </plugins>
 </build>

```

### 2. 配置yml

```yml
spring:
  #druid数据源
  datasource:
    druid:
      db-type: com.alibaba.druid.pool.DruidDataSource
      driverClassName: net.sf.log4jdbc.sql.jdbcapi.DriverSpy
      url: jdbc:log4jdbc:mysql://127.0.0.1/plumvill_test?serverTimezone=Asia/Shanghai&characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true
      username: root
      password: 123456
  flyway:
    # 迁移脚本的位置，默认db/migration，可配置
    locations: classpath:/db
    # 已经存在表结构数据的已有数据库使用flyway需要设置为true,且版本号要比1大
    #baseline-on-migrate: true
```

### 3. 创建sql脚本

/db/V1__init_database.sql

**sql脚本的格式：V+版本号 +双下划线+描述.sql**

说明：V大写，中间是两个下划线（__）

```sql
USE plumvill_test;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `nick_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `gender` bit(1) NOT NULL DEFAULT b'0' COMMENT '性别（0为男默认，1为女）',
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '系统用户' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 'admin', '管理员', b'0');
INSERT INTO `sys_user` VALUES (2, 'test', '测试', b'1',);

```

### 4. 启动项目

可以看到sql脚本开始执行

执行成功后可以发现数据库中多出一张flyway_schema_history 的表来记录每次脚本的执行

![image-20210425161021257](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210425161022.png)

以后只要数据库有更新，只需要在db文件夹下创建更高版本的sql脚本（V1.x__xxx.sql，V2__xxx.sql），重启项目的时候就会自动执

行。

### 5. 常见问题

1、可以基于环境变量，实现不同的环境，做不同的初始化脚本吗？
 基于我们的配置中 心，可以对flyway.locations配置进行修改，不同环境的初始化脚本可以放到不同的目录下。

2、初始化数据过程会发生错误回滚？
 每 一个sql 文件会有 一个单独的事物，如果单个文件中发 生错误，单个文件的操作会回滚， 比如有1、2、3个 文件，第 二个文件发生错误，第二个文件所有操作将会回滚，第三个文件不会执行。但： Unfortunately, today only DB2, PostgreSQL, Derby, EnterpriseDB and to a certain extent SQL Server support DDL statements inside a transaction。 所以，建议不要把ddl 文件和dml语句句放到同 一个文件 里，避免不必要的麻烦

## 二、一键部署(fabric)

### 1. windows

#### 1. 安装conda 

开源的软件包管理系统和环境管理系统，用于安装多个版本的软件包及其依赖关系，并在它们之间轻松切换。

[清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/)

https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/

也可以选择官网：https://www.anaconda.com/download/，这里选择镜像资源安装

![image-20210503110417898](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210503115202.png)

![image-20210503115558417](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210503115558.png)

![image-20210503115607673](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210503115607.png)

![image-20210503115619005](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210503115619.png)

选择安装路径

![image-20210503115744274](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210503115744.png)

第一个是自动加入环境变量，第二个是默认使用 Python 3.7。根据自己的情况选择，点击install执行，等待安装完成即可。

如果没有自动加入环境变量，安装之后可以手动加入

![image-20210503120023637](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210503120023.png)

打开cmd，执行conda查看是否按照成功

![image-20210503111521940](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210503111522.png)

#### 2.下载 pip 

python 包安装和管理工具

![image-20210503111641044](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210503111641.png)

#### 3.下载python2.7

conda版本默认安装的是python2.7，但是fabric1.14.0对应的python是2版本，所以利用conda安装python2.7的环境

```bash
conda create -n py27 python=2.7
```

![image-20210503114423087](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210503114423.png)

#### 4.激活python27环境

```bash
# 激活环境
conda activate py27
# 退出环境
conda deactivate
```

查看pyhton版本

```bash
python --version
```

![image-20210503114632580](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210503114632.png)

#### 5.安装fabric1.14.0

#### 1. 简介

[Fabric中文文档](https://fabric-chs.readthedocs.io/zh_CN/chs/tutorial.html)

> Fabric 是一个 Python (2.5-2.7) 的库和命令行工具，用来提高基于 SSH 的应用部署和系统管理效率。

更具体地说，Fabric 是：

- 一个让你通过 **命令行** 执行 **无参数 Python 函数** 的工具；
- 一个让通过 SSH 执行 Shell 命令更加 **容易** 、 **更符合 Python 风格** 的命令库（建立于一个更低层次的库）。

自然而然地，大部分用户把这两件事结合着用，使用 Fabric 来写和执行 Python 函数或 **task** ，以实现与远程服务器的自动化交互。让我们一睹为快吧。

#### 2. 安装

```bash
pip install fabric==1.14.0
```



#### 6.切换到项目目录，执行相关命令

fab -f  .py文件名  方法名

```bash
#后端
# 查看项目状态
fab -f ./motovill-test.py status
# 拉取最新代码，重新打包部署
fab -f ./motovill-test.py pull
# 停止项目
fab -f ./motovill-test.py stop
# 启动项目
fab -f ./motovill-test.py start
# 重启项目
fab -f ./motovill-test.py restart

# 前端后台
# 拉取最新代码，重新打包部署
fab -f ./motovill-test.py run_admin

# 前端前台
# Hbuild打包之后，将打包后的文件上传到服务器
fab -f ./motovill-test.py run_auction
```

![image-20210503115150263](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210503115150.png)

![image-20210503144825136](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210503144825.png)

### 2. linux

#### 1. 下载fabric

```bash
# centos
yum instll fabric

# unbuntu
apt install fabric
```

#### 2.切换到项目目录，执行相关命令

### 3. 附

#### 1.motovill-api.py

```bash
# coding=UTF-8
from fabric.api import *
env.hosts = ['47.241.183.119']
env.user = 'plumvill'
env.key_filename = './plumvill-test1.pem'
code_dir = '/data/project/plumvill-api'


#初始化后端环境
def init():
    print "init environment:git/jdk1.8/maven/fabric"
    mir = '''
    <?xml version="1.0" encoding="UTF-8"?>
    <settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
        <mirrors>
            <mirror>
                <id>alimaven</id>
                <mirrorOf>central</mirrorOf>
                <name>aliyun maven</name>
                <url>http://maven.aliyun.com/nexus/content/repositories/central/</url>
            </mirror>
        </mirrors>
    </settings>
    '''
    m2_dir = '~/.m2'
    with settings(warn_only=True):
        run("apt -y update \
            && apt -y install vim \
            && apt -y install git \
            && apt -y install openjdk-8-jdk-headless \
            && apt -y install maven \
            && apt -y install fabric")
        # 判断 `~/.m2`是否存在，不存在创建
        if run("test -d %s" % m2_dir).failed:
            run("mkdir ~/.m2")
            cd('~/.m2')
            run("echo '" + mir + "' > ~/.m2/settings.xml")

#拉取最新代码，并编译启动
def pull():
    print "begin pull and install"
    with settings(warn_only=True):
        #如果是第一次拉取，执行 git clone
        if run("test -d %s" % code_dir).failed:
            run("git clone https://github.com/plumvill-dev/plumvill-api.git %s" % code_dir)
    with cd(code_dir):
        run("set -m;bash motovill-api.sh pull test")
        run("bash motovill-api.sh status")
        run("ps -ef | grep java")

#停止进程
def stop():
    with cd(code_dir):
        run("pwd")
        run("bash motovill-api.sh stop")

#查看进程状态
def status():
    with cd(code_dir):
        run("pwd")
        run("ps -ef | grep java")
        run("set -m;. motovill-api.sh status")

#启动
def start():
    with cd(code_dir):
        run("pwd")
        run("set -m;bash motovill-api.sh start test")

#重启
def restart():
    with cd(code_dir):
        run("pwd")
        run("set -m;bash motovill-api.sh restart test")

```

#### 2.motovill-admin.py

```bash
# coding=UTF-8
from fabric.api import *
env.hosts = ['47.241.183.119']
env.user = 'plumvill'
env.key_filename = './plumvill-test1.pem'
admin_dir = '/data/project/plumvill-admin'
#初始化前端环境
def init_web():
    with settings(warn_only=True):
        cd('/data')
        run("git clone https://github.com.cnpmjs.org/nvm-sh/nvm.git .nvm")
        cd('/data/.nvm')
        run("git checkout v0.35.3")
        run('echo "source /data/.nvm/nvm.sh" >> ~/.bashrc && source ~/.bashrc')
        run("nvm install v14.1.0")
# 运行前端后台
def run_admin():
    print "begin install motovill-admin"
    with settings(warn_only=True):
        #如果是第一次拉取，执行 git clone
        if run("test -d %s" % admin_dir).failed:
            run("git clone https://github.com/plumvill-dev/plumvill-admin.git %s" % admin_dir)
            run("npm install")
            run("npm run build")
        else:
            with cd(admin_dir):
                run("git pull origin develop")
                run("npm install")
                run("npm run build")
```

#### 3. motovill-auction

```bash
# coding=UTF-8
from fabric.api import *
env.hosts = ['47.241.183.119']
env.user = 'plumvill'
env.key_filename = './plumvill-test1.pem'
auction_dir = '/data/project/plumvill-auction'
#初始化前端环境
def init_web():
    with settings(warn_only=True):
        cd('/data')
        run("git clone https://github.com.cnpmjs.org/nvm-sh/nvm.git .nvm")
        cd('/data/.nvm')
        run("git checkout v0.35.3")
        run('echo "source /data/.nvm/nvm.sh" >> ~/.bashrc && source ~/.bashrc')
        run("nvm install v14.1.0")

# 运行前端后台
def run_auction():
    with settings(warn_only=True):
        # 如果不存在前台打包文件，直接推送
        if run("test -d %s" % auction_dir).failed:
            put('./unpackage/dist/build/h5','/data/project')
        # 如果存在，删除后再推送
        else:
            cd('/data/project')
            put('./unpackage/dist/build/h5','/data/project')
            run("rm -rf plumvill-auction")
        with cd('/data/project'):
            run("mv h5 plumvill-auction")

```

## 三、密钥对使用

### 1. xshell使用密钥对方式连接ECS

![image-20210504092040258](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210504092041.png)

![image-20210504092143694](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210504092143.png)

### 2. 使用FileZilla通过密钥对连接服务器

![image-20210426095042250](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210426095050.png)

![image-20210426095114659](https://gitee.com/jiao_qianjin/zhishiku/raw/master/img/20210426095114.png)