button按钮

## 按钮类型

按钮支持 `default`、`primary`、`info`、`warning`、`danger` 五种类型，默认为 `default`。

```vue
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-button type="default">默认按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
```

不同类型的按钮，背景色不同

![image-20201111105449379](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201111105449379.png)

## 朴素按钮

通过 `plain` 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。

```vue
<van-button plain type="primary">朴素按钮</van-button>
<van-button plain type="info">朴素按钮</van-button>
```

![image-20201111105915157](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201111105915157.png)

```
就是当你需要做这样的按钮时，他是圆角的，而且需要边框。字体颜色也要改变
```

![image-20201111110151389](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201111110151389.png)

```vue
<!--圆角 -->
round

<!--边框 -->
plain

<!--字体颜色需要用到深度选择器
	检查元素找到要改变字体的类名或其他标识
	然后在css中-->

    div /deep/.btn-first span {
    color: black;
    }
<!--/deep/ 就是深度选择器了   用来改变引入组件的样式-->
```



## 点击表单中的普通按钮为什么会触发表单提交？

在表单中，除了提交按钮外，可能还有一些其他的功能性按钮，如发送验证码按钮。在使用这些按钮时，要注意将`native-type`设置为`button`，否则会触发表单提交。

```vue
<van-button native-type="button">
  发送验证码
</van-button>
```

这个问题的原因是浏览器中 button 标签 type 属性的默认值为`submit`，导致触发表单提交。我们会在下个大版本中将 type 的默认值调整为`button`来避免这个问题。



# 输入框

可以通过 `v-model` 双向绑定输入框的值，通过 `placeholder` 设置占位提示文字。

```vue
<!-- Field 是基于 Cell 实现的，可以使用 CellGroup 作为容器来提供外边框。 -->
<van-cell-group>
  <van-field v-model="value" label="文本" placeholder="请输入用户名" />
<van-cell-group>
```

```vue
export default {
  data() {
    return {
      value: '',
    };
  },
};
```



在使用输入框的时候，配上

```vue
<van-cell-group><van-cell-group>
```

会有每个输入框下的那条线

输入框的不同类型

```vue
<!-- 输入任意文本 -->
<van-field v-model="text" label="文本" />
<!-- 输入手机号，调起手机号键盘 -->
<van-field v-model="tel" type="tel" label="手机号" />
<!-- 允许输入正整数，调起纯数字键盘 -->
<van-field v-model="digit" type="digit" label="整数" />
<!-- 允许输入数字，调起带符号的纯数字键盘 -->
<van-field v-model="number" type="number" label="数字" />
<!-- 输入密码 -->
<van-field v-model="password" type="password" label="密码" />
```



# Picker 选择器

