<template>
     <div class="drepayments_box">
         <van-list
             v-model="loading"
             :finished="finished"
             :immediate-check="false"
             finished-text="没有更多了"
             @load="onLoad"
             :offset="1">
         <div  class="quota_nav_states quota_nav_states_drepayments">
             <p>
                 <span>本月待还：</span>
                 <b class="quota_nav_red">￥{{noLogin?(waiting_list==null||waiting_list==''?'0':waiting_list.repay_amount):"0"}}</b>
             </p>
             <p>
                 <span>全部待还：</span>
                 <b class="quota_nav_red">￥{{noLogin?(waiting_list==null||waiting_list==''?'0':waiting_list.all_repay_amount):"0"}}</b>
             </p>
             <p>
                 <span>逾期笔数：</span>
                 <b class="quota_nav_red">{{noLogin?(waiting_list==null||waiting_list==''?'0':waiting_list.overdue):"0"}}</b>
             </p>
         </div>
         <div>
             <ul class="quota_nav_btn clearfix">
                 <li @click="changeStateClick('1')"  :class="{'active':date_type=='1'}"><a href='javascript:;'>本月</a></li>
                 <li @click="changeStateClick('2')"  :class="{'active':date_type=='2'}"><a href="javascript:;">全部</a></li>
                 <li @click="changeStateClick('3')"  :class="{'active':date_type=='3'}"><a href="javascript:;">逾期</a></li>
             </ul>
         </div>
         <div v-if="noLogin" v-for="(item,index) in waitingList">
             <router-link exact :to="{path:'/index/login/remain_returned',query:{id:item.id}}">
                 <ul class="quota_nav_detailed clearfix" >
                     <li>
                         <p style="padding-right:50px;">
                             <span>分期单号</span>
                             <span>{{item==null||item==''?'':item.stage_no==0?item.order_no:item.stage_no}}</span>
                         </p>
                     </li>
                     <li>
                         <p>
                             <span>期数</span>
                             <span>{{item==null||item==''?'':item.stage}}</span>
                         </p>
                     </li>
                     <!--<li>-->
                         <!--<p style="padding-right:50px;">-->
                             <!--<span>订单状态</span>-->
                             <!--<span>{{item==null||item==''?'':item.stage_status}}</span>-->
                         <!--</p>-->
                     <!--</li>-->
                     <li>
                         <p>
                             <span>计划还款日</span>
                             <span>{{item==null||item==''?'':item.repayment_date}}</span>
                         </p>
                     </li>
                     <li>
                         <p style="padding-right:50px;">
                             <span>待还金额</span>
                             <span>{{item==null||item==''?'':item.repay_amount}}</span>
                         </p>
                     </li>
                     <li>
                         <p>
                             <span>还款状态</span>
                             <span>{{item==null||item==''?'':item.status}}</span>
                         </p>
                     </li>
                 </ul>
             </router-link>
             <div>
                 <a href="javascript:;" class="quota_nav_payback" @click="quota_nav_paybackClick(item==null||item==''?'':item.repay_amount,item.id,item.stage_no==0?item.order_no:item.stage_no,index,item.is_repay)">我要还款</a>
             </div>
         </div>
         <van-popup v-model="show">
             <h5>还款 <i class="close_pay" @click="close_payClick()"></i></h5>
             <div class="Pop_to_pay">
                 <p class="Pop_to_money">
                     <span>本期还款金额：</span>
                     <span>{{current_amount}}</span>
                 </p>
                 <div class="clearfix">
                     <p class="fl Pop_to_title ">支付方式</p>
                     <p class="fl payment_method payment_method_drepayments">
                         <label class="clearfix">
                             <input class="fl radio" name="payment" alt="0" checked="" @click="paymentSelected(9);" title="支付宝" type="radio" value="9">
                             <span  class="fl">支付宝</span>
                         </label>
                         <label class="clearfix">
                             <input class="fl radio" name="payment" alt="0" @click="paymentSelected(13);" title="微信" type="radio" value="13">
                             <span  class="fl">微信</span>
                         </label>
                     </p>
                 </div>
                
                 <div class="div-border">
                     <div>
                         <p class="Pop_to_mode">
                             <span>全部还款：</span>
                             <span>偿还当前订单的全部剩余待还金额</span>
                         </p>
                     </div>
                     <p class="Pop_to_click clearfix">
                         <a @click="payMent(1)" class="active" href="javascript:;">本月还款</a>
                         <a @click="payMent(2)" href="javascript:;">全部还款</a>
                     </p>
                 </div>
             </div>
            
         </van-popup>
       </van-list>
     </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { url,phsessid,webtitle } from "../../../api/simple/index"; //url
    import { Search ,Popup,Swipe, SwipeItem,PullRefresh,List,Toast } from 'vant';
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    export default {
        name: "drepayments",
        components:{},
        data(){
            return{
                show: false,  //是否显示弹层
                date_type:"2",//全部 ，本月，逾期
                page:"1",     //第几页
                noLogin:true,//是否登录
                waiting_list:{},//待还列表
                waitingList:[],//分期列表
                current_amount:"",
                paymentSelectedNum:"9",//支付宝与微信
                isLoading: true,
                loading: false,
                finished: false,
                repayments:"",//分期支付订单id
                order_no:"",  //分期订单号
             
            }
        },
        computed:{},
        mounted(){
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //头部信息
                rbottomSelection: "BOTTOMSELECTION", //底部信息
            }), //向vuex存入数据；
            /**是否登录**/
            isLogin(){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=is_login&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=is_login&time="+time+"&rand="+rand+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.msg=="未登录"){
                            _this.noLogin=false;
                            _this.finished=true;
                            _this.loading=false;
                        }else {
                            _this.noLogin=true;
                            _this.finished=false;
                            _this.loading=true;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                /*去登陆*/
            },
            /**切换状态**/
            changeStateClick(type){
                setStorage("state",type);
                this.finished=false;
                this.page=1;
                this.waitingList=[];
                this.date_type=type;
                this.loginFn(type,this.page);
            },
            /**我要还款**/
            quota_nav_paybackClick(type,id,order_no,index,is_repay){
                if(!is_repay){
                    Toast("请按顺序还款！");
                    return
                }
                this.show=true;
                this.current_amount=type;
                this.repayments=id;
                this.order_no=order_no;
            },
            /**关闭弹层**/
            close_payClick(){
                this.show=false;
            },
            /**还款记录**/
            loginFn(date_type,page) {
                this.loading=true;
                this.id=this.$route.query.id;
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=drepayments&parm%5Bdate_type%5D="+date_type+"&parm%5Bpage%5D="+page+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=drepayments&time="+time+"&rand="+rand+"&parm[date_type]="+date_type+"&parm[page]="+page+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        console.log('res',res)
                        if(res.data.status==1){
                            _this.waiting_list=res.data;
                            for(var i=0;i<res.data.data.length;i++){
                                _this.waitingList.push(res.data.data[i]);
                            }
                            _this.loading=false;
                            if(res.data.data.length==0){
                                _this.finished=true;
                            }
                        }else {
                            Toast(res.data.data.msg);
                            _this.finished=true;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        
                    });
            },
            /**还款选项**/
            paymentSelected(num){
                this.paymentSelectedNum=num;
            },
            /**下滑加载**/
            onLoad() {
                var _this=this;
                //异步更新数据
                setTimeout(() => {
                    // 加载状态结束
                    _this.page++;
                    _this.loginFn(_this.date_type,_this.page);
                   
                }, 400);
            },
            /**支付还款**/
            payMent(type){
                var repayments="";
                if(type==1){
                    repayments=this.repayments;
                }else if(type==2){
                    repayments=this.order_no;
                }
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=pay&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=pay&time="+time+"&rand="+rand+"&repayments="+repayments+"&payment_id="+this.paymentSelectedNum+"&type="+type+"&sign="+sign;
                window.location.href=url+parm
            }
        },
        activated(){
            phsessid();
            this.waitingList=[];
            this.rHeadText("待还款");
            webtitle(getStorage("source"),"待还款");
            this.rbottomSelection(3);
            this.isLogin();
            if(getStorage("state")==''||getStorage("state")==null||getStorage("state")==undefined){
                this.date_type=2;
            }else {
                this.date_type=getStorage("state");
            }
            this.loginFn(this.date_type,1);
        },
        watch:{
        },
    }
