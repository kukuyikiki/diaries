// 0：未初始化 -- 尚未调用.open()方法；
// 1：启动 -- 已经调用.open()方法，但尚未调用.send()方法；
// 2：发送 -- 已经调用.send()方法，但尚未接收到响应；
// 3：接收 -- 已经接收到部分响应数据；
// 4：完成 -- 已经接收到全部响应数据，而且已经可以在客户端使用了；

myPromiseAjax().then(res => {

}, err => {
  
})

function lajax(options) {
  options = Object.assign({
      url: '',
      method: 'post', // 默认 post 请求 这个自定义 也可以是 get 也可以在调用的时候传
      async: true, // 请求同步还是异步，默认异步
      data: null,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }, options);

  return new Promise((resolve, reject) => {
      // 1. 初始化一个XMLHttpRequest对象
      let xhr = new XMLHttpRequest();

      // 2. 初始化一个请求
      xhr.open(options.method, options.url, options.async);
      if(options.method == 'post') {
          // post 需要加请求头
          Object.keys(options.headers).forEach(key => {
              xhr.setRequestHeader(key, options.headers[key]);
          })
      }
      xhr.onreadystatechange = () => {
          if(xhr.readyState == 4) {
              if(xhr.status == 200 || xhr.status == 304) {
                  resolve(JSON.parse(xhr.responseText));
              }else {
                  reject(xhr);
              }
          }
      }
      xhr.send(options.data);
  }).catch((e) => {});
}
