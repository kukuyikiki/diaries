var RecentCounter = function() {
  this.que = []
};

/** 
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
  if (t === null) {
    this.que.push(null)
  } else {
    this.que.push(t)
  }
  while (this.que[0] < t - 3000) {
    this.que.shift()
  }
  return this.que.length
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */

new Vue({
  el: '#root',
  data: {
    name: '尚硅谷',
    n: 1
  },
  directives: {
    big(element, binding) {
      console.log('big', this)  // 此处this是window
      element.innerText = binding.value * 10
    },
    fbind:{
      bind(element, binding) {
        element.value = binding.value
      },
      inserted(element, binding) {
        element.focus()
      },
      update(element, binding) {
        element.value = binding.value
      }
    }
  }
})