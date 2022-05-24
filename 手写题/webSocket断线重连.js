{/* <body>
   <div id="myname"></div>
    <script src="http://localhost:3000/socket.io/socket.io.js"></script>
   <script>
      var count = 0;
      const socket = io.connect('http://localhost:3000')
      socket.on('mynameEv', (data)=>{
          document.getElementById("myname").innerHTML = data.name;
         console.log(data.name)
         setInterval(()=>{
                count++
                socket.emit('yournameEv', { name:"飞旋"+count}) // 用于已命名事件
         },1000)

      })
   </script>
</body> */}


// 前端解决方案：心跳检测
var heartCheck = {
  timeout: 30000, //30秒发一次心跳
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function(){
      clearTimeout(this.timeoutObj);
      clearTimeout(this.serverTimeoutObj);
      return this;
  },
  start: function(){
      var self = this;
      this.timeoutObj = setTimeout(function(){
          //这里发送一个心跳，后端收到后，返回一个心跳消息，
          //onmessage拿到返回的心跳就说明连接正常
          ws.send("ping"); // 用于未命名事件
          console.log("ping!")

          self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
              ws.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
          }, self.timeout);
      }, this.timeout);
  }
}
