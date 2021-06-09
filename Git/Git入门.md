# 检查git是否安装及安装后的配置

在开始菜单里找到“Git”->“Git Bash”,蹦出一个类似命令行窗口的东西，就说明Git安装成功

安装完成后，还需要最后一步设置，在命令行输入：

```bash
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

> `--global`表示这台机器上的所有Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。

# 创建版本库

**一、创建一个空的目录**

```bash
$ mkdir learngit
$ cd learngit
$ pwd
输出:/Git/factory
```

> `pwd`命令用于显示当前目录。

**二.通过git init命令把这个目录变成Git可以管理的仓库**

```bash
$ git init
输出：Initialized empty Git repository in /Git/factory/.git/
```

> 如果不显示`.git`目录，使用`ls-ah`命令可见

# 把文件添加到版本库

**编写一个`readme.txt`文件**

放到`factory`目录下，使Git能够找到文件

**一、添加文件到仓库**

```bash
$ git add readme.txt
$ git add <fileName>
```

**二、提交文件到仓库**

```bash
$ git commit -m "wrote a readme file"
$ git commit -m <message>
输出：[master (root-commit) eaadf4e] wrote a readme file
 1 file changed, 2 insertions(+)
 create mode 100644 readme.txt
```

> `-m`后面输入的是本次提交的说明。`git commit`命令执行成功后会告诉你，`1 file changed`：1个文件被改动（我们新添加的readme.txt文件）；`2 insertions`：插入了两行内容（readme.txt有两行内容）。
>
> 一共两步：可以多次`add`不同的文件，然后再使用`commit`提交

# 显示工作区的状态及更改对比

**readme.text文件被修改后展示状态**

```bash
$ git status
输出：On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

> 显示readme.text已经被修改了,但还没有准备提交的修改。

**查看修改的对比**

```bash
$ git diff
输出：$ git diff readme.txt 
diff --git a/readme.txt b/readme.txt
index 46d49bf..9247db6 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,2 +1,2 @@
-Git is a version control system.//对比
+Git is a distributed version control system.//对比
 Git is free software.
```

> 输出看到，我们在第一行添加了一个`distributed`单词。

**$ git add修改文件后要记得查看当前仓库的状态**

```bash
$ git status
输出：On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   readme.txt
```

**提交**

```bash
$ git commit -m "add distributed"
输出：[master e475afc] add distributed
 1 file changed, 1 insertion(+), 1 deletion(-)
```

# 版本控制

**查看文件更改的内容及版本号**

```bash
$ git log
输出：$ git log
commit 9abfdae8e42334b4387d03084791710916f18866 (HEAD -> master)
Author: xyf <m18736015171@163.com>
Date:   Fri Sep 11 18:51:58 2020 +0800

    append GPL

commit 341ea25cf10884a5eef9d920763cb581ff15d9e1
Author: xyf <m18736015171@163.com>
Date:   Fri Sep 11 18:44:02 2020 +0800

    add distributed

commit 9491837ab9ee99f7175aa9feaa8647b2f9410412
Author: xyf <m18736015171@163.com>
Date:   Fri Sep 11 17:43:27 2020 +0800

    wrote a readme file
```

加上`--pretty=oneline`参数减少输出信息

```bash 
$ git log --pretty=oneline
输出：9abfdae8e42334b4387d03084791710916f18866 (HEAD -> master) append GPL
341ea25cf10884a5eef9d920763cb581ff15d9e1 add distributed
9491837ab9ee99f7175aa9feaa8647b2f9410412 wrote a readme file
```

>一大串类似`1094adb...`的是`commit id`（版本号）
>
>在Git中，用`HEAD`表示当前版本，上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，往上100个版本写成`HEAD~100`

**回退到上一个版本**

```bash
$ git reset --hard HEAD^
输出：HEAD is now at e475afc add distributed
```

看`readme.txt`的内容是不是版本`add distributed`：

```bash
$ cat readme.txt
输出：Git is a distributed version control system.
Git is free software.
```

