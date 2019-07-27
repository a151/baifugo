<template>
    <div class="body_page_box">
        <div class="list-group list-group-help-list">
            <router-link v-for="(item,index) in helpLists" exact :to="{path:'/index/login/help',query:{id:item.id}}" class="list-group-item">
                <h4 class="list-group-item-heading" style="font-size:14px;">{{item.name}}</h4>
                <p class="list-group-item-text" style="color:#999;">{{item.date}}</p>
            </router-link>
        </div>
    </div>
</template>
<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { login } from "../../../api/simple/index"; //登录
    import { url,phsessid,webtitle } from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    export default {
        name: "help_list",
        components:{},
        data(){
            return{
                id:"",//公告id
                helpLists:[],//购物帮助
            }
        },
        computed:{},
        mounted(){
            
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入数据；
            /**登录**/
            help_listFn(flag) {
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=detailedness&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm={
                    method:"help_list",
                    rand:rand,
                    time:time,
                    sign:sign
                };
                login(parm).then(res=>{
                    if(res.data.code==1){
                        this.helpLists=res.data.value;
                    }
                }).catch(err=>{})
            },
         
        },
        activated(){
            phsessid();
            this.help_listFn();
            this.rHeadText("网站帮助");
            webtitle(getStorage("source"),"网站帮助");
        },
        watch:{},
    }
</script>

<style scoped>

</style>