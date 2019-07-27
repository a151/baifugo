<template>
    <div class="wrapper">
       <keep-alive>
           <router-view >
               <router-view></router-view>
           </router-view>
       </keep-alive>
    </div>
</template>

<script>
    export default {
        name: "index",
        mounted(){
        },
        methods:{
        },
        activated(){
        },
    }
</script>

<style scoped>
    html,body{height: 100%}
    .body_relative{height: 100%}
    .wrapper{height: 100%}
</style>