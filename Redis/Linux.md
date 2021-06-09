# 为什么要学Linux

 在服务器端，在开发领域Linux是越来越受欢迎，很多程序员都觉得不懂点Linux都觉得不好意思，Linux在开源社区的地位依然岿然不动。
 尤其是作为一个后端程序员，是必须要掌握Linux的，因为这都成为了你找工作的基础门槛了，所以不得不学习！

​	所有java岗位都需要掌握Linux的基本使用！

# Linux简介

 Linux内核最初只是由芬兰人林纳斯.托瓦兹( Linus Torvalds )在赫尔辛基大学上学时出于个人爱好而编写的。
 Linux是一套免费使用和自由传播的**类Unix操作系统**,是一个基于POSIX (可移植操作系统接口)和UNIX的**多用户**、**多任务**、支持**多线程**和**多CPU**的操作系统。
 Linux**能运行主要的UNIX工具软件、应用程序和网络协议**。它支持32位和64位硬件。Linux 继承了Unix以**网络为核心**的设计思想，是一个性能稳定的多用户网络操作系统。

## Linux发行版

发行版就是将Linux内核与应用软件做一个打包

Kail linux：安全渗透测试使用！

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200630083506541.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 版本图解

## Linux应用领域

 今天各种场合都有使用各种Linux发行版,从嵌入式设备到超级计算机,并且在服务器领域确定了地位,通常服务器使用LAMP(Linux + Apache + MySQL + PHP)或LNMP(Linux + Nginx + MySQL + PHP)组合。
 目前Linux不仅在家庭与企业中使用,并且在政府中也很受欢迎。
 许多国家都在使用Linux系统

# 环境搭建

跳过
环境：虚拟机VMware Workstation Pro 15.2+CentOS 7

## 在虚拟计上安装CentOS7

Linux磁盘分区的时候需要注意分区名即可！ /boot /home!

### VMware的使用方式

点击屏幕进入虚拟机，Ctrl+Alt将聚焦退出虚拟机

# 走近Linux系统

密码都是 123456

默认的用户是: kuangshen

root用户：root-123456

## 开机

 会启动许多程序。它们在Windows叫做’服务" ( service ) , **在Linux就叫做"守护进程" ( daemon)**。
一般来说，用户的登录方式有三种:
 ●命令行登录
 ●SSH登录(远程)
 ●图形界面登录
 最高权限账户为root,可以操作一切!

## 关机

 在linux领域内大多用在服务器上,很少遇到关机的操作。毕竟服务器上跑一个服务是永无止境的,除非特殊情况下,不得已才会关机。
 关机指令为shutdown

```bash
sync #将数据由内存同步到硬盘中。

shutdown #关机指令，你可以man shutdown 来看一下 帮助文档。例如你可以运行如下命令关机:

shutdown -h 10 #这个命令告诉大家，计算机将在10分钟后关机

shutdown -h now#立马关机

shutdown -h 20:25 #系统会在今天20:25关机

shutdown -h +10 #十分钟后关机

shutdown -r now #系统立马重启

shutdown -r +10 #系统十分钟后重启

reboot #就是重启，等同于shutdown -r now

halt #关闭系统，等同于shutdown -h now和poweroff

12345678910
```

 最后总结：不管是重启还是关闭系统，首先要运行sync命令，把内存中的数据写到磁盘中，执行命令之后没有返回消息则表明运行成功

## 系统目录

1、一切皆文件
2、根目录/ ,所有的文件都挂载在这个节点下

```bash
ls / #查看当前下的目录
1
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200630084025462.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 树状目录结构

## 目录解释

```
/bin：bin是Binary的缩写, 这个目录存放着最经常使用的命令。

/boot： 这里存放的是启动Linux时使用的一些核心文件，包括一些连接文件以及镜像文件。

/dev ： dev是Device(设备)的缩写, 存放的是Linux的外部设备，在Linux中访问设备的方式和访问文件的方式是相同的。

/etc： 这个目录用来存放所有的系统管理所需要的配置文件和子目录。

/home：用户的主目录，在Linux中，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的。

/lib：这个目录里存放着系统最基本的动态连接共享库，其作用类似于Windows里的DLL文件。

