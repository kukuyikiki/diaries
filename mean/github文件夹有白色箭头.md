是因为这个文件夹里面有.git隐藏文件，github就将他视为一个子系统模块了。

解决办法就是：

1、删除文件夹里面的.git文件夹

2、执行git rm --cached [文件夹名]

3、执行git add [文件夹名]

4、执行git commit -m "msg"

5、执行git push origin [branch_name] 