**回退到旧版本后重新回到新版本**

```bash
$ git reset --hard 1094a
输出：HEAD is now at 83b0afe append GPL
```

> 回退版本的时候，Git仅仅是把HEAD从指向`append GPL`
>
> ```ascii
> ┌────┐
> │HEAD│
> └────┘
>    │ 	
>    │ 
>    └──> ○ append GPL
>         │
>         ○ add distributed
>         │
>         ○ wrote a readme file
> ```

**找不到新版本的`commit id`**

通过`git reflog`显示每一次命令的记录

```bash
$ git reflog
输出：e475afc HEAD@{1}: reset: moving to HEAD^
1094adb (HEAD -> master) HEAD@{2}: commit: append GPL
e475afc HEAD@{3}: commit: add distributed
eaadf4e HEAD@{4}: commit (initial): wrote a readme file
```

# 工作区和暂存区

#### 工作区（Working Directory）

就是你在电脑里能看到的目录，比如`factory`文件夹就是一个工作区：

#### 版本库（Repository）

工作区有一个隐藏目录`.git`，这个不算工作区，而是Git的版本库。

Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支`master`，以及指向`master`的一个指针叫`HEAD`。

![](E:\Typore\存储\Git\img\0.jpg)

`git add`命令实际上就是把要提交的所有修改放到暂存区（Stage），然后，执行`git commit`就可以一次性把暂存区的所有修改提交到分支。![0](E:\Typore\存储\Git\img\0.jpg)

一旦提交后，如果你又没有对工作区做任何修改，那么工作区就是“干净”的：![0](E:\Typore\存储\Git\img\0.jpg)

# 管理修改

```bash
$ cat readme.txt
输出：Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
Git tracks changes.
```

然后，添加：

```bash
$ git add readme.txt
$ git status
输出：On branch master
 Changes to be committed:
   (use "git reset HEAD <file>..." to unstage)

     modified:   readme.txt

```

然后，再修改readme.txt：

```bash
$ cat readme.txt 
输出：Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
Git tracks changes of files.
```

提交：

```bash
$ git commit -m "git tracks changes"
输出：[master 519219b] git tracks changes
 1 file changed, 1 insertion(+)
```

提交后，再看看状态：

```bash
$ git status
输出：On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

然后发现第二次的修改没有被提交，是因为git跟踪的是文件的修改，因为没有将第二次修改加入暂存区，所以只提交了第一次修改。

正确顺序：

第一次修改 -> `git add` -> 第二次修改 -> `git add` -> `git commit`

> 提交后，用`git diff HEAD -- readme.txt`命令可以查看工作区和版本库里面最新版本的区别

# 撤销修改

`git checkout -- file`可以丢弃工作区的修改

```bash
$ git checkout -- readme.txt
```

命令`git checkout -- readme.txt`意思就是，把`readme.txt`文件在工作区的修改全部撤销，这里有两种情况：

* 一种是`readme.txt`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

* 一种是`readme.txt`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。

> git checkout -- file`命令中的`--如果没有，就表示切换到另一个分支的命令

**场景1**：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。

**场景2**：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。

**场景3**：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

# 删除文件

一般情况下，直接在文件管理器中把没用的文件删了，或者用`rm`命令删了

```bash
$ rm test.txt #删除文件
$ rm -rf gitskills # 删除文件夹/项目
```

这个时候，工作区和版本库就不一致了，`git status`命令会告诉你哪些文件被删除了：

```bash
$ git status
输出：On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	deleted:    test.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

现在你有两个选择，一是确实要从版本库中删除该文件，那就用命令`git rm`删掉，并且`git commit`：

```bash
$ git rm test.txt
rm 'test.txt'

$ git commit -m "remove test.txt"
[master d46f35e] remove test.txt
 1 file changed, 1 deletion(-)
 delete mode 100644 test.txt
```

另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本：

```bash
$ git checkout -- test.txt
```

> `git checkout`其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。