/lost+found：这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件。

/media：linux系统会自动识别一些设备，例如U盘、光驱等等，当识别后，linux会把识别的设备挂载到这个目录下。

/mnt：系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在/mnt/上，然后进入该目录就可以查看光驱里的内容了。（我们后面会把一些本地文件挂载在这个目录下）

/opt：这是给主机额外安装软件所摆放的目录。比如你安装一个ORACLE数据库则就可以放到这个目录下。默认是空的。

/proc：这个目录是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。

/root：该目录为系统管理员，也称作超级权限者的用户主目录。

/sbin：s就是Super User的意思，这里存放的是系统管理员使用的系统管理程序。

/srv：该目录存放一些服务启动之后需要提取的数据。

/sys：这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。

/tmp：这个目录是用来存放一些临时文件的。 用完即丢的文件可以放在这个目录下

/usr：这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于windows下的program files目录。

/usr/bin： 系统用户使用的应用程序。

/usr/sbin： 超级用户使用的比较高级的管理程序和系统守护程序。

/usr/src： 内核源代码默认的放置目录。

/var：这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。

/run：是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。

/www：存放服务器网站相关的资源，环境，网站的项目
```

# 常用的基本命令

## cd:切换目录

```bash
cd:#切换目录命令!
./:#当前目录
/:#绝对路径
cd..:#返回上一级目录
cd ~:#回到当前的用户目录
pwd :#显示当前用户所在的目录
123456
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200630084914110.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 pwd展示

## ls(列出目录！)

在Linux中Is可能是最常常被使用的!

```bash
-a:#参数: all ,查看全部的文件,包括隐藏文件
-l:#参数列出所有的文件,包含文件的属性和权限,没有隐藏文件
```

所有Linux可以组合使用!

```bash
ls -al 查看全部的文件包括隐藏文件的属性和权限
```

## mkdir 创建一个目录

```bash
mkdir -p test2/test3/test4 # 用-p递归创建层级目录
```

## rmdir 删除目录

```bash
rmdir -p test2/test3/test4 #递归删除文件
```

rmdir仅能删除空的目录,如果下面存在文件,需要先删除文件,递归删除多个目录-p参数即可

## cp(复制文件或者目录)

```bash
cp install.sh cqhstudy #将当前目录下的install.sh 复制到cqhstudy文件夹中
```

## rm 移除文件或者目录

```bash
-f #忽略不存在的文件,不会出现警告,强制删除!
-r #递归删除目录!
-i #互动,删除询问是否删除
rm -rf install.sh/#删除系统中的install.sh
rm -rf / #系统中所有的文件就被删除了
```

## mv 移动文件或者目录|重命名文件

```bash
-f #强制
-u #只替换已经更新过的文件

mv install.sh cqhstudy #移动文件
mv cqhstudy cqhstudy2 #重命名文件夹名
 
```

# 基本属性

 Linux系统是一种典型的多用户系统,不同的用户处于不同的地位,拥有不同的权限。为了保护系统的安全性, Linux系统对不同的用户访问同一文件(包括目录文件)的权限做了不同的规定。

 在Linux中我们可以使用ll或者ls -l命令来显示一个文件的属性以及文件所属的用户和组,如:
 实例中, boot文件的第一个属性用"d"表示。 "d"在Linux中代表该文件是一 个目录文件。
 在Linux中第一个字符代表这个文件是目录、 文件或链接文件等等:
 ●当为[d]则是目录
 ●当为[-]则是文件;
 ●若是[l]则表示为链接文档( link file);
 ●若是[b]则表示为装置文件里面的可供储存的接口设备(可随机存取装置) ;
 ●若是[c]则表示为装置文件里面的串行端口设备,例如键盘、鼠标( 一次性读取装置)。
 接下来的字符中,以三个为一组,且均为[rwx] 的三个参数的组合。
 其中，[r]代表可读(read)、[w]代表可写(write)、[x]代表可执行(execute)。
 要注意的是,这三个权限的位置不会改变,如果没有权限,就会出现减号[-]而已。
 每个文件的属性由左边第一部分的10个字符来确定 (如下图) :
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200630091157920.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 属性图解

