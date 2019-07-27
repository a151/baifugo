<template>
       <div class="wrapper">
           <!--top开始-->
           <div  v-show="equipment==true&&title!='首页'&&title!='购买成功'&&title!='还款成功'&&title!='用户中心'"  class="top_search_box">
               <div class="top_search_i">
                   <div class="top_search" >
                       <div class="index_searchc"></div>
                   </div>
                   <div class="header_top">
                       <a href="javascript:;" id="kros_user" class="iconfont" onclick="window.history.back(-1);"   title="返回">&#xe86b;</a>
                       <span class="headline" @click="">{{title}}</span>
                       <a class="iconfont iconfont_search" href="javascript:void(0)"  title="搜索"></a>
                   </div>
               </div>
           </div>
           <!--top结束-->
           <div class="page-index" :style="{'paddingTop':title=='首页'||equipment==false||title=='用户中心'?'0':'52px','paddingBottom':overx==true&&equipment==false?'4rem':equipment&&!overx?'4rem':'0rem'}" id="showpage" v-cloak>
                  <keep-alive>
                      <!-- 这里是会被缓存的视图组件，比如 Home！ -->
                      <router-view></router-view>
                  </keep-alive>
               <!--<router-view></router-view>-->
           </div>
           <!--bottom开始-->
           <div v-show="equipment&&title!='购买页'&&title!='订单详情'" class="nav" id="nav">
               <div class="nav_nav-wrap">
                   <div @click="switchClick(0)" class="nav_nav-item">
                       <router-link  class="nav_nav-link" :class="{'active':switchStates==0}" exact :to="{path:'/index/login/centerContent'}"  >
                           <i class="iconfont iconfont_home_page "></i>
                           <span class="nav_nav-tit">首页</span>
                       </router-link>
                   </div>
                   <div @click="switchClick(1)" class="nav_nav-item">
                       <router-link  exact class="nav_nav-link" :class="{'active':switchStates==1}" :to="{path:'/index/login/category'}" >
                           <i class="iconfont iconfont_classification"></i>
                           <span class="nav_nav-tit">分类</span>
                       </router-link>
                   </div>
                   <div @click="switchClick(2)" class="nav_nav-item">
                       <router-link exact class="nav_nav-link" :class="{'active':switchStates==2}"  :to="{path:'/index/login/cart'}"  >
                           <i class="iconfont iconfont_cart">
                               <!--<b class="nav_nav-shop-cart-num" name="mycart_count">10</b>-->
                           </i>
                           <span class="nav_nav-tit">购物车</span>
                       </router-link>
                   </div>
                   <div @click="switchClick(3)" class="nav_nav-item">
                       <router-link  exact class="nav_nav-link" :class="{'active':switchStates==3}" :to="toggle_links(getCookies)" >
                           <i class="iconfont iconfont_center"></i>
                           <span class="nav_nav-tit">用户中心</span>
                       </router-link>
                   </div>
               </div>
           </div>
           <!--bottom结束-->
           <!--向上滑动开始-->
            <i @click="upTopClick()" class="slide_top" style="display: none"></i>
           <!--向上滑动结束-->
       </div>
</template>

<script>
    import { mapMutations,mapGetters } from "vuex";//改变数据状态
    import { login ,getUrls} from "../../api/simple/index"; //登录
    import { setStorage,getStorage } from 'src/common/mUtils'   //设置setStorage
    import { Popup ,Toast ,Dialog } from 'vant';//插件
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    export default {
        name: "Home",
        data(){
            return {
                title:"",
                switchStates:0,//切换状态
                getCookies:"",  //cookie
                equipment:true,//设备判断
                overx:false,//是否留海
            }
        },
        components:{
        },
        computed:{
            ...mapGetters("common", ["headtext","bottomSelection"]) //按钮刷新；
        },
        mounted(){
            this.title=this.headtext;
            this.getCookies=getStorage("session_id");
        },
        methods:{
            ...mapMutations("common", {
                Equipment: "ISEQUIPMENT", //draftsmanCard
            }), //向vuex存入左侧数字数据；
            //设置cookie<存>
            setCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";path=/;domain=test.baifugo.com; " + expires;
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
            /**判断是否登录**/
            loginFn(){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=check_login&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm={
                    method:"check_login",
                    rand:rand,
                    time:time,
                    sign:sign
                };
                login(parm).then(res=>{
                   if(res.data.code==100){
                       Dialog.confirm({
                           message: '亲，您未登录是否去登录？'
                       }).then(() => {
                           if(getStorage("source")=="ios"){
                               window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"JumpLogin"});//返回登录
                           }else if(getStorage("source")=="android") {
                               window.bsshop_android.JumpLogin();//返回登录
                           }else {
                               _this.$router.push({path: '/index/login_new'});//返回首页
                           }
                       }).catch(() => {
                           // on cancel
                       });
                   }else {
                       
                   }
                }).catch(err=>{})
            },
            /**切换状态**/
            switchClick(type){
                this.switchStates=type;
            },
            /**router切换**/
            toggle_links(state){
                if(state==null||state==''){
                    return {path:'/index/login_new'}
                }else {
                    return {path:'/index/login/memberCenter'} 
                }
            },
            /**判断设备**/
            downApp() {
                if(getStorage("source")=="ios"){
                    this.equipment=false;
                }else if(getStorage("source")=="android"){
                    this.equipment=false;
                }else {
                    this.equipment=true;
                }
            },
            /**判断iphoneX**/
            pdinpone(){
                if(getStorage("devicetype")=="overx"){//判断如果是齐刘海屏
                    this.overx=true;
                }else if(getStorage("devicetype")=="belowx"){
                    this.overx=false;
                }else {
                    this.overx=false;
                }
            },
            /**滚动事件**/
            handleScroll () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
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
        },
        activated(){ this.getCookies=getStorage("session_id"); window.addEventListener('scroll', this.handleScroll);this.downApp();  this.pdinpone();},
        watch:{
            headtext(){
                this.title=this.headtext
            },
            bottomSelection(){
                this.switchStates=this.bottomSelection;
            }
        }
    }
</script>

<style scoped>
    .wrapper{height: 100%}
    [v-cloak] {
        display: none!important ;
    }
</style>