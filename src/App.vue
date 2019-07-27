<template>
    <div id="app" ref="scollElement">
        <router-view></router-view>
    </div>
</template>
<script>
    export default{
        name:'App',
        updated () {    // 切换不同模块时触发
        this.$nextTick(()=>{
            if(this.$refs.scollElement){    // 滚动元素跳转到顶部
                this.$refs.scollElement.scrollTop = 0;
                    }
                 })
             },
        }
</script>
<style>
    html,body{height: 100%}
    #app{height: 100%}
</style>