从左至右用0-9这些数字来表示。
第0位确定文件类型,第1-3位确定属主(该文件的所有者)拥有该文件的权限。第4-6位确定属组 (所有者的同组用户)拥有该文件的权限,第7-9位确定其他用户拥有该文件的权限。
其中:
第1、4、7位表示读权限,如果用"r"字符表示,则有读权限,如果用"-“字符表示,则没有读权限;
第2、5、8位表示写权限,如果用"W"字符表示,则有写权限,如果用”-“字符表示没有写权限;
第3、6、9位表示可执行权限,如果用"x"字符表示,则有执行权限,如果用”-"字符表示,则没有执行权限。
对于文件来说,它都有一个特定的所有者,也就是对该文件具有所有权的用户。
同时,在Linux系统中,用户是按组分类的, - -个用户属于一个或多个组。
文件所有者以外的用户又可以分为文件所有者的同组用户和其他用户。
**因此, Linux系统按文件所有者、文件所有者同组用户和其他用户来规定了不同的文件访问权限。**
在以上实例中, boot文件是一个目录文件,属主和属组都为root。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200630091910216.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 图解

## 修改文件属性

1、chgrp :更改文件属组

```bash
chgrp [-R] 属组名 文件名
```

-R :递归更改文件属组,就是在更改某个目录文件的属组时,如果加上R的参数,那么该目录下的所有文件的属组都会更改。
2、chown :更改文件属主,也可以同时更改文件属组

```bash
chown [-R] 属主名 文件名
chown [-R] 属主名:属组名文件名
```

3、chmod :更改文件9个属性

```bash
chmod [-R] xyz 文件或目录
```

Linux文件属性有两种设置方法,一种是数字（常用的是数字）, 一种是符号。
Linux文件的基本权限就有九个,分别是owner/group/others三种身份各有自己的read/write/execute权限。
先复习一下刚刚上面提到的数据:文件的权限字符为: [-rwxrwxrwx]，这九个权限是三个三个一组的!其中,我们可以使用字来代表各个权限,各权限的分数对照表如下:
r:4 w:2 x:1
可读可写不可执行 rw- 6
可读可写可执行 rwx 7
chomd 777 文件赋予所有用户可读可执行!
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200630092111387.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 示例

## 文件内容查看

Linux系统中使用以下命令来查看文件的内容:
●cat由第一行开始显示文件内容
●tac从最后一行开始显示，可以看出tac是cat的倒着写!
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200630092256742.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 cat和tac图解

●nl显示的时候,顺道输出行号!
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020063009232293.png#pic_center)

图 nl命令图解

●more一页一页的显示文件内容（空格表示翻页，enter代表向下看下一行）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200630092344102.png#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200630092351429.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 more命令图解

**●less与more类似,但是比more更好的是,他可以往前翻页!（空格翻页，上下键代表上下翻动页面，退出q命令，查找字符串/要查询的字符向下查询，向上查询使用?要查询的字符串,用n继续搜寻下一个,用N向上寻找）**
●head 只看头几行 通过-n参数来控制显示几行

```bash
head -n 20 文件名
```

●tail只看尾巴几行 通过-n参数来控制显示几行
你可以使用man 命令来查看各个命令的使用文档,如: man [命令]。

## 网络配置目录:

```bash
cd /etc/ sysconfig/network-scripts
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200630092521193.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 网络基础配置

```bash
ping #用来查看网络是否连通
ifconfig #查看网络 和Windows的ipconfig是一样的
```



# 硬链接和软链接

Linux链接分为两种：硬链接、软链接
**硬链接：A—B,假设B是A的硬链接，那么他们两个指向了同一个文件!允许一个文件拥有多个路径，用户可以通过这种机制硬链接到一个重要文件上，防止误删**。（就像是多个访问路径||多个对象指向同一地址）

**软链接：类似Windows下的快捷方式，删除源文件，快捷方式也就访问不**了
操作步骤：

```bash
创建链接 ln命令！
touch 命令创建文件！
echo 输入字符串，也可以输入到文件中
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200701085219991.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 图解

删除f1之后，查看f2和f3的区别
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200701085258696.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 删除f1之后 f2和f3的区别

