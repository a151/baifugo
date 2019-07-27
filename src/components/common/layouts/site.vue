<template>
    
</template>

<script>
    export default {
        name: "site",
        components:{},
        data(){ return{}},
        computed:{},
        mounted(){},
        methods:{
            //删除 cookie
            clearCookie(name) {
                this.setCookie(name, "", -1);
            },
        },
        activated(){
            this.clearCookie("PHPSESSID");
        },
        watch:{},
    }
</script>

<style scoped>

</style>