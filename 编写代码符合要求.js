//1）
// Hero("37er");
//执行结果为 Hi! This is 37er （
//2）
// Hero("37er").kill(1).recover(30);
//执行结果为 Hi! This is 37er Kill 1 bug Recover 30 bloods 
//3）
// Hero("37er").sleep(10).kill(2)
//执行结果为 Hi! This is 37er //等待10s后 Kill 2 bugs  //注意为bugs （双斜线后的为提示信息，不需要打印）

function Hero(name) {
  const re = {}
  re.name = name
  re.time = 0
  console.log(`Hi! This is ${re.name}`)
  re.kill = function(count) {
    if (count === 1) { 
      console.log(`kill ${count} bug`)
    } else {
      setTimeout(function() {
        console.log(`kill ${count} bugs`)
      }, this.time * 1000)
    }
    return this
  }
  re.sleep = function(time) {
    this.time = time
    return this
  }
  re.recover = function(bloods) {
    console.log(`Recover ${bloods} bloods`)
    return this
  }
  return re
}

Hero("37er");
Hero("37er").kill(1).recover(30);
Hero("37er").sleep(2).kill(2)

