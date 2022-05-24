class Router {
  constructor() {
    // 以键值对的形式储存路由
    this.routers = {}
    // 当前路由的url
    this.currentUrl = ''
    // 记录出现过的hash
    this.history = []
    // 作为指针，默认指向this.history的末尾，根据后退前进指向history中不同的hash
    this.currentIndex =   this.history.length - 1

    this.refresh = this.refresh.bind(this)
    this.backOff = this.backOff.bind(this)

    // 默认不是后退动作
    this.isBack = false
    // 添加相应的响应事件（刷新）
    window.addEventListener('load', this.refresh, false)
    window.addEventListener('hashchange', this.refresh, false)
  }
  // 将path与callback函数储存
  router(path, cb) {
    this.routers[path] = cb || function() {}
  }
  // 刷新
  refresh() {
    // 获取当前url中的hash路径
    // hash 属性是一个可读可写的字符串，该字符串是 URL 的锚部分（从 # 号开始的部分
    this.currentUrl = location.hash.slice(1) || '/'

    if (!this.isBack) {
      if (this.currentIndex < this.history.length - 1) {
        this.history = this.history.slice(0, this.currentIndex + 1)
        this.history.push(this.currentUrl)
        this.currentIndex++
      }
      this.routers[this.currentIndex]()
      this.isBack = false
    }
    // 执行当前hash路径的callback函数
    this.routers[this.currentUrl]()
  }

  // 后退
  backOff() {
    // 后退操作设置true
    this.isBack = true
    // 指针小于零就锁定
    this.currentIndex <= 0 ? (this.currentIndex = 0) : (this.currentIndex = this.currentIndex - 1)
    // 随着后退，location.hash也应该随之变化
    location.hash = `#${this.history[this.currentIndex]}`
    // 执行指针目前指向hash路由对应的callback
    this.routers[this.history[this.currentIndex]]()
  }
}