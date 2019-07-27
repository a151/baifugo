<template>
    <div class="bg_orders bg_orders_details_orders">
        <div class="user_top">
        </div>
        <div class="quota_content quota_content_edit quota_content_details_orders">
            <div class="quota_nav_content">
                <div style="display: block" id="quota_title" class="quota_title quota_title_edit">
                    <div class="details_order">
                        <p class="clearfix"><span>分期期数</span><span>{{list==null&&list==''?'':list.repayments_stage}}期</span></p>
                        <p class="clearfix"><span>订单创建时间</span><span>{{list==null&&list==''?'':list.create_time}}</span></p>
                        <p class="clearfix"><span>订单金额</span><span>{{list==null&&list==''?'':list.order_amount}}</span></p>
                        <p class="clearfix"><span>订单状态</span><span>{{list==null&&list==''?'':list.stage_status}}</span></p>
                        <p class="clearfix"><span>已还款金额</span><span>{{list==null&&list==''?'':list.repay_amount}} </span></p>
                        <p class="clearfix"><span>分期订单号</span><span>{{list==null&&list==''?'':list.order_id}}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="quota_content  quota_content_edit2 quota_content_details_orders">
            <div class="quota_nav_content">
                <div style="display: block" id="" class="quota_title quota_title_edit">
                    <h3 class="repayment_plan">还款计划</h3>
                    <div>
                        <ul class="stages_ul"  v-for="(item,index) in record_list">
                            <li>
                                <span>期数：</span>
                                <span>{{item==null&&list==''?'':item.stage}}</span>
                            </li>
                            <li>
                                <span>计划还款日：</span>
                                <span>{{item==null&&list==''?'':item.repayment_date}}</span>
                            </li>
                            <li>
                                <span>还款金额：</span>
                                <span>{{item==null&&list==''?'':item.repay_amount}}</span>
                            </li>
                            <li>
                                <span>本金：</span>
                                <span>{{item==null&&list==''?'':item.ordert_amount}}</span>
                            </li>
                            <li>
                                <span>服务费：</span>
                                <span>{{item==null&&list==''?'':item.service_amount}}</span>
                            </li>
                            <li>
                                <span>逾期罚息：</span>
                                <span>{{item==null&&list==''?'':item.late_charge}}</span>
                            </li>
                            <li>
                                <span>逾期天数：</span>
                                <span>{{item==null&&list==''?'':item.over_days}}</span>
                            </li>
                            <li>
                                <span>还款状态：</span>
                                <span>{{stagesFn(item.status)}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <b @click="loanContract()"  class="see_text">
            《借款合同》
        </b>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { login } from "../../../api/simple/index"; //登录
    import { url,phsessid,webtitle } from "../../../api/simple/index"; //url
    import { Popup ,Toast ,AddressEdit,AddressList ,NavBar,Area  } from 'vant';
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    export default {
        name: "details_orders",
        components:{},
        data(){
            return{
                record_list:[],//还款记录
                list:{},       //分期详情
                order_no:"",  //订单单号
                pdf:"",      //pdf协议
            }
        },
        computed:{},
        mounted(){},
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入数据；
            /**还款记录详情**/
            loginFn(flag) {
                this.order_no=this.$route.query.order_no;//订单单号
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=payment_history_detail&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=payment_history_detail&time="+time+"&rand="+rand+"&order_no="+this.order_no+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data!=null&&res.data!=''){
                            _this.record_list=res.data.data.pay_list;
                            _this.list=res.data.data.list;
                            _this.pdf=res.data.path;
                        }else {
                            _this.record_list=[];
                            _this.list={};
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**订单状态**/
            product_statusFn(type){
                if(type==1){
                    return "生成订单"
                }else if(type==2){
                    return "支付订单"
                }else if(type==3){
                    return "取消订单(客户触发)"
                }else if(type==4){
                    return "作废订单(管理员触发)"
                }else if(type==5){
                    return "完成订单"
                }else if(type==6){
                    return "退款(订单完成后)"
                }else if(type==7){
                    return "部分退款(订单完成后)"
                }
            },
            /**还款状态**/
            stagesFn(type){
                if(type==1){
                    return "待还"
                }else if(type==2){
                    return "已还"
                }else if(type==3){
                    return "已提前还"
                }else if(type==4){
                    return "取消"
                }else if(type==5){
                    return "逾期"
                }else if(type==6){
                    return "逾期已还"
                }
            },
            /**借款合同**/
            loanContract(){
                if(this.pdf!=""&&this.pdf!=undefined){
                    if(getStorage("source")=="ios"){
                        window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"loanContract",url:this.pdf});//借款协议
                    }else if(getStorage("source")=="android") {
                        window.bsshop_android.loanAgreement(this.pdf);//借款协议
                    }else {
                        window.open(this.pdf)
                    }
                }else {
                    const toast = Toast.loading({
                        duration: 0,       // 持续展示 toast
                        forbidClick: true, // 禁用背景点击
                        loadingType: 'spinner',
                        message: '生成协议中~`'
                    });
                    let second = 300;
                    const timer = setInterval(() => {
                        second--;
                        if (second) {
                            toast.message = `生成协议中~`;
                        } else {
                            clearInterval(timer);
                        }
                    }, 1000);
                    var _this=this;
                    var time=new Date().getTime();//时间戳
                    var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                    var sign=md5("method=get_pdf_path&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                    var parm="method=get_pdf_path&time="+time+"&rand="+rand+"&order_no="+this.order_no+"&sign="+sign;
                    axios.get(url+parm)
                        .then(function (res) {
                            if(res.data.status=='1'){
                                if(getStorage("source")=="ios"){
                                    window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"loanAgreement",url:res.data.data,title:"借款合同"});//借款合同
                                }else if(getStorage("source")=="android") {
                                    window.bsshop_android.loanAgreement(res.data.data);//借款合同
                                }else {
                                    window.open(res.data.data)
                                }
                                Toast.clear();
                            }else {}
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }
            }
        },
        activated(){
            phsessid();
            this.rHeadText("订单分期详情");
            webtitle(getStorage("source"),"订单分期详情");
            this.loginFn();
        },
        watch:{
            $route:'loginFn',
        },
    }
</script>

<style scoped>
    table {
        table-layout: fixed;
        border: 1px solid #ccc;
    }
    table tr td.last {
        border: none;
    }
    table tr td {
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }
    .repayment_plan{
        color: #333333;
        font-size: 1.5rem;
        line-height: 1.5rem;
    }
    .stages_ul{
        margin-top:1.5rem;
        padding: 1rem;
        border: 1px solid #ddd;
    }
</style>