# Vim编辑器

## 什么是Vim编辑器

 Vim通过一些插件可以实现和IDE的功能!
 Vim是从Vi发展出来的一个文本编辑器。代码补完、编译及错误跳转等方便编程的功能特别丰富,在程序员中被广泛使用。尤其是Linux中,必须要会使用Vim (查看内容, 编辑内容,保存内容! )

 简单的来说，Vi是老式的字处理器,不过功能已经很齐全了,但是还是有可以进步的地方。
 Vim则可以说是程序开发者的一项很好用的工具。

## 三种使用方式:

基本上Vi/Vim共分为三种模式,分别是
**命令模式( Command mode) ,
输入模式( Insert mode )和
底线命令模式( Lastline mode )。**
这三种模式的作用分别是:

## 命令模式

用户刚刚启动Vi/Vim ,便进入了命令模式。
此状态下敲击键盘动作会被Vim识别为命令,而非输入字符。比如我们此时按下i ,并不会输入一个字符, i被当作了一个命令。
以下是常用的几个命令:
●i切换到输入模式,以输入字符。
●x删除当前光标所在处的字符。
●:切换到底线命令模式,以在最底一行输入命令。如果是编辑模式，需要先退出编辑模式！ESC
若想要编辑文本:启动Vim,进入了命令模式,按下i,切换到输入模式。
命令模式只有一些最基本的命令,因此仍要依靠底线命令模式输入更多命令。

## 输入模式

```bash
在命令模式下按下i就进入了输入模式。
在输入模式中，可以使用以下按键：
 字符按键以及Shift组合，输入字符
 ENTER，回车键，换行
 BACK SPACE，退格键，删除光标前一个字符
 DEL，删除键，删除光标后一个字符
 方向键，在文本中移动光标
 HOME/END，移动光标到行首/行尾
 Page Up/Page Down，上/下翻页
 Insert，切换光标为输入/替换模式，光标将变成竖线/下划线
 ESC，退出输入模式，切换到命令模式
```



## 底线命令模式

```bash
在命令模式下按下:（英文冒号）就进入了底线命令模式。
底线命令模式可以输入单个或多个字符的命令，可用的命令非常多。
在底线命令模式中，基本的命令有（已经省略了冒号）：
q 退出程序
w 保存文件
按ESC键可随时退出底线命令模式。
```

# 账号管理

 Linux系统是一个多用户多任务的分时操作系统,任何一个要使用系统资源的用户,都必须首先向系统管理员申请一个账号,然后以这个账号的身份进入系统。
 用户的账号一方面可以帮助系统管理员对使用系统的用户进行跟踪,并控制他们对系统资源的访问;另一方面也可以帮助用户组织文件,并为用户提供安全性保护。
 每个用户账号都拥有一个唯一的用户名和各自的口令。
 用户在登录时键入正确的用户名和口令后,就能够进入系统和自己的主目录。
 实现用户账号的管理,要完成的工作主要有如下几个方面:
 ●用户账号的添加、删除与修改。
 ●用户口令的管理。
 ●用户组的管理。

# 用户账号的管理

 用户账号的管理工作主要涉及到用户账号的添加、修改和删除。
 添加用户账号就是在系统中创建一个新账号,然后为新账号分配用户号、用户组、主目录和登录ShelI等资源。

## useradd 命令 添加用户

useradd -选项 用户名
-m:自动创建这个用户的主目录/home/cqh
-G:给用户分配组

```bash
[root@cqh home]useradd -m cqh  #创建一个用户
[root@cqh home]ls
install.sh cqhstudy cqh www  
```

理解一下本质: Linux中一切皆文件,这里的添加用户说白了就是往某-个文件中写入用户的信息了! /etc/passwd

```bash
[root@cqh home]cat /etc/passwd  #创建一个用户
cqh:x:1002:1002::/home/cqh:/bin/bash
```

## 删除用户 userdel

```bash
userdel -r cqh #删除用户的时候把它的目录也删除掉
```

## 修改用户 usermod

对应修改的内容 修改那个用户

```bash
[root@cqh home]usermode -d /home/233 cqh 
```

修改完毕后查看配置文件 将cqh用户下的目录修改为233

