<template>
    <div class="">
        <div class="searchBox">
            <p class="shadow"></p>
            <van-search v-show="!show" @focus="focusTo()" placeholder="找好货，来百福购" v-model="value" />
        </div>
        <div class="width100">
            <!--搜索弹出层-->
            <van-popup v-model="show" position="right" :overlay="false">
                <h5 class="searchH5 clearfix">
                    <van-search  @search="onSearch"  placeholder="找好货，来百福购" v-model="searchH5_value" />
                    <span @click="cancelClick()" class="cancel_search">取消</span>
                </h5>
                <div class="historical_news">
                    <h5 class="clearfix">
                        <span class="fl">搜索历史</span>
                        <i @click="clear_cache()" class="fr"></i>
                    </h5>
                    <ul class="historical_commodity clearfix">
                        <li class="fl"  v-for="(item,index) in cookieList" >
                            <router-link exact :to="{path:'/index/login/search_list',query:{word:item}}"><span>{{item}}</span></router-link>
                        </li>
                    </ul>
                </div>
            </van-popup> 
        </div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <!--幻灯片 开始-->
            <div class="flexslider" id="tempWrap">
                <ul class="slides slidesBanner">
                    <van-swipe :autoplay="5000">
                        <van-swipe-item v-for="(item,index) in homeBanner">
                            <li class="bannerImg" style="display: block"><router-link exact :to="{path:'/index/login/pro_list',query:{id:item.id}}"><img :src="item.img"/></router-link></li>
                        </van-swipe-item>
                    </van-swipe>
                </ul>
            </div>
            <div  class="product_productx product_productx_bg">
                <!--<h2 class="new_arrival">{{firstTitle}}</h2>-->
                <ul class="classificationBanner">
                    <router-link tag="li" exact :to="{path:'/index/login/pro_list',query:{id:item.id}}" v-for="(item,index) in categoryList" :key="index">
                        <img :onerror="onerror" :src="item.img"/>
                        <span>{{item.name}}</span>
                    </router-link>
                </ul>
                <div class="goBannerSelected">
                    <router-link tag="a" exact :to="{path:'/index/login/pro_list',query:{id:adv.id}}">
                        <img :onerror="onerror" :src="adv.img">
                    </router-link>
                </div>
                <div v-for="(item,index) in qualityList" :key="index">
                    <h2  class="new_arrival mt1 clearfix">
                        <span class="fl">{{item.name}}</span>
                        <router-link v-if="index!==0" class="fr" exact :to="{path:'/index/login/pro_list',query:{id:item.url_id}}">更多<i class="right_ico"></i></router-link>
                    </h2>
                    <div class="scroll_hot scroll_hot_edit">
                        <div class="bd">
                            <ul class="new_products_ul">
                                <li :class="{'firstBanner':index===0}" v-for="(atem,int) in item.proList" :key="int">
                                    <router-link exact :to="{path:'/index/products',query:{id:atem.id}}">
                                        <img :src="atem.img" :onerror="onerror" />
                                    </router-link>
                                    <div class="commodity_description">
                                        <p class="trade_name">{{index===0?(atem.name.length>30?atem.name.substring(0,30)+"...":atem.name):(atem.name.length>16?atem.name.substring(0,16)+"...":atem.name)}}</p>
                                        <span class="present_price">￥{{atem.sell_price}}</span>
                                        <!-- <span class="original_price">￥{{item.market_price}}</span> -->
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!--<p v-show="lineShow" class="inLine">-->
                <!--<i>-->
                <!--我也是有底线的-->
                <!--</i>-->
                <!--</p>-->
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { url ,phsessid,webtitle} from "../../../api/simple/index"; //url
    import { setStorage,getStorage } from 'src/common/mUtils'
    import { Search ,Popup,Swipe, SwipeItem,PullRefresh,List,Toast,Lazyload,Row, Col } from 'vant';
    import MescrollVue from 'mescroll.js/mescroll.vue'//上划加载
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    export default {
        name: "index",
        components:{
            MescrollVue // 注册mescroll组件
        },
        data(){
            return{
                onerror:'this.src="' +"../../../../static/skin/default/images/img_default.png"+ '"',//默认图片
                adv:{},                          //广告图片
                count: 0,                        //加载次数
                show:false,                      //搜索是否弹出
                value:"",                        //搜索的关键词
                searchH5_value:"",               //商品搜索值
                isLoading: true,                 //正在加载
                firstTitle:"推荐商品",           //推荐商品
                firstList:[],                    //新品上线
                homeBanner:[],                   //头部推荐
                categoryList:[],                 //头部分类
                firstListAll:[],                 //新品上线
                qualityList:[],                  //精品推荐
                articleList: [],                 // 列表数据
                searchList:[],                   //cookie
                cookieList:[],                   //cookie
                lineShow:false,                   //底部底线显示隐藏
            }
          
        },
        computed:{
        },
        mounted(){ $("#app").scroll(this.handleScroll);},
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //头部信息
                rbottomSelection: "BOTTOMSELECTION", //底部信息
            }), //向vuex存入数据；
            //设置cookie<存>
            setCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                console.info(cname + "=" + '111' + "; " + expires);
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
            handleScroll(){
                var scrollTop = $("#app").scrollTop();
                if(scrollTop>100){
                    $(".shadow").css("opacity",1);
                    $("#showpage .van-field").css("background","#F3F3F5");
                }else {
                    $(".shadow").css("opacity",(scrollTop/200));
                    $("#showpage .van-field").css("background","#FFF");
                }
            },
            /**首页商品**/
            home_productsFn(){
                this.homeBanner=[];
                this.categoryList=[];
                this.firstList=[];
                this.firstListAll=[];
                var chunk = 3; //每3个分一组
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=app_index&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=app_index&time="+time+"&rand="+rand+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if (res.data.code == 1) {
                            for (var i = 0, j = res.data.value.firstList.length; i < j; i += chunk) {
                                _this.firstListAll.push(res.data.value.firstList.slice(i, i + chunk));
                            }
                          _this.firstTitle=res.data.value.firstTitle;  
                          _this.firstList=res.data.value.firstList;
                          _this.homeBanner=res.data.value.homeBanner;
                          _this.categoryList=res.data.value.categoryList;
                          _this.adv=res.data.value.adv;
                        }
                    }).catch(function (err) {
                    console.log(err);
                });
            },
            /**精品推荐**/
            quality_recommendFn(){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=hot_goods&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=hot_goods&time="+time+"&rand="+rand+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if (res.data.code == 1) {
                            _this.qualityList=res.data.value.list;
                            _this.lineShow=true;
                        }else {
                            Toast(res.data.msg)
                        }
                    }).catch(function (err) {
                    console.log(err);
                });
            },
            /**清除缓存**/
            clear_cache(){
                this.clearCookie("searchList");
                this.cookieList=[];
            },
            focusTo(){
              this.show=true;
            },
            /**取消搜索**/
            cancelClick(){
                this.show=false;
            },
            /**下拉刷新**/
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.isLoading = false;
                    this.count++;
                    this.home_productsFn();
                    this.quality_recommendFn();
                }, 500);
            },
            /**搜索商品**/
            onSearch(){
                this.searchList=[];
                if(this.getCookie("searchList")!=null&&this.getCookie("searchList")!=''&&this.getCookie("searchList")!=undefined){
                    this.searchList.push(this.getCookie("searchList"));
                }
                this.searchList.push(this.searchH5_value);
                this.setCookie("searchList",this.searchList,30);
                if(this.searchH5_value!=""&&this.searchH5_value!=null&&this.searchH5_value!=undefined){
                    this.$router.push({path: '/index/login/search_list',query:{word:this.searchH5_value}});
                }
                this.searchH5_value="";
            },
            /**数组去重**/
            unique(array){
                var res = [];
                var json = {};
                for(var i = 0; i < array.length; i++){
                    if(!json[array[i]]){
                        res.push(array[i]);
                        json[array[i]] = 1;
                    }
                }
                return res;
            }
        },
        activated() {
            phsessid();
            this.rHeadText("首页");
            webtitle(getStorage("source"),"首页");
            this.rbottomSelection(0);
            this.qualityList=[];
            this.home_productsFn();
            this.quality_recommendFn();
            this.cookieList=this.getCookie("searchList")!=''&&this.getCookie("searchList")!=null&&this.getCookie("searchList")!=undefined?this.getCookie("searchList").split(',').reverse():"";
            if(this.cookieList.length>10){
                this.cookieList=this.cookieList.slice(0,10)
            }
            this.cookieList=this.unique(this.cookieList)
        },
        watch:{
        },
    }
</script>

<style scoped>

</style>