class Router {
  constructor() {
    this.routes = {}
    this._bindPopState()
  }

  // 初始化路由
  init(path) {
    history.replaceState({path: path}, null, path)
    this.routes[path] && this.routers[path]()
  }
  // 将路径和对于回调函数加入hashMap储存
  route(path, cb) {
    this.routes[path] = cb || function() {}
  }

  // 触发路由对应回调
  go(path) {
    history.pushState({path: path}, null, path)
    this.routes[path] && this.routes[path]()
  }
  // 监听popstate事件
  _bindPopState() {
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path
      this.routes[path] && this.routes[path]()
    })
  }
}