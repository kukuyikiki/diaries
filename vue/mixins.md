# vue混入(mixins)

## 简介

混入 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

## 钩子函数合并

  同名钩子函数将混合为一个数组，因此都将被调用。另外，混入对象的钩子函数将在组件自身钩子函数之前调用

```vue
<body>
    <div id="app"></div>
</body>
</html>
<script src="./vue.js"></script>
<script>
    var Mixins = {
        created() {
            console.log('Mixins Created')
        }
    }
    new Vue({
        el: '#app',
        mixins: [Mixins],
        created() {
            console.log('#app Created')
        }
    })
    
    //  Mixins Created
    //  #app Created
</script>
```

## 数据对象合并

 数据对象在内部会进行浅合并 (一层属性深度)，在和组件的数据发生冲突时以组件数据优先（组件的data中变量会覆盖混入对象的data中变量）

```vue
<body>
    <div id="app"></div>
</body>
<script src="./vue.js"></script>
<script>
	var Mixins = {
        data: {
            msg: 'I am Mixins',
            msg1: 'I am Mixins msg1'
        },
        created() {
            console.log('我是组件中的变量：' + this.msg2)
        }
    }
    new Vue({
        mixins: [Mixins],
        el: '#app',
        data: {
            msg: 'I am #app',
            msg2: 'I am msg2'
        },
        created() {
            console.log(this.msg)
            console.log('我是混入对象中的变量：' + this.msg1)
        }
    })
    
	// 我是组件中的变量：I am msg2
	// I am #app
	// 我是混入对象中的变量：I am Mixins msg1
</script>

```

## 普通方法合并

 当混合值为对象的选项时，例如 methods、components、directive，将被混合为同一个对象，两个对象键名冲突时，取组件对象的键值对

```vue
<body>
    <div id="app"></div>
</body>
<script src="./vue.js"></script>
<script>
    var Mixins = {
        methods: {
            mixin: function() {
                console.log('Mixin')
            },
            mixinTwo: function () {
                console.log('MixinTwo')
            }
        }
    }
    new Vue({
        el: '#app',
        mixins: [Mixins],
        methods: {
            mixin: function () {
                console.log('#app')
            }
        },
        mounted() {
            this.mixin()
            this.mixinTwo()
        }
    })
    
	// #app
	// MixinTwo
</script>
```

## 局部混入

 在 components 目录下创建一个mixins文件夹，并在 mixins 目录下创建一个 mixin.js 文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190530203743158.jpg)

  在 mixin.js 文件里写入如下代码

```vue
const mixin = {
  data() {
    return {
      msg: '哈哈'
    }
  },
  methods: {
    mixinMethod() {
      console.log(this.msg+'，这是mixin混入的方法')
    }
  }
}

export default mixin
```

