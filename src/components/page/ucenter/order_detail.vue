<template>
   <div class="order_detail" style="padding-bottom: 6rem">
       <div class="stateType clearfix">
           <div class="fl" style="width: 60%">
               <h6>{{order_details.orderStatusText}}</h6>
               <p>{{order_details!=null&&order_details!=''?order_details.hint:'' }}</p>
           </div>
           <div class="fr">
               <img v-if="order_details.orderStatusText=='待付款'" src="../../../../static/skin/default/images/card-ico.png" :onerror="onerror">
               <img v-else-if="order_details.orderStatusText=='待发货'" src="../../../../static/skin/default/images/goods-icon.png" :onerror="onerror">
               <img v-else-if="order_details.orderStatusText=='已发货'" src="../../../../static/skin/default/images/deliver-ico.png" :onerror="onerror">
               <img v-else-if="order_details.orderStatusText=='交易完成'" src="../../../../static/skin/default/images/over-ico.png" :onerror="onerror">
           </div>
       </div>
       <div class="clearfix commodity_box commodity_box_edit">
           <div class="fl commodity_list commodity_list_edit " style="width: 100%">
               <a href="javascript:;" class="fl commodity_a commodity_a_edit commodity_a_edit_address">
                   <img src="../../../../static/skin/default/images/address-ico.png">
               </a>
               <h6 class="fl commodity_h6 commodity_h6_edit">
                   <p class="fz14">{{order_details!=null&&order_details!=''?order_details.accept_name:''}}  {{order_details!=null&&order_details!=''?order_details.mobile:''}}</p>
                   <p class="gray" style="line-height: 1rem">
                       <span>{{order_details!=null&&order_details!=''?order_details.address:''}}</span>
                   </p>
               </h6>
           </div>
       </div>
       <div  class="uc_list_box uc_list_box_detail uc_list_box_detail_new">
           <div  class="clearfix commodity_box commodity_box_details">
               <div class="clearfix commodity_text">
                   <div class="fl commodity_list commodity_list_edit_width">
                       <a href="javascript:;" class="fl commodity_a">
                           <img :src="order_details.goods_list!=null&&order_details.goods_list!=''?order_details.goods_list.img:''" width="50px" height="50px" onerror=''>
                       </a>
                       <h6 class="fl commodity_h6 commodity_h6_edit_new">
                           <p class="fz14"><router-link :to="{path:'/index/products',query:{id:order_details.goods_list.goods_id}}">{{order_details.goods_list.name!=null&&order_details.goods_list.name!=''?order_details.goods_list.name:''}}</router-link></p>
                           <p v-show="order_details.goods_list.value!=''" class="gray">
                               <span>{{order_details.goods_list.value}}</span>
                           </p>
                       </h6>
                   </div>
                   <p class="fr fz14 commodity_num commodity_num_edit_new commodity_num_edit_new_width">
                       <span class="commodity_num_new_price">￥{{order_details.goods_list.goods_price}}</span>
                       <span style="display: block">× {{order_details.goods_list.goods_nums}}件</span>
                   </p>
               </div>
           </div>
           <!--<h3>共 2 件</h3>-->
           <div class="operation_box clearfix">
               <div>
                   <p class="fl pay" style="width: 100%">
                       <span><b class="color_black" v-show="order_details.payment">{{order_details.payment}}支付：</b><b v-show="!order_details.payment">应付：</b></span>
                       <span>￥{{order_details.order_amount!=null&&order_details.order_amount!=''?order_details.order_amount:''}}</span>
                       <span @click="cancellation_click(1)"  class="cancelOrderNoPay fr" v-show="order_details.can_cancel==1">取消订单</span>
                   </p>
               </div>
           </div>
           <div class="operation_box_text">
               <p class="detailed"><span class="detailedTittle">商品总价：</span>￥{{order_details.goods_list!=null&&order_details.goods_list!=''?(parseFloat(order_details.goods_list.goods_nums)*parseFloat(order_details.goods_list.goods_price)).toFixed(2):'0.00'}}</p>
               <p class="detailed"><span class="detailedTittle">运费：</span>+ ￥{{order_details.payable_freight!=null&&order_details.payable_freight!=''?order_details.payable_freight:'0.00'}}</p>
               <p class="detailed"><span class="detailedTittle">褔币抵扣：</span> - ￥{{(order_details.lucky_coin).toFixed(2)}}</p>
           </div>
           <div class="order_information">
               <p class=""><span>订单编号：</span>{{order_details!=null&&order_details!=''?order_details.order_no:''}}</p>
               <p class=""><span>下单时间：</span>{{order_details!=null&&order_details!=''?order_details.create_time:''}}</p>
               <p class=""><span>发票信息：</span>{{order_details!=null&&order_details!=''&&order_details.invoice_info!=''?order_details.invoice_info:'无'}}</p>
           </div>
       </div>
       <div class="statistics_num clearfix">
           <div @click="immediate_payment(order_details.pay_jump)" v-show="order_details.orderStatus==2"  class="settlement bgUseBtn fr">
               <a  href="javascript:;">
                   去支付
               </a>
           </div>
           <div @click="cancellation_click(1)" v-show="order_details.can_cancel==2"  class="deleteBtn  gayUseBtn fr">
               <a href="javascript:;">
                   取消订单
               </a>
           </div>
           <div @click="cancellation_click(2)" v-show="order_details.orderStatus==3||order_details.orderStatus==11"  class="deleteBtn borderUseBtn  fr">
               <a href="javascript:;">
                   确认收货
               </a>
           </div>
           <div @click="cancellation_click(5)" v-show="order_details.can_check_logistics!=0"  class="deleteBtn gayUseBtn  fr">
               <a href="javascript:;">
                   查看物流
               </a>
           </div>
           <div @click="cancellation_click(6)" v-show="order_details.Apply==true"  class="deleteBtn gayUseBtn  fr">
               <a href="javascript:;">
                   售后
               </a>
           </div>
           <div  v-show="order_details.is_comment!=0"  class="deleteBtn borderUseBtn  fr">
               <router-link v-show="order_details.is_comment" exact :to="{path:'/index/login/evaluation'}" >
                   去评价
               </router-link>
           </div>
       </div>
       <van-popup v-model="PopupState">
           <!--取消订单-->
           <div v-show="PopupStateShow==1">
               <div v-if="!needTxt">
                   <div class="purchaseTips">
                       <img src="../../../../static/skin/default/images/taiyang-ico.png">
                       <p class="textTips">宝贝儿 ~不买了么？</p>
                   </div>
                   <div class="orderToState">
                       <a href="javascript:;" @click="cancelOrder()"     class="cancelOrder">不买了</a>
                       <a href="javascript:;" @click="determineOrder()"  class="determineOrder">再想想</a>
                   </div> 
               </div>
               <!--提交理由-->
               <div v-else>
                   <div class="reasonsCancellingOrders">
                       <div class="cancellingOrders">
                           <p>
                               <img src="../../../../static/skin/default/images/dingdan-ico.png">
                           </p>
                           <h6>取消订单理由</h6>
                       </div>
                      
                       <p class="">
                           <textarea placeholder="请描述取消订单的理由..." v-model="reasonsTxt"></textarea>
                       </p>
                   </div>
                   <div class="orderToState">
                       <a href="javascript:;" @click="cancelOrderUp()"   class="cancelOrder">提交</a>
                       <a href="javascript:;" @click="determineOrder()"  class="determineOrder">再想想</a>
                   </div>
               </div>
           </div>
           <!--确认收货-->
           <div v-show="PopupStateShow==2">
               <div class="purchaseTips">
                   <img src="../../../../static/skin/default/images/ReceivingGoods-icon.png">
                   <p class="textTips">宝贝儿 ~收到货了吧？</p>
               </div>
               <div class="orderToState">
                   <a href="javascript:;"   @click="determineOrder()"    class="cancelOrder">没影呢</a>
                   <a href="javascript:;"   @click="confirmReceipt()"    class="determineOrder">收到了</a>
               </div>
           </div>
           <!--物流信息-->
           <div  v-show="PopupStateShow==5" class="purchaseTips purchaseTipsExpress purchaseTipsExpressEdit">
               <i class="closeTipsExpress" @click="PopupState=false">
                   
               </i>
               <div class="logisticsInformation">
                   <p>
                       <span>物流公司：</span>
                       <span>{{order_details.freight_name}}</span>
                   </p>
                   <p>
                       <span>物流单号：</span>
                       <span>{{order_details.delivery_code}}</span>
                   </p>
               </div>
               <div class="logisticsInformationBox">
                   <div class="logisticsInformationMin">
                       <van-steps direction="vertical" :active="0">
                           <van-step v-for="(item ,index) in LogisticsInformation">
                               <h3>{{item.AcceptStation}}</h3>
                               <p>{{item.AcceptTime}}</p>
                           </van-step>
                       </van-steps>
                   </div>
               </div>
           </div>
           <!--申请售后-->
           <div v-show="PopupStateShow==6" class="purchaseTips">
               <h6 class="purchaseAfterSaleTittle">请选择售后服务</h6>
               <div class="purchaseAfterSale">
                   <a href="javascript:;"  class="afterSale exchangeGoods" :class="{'returnGoods':order_details.is_exchange!=1}"  @click="changeGoodsTo('replace')">换货</a>
                   <a href="javascript:;"  class="afterSale exchangeGoods" :class="{'returnGoods':order_details.is_return!=1}"    @click="changeGoodsTo('refund')">退货</a>
                   <a href="javascript:;"  class="afterSale thinkAgain"     @click="determineOrder()">再想想</a>
               </div>
           </div>
       </van-popup>
   </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { login } from "../../../api/simple/index"; //登录
    import { url,phsessid,webtitle } from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    import { Popup ,Toast ,Tab, Tabs,NoticeBar,Icon ,Dialog,Step, Steps  } from 'vant';
    export default {
        name: "order_detail",
        components:{},
        data(){
            return{
                onerror:'this.src="' +"./static/skin/default/images/img_default.png"+ '"',//默认图片
                id:"",                      //用户id
                order_details:{},           //订单详情
                PopupState:false,           //弹窗确认状态
                PopupStateShow:"1",         //显示弹窗
                needTxt:false,              //是否需要填写取消订单理由
                reasonsTxt:"",              //需要填写理由文字 
                LogisticsInformation:[],    //物流信息
                delivery_id:"",             //配货单id
            }
        },
        computed:{},
        mounted(){
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
                rbottomSelection: "BOTTOMSELECTION", //底部信息
            }), //向vuex存入数据；
            /**订单详情**/
            registerFn(flag) {
                this.id=this.$route.query.id;
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=order_detail&parm%5Bid%5D="+this.id+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=order_detail&time="+time+"&rand="+rand+"&parm[id]="+this.id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.status==200){
                           _this.order_details=res.data.data;
                           _this.delivery_id=res.data.data.delivery_id;
                        }else if(res.data.code!=1){
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**立即付款**/
            immediate_payment(e){
                window.location.href ='http://'+ e
            },
            /**点击确认 取消**/
            cancellation_click(type){
                if(type==5){
                    this.LogisticsInformationQuery();//物流信息
                    return
                }
                this.PopupState=true;
                this.PopupStateShow=type;
            },
            /**订单取消**/
            cancellation_order(type,txt){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=order_status&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="";
                if(type==1){
                     parm="method=order_status&time="+time+"&rand="+rand+"&op="+type+"&order_id="+this.id+"&cancel_content="+txt+"&sign="+sign;
                }else if(type==2) {
                     parm="method=order_status&time="+time+"&rand="+rand+"&op="+type+"&order_id="+this.id+"&sign="+sign;
                }
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                            Toast(res.data.msg);
                            window.location.reload()
                        }else if(res.data.status!=1){
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**取消订单**/
            cancelOrder(){
                if(this.order_details.can_cancel==2){
                    this.needTxt=true;
                }else {
                    this.cancellation_order(1,"");//未付款取消订单 
                }
                
            },
            /**取消订单确认**/
            cancelOrderUp(){
                if(this.reasonsTxt==""){
                    Toast("取消理由不能为空~");
                    return
                }
                this.cancellation_order(1,this.reasonsTxt);//已付款取消订单 
            },
            /**确认收货**/
            confirmReceipt(){
                this.cancellation_order(2)
            },
            /**暂不取消**/
            determineOrder(){
                this.PopupState=false;
                this.needTxt=false;
            },
            /**物流信息查询**/
            LogisticsInformationQuery(){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=get_freight&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=get_freight&time="+time+"&rand="+rand+"&id="+this.delivery_id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                            _this.LogisticsInformation=res.data.data.reverse();
                            _this.PopupState=true;
                            _this.PopupStateShow=5;
                        }else if(res.data.status!=1){
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**退货换货**/
            changeGoodsTo(type){
                if(type=="replace"){
                    if(this.order_details.is_exchange==1){
                        this.$router.push({path:'/index/login/refunds_edit',query:{ id:this.id,type:type}});
                    }else{
                        Toast("商品状态不支持换货~")
                    }
                }else if(type=="refund"){
                    if(this.order_details.is_return==1){
                        this.$router.push({path:'/index/login/refunds_edit',query:{ id:this.id,type:type}});
                    }else{
                        Toast("商品状态不支持退货~")
                    }
                }
            }
        },
        activated() {
            phsessid();
            this.rHeadText("订单详情");
            webtitle(getStorage("source"),"订单详情");
            this.id=this.$route.query.id;
            this.registerFn();
            this.rbottomSelection(3);
            setTimeout(function () {
                if(getStorage("source") == 'ios'&&getStorage("version") == 'null'){
                    $("#showpage").css("marginBottom","6rem");
                    $(".statistics_num").css("bottom","6rem");
                }else {
                    $("#showpage").css("marginBottom","0");
                    $(".statistics_num").css("bottom","0");
                }
            },400)
        },
        watch:{
            $route:"registerFn"
        },
    }
</script>

<style scoped>

</style>