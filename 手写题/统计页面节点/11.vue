<template>
<div>
    <div>Dom Count: {{ monitor.count }}</div>
    <div>Dom Depth: {{ monitor.depth }}</div>
    <div>
        <div>
            <div></div>
        </div>
    </div>
</div>
</template>
<script>


export default {
    name: "Test",
    data() {
        return {
            monitor: {count: 0, depth: 0},
            timer: null
        };
    },
    mounted() {
        this.getNode()
    },
    methods:{
        // 获取节点层数
        helper(e){
            this.monitor.depth = e.path.length - 2
        },
        // 绑定事件
        getNode() {
            this.monitor.count = document.getElementsByTagName('*').length;
            document.getElementsByTagName('body').addEventListener('DOMSubtreeModified', this.debounce(this.helper, 1000), false);
        },
        // 防抖
        debounce(fn,delay){
            this.timer = null //借助闭包
            return function() {
                const context = this
                const args = [...arguments]
                if(this.timer){
                    clearTimeout(this.timer) 
                }
                this.timer = setTimeout(() => {
                    fn.apply(context, args)
                }, delay)
            }
        }
        

    },
    components: { 

    },
    watch:{
        //深度监听
        // deep:true
    }
}
</script>
</script>
<style scoped>

</style>