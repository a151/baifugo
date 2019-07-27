<template>
    <!--{set:$top_name = "商城公告"}-->
    <div class="body_page_box">
        <div class="list-group list-group-notice">
            <router-link exact :to="{path:'/index/login/notice_detail',query:{id:item.id}}" v-for="(item,index) in showTxt"  class="list-group-item">
                <h4 class="list-group-item-heading" style="font-size:14px;">{{item.title}}</h4>
                <p class="list-group-item-text" v-html="item.content" style="color:#999;"></p>
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
        name: "notice",
        components:{},
        data(){
            return{
                isShow:false,//错误信息是否显示
                showTxt:[],
            }
        },
        computed:{},
        mounted(){
           
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入数据；
            /**公告**/
            loginFn(flag) {
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=notice&parm%5Bpage%5D="+1+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=notice&time="+time+"&rand="+rand+"&parm[page]="+1+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.status==200){
                            _this.showTxt=res.data.data.queryNotice;
                        }else if(res.data.code!=1){

                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
        },
        activated(){
            phsessid();
            this.rHeadText("网站公告");
            webtitle(getStorage("source"),"网站公告");
            this.loginFn();
            },
        watch:{

        },
    }
</script>

<style scoped>

</style>