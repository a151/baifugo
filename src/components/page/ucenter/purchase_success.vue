<template>
      <div class="bg_purchase">
          <div class="purchase_success_ico">
              <img src="../../../../static/skin/default/images/buy_over_ico.png" height="114" width="156"/>
          </div>
          <h3 class="purchase_success_h3">购买成功</h3>
          <p class="purchase_success_p">亲~我们会尽快发货、配送。注意查收哦~</p>
          <a @click="pathTo(0)"  class="success_ins_to">再去逛逛</a>
          <a @click="pathTo(1)"  class="success_ins_del">查看订单</a>
      </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex";      //改变数据状态
    import { login } from "../../../api/simple/index";//登录
    import { url,urlApi,phsessid,equipments,webtitle } from "../../../api/simple/index";  //url
    import { Search ,Popup,Swipe, SwipeItem,PullRefresh,List } from 'vant';
    import { setStorage,getStorage } from 'src/common/mUtils'
    import md5 from 'js-md5';                           //md5加密
    import axios from 'axios';
    export default {
        name: "purchase_success",
        components:{},
        data(){
            return{
            }
        },
        computed:{},
        mounted(){

        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入数据；
            /**跳转页面**/
            pathTo(type){
                if(getStorage("source")=="ios"){
                    if(type==0){
                        window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"toHomepage"}) //返回首页
                    }else if(type==1){
                        this.$router.push({path: '/index/login/order',query:{state:0}});//返回个人中心
                    }
                }else if(getStorage("source")=="android") {
                    if(type==0){
                        window.bsshop_android.nowbrowse();//返回首页
                    }else if(type==1){
                        this.$router.push({path: '/index/login/order',query:{state:0}});//返回个人中心
                    }
                }else {
                    if(type==0){
                        this.$router.push({path: '/index/login/centerContent'});//返回首页
                    }else if(type==1){
                        this.$router.push({path: '/index/login/order',query:{state:0}});//返回个人中心
                    }
                }
            },
        },
        activated(){
            phsessid();
            this.rHeadText("购买成功");
            webtitle(getStorage("source"),"购买成功");
        },
        watch:{},
    }
</script>

<style scoped>

</style>