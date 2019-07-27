<template>
    <div>

        <div class="user_top">
            <div class="setUp-dialogue">
                <i @click="toPayPop=true" class="fr setUp-ico" ></i>
            </div>
            <div>
                 <span> 
                    <img id="user_ico_img" :src="head_ico==''?'../../../../static/skin/default/images/user_ico.gif':head_ico" width="100" height="100" /> <!--</a>-->
                 </span>
                 <div class="user_info">
                    <ul>
                        <li v-if="is_login" class="u1">{{username}}</li>
                        <router-link tag="li" exact :to="{path:'/index/login_new'}" v-else class="u1">未登录</router-link>
                        <li class="fb">
                            <router-link class="fl" tag="p" exact :to="{path:'/index/login/fbPage'}">
                                <i class="fl fb-ico"></i>
                                <span>福币：</span>
                                <span>{{is_login?fbsum:"0"}}</span>
                            </router-link>
                            <span class="fl" @click="titleTxtClick()">
                                <img class="titleTxt" src="../../../../static/skin/default/images/way.png" title="福币，仅用于平台购物时抵扣现金，减少订单应付金额。500福币抵扣1元。不支持分期支付。提交订单即使用，订单支付失败或取消，不退还已用福币。">
                        </span>
                            <van-popup v-model="fbTitle">福币，仅用于平台购物时抵扣现金，减少订单应付金额。500福币抵扣1元。不支持分期支付。提交订单即使用，订单支付失败或取消，不退还已用福币。</van-popup>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="user_top_overdue clearfix">
                <i class="fl user_top_repayment_ico" :class="{'user_top_overdue_ico':RepaymentData.overdue!=0}"></i>
                <router-link tag="p" class="fl" v-if="RepaymentData.overdue==0" exact :to="{path:'/index/login/drepayments'}">我要还款</router-link>
                <router-link tag="p" class="fl" v-else exact :to="{path:'/index/login/drepayments'}"  >您已逾期</router-link>
            </div>
        </div>
        <div class="quota_content">
            <div class="quota_nav_content">
                <div style="display: block" id="quota_title" class="quota_title">
                    <div  class="clear quota_nav_text">
                        <div class="quota_nav_state quota_nav_state_edit fl">
                            <div>
                                <span class="small-size">授信额度</span>
                                <b><span class="sm-symbol"></span><span>{{total_amount}}</span></b>
                            </div>
                            <div>
                                <span class="small-size">本月待还</span>
                                <b class="quota_nav_red"><span class="sm-symbol"></span><span>{{RepaymentData.repay_amount}}</span></b>
                            </div>
                        </div>
                        <div class="quota_nav_state quota_nav_state_edit fl">
                            <div>
                                <span class="small-size small-size-edit">可用额度</span>
                                <b><span class="sm-symbol"></span><span>{{now_amount}}</span></b>
                            </div>
                            <div>
                                <span  class="small-size small-size-edit">全部待还</span>
                                <b class="quota_nav_red"><span class="sm-symbol"></span><span>{{RepaymentData.all_repay_amount}}</span></b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="myOrder">
                <h6 class="clearfix myOrderH6">
                    <span class="fl myOrderSpan">我的订单</span>
                    <router-link tag="p" exact :to="{path:'/index/login/order',query:{state:0}}" class="fr">
                        <span class="fl">查看全部订单</span>
                        <i class="fr"></i>
                    </router-link>
                </h6>
                <ul class="myOrderUl">
                    <router-link tag="li" exact :to="{path:'/index/login/order',query:{state:1}}">
                        <p>
                            <img src="../../../../static/skin/default/images/pendingPayment.png">
                        </p>
                        <span>待付款</span>
                    </router-link>
                    <router-link tag="li" exact :to="{path:'/index/login/order',query:{state:2}}">
                        <p>
                            <img src="../../../../static/skin/default/images/shipped.png">
                        </p>
                        <span>待发货</span>
                    </router-link>
                    <router-link tag="li" exact :to="{path:'/index/login/order',query:{state:3}}">
                        <p>
                            <img src="../../../../static/skin/default/images/isShipped.png">
                        </p>
                        <span>已发货</span>
                    </router-link>
                    <router-link tag="li" exact :to="{path:'/index/login/evaluation'}">
                        <p>
                            <img src="../../../../static/skin/default/images/evaluate.png">
                        </p>
                        <span>评价</span>
                    </router-link>
                    <router-link tag="li" exact :to="{path:'/index/login/afterSale',query:{state:0}}">
                        <p>
                            <img src="../../../../static/skin/default/images/afterSale.png">
                        </p>
                        <span>退款/售后</span>
                    </router-link>
                </ul>
            </div>
        </div>
        <div class="moreServices">
            <div class="moreServicesBox">
                <h6 class="moreServicesH6">
                    <span class="moreServicesSpan">更多服务</span>
                </h6>
                <ul class="moreServicesUl">
                    <router-link tag="li" exact :to="{path:'/index/login/award_credit'}">
                        <p>
                            <img src="../../../../static/skin/default/images/creditRating-ico.png">
                        </p>
                        <span>授信提额</span>
                    </router-link>
                    <router-link tag="li"  exact :to="{path:'/index/login/drepayments'}">
                        <p>
                            <img src="../../../../static/skin/default/images/pendingRepayment-ico.png">
                        </p>
                        <span>待还款</span>
                    </router-link>
                    <router-link tag="li" exact :to="{path:'/index/login/payment_history'}">
                        <p>
                            <img src="../../../../static/skin/default/images/paymentHistory-ico.png">
                        </p>
                        <span>还款记录</span>
                    </router-link>
                    <router-link tag="li" exact :to="{path:'/index/login/fbPage'}">
                        <p>
                            <img src="../../../../static/skin/default/images/recharge-ico.png">
                        </p>
                        <span>我的褔币</span>
                    </router-link>
                    <router-link tag="li" exact :to="{path:'/index/login/receivin_address'}">
                        <p>
                            <img src="../../../../static/skin/default/images/receivingAddress-ico.png">
                        </p>
                        <span>收货地址</span>
                    </router-link>
                    <router-link tag="li" exact :to="{path:'/index/login/password'}">
                        <p>
                            <img src="../../../../static/skin/default/images/changePassword-ico.png">
                        </p>
                        <span>修改密码</span>
                    </router-link>
                    <router-link tag="li" exact :to="{path:'/index/login/notice'}">
                        <p>
                            <img src="../../../../static/skin/default/images/websiteAnnouncement-ico.png">
                        </p>
                        <span>网站公告</span>
                    </router-link>
                    <router-link tag="li" exact :to="{path:'/index/login/help_list'}">
                        <p>
                            <img src="../../../../static/skin/default/images/helpCenter-ico.png">
                        </p>
                        <span>帮助中心</span>
                    </router-link>
                </ul>
            </div>
        </div>
        <div class="recommendBox">
            <h6>为您推荐</h6>
            <div class="scroll_hot scroll_hot_edit guessRecommend">
                <div  class="bd">
                    <ul  class="new_products_ul">
                        <li v-for="(item,index) in rost_projects"  class="" :key="index">
                            <router-link exact :to="{path:'/index/products',query:{id:item.id}}">
                                <img  :src="item.img" :onerror="onerror">
                            </router-link>
                            <div  class="commodity_description">
                            <p  class="trade_name">{{item.name.length>16?item.name.substring(0,16)+"...":item.name}}</p>
                            <span  class="present_price">￥{{item.sell_price}}</span></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--基本资料修改-->
        <div class="pay_box">
            <van-popup v-model="toPayPop" position="right" :overlay="false">
                <van-nav-bar
                    title="个人资料"
                    left-text="返回"
                    left-arrow
                    @click-left="toPayPop=false"

                />
                <div>
                    <van-cell-group>
                        <van-cell title="头像" value="">
                            <img id="user_ico_img" :src="is_login?(head_ico==''?'../../../../static/skin/default/images/user_ico.gif':head_ico):''" :onerror="onerror" width="40" height="40">
                        </van-cell>
                        <van-cell title="褔币" value="" >{{is_login?fbsum:"0"}}</van-cell>
                        <van-cell title="手机号" value="" >{{is_login?phone:""}}</van-cell>
                        <van-cell title="修改密码" value="密码长度为6~16，数字，字母组合" @click="editPassword()" is-link></van-cell>
                    </van-cell-group>
                    <div v-if="is_login" @click="signOutClick()" class="logoutApp">
                        <p>退出登录</p>
                    </div>
                    <div v-else @click="signInClick()" class="logoutApp">
                        <p>去登陆</p>
                    </div>
                </div>
            </van-popup>
        </div>
        <div id="m-toast-pop" class="m-toast-pop">
            <div class="m-toast-inner">
                <div class="m-toast-inner-text" id="m-toast-inner-text">复制成功</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import {getStorage, setStorage,removeStore} from 'src/common/mUtils'
    import { url,phsessid,webtitle,login } from "../../../api/simple/index"; //url
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    import { Popup ,Toast ,Dialog  } from 'vant';
    let Base64 = require('js-base64').Base64;
    export default {
        name: "index",
        components:{},
        data(){
            return{
                onerror:'this.src="' +"../../../../static/skin/default/images/img_default.png"+ '"',//默认图片
                isShow:false,
                fbTitle:false,
                toPayPop:false,
                is_login:"",//判断是否登陆了非空是登陆了 空是未登陆
                username:"",//用户名
                phone:"",//手机号
                fbsum:0,//褔币数目
                head_ico:"",//头像
                balance:"",//金额
                total_amount:"",//总额度
                point:"",//积分
                now_amount:"",//可用额度
                repayment:"",//还款
                withdraw:"",//我的提现
                msgNum:"",//站内信
                RepaymentData:{
                    all_repay_amount: "",//全部代还
                    overdue: "0",//是否逾期
                    repay_amount: ""//本月待还
                },
                judge_whether:"",//判断是否授信过
                credit_granting:{},//授信情况
                rost_projects:[],//推荐商品
            }
        },
        computed:{ 
                     ...mapGetters("common", ["isEquipment"]) //按钮刷新；
                  },
        mounted(){},
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //头部信息
                rbottomSelection: "BOTTOMSELECTION", //底部信息
            }), //向vuex存入左侧数字数据；
            /**点击提示问号**/
            titleTxtClick(){
                this.fbTitle=true;
            },
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
                    }else if(res.data.data.code==0){
                        this.judge_whether=0;
                    }
                }).catch(err=>{})
            },
            /**router切换**/
            toggle_links(state){
                if(state==0){
                    return {path:'/index/login/raise_amount'}
                }else if(state==1) {
                    return {path:'/index/login/raise_amount_to',query:{credit_money:this.credit_granting.credit_money,jfw_user_info:JSON.stringify(this.credit_granting),total_credit_money:this.credit_granting.total_amount}}
                }else{
                    return {path:'/index/login/memberCenter'}
                }
            },
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
            /**登录**/
            loginFn(flag) {
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=detailedness&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm={
                    method:"detailedness",
                    rand:rand,
                    time:time,
                    sign:sign
                };
                login(parm).then(res=>{
                    if(res.data.code==1){
                        if(res.data.value.islogin==1){
                            this.username=res.data.value.RepaymentData.username==null?"":res.data.value.RepaymentData.username;
                            this.phone=res.data.value.RepaymentData.phone==null?"":res.data.value.RepaymentData.phone;
                            this.fbsum=res.data.value.RepaymentData.lucky_coin==null?"":res.data.value.RepaymentData.lucky_coin;
                            this.head_ico=res.data.value.RepaymentData.head_ico==null?"":res.data.value.RepaymentData.head_ico;
                            this.balance=res.data.value.balance==null?"":res.data.value.balance;
                            this.total_amount=res.data.value.RepaymentData.total_amount.money==null?"":res.data.value.RepaymentData.total_amount.money;
                            this.now_amount=res.data.value.RepaymentData.now_amount.money==null?"":res.data.value.RepaymentData.now_amount.money;
                            this.repayment=res.data.value.RepaymentData.repayment==null?"":res.data.value.RepaymentData.repayment;
                            this.msgNum=res.data.value.msgNum==null?"":res.data.value.msgNum;
                            this.withdraw=res.data.value.RepaymentData.withdraw==null?"":res.data.value.RepaymentData.withdraw;
                            this.RepaymentData.all_repay_amount=res.data.value.RepaymentData.all_repay_amount.money==null?"0.00":res.data.value.RepaymentData.all_repay_amount.money;
                            this.RepaymentData.overdue=res.data.value.RepaymentData.overdue==null?"":res.data.value.RepaymentData.overdue;
                            this.RepaymentData.repay_amount=res.data.value.RepaymentData.repay_amount.money==null?"0.00":res.data.value.RepaymentData.repay_amount.money;
                        }else{
                            removeStore("session_id");
                            this.is_login=getStorage("session_id");
                            if(!getStorage("session_id")){
                                Dialog.confirm({
                                    message: '亲~您未登录，去登陆？'
                                }).then(() => {
                                    this.$router.push({path: '/index/login_new'});//返回登录
                                }).catch(() => {});
                            }
                            this.username="用户";
                            this.head_ico="../../../../static/skin/default/images/user_ico.gif";
                            this.balance=0.00;
                            this.total_amount=0.00;
                            this.now_amount=0.00;
                            this.repayment=0.00;
                            this.withdraw="";
                            this.RepaymentData.all_repay_amount=0.00;
                            this.RepaymentData.overdue=0.00;
                            this.RepaymentData.repay_amount=0.00;
                        }
                    }else {}
                }).catch(err=>{})
            },
            /**退出登录**/
            signOutClick(){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=login_out&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=login_out&time="+time+"&rand="+rand+"&sign="+sign;
                Dialog.confirm({
                    message: '亲，是否退出登录？'
                }).then(() => {
                    axios.get(url+parm)
                        .then(function (res) {
                            if(res.data.code==1){
                               _this.$router.push("/index/login_new");
                               _this.clearCookie("session_id");
                            }else if(res.data.code!=1){}
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }).catch(() => {
                    // on cancel
                });
            },
            /**去登陆**/
            signInClick(){
                this.$router.push("/index/login_new");
            },
            /**点击授信提额**/
            upgradeLimitClick(){},
            /**修改密码**/
            editPassword(){
                this.$router.push({path:'/index/login/password'});
            },
            /**为您推荐**/
            rost_project(){
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=rost_project&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm={
                    method:"rost_project",
                    rand:rand,
                    time:time,
                    sign:sign
                };
                login(parm).then(res=>{
                    if(res.data.code==1){
                        this.rost_projects=res.data.value;
                    }
                }).catch(err=>{})
            },
        },
        activated(){
            phsessid();
            this.judgeFn();
            this.rHeadText("用户中心");
            webtitle(getStorage("source"),"用户中心");
            this.loginFn();
            this.rost_project();
            this.rbottomSelection(3);
            this.is_login=getStorage("session_id");
        },
        watch:{
        },
    }
</script>
<link rel="stylesheet" href="//apps.bdimg.com/libs/jqueryui/1.10.4/css/jquery-ui.min.css">
<style scoped>
    .page-index {
        background: #f8f8f8;
    }
    .user_menu_list {
        background: #f8f8f8;
    }
    .footer{
        width:0%;
    }
    body {
        background: #f8f8f8;
    }
</style>