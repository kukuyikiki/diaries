//myVuex.js
class Store{
  constructor(options) {
      this.vm = new Vue({
          data:{
              state:options.state
          }
      })

      let getters = options.getter || {}
      this.getters = {}
      Object.keys(getters).forEach(getterName=>{
          Object.defineProperty(this.getters,getterName,{
              get:()=>{
                  return getters[getterName](this.state)
              }
          })
      })

      let mutations = options.mutations || {}
      this.mutations = {}
      Object.keys(mutations).forEach(mutationName=>{
          this.mutations[mutationName] = (arg)=> {
              mutations[mutationName](this.state, arg)
          }
      })

      let actions = options.actions
      this.actions = {}
      Object.keys(actions).forEach(actionName=>{
          this.actions[actionName] = (arg)=>{
              actions[actionName](this, arg)
          }
      })

  }
  dispatch(method,arg){
      this.actions[method](arg)
  }
  // 修改代码
  commit=(method,arg)=>{
      console.log(method);
      console.log(this.mutations);
      this.mutations[method](arg)
  }
  get state(){
      return this.vm.state
  }
}

let install = function(Vue){
  Vue.mixin({
      beforeCreate(){
          if (this.$options && this.$options.store){ // 如果是根组件
              this.$store = this.$options.store
          }else { //如果是子组件
              this.$store = this.$parent && this.$parent.$store
          }
      }
  })
}

let Vuex = {
  Store,
  install
}