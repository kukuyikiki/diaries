# vant介绍

https://youzan.github.io/vant/#/zh-CN/home

Vant 是**有赞前端团队**开源的移动端组件库，于 2017 年开源，已持续维护 4 年时间。Vant 对内承载了有赞所有核心业务，对外服务十多万开发者，是业界主流的移动端组件库之一。

目前 Vant 官方提供了 [Vue 2 版本](https://vant-contrib.gitee.io/vant)、[Vue 3 版本](https://vant-contrib.gitee.io/vant/next)和[微信小程序版本](http://vant-contrib.gitee.io/vant-weapp)，并由社区团队维护 [React 版本](https://github.com/mxdi9i7/vant-react)。

## 特性

- 提供 60 多个高质量组件，覆盖移动端各类场景
- 性能极佳，组件平均体积不到 1kb（min+gzip）
- 单元测试覆盖率 90%+，提供稳定性保障
- 完善的中英文文档和示例
- 支持 Vue 2 & Vue 3
- 支持按需引入
- 支持主题定制
- 支持国际化
- 支持 TypeScript
- 支持 SSR

# 快速上手

## 安装

### 在现有项目中使用 Vant 时，可以通过 `npm` 进行安装：

```
# Vue 2 项目，安装 Vant 2.x 版本：
npm i vant -S

# Vue 3 项目，安装 Vant 3.x 版本：
npm i vant@next -S
```

安装成功后在package.json文件中

![image-20201111094812420](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201111094812420.png)

### 通过 CDN 安装

使用 Vant 最简单的方法是直接在 html 文件中引入 CDN 链接，之后你可以通过全局变量 `vant` 访问到所有组件。

```html
<!-- 引入样式文件 -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/vant@2.10/lib/index.css"
/>

<!-- 引入 Vue 和 Vant 的 JS 文件 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vant@2.10/lib/vant.min.js"></script>

<script>
  // 在 #app 标签下渲染一个按钮组件
  new Vue({
    el: '#app',
    template: `<van-button>按钮</van-button>`,
  });

  // 调用函数组件，弹出一个 Toast
  vant.Toast('提示');

  // 通过 CDN 引入时不会自动注册 Lazyload 组件
  // 可以通过下面的方式手动注册
  Vue.use(vant.Lazyload);
</script>
```

## 引入组件

### 导入所有组件

Vant 支持一次性导入所有组件，引入所有组件会增加代码包体积

```vue
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
```

在main.js中引入就不需要在具体页面中引入了

```vue
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.config.productionTip = false

Vue.use(Vant);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
```



## 常见问题

### 在 HTML 中无法正确渲染组件？

在 HTML 中使用 Vant 组件时，你可能会碰到部分示例代码无法正确渲染的情况，比如下面的用法：

```vue
<van-cell-group>
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" />
</van-cell-group>
```

这是因为 HTML 并不支持自闭合的自定义元素，也就是说 `<van-cell />` 这样的语法是不被识别的，使用完整的闭合标签可以避免这个问题：

```vue
<van-cell-group>
  <van-cell title="单元格" value="内容"></van-cell>
  <van-cell title="单元格" value="内容"></van-cell>
</van-cell-group>
```

在单文件组件、字符串模板和 JSX 中可以使用自闭合的自定义元素，因此不会出现这个问题。











