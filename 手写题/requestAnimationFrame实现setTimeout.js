// 模拟setTimeout
const mockSetTimeOut = (cb,time = 0) =>{
  let t = 0, id;
  let timer = () => {
       t += 1;
       if ((t * (1000 / 60)) > time) {
         cb();
         cancelAnimationFrame(id);
       } else {
         id = requestAnimationFrame(timer);
       }
   }
   requestAnimationFrame(timer);
}

mockSetTimeOut(()=> {
 console.log('1s后');
}, 1000)

// 模拟setInterval
function mySetTimeout(cb, delay) {
  let t = 0
  let timer = () => {
    t += 1
    if ((t * (1000 / 60)) > delay) {
      cb()
      t = 0
    }
    requestAnimationFrame(timer)
  }
  requestAnimationFrame(timer)
}

// 用setTimeout模拟setInterval
setTimeout(function() {
  setTimeout(arguments.callee, 500)
}, 500)

