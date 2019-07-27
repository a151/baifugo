<template>
    <!--{set:$top_name = "公告详情"}-->
    <div class="body_page_box">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="list-group-item-heading" style="font-size:18px;">{{textContent.title}}</h4>
                <p class="list-group-item-text" style="color:#999;">发布日期：{{textContent.time}}</p>
            </div>
            <div class="panel-body">
                <p v-html="textContent.content"></p>
            </div>
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
        name: "notice_detail",
        components:{},
        data(){
            return{
                id:"",//公告id
                textContent:{},//公告详情
            }
        },
        computed:{},
        mounted(){
        
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入数据；
            /**详情**/
            loginFn(flag) {
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=notice_detail&parm%5Bid%5D="+this.id+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=notice_detail&time="+time+"&rand="+rand+"&parm[id]="+this.id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.status==200){
                             _this.textContent=res.data.data;
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
            this.id=this.$route.query.id;
            this.loginFn();
        },
        watch:{

        },
    }
</script>

<style scoped>

</style>