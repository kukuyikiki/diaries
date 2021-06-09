# SMPE日志前端分享

## 首先我们看页面效果

![image-20210127113852546](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210127113852546.png)

**图中红色框内有两个按钮，控制按钮显示部分在下图**

![image-20210127114005462](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210127114005462.png)

在created方法内，设置了只有download为true

在CRUD.operation.vue中，使用v-if控制只有为true的会显示。



在页面中会调用CRUD这个方法，并把当前页的标题和url传过去。以及混入的presenter()方法

![image-20210127142101312](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210127142101312.png)

在CRUD里，首先是自定义了一个defaultOptions对象，把传进来的options合进来

```
options = mergeOptions(defaultOptions, options)

function mergeOptions(src, opts) {
  const optsRet = {
    ...src
  }
  for (const key in src) {
    if (opts.hasOwnProperty(key)) {
      optsRet[key] = opts[key]
    }
  }
  return optsRet
}
//此时返回的options是一个数组对象
```

数据是在refresh()刷新方法中

```
// 刷新
    refresh() {
      if (!callVmHook(crud, CRUD.HOOK.beforeRefresh)) {
        return
      }
      return new Promise((resolve, reject) => {
        crud.loading = true
        // 请求数据
        initData(crud.url, crud.getQueryParams()).then(res => {
          const table = crud.getTable()
          if (table && table.lazy) { // 懒加载子节点数据，清掉已加载的数据
            table.store.states.treeData = {}
            table.store.states.lazyTreeNodeMap = {}
          }
          crud.page.total = res.data.pages === undefined ? 0 : res.data.total
          crud.data = res.data.pages === undefined ? res.data : res.data.records
          crud.resetDataStatus()
          // time 毫秒后显示表格
          setTimeout(() => {
            crud.loading = false
            callVmHook(crud, CRUD.HOOK.afterRefresh)
          }, crud.time)
          resolve(data)
        }).catch(err => {
          crud.loading = false
          reject(err)
        })
      })
    },
```

在这里请求到的数据

并展示总条数，页数和延迟显示表格的效果。

搜索组件

![image-20210127150434672](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210127150434672.png)

![image-20210127150631081](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210127150631081.png)

时间选择器用的是一个createTime数组传递起始时间。

搜索的时候也是去调用了刷新

![image-20210127153953044](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210127153953044.png)



接下来回到混入的presenter()

![image-20210128202401903](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210128202401903.png)

在beforeCreate()中，把当前实例的crud赋一个空值，然后创建一个cruds把页面的CRUD配置赋给它，接着转化为数组的形式。

![image-20210128203117394](C:\Users\Stefan\AppData\Roaming\Typora\typora-user-images\image-20210128203117394.png)

最后把页面CRUD配置注册视图模型，赋给this.crud

