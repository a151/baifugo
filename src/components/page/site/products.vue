<template>
    <div onresize="doResize()" style="background: #fff">
        <div class="products_box">
          <div class="block_home_slider">
              <div id="home_slider" class="flexslider">
                  <ul class="slides slides_edit">
                      <van-swipe :autoplay="3000">
                          <van-swipe-item v-for="(item,index) in CommodityInformatio.photo"> <li @click="clickPicture(index)" style="display: block"><div class="slide"><img :src="'http://'+item.img" /></div></li></van-swipe-item>
                      </van-swipe>
                      <a @click="pathTos()" class="backico" href="javascript:;">
                          <img src="../../../../static/skin/default/images/back_ico.png" />
                      </a>
                      <a @click="toCart()" class="shopping_cart" v-show="isNeedShow">
                          <img src="../../../../static/skin/default/images/cart_ico.png"/>
                      </a>
                  </ul>
              </div>
          </div>
          <div class="pd_box">
              <div class="pd_product_wrap">
                  <div class="product-title">
                      <div class="pd_price">
                          <em>百福价</em><span class="sell">￥<b id="data_sellPrice">{{CommodityInformatio.sell_price}}</b></span>
                      </div>
                      <!-- <div class="market">市场价：￥<s id="data_marketPrice">{{CommodityInformatio.market_price}}</s></div> -->
                      <h2>{{CommodityInformatio.name}}</h2>
                  </div>
              </div>
          </div>
          <!--商品介绍 商品评论 开始-->
          <ul class="introduction_comment clearfix">
              <li @click="conversionClick(0)"  :class="{'actice':introduceType==0}"  class="fl">商品介绍</li>
              <li @click="conversionClick(1)"  :class="{'actice':introduceType==1}"  class="fl">商品评论</li>
          </ul>
          <!--商品介绍 商品评论 结束-->
          <!-- 产品详情 -->
          <div class="flor_body2" >
              <div name="showBox">
                  <!-- 商品介绍 start -->
                  <div v-show="introduceType==0" class="infoBox"><!-- style="display:block;"-->
                      <p class="busbox" v-html="CommodityInformatio.content">
                      </p>
                  </div>
                  <!-- 顾客评论 start -->
                  <div v-show="introduceType==1" >
                      <div v-show="commodityEvaluation==undefined||commodityEvaluation==''||commodityEvaluation==null" class="list-group" id='commentBox'>
                          暂无评论
                      </div>
                      <!--评论JS模板-->
                      <div v-for="(item,index) in commodityEvaluation" class="list-group-item">
                          <div class="media">
                              <div class="media-left media-middle">
                                  <img :src="item.head_ico" width="70px" height="70px"/>
                              </div>
                              <div class="media-body">
                                  <h4 class="media-heading"><strong>{{item.username}}</strong><span style="color:#999; padding-left:4px;">{{item.comment_time}}</span></h4>
                                  <div class="ly_store" style="padding-left:0px;"><p>评分：{{item.point}}</p></div>
                                  <p style="padding-left:0px;"><b>评价：</b><span class="gray">{{item.contents}}</span></p>
                                  <p v-show="item.recontents!=''&&item.recontents!=null&&item.recontents!=undefined" class="prompt" style="margin-top:5px;"><b>回复：</b><span class="gray">{{item.recontents}}</span></p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
        <!-- 底部新样式 -->
        <div class="products_nav_edit">
                <ul class="customer_ul clearfix" >
                    <li>
                        <a @click="pathTel()"  :href="customerService">
                            <i class="customer_service"></i>
                            <span>客服</span>
                        </a>
                    </li>
                    <!--<li @click="to_collection()" >-->
                        <!--<a href="javascript:;">-->
                            <!--<i class="collection_service" :class="{'active':collection==true}"></i>-->
                            <!--<span>收藏</span>-->
                        <!--</a>-->
                    <!--</li>-->
                    <li @click="add_to_cart()" class="add_to_cart" v-show="isNeedShow">
                        <a href="javascript:;">加入购物车</a>
                    </li>
                    <li @click="PurchaseImmediately()" class="direct_purchase">
                        <a href="javascript:;">
                            直接购买
                        </a>
                    </li>
                </ul>
        </div>
        <!--加入购物车和购买弹层-->
        <div class="shadowPop" @click="shadowPopClick()"></div>
        <div class="shoppingcart" :class="[showBase==true?'active':'']"> 
            <div :class="[showBase==true?'active':'','choice_goods','clearfix']">
                <i class="close" @click="closePop()"></i>
                <div class="clearfix">
                    <div class="left_img fl">
                        <img :src="CommodityInformatio.img"/>
                    </div>
                    <div class="fl noGoods" v-show="isCommodity==false">
                        没有此规格商品~
                    </div>
                    <div v-show="isCommodity==true"  class="fl" style="width: 49%">
                        <h5 class="com_price"><span>￥&nbsp;</span><span>{{PriceData.sell_price}}</span></h5>
                        <div class="com_num">
                            <span>库存&nbsp;</span>
                            <span>{{PriceData.store_nums>0||PriceData.store_nums==''||PriceData.store_nums==null||PriceData.store_nums==undefined?"有货":"无货"}}</span>
                        </div>
                        <div class="com_type clearfix">
                            <span class="fl">已选&nbsp;</span>
                            <span class="fl">{{total.style.substring(0,total.style.length-2)}}</span>
                        </div>
                        <div class="van-stepper-div">
                            <van-stepper :max="99" v-model="goods_num" />
                        </div>
                    </div>
                </div>
                <div>
                   <div id="com_selection">
                       <ul v-for="(item,index) in spec_array" class="com_selection com_selection_edit clearfix">
                       <li v-for="(it,k,i) in JSON.parse(item.value)" @click="choiceClick(index,i,it,k)"  :class="[Selected[index]==i?'active':'']">{{it}}</li>
                       </ul>
                   </div> 
                 <!---->
                   <!--<ul v-show="to_cart" class="com_selection clearfix">-->
                       <!--<li @click="choiceClickNum(0,'0')" :class="[SelectedNum==0?'active':'']">不分期</li>-->
                       <!--<li @click="choiceClickNum(3,'3')" :class="[SelectedNum==3?'active':'']">3期</li>-->
                       <!--<li @click="choiceClickNum(6,'6')" :class="[SelectedNum==6?'active':'']">6期</li>-->
                       <!--<li @click="choiceClickNum(12,'12')" :class="[SelectedNum==12?'active':'']">12期</li>-->
                   <!--</ul>-->
               </div>
                <div class="clearfix">
                    <p v-show="to_cart&&isCommodity==true" class="fl total_price">
                        <span>总价</span>
                        <span>￥{{PriceData.sell_price}}</span>
                    </p>
                    <div v-show="!to_cart" @click="onPointClicked" class="fr com_sure">
                        <a href="javascript:;">确定</a>
                    </div>
                    <div v-show="to_cart" @click="direct_purchase(isCommodity==false||PriceData.store_nums==0?0:1)" class="fr com_sure" :class="{'gray':isCommodity==false||PriceData.store_nums==0}">
                        <a href="javascript:;">确定</a>
                    </div>
                </div>
            </div>
        </div>
        <!--向上滑动开始-->
        <i @click="upTopClick()" class="slide_top" style="display: none"></i>
        <!--向上滑动结束-->
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { url,urlApi,equipments,phsessid,webtitle,getUrls,Stepper  } from "../../../api/simple/index"; //url
    import { Dialog,Search ,Popup,Swipe, SwipeItem,PullRefresh,List,Toast,ImagePreview  } from 'vant';
    import { login ,change} from "../../../api/simple/index"; //登录
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    let Base64 = require('js-base64').Base64;
    import axios from 'axios';
    export default {
        name: "products",
        components:{},
        data: function () {
            return {
                height: "",//顶部商品高度
                id: "",//商品id
                goods_id: "",//商品规格goods_id
                goods_num: "1",//商品加入购物车数量
                type: "",//加入类型 goods商品, product:货品;
                isNeedShow: true,
                isShow: true,
                collection: false, //点击收藏
                introduceType: 0,   //商品介绍与商品评论 
                Selected: [],             //被选中
                SelectedNum: "0",         //被选中期数
                stagesNum: "0",           //分期数
                rate: "0",//商品服务利率
                total: {
                    style: "",          //样式
                    type: "",           //类型
                    stages: "",        //分期
                },
                specJSON: [],//根据类型改变价格
                specJSON_edit: [],//根据类型改变价格
                showBase: false,       //购买层
                to_cart: false,        //购物车
                CommodityInformatio: {},//商品信息
                commodityEvaluation: [],//商品评论
                spec_array: [],//商品信息
                PriceData: {},//价格变化
                copyPriceData: {},//价格变化复制
                textList: [],
                textValue: [],
                screenWidth: document.body.clientWidth,
                customerService: "tel:400-006-1238",
                isCommodity: true,//是否有此型号商品
                Credit: "",//是否已经授信

            }
        },
        computed:{  
            ...mapGetters("common", ["headtext","isEquipment"])
            //按钮刷新；
            },
        mounted(){
            // $(".products_box").height((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-60);
        },
        methods:{
            setCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
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
            /**点击阴影弹窗关闭**/
            shadowPopClick(){
                this.showBase=false;
                $(".shadowPop").fadeOut();
                document.body.removeEventListener('touchmove',this.bodyScroll,{passive: false});
                $('body,.products_box').css("overflow","scroll");
            },
            /**商品信息**/
            commodity_informationFn(){
                this.specJSON=[];
                this.spec_array=[];
                this.textList=[];
                this.textValue=[];
                this.Selected=[];
                this.id=this.$route.query.id;
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=products&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=products&time="+time+"&rand="+rand+"&id="+this.id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.CommodityInformatio=res.data.value;
                            _this.type=res.data.value.type;
                            _this.goods_id=res.data.value.id;
                            _this.spec_array=res.data.value.spec_array;
                            _this.rate=res.data.value.rate;
                            for(var i=0;i<res.data.value.spec_array.length;i++){
                                _this.Selected.push([0]);
                                _this.textList.push([]);
                                _this.textValue.push([]);
                                for (var p in JSON.parse(res.data.value.spec_array[i].value)){
                                _this.textList[i].push(p);
                                _this.textValue[i].push(JSON.parse(res.data.value.spec_array[i].value)[p]);
                                }
                                _this.specJSON.push({
                                    id:res.data.value.spec_array[i].id,
                                    type:res.data.value.spec_array[i].type,
                                    value:_this.textValue[i][0],
                                    name:res.data.value.spec_array[i].name,
                                    tip:_this.textList[i][0],
                                })

                            }
                            _this.election_attributess(_this.specJSON);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**点击收藏**/
            to_collection(){
                if(this.collection==false){
                    this.collection=true;
                    this.collectionClick();
                }else {
                    this.collection=false;
                }
            },
            /**根据商品信息获取价格**/
            election_attributess(specJSON_edit){
                this.PriceData={};
                this.copyPriceData={};
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=get_product&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                // var parm="method=get_product&time="+time+"&rand="+rand+"&goods_id="+this.id+"&specJSON="+JSON.stringify(Base64.encode(specJSON_edit))+"&sign="+sign;
                var parm={
                    method:"get_product",
                    time:time,
                    rand:rand,
                    goods_id:this.id,
                    specJSON:specJSON_edit,
                    sign:sign
                };
                change(parm).then(function (res) {
                        if(res.data.code==1){
                            _this.isCommodity=true;
                            _this.PriceData=res.data.value;
                            _this.copyPriceData=res.data.value.sell_price;
                            _this.type=res.data.value.type;
                            _this.installation_repayment_plan(_this.SelectedNum,_this.rate,_this.copyPriceData);
                        }else {
                            if(res.data.code="10011"){
                                _this.isCommodity=false;
                            }
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**加入购物车**/
            add_to_cart(){
                this.to_cart=false;
                this.showBase=true;
                $(".shadowPop").fadeIn();
                document.body.addEventListener('touchmove',this.bodyScroll,false);
               // $('body,.products_box').css({'position':'absolute',"width":"100%"});
            },
            /**立即购买**/
            PurchaseImmediately(){
                if($(".choice_goods").height()>=(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)){
                    $(".choice_goods").height((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight));
                    $(".choice_goods").css("overflow","scroll")
                }else {
                    $(".choice_goods").css("height","auto");
                }
                this.to_cart=true;
                this.showBase=true;
                
                $(".shadowPop").fadeIn();
                document.body.addEventListener('touchmove',this.bodyScroll,{passive: false});
                $('body,.products_box').css("overflow","hidden");
            },
            /**关闭购买弹层**/
            closePop(){
                this.to_cart=true;
                this.showBase=false;
                $(".shadowPop").fadeOut();
                document.body.removeEventListener('touchmove',this.bodyScroll,{passive: false});
                $('body,.products_box').css("overflow","scroll");
            },
            /**切换商品评论与商品介绍**/
            conversionClick(type){
                this.introduceType=type;
            },
            /**加入购物车**/
            onPointClicked(res){
                var direct_gid="";
                if(this.type == "product"){
                    direct_gid=this.PriceData.id;
                }else {
                    direct_gid=this.$route.query.id;
                }
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=join_cart&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=join_cart&time="+time+"&rand="+rand+"&goods_id="+direct_gid+"&goods_num="+this.goods_num+"&type="+this.type+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                            Toast(res.data.msg);
                            _this.showBase=false;
                            $(".shadowPop").fadeOut();
                            document.body.removeEventListener('touchmove',_this.bodyScroll,{passive: false});
                            $('body,.products_box').css("overflow","scroll");
                        }else {
                            Toast(res.data.msg);
                            if(res.data.msg=="未登录"){
                                if(getStorage("source")=="ios"){
                                    window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"JumpLogin"});//返回登录
                                }else if(getStorage("source")=="android") {
                                    window.bsshop_android.JumpLogin();//返回登录
                                }else {
                                    _this.$router.push({path: '/index/login_new'});//返回首页
                                }
                            }
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**点击选择商品规格**/
            choiceClick(index,type,it,k){
                var _this=this;
                var  specJSON_edit=[];
                     specJSON_edit=this.specJSON;
                     specJSON_edit.splice(index,1,{
                        id:this.spec_array[index].id,
                        type:this.spec_array[index].type, 
                        value:it,
                        name:this.spec_array[index].name, 
                        tip:k,
                     });
                this.election_attributess(specJSON_edit);
                this.Selected[index]=type;
                this.Selected.reverse().reverse();
                setTimeout(function () {
                    _this.total.style="";
                    for(var i=0;i<$("#com_selection .active").length;i++){
                        _this.total.style+=$("#com_selection .active").eq(i).html()+" + "
                    }
                },300);
            },
            /**点击选择商品分期**/
            choiceClickNum(type,txt){
                if(this.Credit!=1){
                    Dialog.confirm({
                        message: '您未授信是否去授信？'
                    }).then(() => {
                        this.$router.push({path: '/index/login/raise_amount'});
                    }).catch(() => {
                        this.SelectedNum=0;
                        this.stagesNum=0;
                        this.PriceData.sell_price=this.copyPriceData;
                    });
                }else{
                    this.SelectedNum=type;
                    this.stagesNum=txt;
                    if(txt==0){
                        this.PriceData.sell_price=this.copyPriceData;
                    }else {
                        this.installation_repayment_plan(txt,this.rate,this.copyPriceData)
                    }
                }
              
            },
            /**分期还款计划**/
            installation_repayment_plan(stagesNum,rate,orderAmount){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=get_plan_redemption&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=get_plan_redemption&time="+time+"&rand="+rand+"&numStages="+stagesNum+"&rate="+rate+"&orderAmount="+orderAmount+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                           _this.PriceData.sell_price=res.data.data.repayTotalAmount;
                        }else if(res.data.code!=1){
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**点击收藏**/
            collectionClick(){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=add_favorite&parm%5Bgoods_id%5D="+this.goods_id+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=add_favorite&time="+time+"&rand="+rand+"&parm[goods_id]="+this.goods_id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            Dialog.alert({
                                message: '收藏成功'
                            }).then(() => {
                                // on close
                            });
                        }else if(res.data.code==0){
                            Dialog.alert({
                                message: '已经收藏过本商品'
                            }).then(() => {
                                // on close
                            });
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**商品评价**/
            commodity_evaluation(){
                this.id=this.$route.query.id;
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=comment_ajax&parm%5Bgoods_id%5D="+this.id+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=comment_ajax&time="+time+"&rand="+rand+"&parm[goods_id]="+this.id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.status==200){
                          _this.commodityEvaluation=res.data.data.data;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**直接购买**/
            direct_purchase(type){
                if(type==0){
                    Toast("此商品无库存哦~");
                    return;
                }
                var direct_gid="";
                var direct_type="";
                if(this.type=="product"){
                    direct_gid=this.PriceData.id;
                    direct_type="product"
                }else {
                    direct_gid=this.$route.query.id;
                    direct_type="goods"
                }
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=check_login&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=check_login&time="+time+"&rand="+rand+"&sign="+sign;
                axios.get(url+parm).then(function (res) {
                        document.body.removeEventListener('touchmove',_this.bodyScroll,{passive: false});
                        $('body,.products_box').css("overflow","scroll");
                        if(res.data.code==1){
                            if(getStorage("source")=="ios"){
                                _this.$router.push({path: '/index/login/cart_two',query:{json_toBuy:Base64.encode(JSON.stringify({direct_gid:direct_gid,direct_num:_this.goods_num,direct_type:direct_type,stagesNum:_this.stagesNum})),state:1}});
                            }else if(getStorage("source")=="android") {
                                _this.$router.push({path: '/index/login/cart_two',query:{json_toBuy:Base64.encode(JSON.stringify({direct_gid:direct_gid,direct_num:_this.goods_num,direct_type:direct_type,stagesNum:_this.stagesNum})),state:1}});
                            }else {
                                _this.$router.push({path: '/index/login/cart_two',query:{json_toBuy:Base64.encode(JSON.stringify({direct_gid:direct_gid,direct_num:_this.goods_num,direct_type:direct_type,stagesNum:_this.stagesNum})),state:1}});
                            }
                        }else {
                            if(getStorage("source")=="ios"){
                                window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"JumpLogin"});//返回登录
                            }else if(getStorage("source")=="android") {
                                window.bsshop_android.JumpLogin();//返回登录
                            }else {
                                    _this.$router.push({path: '/index/login_new'});//返回首页
                            }
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**判断iphoneX**/
            pdinpone(){
               if(getStorage("devicetype")=="overx"){//判断如果是齐刘海屏
                     $('.flexslider .slides_edit .backico').css('top','4rem');
                     $('.flexslider .slides_edit .shopping_cart').css('top','4rem');
               }else if(getStorage("devicetype")=="belowx"){
                     $('.flexslider .slides_edit .backico').css('top','2rem');
                     $('.flexslider .slides_edit .shopping_cart').css('top','2rem');
               }else {

               }
            },
            /**跳转页面**/
            pathTos(){
                if(getStorage("source")=="ios"){
                    window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"pop"});//返回首页
                }else if(getStorage("source")=="android") {
                    window.bsshop_android.JumpBackPop();//返回首页
                }else {
                    window.history.back(-1);//返回首页
                }
            },
            /**客服跳转**/
            pathTel(){
                if(getStorage("source")=="ios"){
                    window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"customerService",url:this.customerService});//客服
                }else if(getStorage("source")=="android") {
                    window.bsshop_android.customerService(this.customerService);//客服
                }else {
                    
                }
            },
            /**跳转购物车**/
            toCart(){
                if(getStorage("source")=="ios"){
                    window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"Jumpcart"});//返回首页
                }else if(getStorage("source")=="android") {
                    window.bsshop_android.Jumpcart();//返回首页
                }else {
                    this.$router.push({path: '/index/login/cart'})//跳转购物车
                }
            },
            /**滚动事件**/
            handleScroll () {
                var scrollTop = $(".products_box").pageYOffset || $(".products_box").scrollTop || $(".products_box").scrollTop;
                if(scrollTop>=500){
                    $(".slide_top").fadeIn();
                }else {
                    $(".slide_top").fadeOut();
                }
            },
            /**点击滚动**/
            upTopClick(){
                $('html,body').animate({scrollTop:0},'slow');
            },
            /**收否已經授信**/
            credit_granting(){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=is_credit&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=is_credit&time="+time+"&rand="+rand+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                       if(res.data.code==1){
                           _this.Credit=res.data.msg;
                       }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**禁止滚动**/
            bodyScroll(event){
                event.preventDefault();
            },
            /**图片放大**/
            clickPicture(index){
                var images=[];
                for(var i=0;i<this.CommodityInformatio.photo.length;i++){
                    images.push('http://'+this.CommodityInformatio.photo[i].img);
                }
                
                ImagePreview({
                    images: images,
                    startPosition: index,
                    onClose() {
                        // do something
                    }
                });
            }
        },
        created(){},
        activated(){
            phsessid();
            this.pdinpone();
            webtitle(getStorage("source"),"");
            getUrls(getStorage("source"),window.location.href);
            this.credit_granting();
            this.total.style="";
            this.SelectedNum=0;
            this.goods_num=1;//购买数量
            this.commodity_evaluation();
            this.commodity_informationFn();
            // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
            var _this=this;
            setTimeout(function () {
                if(getStorage("source") == 'ios'&&getStorage("version") == 'null'){
                    _this.isNeedShow = false
                }else {
                    _this.isNeedShow = true
                }
            },200)
            setTimeout(function () {
                for(var i=0;i<$("#com_selection .active").length;i++){
                    _this.total.style+=$("#com_selection .active").eq(i).html()+" + "
                }
            },300)
        },
        watch:{},
    }
</script>

<style>
 .van-dialog{
     z-index: 9999 !important;
 }
 .van-modal{
     z-index: 2009 !important;
 }
 .van-popup{
     z-index: 2010 !important;
 }
 .products_box {
     padding-bottom: 60px;
 }   
</style>