# Vue 指令

## v-text  ：设置标签的文本值（textContent）

![image-20201104094054644](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201104094054644.png)



### v-html: 设置标签

内有html的结构会被解析为标签

![image-20201104094503862](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201104094503862.png)



### v-on基础

与@+事件名效果一样

![image-20201104095545616](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201104095545616.png)

在方法内部，如果要拿到data里的数据，需要用this



### v-show：控制元素是否显示

### v-on:click：点击事件

### v-if：

![image-20201104112059944](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201104112059944.png)

### v-bind：

![image-20201104112358785](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201104112358785.png)



### v-for: 根据数据生成列表





### 具名插槽

```html
<div class="container">
  <header>
    <!-- 我们希望把页头放这里 -->
  </header>
  <main>
    <!-- 我们希望把主要内容放这里 -->
  </main>
  <footer>
    <!-- 我们希望把页脚放这里 -->
  </footer>
</div>
```

对于这样的情况，`<slot>` 元素有一个特殊的 attribute：`name`。这个 attribute 可以用来定义额外的插槽：

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

一个不带 `name` 的 `<slot>` 出口会带有隐含的名字“default”。

在向具名插槽提供内容的时候，我们可以在一个 `<template>` 元素上使用 `v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称：

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

现在 `<template>` 元素中的所有内容都将会被传入相应的插槽。任何没有被包裹在带有 `v-slot` 的 `<template>` 中的内容都会被视为默认插槽的内容。