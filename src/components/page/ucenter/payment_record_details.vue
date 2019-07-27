<template>
    <div class="bg_purchase bg_purchase_edit">
        <div class="history_pd">
            <div v-for="(item,index) in record_list" class="history_box">
                <p><span>分期订单号</span><span>{{item.order_no}}</span></p>
                <p><span>订单状态</span><span>{{item.create_time}}</span></p>
                <p><span>期数</span><span>¥{{item.order_amount}}</span></p>
                <p><span>计划还款日</span><span>¥{{item.repay_amount}}</span></p>
                <p><span>还款金额</span><span>{{item.stage_status}}</span></p>
                <p><span>本金</span><span>{{item.stage}}</span></p>
                <p><span>服务费</span><span>{{item.stage}}</span></p>
                <p><span>逾期罚息</span><span>{{item.stage}}</span></p>
                <p><span>逾期天数</span><span>{{item.stage}}</span></p>
                <p><span>还款状态</span><span>{{item.stage}}</span></p>
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
        components:{},
        data(){
            return{
                record_list:[],//还款记录
                order_no:"",//订单单号	
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
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=payment_history_detail&parm%5Border_no%5D="+this.order_no+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=payment_history_detail&time="+time+"&rand="+rand+"&parm[order_no]="+this.order_no+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                            _this.record_list=res.data.data;
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
            this.rHeadText("还款详情");
            webtitle(getStorage("source"),"还款详情");
            this.order_no=this.$route.query.order_no;//订单单号
            this.loginFn();
        },
        watch:{

        },
    }
</script>

<style scoped>
  .bg_purchase_edit{
      height: auto;
  }
</style>