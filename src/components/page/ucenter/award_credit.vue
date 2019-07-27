<template>
    <div class="user_menu_list" style="border-bottom:0px;">
        <ul class="user_menu_list_ul">
            <li ><a @click="Topath()" href="javascript:;"><span>授信提额</span><b class="iconfont">&#xe62a;</b></a></li>
            <li ><router-link exact :to="{path:'/index/login/drepayments'}"><span> 待还款</span><b class="iconfont">&#xe62a;</b></router-link></li>
            <li ><router-link exact :to="{path:'/index/login/payment_history'}"><span> 还款记录</span><b class="iconfont">&#xe62a;</b></router-link></li>
        </ul>
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
        name: "award_credit",
        components:{},
        data(){
            return{
                get_ready:false,
                judge_whether:"",//判断是否授信过
                credit_granting:{},//授信情况
            }
        },
        computed:{},
        mounted(){
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入数据；
            /**授信判断是否授信过**/
            judgeFn(){
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=detailedness&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm={
                    method:"credits",
                    rand:rand,
                    time:time,
                    sign:sign
                };
                login(parm).then(res=>{
                    this.credit_granting=res.data.data.data;
                    if(res.data.data.code==1){
                        this.judge_whether=1;
                    }else if(res.data.data.code!=1){
                        this.judge_whether=0;
                    }
                    this.get_ready=true;
                }).catch(err=>{})
            },
            Topath(){
                if(this.get_ready==false){
                    return;
                }
                if(this.judge_whether==0){
                    this.$router.push({path: '/index/login/raise_amount'});//返回首页
                }else if(this.judge_whether==1){
                    this.$router.push( {path:'/index/login/raise_amount_to',query:{credit_money:this.credit_granting.credit_money,jfw_user_info:JSON.stringify(this.credit_granting),total_credit_money:this.credit_granting.total_amount}})
                }
            },
        },
        activated(){
            phsessid();
            this.rHeadText("授信用信");
            webtitle(getStorage("source"),"授信用信");
            this.get_ready=false;
            this.judgeFn();
        },
        watch:{
        },
    }
</script>

<style scoped>

</style>