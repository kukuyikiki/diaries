Object.defineProperty(obj, 'key', {
  value: 111,
  enumerable: true,
  configurable: true,
  writable: true
})

new Proxy(obj1, {
  get(target, key) {
    return target[key]
  },
  set(target, key, value) {
    target[key] = value
  }
})