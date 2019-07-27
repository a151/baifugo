<template>
    <div class="bg_purchase bg_purchase_edit">
        <div class="history_pd">
            <div  class="history_box">
                <p><span>分期订单号</span><span>{{record_list==null||record_list==''?'':record_list.stage_no==0?record_list.order_id:record_list.stage_no}}</span></p>
                <!--<p><span>订单状态</span><span>{{record_list==null||record_list==''?'':record_list.stage_status}}</span></p>-->
                <p><span>期数</span><span>{{record_list==null||record_list==''?'':record_list.stage}}</span></p>
                <p><span>计划还款日</span><span>{{record_list==null||record_list==''?'':record_list.repayment_date}}</span></p>
                <p><span>还款金额</span><span>{{record_list==null||record_list==''?'':record_list.repay_amount}}</span></p>
                <p><span>本金</span><span>{{record_list==null||record_list==''?'':record_list.ordert_amount}}</span></p>
                <p><span>服务费</span><span>{{record_list==null||record_list==''?'':record_list.service_amount}}</span></p>
                <p><span>逾期罚息</span><span>{{record_list==null||record_list==''?'':record_list.late_charge}}</span></p>
                <p><span>逾期天数</span><span>{{record_list==null||record_list==''?'':record_list.over_days}}</span></p>
                <p><span>还款状态</span><span>{{record_list==null||record_list==''?'':record_list.status}}</span></p>
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
        name: "payment_history",
        components:{},
        data(){
            return{
                id:"",//id
                record_list:[],//还款记录
            }
        },
        computed:{},
        mounted(){
           
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入左侧数字数据；
          
            /**还款记录详情**/
            loginFn(flag) {
                this.id=this.$route.query.id;//订单单号
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=repayment_detail&parm%5Bid%5D="+this.id+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=repayment_detail&time="+time+"&rand="+rand+"&parm[id]="+this.id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.status==200){
                            _this.record_list=res.data;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
        },
        activated(){
            phsessid();
            this.rHeadText("还款详情");
            webtitle(getStorage("source"),"还款详情");
            this.loginFn();
        },
        watch:{
            $route:'loginFn',
        },
    }
</script>

<style scoped>
  .bg_purchase_edit{ }
</style>