<template>
    
</template>

<script>
    export default {
        name: "clear",
        components:{},
        data(){ return{}},
        computed:{},
        mounted(){},
        methods:{
            //设置cookie<存>
            setCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                console.info(cname + "=" + '111' + ";Domain=test.baifugo.com;" + expires);
                document.cookie = cname + "=" + cvalue + ";Domain=test.baifugo.com;" + expires;
            },
            //获取cookie
            getCookie: function (cname) {
                var arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return (arr[2]);
                else
                    return null;
            },
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