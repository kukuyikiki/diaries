直接切换到已有的`master`分支，可以使用：

```
$ git switch master
```

# 远程仓库

## 一、创建SSH Key

因为本地仓库和GitHub服务器上的仓库是通过SSH加密的，所以需要先创建SSH Key

```bash
$ ssh-keygen -t rsa -C "youremail@example.com"
```

一路回车，因为是做学习，不用设置密码。

做完上述操作后，可以在用户主目录里找到**`.ssh`目录**，里面有**`id_rsa`和`id_rsa.pub`两个文件**，这两个就是SSH Key的秘钥对，**`id_rsa`是私钥**，不能泄露出去，**`id_rsa.pub`是公钥**，可以放心地告诉任何人。

## 二、登录GitHub添加SSH Key

登录GitHub，通过Account/个人设置 找到 SSH and GPG Keys，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴`id_rsa.pub`文件的内容：

## 添加远程仓库

已经在本地创建了一个Git仓库后，又想在GitHub创建一个Git仓库，并且让这两个仓库进行远程同步

**一、在GitHub中创建一个新仓库（Create a new repo/new）**

![](E:\Typore\存储\Git\img\ST18P$%9MX9Q1I~M]QHR{H5.png)

> 我的Git上的仓库叫bugFactory

**二、关联远程仓库**

在本地的`factory`仓库下运行命令：

```bash
$ git remote add origin git@github.com:xuyunfeiQQ/bugFactory.git
```

添加后，远程库的名字就是`origin`,是Git默认的叫法

> **SSH警告**:第一次使用Git的`clone`或者`push`命令连接GitHub时，会得到一个警告
>
> ```bash
> The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
> RSA key fingerprint is xx.xx.xx.xx.xx.
> Are you sure you want to continue connecting (yes/no)?
> ```
>
> 因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的Key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，输入`yes`回车即可。

**三、把本地库的所有内容推送到远程库上**

```bash
$ git push -u origin master
输出：Warning: Permanently added the RSA host key for IP address '13.229.188.59' to the list of known hosts.
Enumerating objects: 12, done.
Counting objects: 100% (12/12), done.
Delta compression using up to 8 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (12/12), 1000 bytes | 250.00 KiB/s, done.
Total 12 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), done.
To github.com:xuyunfeiQQ/bugFactory.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
```

`git push`命令，实际上是把当前分支`master`推送到远程。

由于远程库是空的，第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。



从现在起，只要本地作了提交，就可以通过命令：

```bash
$ git push origin master
```

把本地`master`分支的最新修改推送至GitHub。

## 从远程库克隆

```bash
$ git clone git@github.com:xuyunfeiQQ/bugFactory.git
输出：Cloning into 'bugFactory'...
remote: Enumerating objects: 12, done.
remote: Counting objects: 100% (12/12), done.
remote: Compressing objects: 100% (7/7), done.
remote: Total 12 (delta 1), reused 12 (delta 1), pack-reused 0
Receiving objects: 100% (12/12), 1000 bytes | 500.00 KiB/s, done.
Resolving deltas: 100% (1/1), done.
```

> 还可以用`https://github.com/michaelliao/gitskills.git`这样的地址
>
> 使用`https`除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放http端口的公司内部就无法使用`ssh`协议而只能用`https`。

# 分支管理

## 分支介绍

master分支：主分支。HEAD严格来说不是指向提交，而是指向`master`，`master`才是指向提交的，所以，`HEAD`指向的就是当前分支。

一开始的时候，`master`分支是一条线，Git用`master`指向最新的提交，再用`HEAD`指向`master`，就能确定当前分支，以及当前分支的提交点：

![0](E:\Typore\存储\Git\img\1.png)

每次提交，`master`分支都会向前移动一步，这样，随着你不断提交，`master`分支的线也越来越长。

当我们创建新的分支，例如`dev`时，Git新建了一个指针叫`dev`，指向`master`相同的提交，再把`HEAD`指向`dev`，就表示当前分支在`dev`上：

![0](E:\Typore\存储\Git\img\2.png)

你看，Git创建一个分支很快，因为除了增加一个`dev`指针，改改`HEAD`的指向，工作区的文件都没有任何变化！

不过，从现在开始，对工作区的修改和提交就是针对`dev`分支了，比如新提交一次后，`dev`指针往前移动一步，而`master`指针不变：

![l](E:\Typore\存储\Git\img\3.png)

假如我们在`dev`上的工作完成了，就可以把`dev`合并到`master`上。Git怎么合并呢？最简单的方法，就是直接把`master`指向`dev`的当前提交，就完成了合并：

![4](E:\Typore\存储\Git\img\4.png)

所以Git合并分支也很快！就改改指针，工作区内容也不变！

合并完分支后，甚至可以删除`dev`分支。删除`dev`分支就是把`dev`指针给删掉，删掉后，我们就剩下了一条`master`分支：

![5](E:\Typore\存储\Git\img\5.png)

## 创建分支

```bash
$ git checkout -b dev
输出：Switched to a new branch 'dev'
```

> `git checkout`命令加上`-b`参数表示创建并切换，相当于以下两条命令
>
> ```bash
> $ git branch dev
> $ git checkout dev
> 输出：Switched to branch 'dev'
> ```

 用`git branch`命令查看当前分支：

 ```bash
 $ git branch
 * dev
   master
 ```

> `git branch`命令会列出所有分支，当前分支前面会标一个`*`号。

 然后，我们就可以在`dev`分支上正常提交，比如对`readme.txt`做个修改，加上一行：

 Creating a new branch is quick.
 提交：

 ```bash
 $ git add readme.txt 
 $ git commit -m "branch test"
 输出：[dev b17d20e] branch test
  1 file changed, 1 insertion(+)
 ```

 `dev`分支的工作完成，我们就可以切换回`master`分支：

 ```bash
 $ git checkout master
 Switched to branch 'master'
 ```

 切换回`master`分支后，再查看一个`readme.txt`文件，刚才添加的内容不见了！因为那个提交是在`dev`分支上，而`master`分支此刻的提交点并没有变

## 合并分支

把`dev`分支的工作成果合并到`master`分支上

```bash
$ git merge dev
输出：Updating d46f35e..b17d20e
Fast-forward
 readme.txt | 1 +
 1 file changed, 1 insertion(+)
```

> `git merge`命令用于合并指定分支到当前分支。合并后，再查看`readme.txt`的内容，就可以看到，和`dev`分支的最新提交是完全一样的。
>
> Fast-forward 表示这次合并是“快进模式”，也就是直接把`master`指向`dev`的当前提交，所以合并速度非常快。

删除`dev`分支：

```bash
$ git branch -d dev
输出：Deleted branch dev (was b17d20e).
```

删除后，查看`branch`，就只剩下`master`分支了：

```bash
$ git branch
* master
```

# 新版本变化

创建并切换到新的`dev`分支，可以使用：

```bash
$ git switch -c dev
```

直接切换到已有的`master`分支，可以使用：

```bash
$ git switch master
```

# 小结

查看分支：`git branch`

创建分支：`git branch <name>`

切换分支：`git checkout <name>`或者`git switch <name>`

创建+切换分支：`git checkout -b <name>`或者`git switch -c <name>`

合并某分支到当前分支：`git merge <name>`

删除分支：`git branch -d <name>`