提供多个选项集合供用户选择，支持单列选择和多列级联，通常与[弹出层](https://youzan.github.io/vant/#/zh-CN/popup)组件配合使用。

### 选项配置

Picker 组件通过 `columns` 属性配置选项数据，`columns` 是一个包含字符串或对象的数组。

### 顶部栏

设置 `show-toolbar` 属性后会展示顶部操作栏，顶部栏包含标题、确认按钮和取消按钮，点击确认按钮触发 `confirm` 事件，点击取消按钮触发 `cancel` 事件。

```vue
<van-picker
  title="标题"
  show-toolbar
  :columns="columns"
  @confirm="onConfirm"
  @cancel="onCancel"
  @change="onChange"
/>
```

```vue
import { Toast } from 'vant';

export default {
  data() {
    return {
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
    };
  },
  methods: {
    onConfirm(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      Toast('取消');
    },
  },
};
```

### 经常会需要让输入框和选择器配合来使用

```vue
<!-- 运动会级别 -->
          <div class="boline">
            <van-cell-group>
              <van-field
                readonly
                clickable
                :name="item1.name1"
                :label="item1.name1"
                :value="value1"
                :placeholder="item1.placeholder1"
                @click="mqinAi1"
              />
            </van-cell-group>
            <div v-if="myIf1">
              <van-popup v-model="showPicker" position="bottom">
                <van-picker
                  :title="item1.title"
                  show-toolbar
                  :columns="item1.columns1"
                  @cancel="showPicker = false"
                  @confirm="onConfirm1"
                />
              </van-popup>
            </div>
          </div>

```

```vue
export default {
    data(){
        return{
            myIf1: false,
            myIf2: false,
            value1: "",
            value2: "",
        },
        methods:{
            onConfirm1(e) {
              this.value1 = e;
              this.showPicker = false;
              this.flag1 = false;
            },
            onConfirm2(e) {
              this.value2 = e;
              this.showPicker = false;
              this.flag2 = false;
            },
            mqinAi1() {
              this.myIf1 = true;
              this.myIf2 = false;
              this.showPicker = true;
              this.flag1 = true;
              this.flag2 = false;
            },
            mqinAi2() {
              this.myIf1 = false;
              this.myIf2 = true;
              this.showPicker = true;
              this.flag2 = true;
              this.flag1 = false;
            },
        }
    }
}
```

# Toast轻提示

![img](https://static.dingtalk.com/media/lALPDhmOt08X9TDMjs0B0Q_465_142.png_720x720q90g.jpg?bizType=im)



![img](https://static.dingtalk.com/media/lALPDhJzugWChITMtc0BpQ_421_181.png_720x720q90g.jpg?bizType=im)

![img](https://static.dingtalk.com/media/lALPDiCptJihjzLMs80BmA_408_179.png_720x720q90g.jpg?bizType=im)



使用toast经常配合duration来使用，一般刷新时间是和总体的SetTimeOut时间一致

这里由于涉及上传图片，需要不少时间就给了30s

# 全局配置适应PC

## 1.在store文件下新建global.vue文件

```vue
<template>
    <div></div>
</template>

<script>
    const isPC = false;
    export default {
        isPC
    }
</script>

<style>
</style>
```

在这里导出isPC，初始值为false

## 2.在main.js里引入Global.vue，给Vue原型添加这个属性

```vue
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import Global from '@/store/global.vue'
import '../src/assets/icons/iconfont.css'

Vue.prototype.$Global = Global;
Vue.use(Vant);

Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
```

## 3.App.vue中

```vue
<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
                <!-- 这里是会被缓存的视图组件 -->
            </router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive">
            <!-- 这里是不被缓存的视图组件 -->
        </router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    components: {},
    created() {
        let width = document.body.offsetWidth;
        if (width > 600) {
            this.$Global.isPC = true;
            let body = document.body.style;
            body.maxWidth = 768 + "px";
            body.minHeight = 100 + "vh";
            body.boxShadow = "0 0 4px 0 #CECECE";
            body.marginLeft = "auto";
            body.marginRight = "auto";
            let url = window.location.href.split('#')
            if(url[1] === '/' || url[0] === 'http://keyan.lzyjykj.cn') {
                window.location.href = 'http://keyan.lzyjykj.cn/admin';
            }
        } else {
        }
    },
};
</script>

<style>
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
legend,
button,
form,
fieldset,
input,
textarea,
p,
blockquote,
th,
td {
    margin: 0;
    padding: 0;
    font-size: 17px;
}
</style>

```

## 4.使用的时候在自己的页面中

建一个最大的div  取类名为 select-name-component

在create中判断当是否是在PC端

```vue
created() {
        this.isPC = this.$Global.isPC;
    },
```

css中

```vue
/* 适应PC */
.select-name-component /deep/ .van-overlay,
.select-name-component /deep/ .van-popup {
    width: 768px;
    left: auto;
}
```

至此就完成了

# vant表单

用于数据录入，校验，支持输入框，单选框，复选框，文件上传等类型。

在表单中，每一个Filed组件代表一个表单项，使用Field的rules属性定义校验规则。

## 基本用法

```vue
<van-form @submit="onSubmit">
  <van-field
    v-model="username"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
    通过定义rules来限制输入规则
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
	  在这里的values就是，{username:"",password:""}这样的形式
    },
  },
};
```

这里的name 在提交事件触发时会被当做key发送请求，v-model绑定的是这个key所对应的值

v-model：是一个语法糖，

```vue
<input v-model="test">
本质上是
<input :value="test" @input="test = $event.target.value">
```

## 校验规则

### 基本用法

```vue
<!-- 通过 pattern 进行正则校验 -->
  <van-field
    v-model="value1"
    name="pattern"
    placeholder="正则校验"
    :rules="[{ pattern, message: '请输入正确内容' }]"
  />
<!-- 通过 validator 进行函数校验 -->
  <van-field
    v-model="value2"
    name="validator"
    placeholder="函数校验"
    :rules="[{ validator, message: '请输入正确内容' }]"
  />

export default {
    data() {
        return {
        pattern: /\d{6}/,
        };
      },
	methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /1\d{10}/.test(val);
    },
	 onFailed(errorInfo) {
      console.log('failed', errorInfo);
    },
  },
};
```

### 验证输入规范时机

```
validate-trigger
表单校验触发时机，可选值为 onChange、onSubmit
string类型，默认值为onBlur
```

```
validate-trigger  可选值
通过 validate-trigger 属性可以自定义表单校验的触发时机。

值	             描述
onSubmit	仅在提交表单时触发校验
onBlur	    在提交表单和输入框失焦时触发校验
onChange	在提交表单和输入框内容变化时触发校验
```

## 自带的事件

![image-20201123092827030](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20201123092827030.png)

## 普通按钮影响问题

### 点击表单中的普通按钮为什么会触发表单提交？

在表单中，除了提交按钮外，可能还有一些其他的功能性按钮，如发送验证码按钮。在使用这些按钮时，要注意将`native-type`设置为`button`，否则会触发表单提交。

```vue
<van-button native-type="button">
  发送验证码
</van-button>
```

这个问题的原因是浏览器中 button 标签 type 属性的默认值为`submit`，导致触发表单提交。我们会在下个大版本中将 type 的默认值调整为`button`来避免这个问题。

## 防止点击多次提交

可能由于网络问题

当点击提交发送请求后没很快跳转页面，此时点击按钮还能触发提交事件，就会导致多次提交。

```vue
			<div class="button">
                <!-- 保存按钮 -->
                <li style="flex-grow: 1">
                    <van-button
                        class="bot-button btnFirst"
                        round
                        plain
                        native-type="button"
                        :disabled="!isStart || isQuest"
                        @click="saveClick"
                        >仅保存</van-button
                    >
                </li>
                <!-- 提交按钮 -->
                <li style="flex-grow: 1">
                    <van-button
                        class="bot-button btnSecond"
                        round
                        antive-type="button"
                        type="submit"
                        :disabled="!isStart || isQuest"
                        size="normal"
                        color="RGB(24,144,255)"
                        >提交</van-button
                    >
                    <!-- @click="submitClick" -->
                </li>
            </div>
```

我在按钮上添加禁用属性，默认不禁用，当提交按钮事件触发，就把它设置禁用，请求发送成功 .then之后，不作处理，跳转页面。   当请求发送失败，  .catch后再恢复按钮可用。

# replace和push

replace：this.$router.replace()

​	跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上个页面。上一个纪录是不存在的。

​	在新增页面跳转到列表页时，不能再返回到新增页面，所以就需要用 replace

push：this.$router.push()

​	跳转到指定的url，回向history栈添加一个记录，点击回退后返回上一个界面

go(n)：this.$router.go(n)

```
this.$router.go(-1);
```

​	在修改的时候，如果在用跳转。由于新增和修改是同一个页面，那么返回的时候，会经过两个列表页

​	所以修改成功的时候，我们  go(-1)           相对于当前页面向前或向后跳转多少个页面,类似 `window.history.go(n)`。n可为正数可为负数。正数返回上一个页面



# 日历填入格式

```vue
<van-cell title="选择单个日期" :value="date" @click="show = true" />
<van-calendar v-model="show" @confirm="onConfirm" />
```

```vue
export default {
  data() {
    return {
      date: '',
      show: false,
    };
  },
  methods: {
	//日历填入格式
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
	//日历点击确认触发事件
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
  },
};
```

```
${date.getFullYear()}	//年份
${date.getMonth() + 1}  //月份 +1
${date.getDate()}	//日子
```