</script>
<style>
    .quota_nav_states{
        padding-left: 30px;
        padding-top: 20px;
    }
    .quota_nav_btn{
        width: 80%;
        margin: 10px auto 10px;
    }
    .quota_nav_btn li{
        float: left;
        width: 32%;
        line-height: 30px;
       
        background: #fff;
        border: 1px solid #FF4A36;
    }
    .quota_nav_btn .active{
        background: #FF4A36;
        color: #fff;
    }
    .quota_nav_btn .active a{
        color: #fff;
    }
    .quota_nav_btn li a{
        display: block;
        width: 100%;
        text-align: center;
        color: #FF4A36;
        line-height: 30px;
    }
    .quota_nav_detailed{
        padding-left: 3rem;
        box-sizing: border-box;
    }
    .quota_nav_detailed li p span{
        display: inline-block;
    }
    .quota_nav_detailed li{
        float: left;
    }
    .quota_nav_detailed li p span{
        line-height: 30px;
    }
    .quota_nav_detailed li p span:first-of-type{
        width: 6.5rem;
    }
   .van-list  .quota_nav_payback{
        display: block;
        width: 84%;
        margin: 20px auto;
        line-height: 2.4rem;
        color: #fff;
        border-radius: 2rem;
        text-align: center;
       background: linear-gradient(270deg, #FC872F 0%,  #FF4A36 100%);
    }
    .van-popup{
        width: 90%;
    }
    .Pop_to_pay{
        padding:1rem;
    }
    .drepayments_box .van-popup h5{
        position: relative;
        line-height: 3.5rem;
        text-align: center;
        background: #F8F8F8;
        font-size: 1.4rem;
    }
    .Pop_to_money{
        line-height: 3rem;
    }
    .Pop_to_title{
        padding-bottom: 2rem;
    }
    .Pop_to_mode{
        color: red;
        text-align: center;
        margin-bottom: 1rem;
    }
    .Pop_to_click{
        text-align: center;
        margin: 0 auto 1rem;
    }
    .Pop_to_click a{
        display: inline-block;
        /*float: left;*/
        height: 2.8rem;
        line-height: 2.8rem;
        margin: 0.5rem 0.5rem 0;
        padding: 0 1.5rem;
        border: 1px solid #333;
        background-color: #fff;
        color: #333;
        border-radius: 2px;
        font-weight: 400;
        cursor: pointer;
        text-decoration: none;
    }
    .Pop_to_click a.active{
        background: linear-gradient(270deg, #FC872F 0%,  #FF4A36 100%);
        color: #fff;
        border: none;
    }
    .close_pay{
        display: block;
        position: absolute;
        right: 1.5rem;
        top: 1.2rem;
        width: 1.2rem;
        height: 1.2rem;
        background: url("../../../../static/skin/default/images/close.png");
        background-size: 100% 100%;
        cursor: pointer;
    }
    .quota_nav_states_drepayments .van-popup{
        border-radius: 2.4rem;
    }
    .div-border{
        border-top: 1px solid #dedede;
        padding-top: 1rem;
    }
</style>