## 切换用户

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200702085032114.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 细节说明

1.切换用户的命令为: su username [username是你的用户名]
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200702085314796.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 切换后的细节

2.从普通用户切换到root用户,还可以使用命令: sudo su
3.在终端输入exit或logout或使用快捷方式ctrl+d ,可以退回到原来用户,其实ctrl+d也是执行的exit命令
4.在切换用户时,如果想在切换用户之后使用新用户的工作环境,可以在su和username之间加,例如: [su- root]
$表示普通用户，#表示超级用户,也就是root用户

## 用户的密码设置问题

我们一般通过root创建用户的时候!要配置密码!
如果是超级用户

```bash
passwd username 
new password #新密码
re password #重新输入
```

普通用户

```bash
 passwd
(current)UNIX password:
new password: #密码不能过于简单
re password:
```

锁定账户
root ,比如张三辞职了!冻结这个账号, 一旦冻结,这个人就登录不上系统了!

```bash
passwd -l username #锁定之后这个用户就不能再登录了
passwd -d username #把密码清空 这样也能防止用户登录
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200702092430346.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

# 用户组管理

 属主、属组
 每个用户都有一个用户组,系统可以对一个用户组中的所有用户进行集中管理(开发、测试、运维)。不同Linux 系统对用户组的规定有所不同,如Linux下的用户属于与它同名的用户组,这个用户组在创建用户时同时创建。
 用户组的管理涉及用户组的添加、删除和修改。组的增加、删除和修改实际上就是对/etc/group文件的更新。

## 创建一个用户组 groupadd

```bash
[root@cqh ~]group add username
[root@cqh ~]cat /etc/group
```

创建完用户组后可以得到一一个组的id ,这个id是可以指定的! -g 520， 若果不指定就是自增1

## 删除用户组 groupdel

```bash
[root@cqh ~]groupdel cqh
[root@cqh ~]cat /etc/group
12
```

## 修改用户组的权限和名字 groupmod -g-n

```bash
cqh:x:1003
[root@cqh ~]group -g 666 -n newcqh cqh #修改cqh用户组id为666 重命名为newcqh 
12
```

## 用户切换用户组

```bash
#当前登录用户 cqh
$ newgrp root #切换为root
12
```

## 拓展 用户账户文件的查看(了解即可) /etc/passwd

 用户名:口令(登录密码，我们不可见) :用户标识号:组标识号:注释性描述:主目录:登录She11
这个文件中的每一行都代表这一用户,我们可以从这里看出这个用户的主目录在那里,可以看到属于哪一个组!
 登录口令:把真正的加密后的用户口令字存放到/etc/shadow文件中,保证我们密码的安全性!
用户组的所有信息都存放在/etc/group文件中。

# 磁盘管理

df(列出文件系统整体的磁盘使用量) du(检查磁盘空间使用量)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200703084335994.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 df命令

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200703084403486.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 du命令

du -sm /*
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200703084435661.png#pic_center)

图 查看系统目录

Mac或者想使用Linux挂载我们的一些本地磁盘或者文件!

## 挂载：mount

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200703084513927.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 挂载图

卸载：umount-f [挂载位置] 强制卸载
除了这个之外，以后安装了JDK，可以使用Java命令查看信息

# 进程管理

## 什么是进程

1、在Linux中 ,每一个程序都是有自己的一个进程,每一个进程都有一个id号!
2、每一个进程呢,都会有一个父进程!
3、进程可以有两种存在方式:**前台**!**后台**运行!
4、一般的话**服务都是后台运行**的，基本的程序都是**前台运行**的
命令
ps 查看当前系统中正在执行的各种进程的信息！
ps- xx：
  -a 显示当前终端所有的进程信息
  -u 以用户的信息显示进程
  -x 显示后台运行进程的参数

```bash
#ps -aux  查看所有进程
ps-aux|grep mysql  查看mysql相关进程
# | 在Linux中这个叫管道符   A|B
# grep 查找文件中符合条件的字符串
1234
```

对于我们来说,这里目前只需要记住一个命令即可ps -xx|grep进程名字!过滤进程信息!
ps-ef ：可以查看到父进程的信息

```bash
ps-ef|grep mysql 看父进程我们一般可以通过目录树结构来查看
#进程树
#pstree -pu
#-p 显示父id
#-u 显示用户组
12345
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706084738377.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

