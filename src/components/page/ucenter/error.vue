<template>
    <div class="ly_row bg_purchase">
        <!--<span class="ly-circle"><i class="iconfont">&#xe660;</i></span>-->
        <span class="cart-ok"><i class="iconfont_edit"></i></span>
        <h2>支付失败</h2>
        <p>请您尽快完成付款</p>
        <a @click="pathTos()" class="success_ins_del">查看订单</a>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { url,equipments,phsessid,webtitle } from "../../../api/simple/index"; //url
    import { Dialog,Search ,Popup,Swipe, SwipeItem,PullRefresh,List,Toast } from 'vant';
    import { login ,change} from "../../../api/simple/index"; //登录
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    let Base64 = require('js-base64').Base64;
    import axios from 'axios';
    export default {
        name: "error",
        components:{},
        data(){
            return{
                height:"",//顶部商品高度
                id:"",//商品id
                goods_id:"",//商品规格goods_id
                goods_num:"1",//商品加入购物车数量
                type:"",//加入类型 goods商品, product:货品;
                isShow:true,
                collection:false, //点击收藏
                introduceType:0,   //商品介绍与商品评论 
                Selected:[],             //被选中
                SelectedNum:"",         //被选中期数
                stagesNum:"0",           //分期数
                total:{
                    style:"",          //样式
                    type:"",           //类型
                    stages:"",        //分期
                },
                specJSON:[],//根据类型改变价格
                specJSON_edit:[],//根据类型改变价格
                showBase:false,       //购买层
                to_cart:false,        //购物车
                CommodityInformatio:{},//商品信息
                commodityEvaluation:[],//商品评论
                spec_array:[],//商品信息
                PriceData:{},//价格变化
                textList:[],
                textValue:[],
                screenWidth: document.body.clientWidth,

            }
        },
        computed:{
            ...mapGetters("common", ["headtext","isEquipment"])
            //按钮刷新；
        },
        mounted(){
          
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入数据；
            /**跳转页面**/
            pathTos(){
                var equipmen=equipments(this.$route.query.source);
                if(equipmen=="ios"){
                    window.bsshop_android.JumpBackPop();
                }else if(equipmen=="android") {
                    this.$router.push({path: '/index/login/order',query:{state:0}});
                }else {
                    this.$router.push({path: '/index/login/order',query:{state:0}});
                }
            },
        },
        activated(){
            phsessid();
            this.rHeadText("支付失败");
            webtitle(getStorage("source"),"支付失败");
        },
        watch:{
           
        },
    }
</script>

<style scoped>

</style>