## 组件的分类

### 1.页面级别的组件

通常是组成珍格格项目的一个大的页面。一般开发的就是这种组件。像是pages下面的Home.vue（主页）是一个独立的页面，也是一个独立的组件。

### 2.业务上可复用的基础组件

通常是在业务中被各个页面服用的组件，这一类组件通常都写到components目录下，然后通过import在各个页面中使用这一类组件通常是实现某个功能。写成一个独立的业务组件。

### 3.业业务无关的独立组件

这一类组件通车用作基础组件，在各个业务组件或者页面组件中被使用。比如自己写一个富文本编辑器放在utils中。



## 组件化开发要素

prop，event和solt

### 属性prop

定义了组件可以接受那些可配置的属性。主要是用来接收父组件传递的数据。props接收属性时可以使数组形式，也可以是对象形式。如果不涉及到类型椒盐或者其他校验可以直接使用数组形式，如果涉及到校验最好使用对象形式。

**数组形式**

```vue
props:['name','age']
```

**对象形式：** 使用对象的形式，可以对数据的类型，是否必填，以及其他特征进行校验。这对于组件化开发非常有利。

```vue
<script>
export default {
  name:'Child',
  props:{
    name:{
      type:String,
      require:true
    },
    age:{
      type:Number
    },
    type:{
      //校验： 判断type是否是success,warning和primary之一。
      validator:function(value){
        return (['success','warning','primary'].indexOf(value)) > -1
      }
    }
  }
}
</script>
```

Parent.vue使用组件

```vue
<Child :name = name  :age = age :type = type></Child>
```

定义组件时，name是String类型且是必填的，age是number类型非必填的。type是必须是success,warning和primary中的某一个。

### 自定义事件

如何触发组件上定义的事件：
假设现在我们需要给我们定义的Child组件添加点击事件：这时候我们一般是通过在组件内部的button上通过$emit
触发事件，然后在父组件中监听。
在组件中通过$emit定义事件：

```vue
Child.vue
<template>
  <div class="container">
    姓名：{{name}}
    年龄：{{age}}
    <!-- 触发事件 -->
    <button @click ="$emit('onClick','自定义事件')" :class = "type">点击</button>
  </div>
</template>
```

Parent.vue监听事件

```vue
 <Child @onClick = 'handleClick' :age = age :type = type></Child>
```

### Slot

我们定义的组件通常会被用到各个地方，但是并不一定能够满足所有的使用场景，有时候我们需要
进行一些功能的扩展。这时候就需要用到slot了。一句话描述slot:**就是用来在组件中插入新的内容**。
比如我们刚刚定义的Child组件，需要插入一段话。那么这时候就需要用到slot了。

Child.vue中使用slot

```vue
<template>
  <div class="container">
    姓名：{{name}}
    年龄：{{age}}
    <button @click ="$emit('onClick','自定义事件')" :class = "type">点击</button>
    <slot></slot>
  </div>
</template>
```

Parent.vue中拓展功能，插入一句话

```vue
<template>
  <div class="container">
    <Child @onClick = 'handleClick' :age = age :type = type>
      <div>这是通过slot插入的一段话</div>
    </Child>
  </div>
</template>
```

如上所示：在Child.vue中使用了slot，在Parent.vue中使用CHild时，插入了一段话。
实现了功能的扩展。当然如果需要扩展更多的功能可以使用具名插槽，这里就不具体介绍了。



## 总结：

### **组件的分类：**

1. 页面级组件
2. 业务上可复用的基础组件
3. 与业务无关的独立功能组件

### **组件开发三要素**

`prop`,自定义事件,`slot`是组成组件的三个重要因素。

1. `prop`用于定义组件的属性。
2. 自定义事件用于触发组件的事件。
3. `slot`用于组件功能的扩展。

通过合理的使用这三个API，可以更好地帮助我们开发组件。