进程树效果图



结束进程：杀掉进程 等价于Windows结束任务

```bash
kill -9 pid
1
```

表示强制结束该进程

# 环境安装

安装软件一般有三种方式
 rpm（在线发布一个SpringBoot项目）
 解压缩
 yum在线安装

## JDK安装

1、下载IDK rpm。 去oralce官网下载即可!
2、安装java环境

```bash
java -version 检测当前系统是否存在Java环境 和windows命令一样
#如果有的话就需要卸载
rpm -qa|grep jdk 查看JDK版本信息
rpm -e --nodeps jdk_ 卸载
#卸载完毕后可安装JDK
rpm -ivk rpm包 
123456
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706085220973.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 java-version命令

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200706085250364.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

图 安装中

配置环境变量: /etc/profile 在文件的最后面增加java的配置和window安装环境变量一样!

```bash
vim /etc/profile
1
```

这个环境变量有问题 狂神老师敲的是有问题的

```bash
JAVA_HOME=/usr/java/jdk-14.0.1
JRE_HOME=$JAVA_HOME/jre
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
export JAVA_HOME JRE_HOME PATH CLASSPATH
12345
```

让这个配置文件生效!

```bash
source /etc/profile
1
```

 狂神老师用的是阿里云，自带网络了，此处给用虚拟机的同学使用。虚拟机联网教程：[虚拟机和主机联网教程](https://blog.csdn.net/u012049667/article/details/81171003)
 配置完后在Linux防火墙中开启相应端口 使用java -jar发布 如果你的项目在云服务器上，就可以在公网上进行发布查看了

```bash
#开启防火墙端口
firewall-cmd --zone=public --add-port=9000/tcp --permanent
#重启防火墙
systemctl restart firewalld.service
#查看所有开启的端口，如果是阿里云 需要配置安全组规则
firewall-cmd --list-ports
123456
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200707090238431.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L29rRm9ycmVzdDI3,size_16,color_FFFFFF,t_70#pic_center)

命令运行效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200707090302192.png#pic_center)

查出centos7中的ip 外机进行访问

## Tomcat安装

ssm war 就需要放在tomcat中运行
1.下载tomcat 官网下载即可
2.解压tar -zxvf apache-tomcat-9.0.36.tar.gz
3.启动tomcat

```bash
#执行 
./startup.sh
#停止
./shutdown.sh
1234
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200707090700195.png#pic_center)

启动效果

```bash
#开启端口
firewall-cmd --zone=public --add-port=8080/tcp –permanent
12
```

命令含义:
 --zone 作用域
 --add-port-80/tcp 添加端口， 格式为:端口/通讯协议
 --permanent 永久生效，没有此参数重启后失效

 如果是阿里云 上传完毕的项目直接购买自己的域名,备案解析过去即可!
 域名解析后,如果端口是80 - http或者443-https 可以直接访问,如果是9000 8080 ,就需要通过Apcahe或者Nginx做一下反向代理即可（配置文件）

## Docker（yum安装）

1.检测CentOS 7

```bash
[root@localhost ~] cat /etc/redhat-release 
CentOS Linux release 7.3.1611 (Core)
12
```

2.安装我们的准备环境

```bash
yum -y install 包名
#yum install 安装命令 -y  所有的提示都为y
yum -y install gcc
yum -y install gcc-c++
1234
```

3.卸载以前的docker

```bash
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
12345678
```

4.下载环境

```bash
yum install -y yum-utils \device-mapper-persistent-data \lvm2
1
```

5.使用国内阿里云镜像

```bash
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
1
```

6.更新yum软件包安装

```bash
yum makecache fast
1
```

7.安装docker ce

```bash
yum -y install docker-ce docker-ce-Cli containerd.io
1
```

8.启动docker

```bash
systemctl start docker
1
```

9.测试

```bash
docker version
docker run hello-world
docker images
123
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200707105511664.png#pic_center)

图 运行效果

到此完结 *★,°*:.☆(￣▽￣)/$:*.°★* 。