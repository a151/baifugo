<template>
    <!--{set:$top_name = "帮助详情"}-->
    <div class="body_page_box">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="list-group-item-heading" style="font-size:18px;">{{textContent!=null&&textContent!=''&&textContent!=undefined?textContent.name:''}}</h4>
            </div>
            <div class="panel-body">
                <p v-html="textContent!=null&&textContent!=''&&textContent!=undefined?textContent.content:''"></p>
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
        name: "help",
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
            /**帮助列表详情页**/
            helpFn(flag) {
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=help_info&parm%5Bid%5D="+this.id+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=help_info&time="+time+"&rand="+rand+"&parm[id]="+this.id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.textContent=res.data.value;
                        }else if(res.data.code!=1){
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },

        },
        activated(){
            phsessid();
            this.rHeadText("购物帮助详情");
            webtitle(getStorage("source"),"购物帮助详情");
            this.id=this.$route.query.id;
            this.helpFn();
        },
        watch:{
           $route:'helpFn'
        },
    }
</script>

<style scoped>

</style>