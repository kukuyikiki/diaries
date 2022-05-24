/**
 * @param {number} capacity
 */
 var LRUCache = function(capacity) {
  this.capacity = capacity
  this.myMap = new Map()
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key) {
  if (this.myMap.has(key)) {
      let temp = this.myMap.get(key)
      this.myMap.delete(key)
      this.myMap.set(key, temp)
      return temp
  } else {
      return -1
  }
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
  if (this.myMap.has(key)) {
      this.myMap.delete(key)
      this.myMap.set(key, value)
  } else {
      this.myMap.set(key, value)
  }
  while (this.myMap.size > this.capacity) {
      this.myMap.delete(this.myMap.keys().next().value)
  }
};

/**
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/

function mySetTimeout(cb, delay) {
  let t = 0
  let timer = function() {
    t += 1
    if ((t * (1000 / 60)) > delay) {
      cb()
      t = 0
    }
    requestAnimationFrame(timer)
  }
  requestAnimationFrame(timer)
}

function mySetTimeout(cb, delay) {
  let t = 0, id
  let timer = function() {
    t += 1
    if ((t * (1000 / 60)) > delay) {
      cb()
      cancelAnimationFrame(id)
    } else {
      id = requestAnimationFrame(timer)
    }
  }
  requestAnimationFrame(timer)
}
