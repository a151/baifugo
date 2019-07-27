<template>
    <div v-cloak>
        <div  class="body_page_box body_page_box-cart" style="padding-bottom: 8rem">
            <div  v-show="shopping_information.goodsList!=null&&shopping_information.goodsList!=''&&shopping_information.goodsList.length>0" class="overEdit clearfix">
                <a class="fr" @click="editClick()" href="javascript:;">{{deleteGoods?"完成":"编辑"}}</a>
            </div>
            <div v-if="shopping_information.goodsList!=null&&shopping_information.goodsList!=''&&shopping_information.goodsList.length>0">
                <div v-for="(item,index) in shopping_information.goodsList" :key="index" class="list-group list-group-cart">
                    <div class="list-group-item">
                        <div class="media">
                            <div class="div-changetable">
                                <div @click="toggle(index)" class="van-checkbox__icon van-checkbox__icon--round" :class="{'van-checkbox__icon--checked':pitch_on[index]}">
                                    <i class="van-icon van-icon-success" style=""></i>
                                </div>
                            </div>
                            <div class="media-left media-middle"><img class="lazyload" :src="item!=''&&item!=null?item.img:''" /></div>
                            <div class="media-body">
                                <h4  class="media-heading" @click="toBuy(item.goods_id)"><span>{{item.name}}</span></h4>
                                <p style="color:#999; padding-bottom:5px;">赠送积分：{{item.point}}</p>
                                <div class="clearfix">
                                    <div class="lyred fl" style="padding-bottom:10px;margin-right:2rem;">小计：<b id="">￥{{(total_price[index]) != null&&(total_price[index]) != ''&&(total_price[index]) != 0?(total_price[index]).toFixed(2):0.00}}</b></div>
                                    <div class="pull-left fr" style="width:90px;margin-top: -0.4rem">
                                        <div class="input-group input-group-sm">
                                            <span class="input-group-addon"><a href="javascript:void(0)" @click='cart_reduce((item.goods_type=="goods"?item.goods_id:item.product_id),index,item.goods_type);'>-</a></span>
                                            <input type="number" class="form-control" style="text-align:center;" @focus="focusInp(index)"  @change='cartCount((item.goods_type=="goods"?item.goods_id:item.product_id),index,item.store_nums,item.goods_type);' v-model="goods_num[index]">
                                            <span class="input-group-addon"><a href="javascript:void(0)" @click='cart_increase((item.goods_type=="goods"?item.goods_id:item.product_id),index,item.store_nums,item.goods_type);'>+</a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="statistics_num statistics_num_cart clearfix" :style="{'bottom':bottomHeight+'rem'}">
                    <div @click="selectAll()" class="fl">
                        <div  class="van-checkbox__icon van-checkbox__icon--round " :class="{'van-checkbox__icon--checked':deleteAllClass}">
                            <i  class="van-icon van-icon-success"></i>
                        </div>
                        全选
                    </div>
                    <span v-show="deleteGoods" class="fl statistics_num_tittle">您已勾选({{pitch_on_bum}})商品</span>
                    <div @click="batchDeletion()"  v-show="deleteGoods" class="deleteBtn fr">
                        <a href="javascript:;">
                            删除
                        </a>
                    </div>
                    <div v-show="!deleteGoods"  class="settlement fr">
                        <a @click="settlementClick()" href="javascript:;">
                            去结算
                        </a>
                    </div>
                    <span v-show="!deleteGoods" class="fr total">合计：<b class="red">￥{{toAllPrices != null&&toAllPrices != ''&&toAllPrices != 0?toAllPrices.toFixed(2):0.00}}</b></span>
                </div>
            </div>
            <div v-if="showpd" class="ly_row">
                <span class="cart-ok"><i class="iconfont_edit"></i></span>
                <h2 class="y">购物车中暂无商品哦~</h2>
                <div class="form-group has-feedback">
                    <a @click="pathTo()"  class="btn b-danger btn-sm b-danger-edit" href="javascript:void(0)">再去逛逛</a>
                </div>
            </div>
            <div>
                <div  class="may_be_like">
                    <h3>您可能喜欢的商品</h3>
                </div>
                <div class="scroll_hot scroll_hot_edit">
                    <div class="bd bdEdit">
                        <ul class="new_products_ul">
                            <li v-for="(item,index) in rost_projects" :key="index">
                                <a  @click="toBuy(item.id)">
                                    <img :src="item.img" :onerror="onerror"/>
                                </a>
                                <div class="commodity_description">
                                    <p @click="toBuy(item.id)" class="trade_name">{{item.name.length>16?item.name.substring(0,16)+"...":item.name}}</p>
                                    <span class="present_price">￥{{item.sell_price}}</span>
                                    <!-- <span class="original_price">￥{{item.market_price}}</span> -->
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { login } from "../../../api/simple/index"; //登录
    import { url,urlApi,equipments,phsessid,webtitle,getUrls} from "../../../api/simple/index"; //url
    import { Popup ,Toast ,Dialog,Checkbox, CheckboxGroup,Cell,CellGroup } from 'vant';
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    let Base64 = require('js-base64').Base64;
    import axios from 'axios';
    export default {
        name: "cart",
        components:{},
        data(){
            return{
                onerror:'this.src="' +"../../../../static/skin/default/images/img_default.png"+ '"',//默认图片
                isShow:true,
                headShow:true,//是否显示
                pitch_on:[],//选中商品
                pitch_on_bum:0,//勾选的数量
                shopping_information:{},//购物车信息
                goods_num:[],//商品数量
                goods_unit_price:[],//商品单价
                toAllPrices:0,//商品总价
                dif_value:0, 
                total_price:[],//单个总价
                json_toBuy:{
                    id:[],      //商品id 或 货品id	
                    type:[],   //类型,如果有货品id则传product否则传goods
                    buy_num:[],//购买数量
                },
                noShow:[],//不显示商品id与货品id
                equipmentType:"",//什么设备
                showpd:false,
                deleteGoods:false,//是否编辑购物车
                deleteAll:false,//全选
                deleteAllClass:false,//全选
                product_id:[],//批量删除
                rost_projects:[],//推荐商品
                bottomHeight:"4",//底部悬浮的高度
                lineHeight:"6",//顶部高度
            }
        },
        computed:{
             ...mapGetters("common", ["equipment"]), //按钮刷新；
             myValue() {
                return this.$store.state.equipment
            }
            },
        mounted(){},
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //头部信息
                rbottomSelection: "BOTTOMSELECTION", //底部信息
            }), //向vuex存入数据；
            //获取cookie
            getCookie(cname) {
                    var arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
                    if (arr = document.cookie.match(reg))
                        return (arr[2]);
                    else
                        return null;
                },
            /**UTF-8**/
            encodeUtf8(text) {
                const code = encodeURIComponent(text);
                const bytes = [];
                for (var i = 0; i < code.length; i++) {
                    const c = code.charAt(i);
                    if (c === '%') {
                        const hex = code.charAt(i + 1) + code.charAt(i + 2);
                        const hexVal = parseInt(hex, 16);
                        bytes.push(hexVal);
                        i += 2;
                    } else bytes.push(c.charCodeAt(0));
                }
                return bytes;
            },
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
                            // sessionStorage.removeItem("token", '');
                            Dialog.confirm({
                                message: '亲~您未登录，去登陆？'
                            }).then(() => {
                                if(getStorage("source")=="ios"){
                                    window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"JumpLogin"});//返回登录
                                }else if(getStorage("source")=="android") {
                                    window.bsshop_android.JumpLogin();//返回登录
                                }else {
                                    _this.$router.push({path: '/index/login_new'});//返回首页
                                }
                            }).catch(() => {});
                        }else {
                            sessionStorage.setItem('token',"1");
                        }
                        _this.rost_project();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                /*去登陆*/
            },
            /**编辑购物车**/
            editClick(){
                if(this.deleteGoods){
                    this.deleteGoods=false;
                    this.deleteAllClass=false;
                }else {
                    this.deleteGoods=true;
                }
            },
            /**选中数量**/
            computed(){
                var num=0;
                var selectNum=0;
                for(var i=0;i<this.pitch_on.length;i++){
                    if(this.pitch_on[i]==true){
                        num++
                        selectNum=this.goods_num[i]+selectNum;
                    }
                }
                this.pitch_on_bum=selectNum;
                if((num<this.pitch_on.length)){
                    this.deleteAllClass=false;
                }else {
                    this.deleteAllClass=true
                }
            },
            /**选中取消商品**/
            toggle(index){
                if(this.pitch_on[index]==true){
                    this.pitch_on[index]=false;
                }else {
                    this.pitch_on[index]=true;
                }
                this.isSelected();//是否选中取消
                this.toAllPrice();
                this.computed();//选中数量计算
            },
            /**全选**/
            selectAll(){
                if(this.deleteAll){
                    for (var i=0;i<this.pitch_on.length;i++){
                        this.pitch_on[i]=false;
                    }
                    this.deleteAll=false;
                    this.deleteAllClass=false;
                }else {
                    for (var i=0;i<this.pitch_on.length;i++){
                        this.pitch_on[i]=true;
                    }
                    this.deleteAll=true;
                }
               
                this.isSelected();//是否选中取消
                this.toAllPrice();
                this.computed();//选中数量计算
            },
            /**减少商品数量**/
            cart_reduce(goods_id,index,type){
                    if(this.goods_num[index]>1){
                        this.goods_num[index]--;
                        this.toAllPrice();
                    }else {
                        this.goods_num[index]=1;
                        Toast("购物数量不能小于1");
                        this.toAllPrice();
                    }
                this.goods_num.reverse().reverse();
                this.quantity_change(goods_id,-1,type);
                this.total_price[index]=this.goods_num[index]*this.goods_unit_price[index];
                this.total_price.reverse().reverse();
            },
            /**数量获取焦点时**/
            focusInp(index){
                this.dif_value=this.goods_num[index];
            },
            /**输入商品数量**/
            cartCount(goods_id,index,store_nums,type){
                // if(this.pitch_on[index]==true) {
                    if (this.goods_num[index] == 0) {
                        Toast("购物数量不能小于1");
                        this.goods_num[index] = 1;
                        this.toAllPrice();
                    } else if (parseFloat(this.goods_num[index]) > parseFloat(store_nums)) {
                        Toast("不能超过商品库存");
                        this.goods_num[index] = store_nums;
                        this.toAllPrice();
                    } else {
                        this.toAllPrice();
                    }
                // }
                this.quantity_change(goods_id,this.goods_num[index]-this.dif_value,type);
                this.total_price[index]=this.goods_num[index]*this.goods_unit_price[index];
                this.total_price.reverse().reverse();
            },
            /**增加商品数量**/
            cart_increase(goods_id,index,store_nums,type){
                // if(this.pitch_on[index]==true){
                    if(this.goods_num[index]>=store_nums){
                        this.goods_num[index]=store_nums;
                        this.toAllPrice();
                    }else {
                        this.goods_num[index]++;
                        this.toAllPrice();
                    }
                // }
                this.goods_num.reverse().reverse();
                this.toAllPrice();
                this.total_price[index]=this.goods_num[index]*this.goods_unit_price[index];
                this.total_price.reverse().reverse();
                this.quantity_change(goods_id,1,type);
            },
            toAllPrice(){
                var num=0;
                var selectedNum=0;
                for(var i=0;i<this.pitch_on.length;i++){
                    if(this.pitch_on[i]==true){
                        num+=Number(this.goods_num[i])*Number(this.goods_unit_price[i]);
                    }
                }
                this.toAllPrices=num;
            },
            /**增加减少购物车数量**/
            quantity_change(goods_id,goods_num,type){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=cart_modified&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=cart_modified&time="+time+"&rand="+rand+"&goods_id="+goods_id+"&goods_num="+goods_num+"&type="+type+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                            _this.total_price[index]=_this.goods_num[index]*_this.goods_unit_price[index];
                            _this.total_price.reverse().reverse();
                        }else{
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**购物车列表**/
            cartListFn(flag) {
                this.toAllPrices=0;
                this.goods_num=[];
                this.goods_unit_price=[];
                this.total_price=[];
                this.pitch_on=[];
                var _this=this;
                _this.showpd=false;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=cart_list&parm%5B0%5D="+3+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=cart_list&time="+time+"&rand="+rand+"&parm[0]="+3+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                            _this.shopping_information=res.data.data;
                            if(res.data.data.goodsList.length>0){
                                for(var i=0;i<res.data.data.goodsList.length;i++){
                                    _this.goods_num.push(res.data.data.goodsList[i].count);
                                    _this.goods_unit_price.push(res.data.data.goodsList[i].sell_price);
                                    _this.total_price.push(res.data.data.goodsList[i].sum);
                                    _this.pitch_on.push(false);
                                    _this.toAllPrice();
                                }
                            }else{
                                _this.showpd=true;
                            }
                        }else if(res.data.code!=1){
                            Toast(res.data.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**去结算**/
            settlementClick(){
                this.json_toBuy.id=[];
                this.json_toBuy.buy_num=[];
                this.json_toBuy.type=[];
                var selected=0;
                for(var i=0;i<this.pitch_on.length;i++){
                    if(this.pitch_on[i]==true){
                        this.json_toBuy.id.push(this.shopping_information.goodsList[i].goods_id);
                        this.json_toBuy.buy_num.push(this.goods_num[i]);
                        this.json_toBuy.type.push(this.shopping_information.goodsList[i].goods_type);
                        selected=1;
                    }
                }
                if(selected==0){
                    Toast("未选择商品！");
                    return
                }
                if(getStorage("source")=="ios"){
                    window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"ToPage",url:urlApi+'index/login/cart_two?json_toBuy='+Base64.encode(JSON.stringify(this.json_toBuy))+"&state=0"});//去付款
                }else if(getStorage("source")=="android") {
                    window.bsshop_android.ToPage(urlApi+'index/login/cart_two?json_toBuy='+Base64.encode(JSON.stringify(this.json_toBuy))+"&state=0");//去付款
                }else {
                    this.$router.push({path: '/index/login/cart_two', query: {json_toBuy: Base64.encode(JSON.stringify(this.json_toBuy)),state:0}});//去付款
                }
                
            },
            /**是否点选购物车商品**/
            isSelected(){
                this.noShow=[];
                for(var i=0;i<this.pitch_on.length;i++){
                    if(this.pitch_on[i]==false){
                        this.noShow.push(this.shopping_information.goodsList[i].goods_id+"_"+this.shopping_information.goodsList[i].product_id)
                    }
                }
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=except_cart_goods&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm={
                    method:"except_cart_goods",
                    time:time,
                    rand:rand,
                    data:this.noShow,
                    sign:sign
                };
                login(parm).then(function (res) {
                        if(res.data.status==1){
                        }else if(res.data.code!=1){
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**跳转页面**/
            pathTo(){
                if(getStorage("source")=="ios"){
                    window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"toHomepage"});//返回首页
                }else if(getStorage("source")=="android") {
                    window.bsshop_android.nowbrowse();//返回首页
                }else {
                  this.$router.push({path: '/index/login/centerContent'});//返回首页
                }
            },
            /**跳转购买页**/
            toBuy(id){
                if(getStorage("source")=="ios"){
                    window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"ToPage",url:urlApi+'index/products?id='+id});
                }else if(getStorage("source")=="android") {
                    window.bsshop_android.ToPage(urlApi+'index/products?id='+id);
                }else {
                    this.$router.push({path:'/index/products',query:{id:id}});//返回首页
                }
            },
            /**批量删除**/
            batchDeletion(){
                var arrayProductId=[];
                var index = 0;
                for(var i=0;i<this.pitch_on.length;i++){
                    if(this.pitch_on[i]==true){
                        index++;
                        if(this.shopping_information.goodsList[i].goods_type=="goods"){
                                arrayProductId.push(this.shopping_information.goodsList[i].goods_id);
                            }else {
                                arrayProductId.push(this.shopping_information.goodsList[i].product_id);
                          }
                    }
                  
                }
                if(!index){
                    Toast("未选中商品！");
                    return
                }
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=remove_carts&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=remove_carts&time="+time+"&rand="+rand+"&product_id="+arrayProductId+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                            Toast(res.data.msg);
                            _this.cartListFn();
                        }else if(res.data.code!=1){
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
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
            /**判断设备**/
            downApp() {
                if(getStorage("source")=="ios"){
                    this.bottomHeight="4";
                    this.headShow=true;
                }else if(getStorage("source")=="android"){
                    this.bottomHeight="0";
                    this.headShow=true;
                }else {
                    this.bottomHeight="4";
                    this.headShow=true
                }
            },
            /**判断iphoneX**/
            pdinpone(){
                if(getStorage("devicetype")=="overx"){//判断如果是齐刘海屏
                    this.bottomHeight="7";
                    this.lineHeight="8"
                }else if(getStorage("devicetype")=="belowx"){
                    this.bottomHeight="4";
                    this.lineHeight="7"
                }else {}
            },
        },
        activated(){
            phsessid();
            this.downApp();
            this.pdinpone();
            getUrls(getStorage("source"),window.location.href);
            this.rHeadText("购物车");
            this.pitch_on_bum = 0;
            this.rbottomSelection(2);
            this.isLogin();
            this.isSelected();
            this.cartListFn();
            this.deleteAllClass=false;
        },
        watch:{
            myValue(val){
                this.equipmentType=val;
            }
        },
    }
</script>

<style scoped>
    [v-cloak] {
        display: none ;
    }
    .overEdit{
        display: block;
        margin-top: 1rem;
    }
    .overEdit a{
        display: block;
        padding: 0.3rem 1.2rem;
        border: 1px solid rgba(253,98,67,1);
        color: rgba(253,98,67,1);
        border-radius: 0.5rem;
        background: #fff;
    }
</style>