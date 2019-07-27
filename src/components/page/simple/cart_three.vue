<template>
    <div class="body_page_box body_page_box_cart_three">
        <div class="alertBox alertBoxGo">
            <p class="alertBoxContent">
                <strong v-show="payInforData.final_sum!=0" style="font-size:14px;">{{payInforData.payment=="分期支付"?"恭喜，已购买成功！":"恭喜，已成功提交订单！"}}</strong><br/>
                <strong v-show="payInforData.final_sum==0" style="font-size:14px;">{{payInforData.final_sum=="0"?"订单确认成功，等待发货！":"恭喜，已成功提交订单！"}}</strong><br/>
                订单编号：{{payInforData.order_no}}
            </p>
        </div>
        <div class="list-group">
            <div class="list-group-item">订单金额：{{payInforData.final_sum}}元</div>
            <div class="list-group-item">备货时间：{{payInforData.stockup_time}}天</div>
            <div v-show="payInforData.final_sum!=0" class="list-group-item">支付方式：{{payInforData.payment}}</div>
            <div class="list-group-item">配送方式：{{payInforData.delivery}}</div>
        </div>
        <div class="list-group">
            <div class="list-group-item">收货人名：{{payInforData.accept_name}}</div>
            <div class="list-group-item">联系方式：{{payInforData.mobile}}</div>
            <div class="list-group-item">收货时间：{{payInforData.accept_time}}</div>
            <div v-show="payInforData.tax_title!=''" class="list-group-item">发票抬头：{{payInforData.tax_title}}</div>
        </div>

        <!--不是货到付款并且支付方式为线上支付-->
            <div v-show="payInforData.payment!='分期支付'&&payInforData.final_sum!=0" class="form-group has-feedback">
                <input class="btn btn-warning btn-lg btn-block" type="submit" @click="payFn" value="立即支付" />
            </div>
            <div v-show="payInforData.payment=='分期支付'" class="bg_purchase_edit">
                <a  @click="pathTo(0)"  class="success_ins_to">再去逛逛</a>
                <a  @click="pathTo(1)"  class="success_ins_del">查看订单</a>
            </div>
        <!--{/if}-->
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { Popup ,Toast ,AddressEdit,AddressList ,NavBar,Area ,Dialog  } from 'vant';
    import { login ,receivingA} from "../../../api/simple/index"; //登录
    import { url,phsessid ,webtitle,getUrls} from "../../../api/simple/index";              //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    let Base64 = require('js-base64').Base64;
    import axios from 'axios';
    export default {
        name: "cart_three",
        components:{},
        data(){ return{
            payInforData:{},
        }},
        computed:{ 
            ...mapGetters("common", ["payInfor"]) //按钮刷新；
             },
        mounted(){
       
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
                // rbottomSelection: "BOTTOMSELECTION", //底部信息
            }), //向vuex存入数据；
            /**商品列表**/
            payFn(){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=pay&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=pay&time="+time+"&rand="+rand+"&order_id="+this.payInforData.order_id+"&payment_id="+this.payInforData.paymentType+"&sign="+sign;
                window.location.href=url+parm;
                setTimeout(function () {
                    Dialog.confirm({
                        title: '支付',
                        message: '是否支付成功？'
                    }).then(() => {
                       
                    }).catch(() => {
                        // on cancel
                    });
                },500)
        
            },
            /**跳转页面**/
            pathTo(type){
                if(getStorage("source")=="ios"){
                    if(type==0){
                        window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"toHomepage"}) //返回首页
                    }else if(type==1){
                        this.$router.push({path: '/index/login/order'});//返回个人中心
                    }
                }else if(getStorage("source")=="android") {
                    if(type==0){
                        window.bsshop_android.nowbrowse();//返回首页
                    }else if(type==1){
                        this.$router.push({path: '/index/login/order'});//返回个人中心
                    }
                }else {
                    if(type==0){
                        this.$router.push({path: '/index/login/centerContent'});//返回首页
                    }else if(type==1){
                        this.$router.push({path: '/index/login/order'});//返回个人中心
                    }
                }
            },
        },
        activated(){
            phsessid();
            this.payInforData=JSON.parse(Base64.decode(this.$route.query.payInfor));
            webtitle(getStorage("source"),"购买页");
        },
        watch:{
            $route:'',
            payInfor(){
               
            }
        },
    }
</script>

<style scoped>

</style>