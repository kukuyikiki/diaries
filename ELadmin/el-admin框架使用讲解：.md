## el-admin框架使用讲解：

项目介绍：一个基于 Spring Boot 2.1.0 、 Spring Boot Jpa、 JWT、Spring Security、Redis、==Vue、Element-UI==的前后端分离的后台管理系统。

其中前端的技术栈：

项目环境：

本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios) 和 [element-ui](https://github.com/ElemeFE/element)，



项目文档：

https://el-admin.vip/guide/

https://panjiachen.github.io/vue-element-admin-site/zh/guide/

项目预览地址：[https://el-admin.xin](https://el-admin.xin/)

小组迭代过的项目框架地址：任世伟的github: [link](https://github.com/shiwei-Ren/smpe-admin-web)

~~~shell
|-- public 存放静态资源，存放在该文件夹的东西不会被打包影响，而是会原封不动的输出到dist文件夹中
    |-- favicon.ico 网站图标
    |-- index.html 主页，项目入口
|-- src
    |-- api  后端请求接口文件
    |-- assets  静态资源
    |-- components  公用组件
    |-- layout  系统布局：头部、侧边栏、设置、中间内容页面
    |-- mixins  混入文件
    |-- router  路由配置
    |-- store  vuex存放数据
    |-- utils  工具包
    |-- views  页面
    |-- app.vue  根组件
|-- main.js  入口文件
|-- settings.js  全局配置文件，存储一些键和值，供全局调用
|-- .gitignore  git忽略上传的文件格式
|-- .env.development  开发环境下的接口地址配置
|-- .env.production 生产环境下的接口地址配置
|-- .eslintignore  不用校验的文件
|-- .eslintrc.js  ES-lint校验(编码规范、校验规则)
|-- vue.config.js  cli配置文件

~~~

### 基础使用，如何开发一个新模块：

##### 生成一个一级菜单：页面。

![image-20210111155720557](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210111155720557.png)



先在views下建立文件夹，然后建立index.vue文件。

![image-20210111155841680](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210111155841680.png)

在新建菜单处填写信息，主要是填写路由地址，和组件路径，路由地址是存在数据库中，组件路径以views为根目录进行填写，之后点击确认，生成菜单。

![image-20210111160102929](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210111160102929.png)

生成菜单之后，给相应的人物角色添加本菜单，这个角色登陆之后就会显示所添加的菜单。



![image-20210111160307685](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210111160307685.png)

刷新页面之后

![image-20210111160327396](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210111160327396.png)





#### 生成二级菜单：

先在views中建立一个文件夹，之后在文件夹下面建立文件另外两个文件夹

![image-20210111160713664](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210111160713664.png)



在新增菜单中增加一个目录：

填写好路由地址（此处相当于父级路由）

![image-20210111160831159](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210111160831159.png)

然后在建立一个菜单，

填写好组件路径和路由地址，路由地址一般和组件名相同（特殊情况根据项目具体说），

选择上级类目中的刚刚建立起来的目录。

![image-20210111161332811](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210111161332811.png)





测试菜单显示：

![image-20210111163152983](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210111163152983.png)







### 在开发一个新模块需要注意的问题点：

首先页面中需要引入  

~~~javascript
需要导入的代码
import CRUD, { presenter } from "@crud/crud";

cruds () {
    return CRUD({
        title: "论文",
        url: "/api/paper/paper-list",
        crudMethod: { ...crudJob }
    });
},

mixins: [presenter()],
    
解释下混入模式。
https://cn.vuejs.org/v2/guide/mixins.html?


讲解下：发送请求流程，信息回显流程，
~~~







