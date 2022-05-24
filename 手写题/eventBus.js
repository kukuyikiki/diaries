class EventEmitter {
  constructor() {
    this.eventMap = new Map()
  }

  on(type, fn) {
    const handler = this.eventMap.get(type)
    if (!handler) {
      this.eventMap.set(type, [fn])
    } else {
      handler.push(fn)
    }
  }

  emit(type, once = false, ...args) {
    const handler = this.eventMap.get(type)
    if (handler) {
      for (const fn of handler) {
        fn(...args)
      }
      if (once) {
        this.eventMap.delete(type)
      }
    }
  }

  off(type, fn) {
    const handler = this.eventMap.get(type)
    if (handler) {
      let position = handler.findIndex(f => {
        return f === fn
      })
  
      if (position !== -1) {
        handler.splice(position, 1)
      } 
    }
  }
}

let eventBus = new EventEmitter()
let fn1 = function(name, age) {
	console.log(`${name} ${age}`)
}
let fn2 = function(name, age) {
	console.log(`hello, ${name} ${age}`)
}
eventBus.on('aaa', fn1)
eventBus.on('aaa', fn2)
eventBus.emit('aaa', false, '布兰', 12)
eventBus.off('aaa', fn2)
eventBus.emit('aaa', false, '布兰1', 12)
