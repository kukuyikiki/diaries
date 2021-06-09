> 安装任意版本的 Node.js 包括： 自动匹配 `latest` / `io.js` version 以及 选择 32 / 64 位，例如 `x.xx.xx-x64` 。

```
gnvm install latest 1.0.0-x86 1.0.0-x64 5.0.0
```

**卸载本地任意 Node.js 版本**

```
gnvm uninstall latest 1.0.0-x86 1.0.0-x64 5.0.0
```

**切换本地存在的任意版本 Node.js**

```
gnvm use 5.10.1
```

**列出本地已存在的全部 Node.js 版本**

```
c:\> gnvm ls
5.1.1 -- latest
1.0.0
1.0.0 -- x86
5.0.0 -- global
```