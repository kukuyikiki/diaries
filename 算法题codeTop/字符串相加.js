/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  let add = 0, i = num1.length - 1, j = num2.length - 1
  const ans = []
  while (i >= 0 || j >= 0 || add != 0) {  
    let left = i >= 0 ? num1[i] - 0 : 0
    let right = j >= 0 ? num2[j] - 0 : 0
    let temp = left + right + add
    ans.push(temp % 10)
    add = Math.floor(temp / 10)
  }
  return ans.reverse().toString
};

var a = {
  name: 'lucy',
  getName1() {
    console.log(this.name)
  },
  getName2: () => {
    console.log(this.name);
  }
}

var b = {
  name: 'jack'
}

var c = {
  name: 'christopher'
}

// a.getName1()
// a.getName2()

// var fn1 = a.getName1
// fn1()
// var fn2 = a.getName2
// fn2()

// a.getName1.call(b)
// a.getName2.call(b)

a.getName1.bind(b).call(c)
a.getName2.bind(b).call(c)

var d = Object.create(a, {
  name: {
    value: 'jacob',
    writable: true,
    configurable: true
  }
})
d.getName1()
d.getName2()

d.name = 'leo'
d.getName1()
d.getName2()

var e = Object.create(d)
d.getName1()
d.getName2()

e.name = 'andrew'
e.getName1()
e.getName2()