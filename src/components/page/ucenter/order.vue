<template>
    
    <div class="body_page_box body_page_box_order">
        <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="60">
            <div>
                <van-tabs @change="onClick" :swipeable="true" v-model="selectIndex" >
                    <van-tab :disabled="!disableClick" title="全部订单">
                        <div v-for="(item,index) in order_details" class="uc_list_box">
                            <p class="state_p " :class="{'payment':item.order_status=='2'}">
                                <i class="fl"></i>
                                <span class="fl">{{item.order_status_text}}</span>
                            </p>
                            <p class="uc_p" style="margin-bottom: 2rem">
                                <span>{{item!=null&&item!=''?item.order_no:''}}</span>
                                <span>{{item!=null&&item!=''?item.create_time:''}}</span>
                            </p>
                            <router-link exact :to="{path:'/index/products',query:{id:item.goods_id}}" class="clearfix commodity_box" style="margin-top: 2rem">
                                <div class="fl commodity_list">
                                    <a href="javascript:;" class="fl commodity_a">
                                        <img :src="item.goods_img" width="50px" height="50px" >
                                    </a>
        
                                    <h6 class="fl commodity_h6">
                                        <p class="fz14"><a href="javascript:;">{{item!=null&&item!=''?item.goods_name:''}} </a></p>
                                        <p class="gray" >
                                            <span style="line-height: 1rem;">{{item!=null&&item!=''?item.goods_model:''}}</span>
                                        </p>
                                    </h6>
                                </div>
                                <p class="fr fz14 commodity_num">× {{item.goods_nums}}件</p>
                            </router-link>
                            <h3></h3>
                            <div class="operation_box operation_box_list clearfix">
                                <p class="fl pay">
                                    <span class="color_black">{{item.pay_type_text}}：</span>
                                    <span>￥{{item!=null&&item!=''?item.order_amount:''}}</span>
                                </p>
                              
                                    <a href="javascript:;" @click="immediate_payment(item.pay_jump)" v-show="item.order_status=='2'" class="fr toPay">去支付</a>
                                    <router-link exact :to="{path:'/index/login/order_detail',query:{id:item.id}}" class="fr toCheck" style="margin-left: 0">查看</router-link>
                               
                            </div>
                        </div>
                    </van-tab>
                    <van-tab :disabled="!disableClick" title="待付款">
                        <div v-for="(item,index) in order_details" class="uc_list_box">
        
                            <p class="state_p " :class="{'payment':item.order_status=='2'}">
                                <i class="fl"></i>
                                <span class="fl">{{item.order_status_text}}</span>
                            </p>
                            <p class="uc_p" style="margin-bottom: 2rem">
                                <span>{{item!=null&&item!=''?item.order_no:''}}</span>
                                <span>{{item!=null&&item!=''?item.create_time:''}}</span>
                            </p>
                            <router-link exact :to="{path:'/index/products',query:{id:item.goods_id}}" class="clearfix commodity_box" style="margin-top: 2rem">
                                <div class="fl commodity_list">
                                    <a href="javascript:;" class="fl commodity_a">
                                        <img :src="item.goods_img" width="50px" height="50px">
                                    </a>
        
                                    <h6 class="fl commodity_h6">
                                        <p class="fz14"><a href="javascript:;">{{item!=null&&item!=''?item.goods_name:''}} </a></p>
                                        <p class="gray" >
                                            <span style="line-height: 1rem;">{{item!=null&&item!=''?item.goods_model:''}}</span>
                                        </p>
                                    </h6>
                                </div>
                                <p class="fr fz14 commodity_num">× {{item.goods_nums}}件</p>
                            </router-link>
                            <h3></h3>
                            <div class="operation_box operation_box_list clearfix">
                                <p class="fl pay">
                                    <span class="color_black">{{item.pay_type_text}}：</span>
                                    <span>￥{{item!=null&&item!=''?item.order_amount:''}}</span>
                                </p>
                                <a href="javascript:;" @click="immediate_payment(item.pay_jump)" v-show="item.order_status=='2'" class="fr toPay">去支付</a>
                                <router-link exact :to="{path:'/index/login/order_detail',query:{id:item.id}}" class="fr toCheck" style="margin-left: 0">查看</router-link>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab :disabled="!disableClick" title="待发货">
                        <div v-for="(item,index) in order_details" class="uc_list_box">
                            <p class="state_p " :class="{'payment':item.order_status=='2'}">
                                <i class="fl"></i>
                                <span class="fl">{{item.order_status_text}}</span>
                            </p>
                            <p class="uc_p" style="margin-bottom: 2rem">
                                <span>{{item!=null&&item!=''?item.order_no:''}}</span>
                                <span>{{item!=null&&item!=''?item.create_time:''}}</span>
                            </p>
                            <router-link exact :to="{path:'/index/products',query:{id:item.goods_id}}" class="clearfix commodity_box" style="margin-top: 2rem">
                                <div class="fl commodity_list">
                                    <a href="javascript:;" class="fl commodity_a">
                                        <img :src="item.goods_img" width="50px" height="50px" >
                                    </a>
        
                                    <h6 class="fl commodity_h6">
                                        <p class="fz14"><a href="javascript:;">{{item!=null&&item!=''?item.goods_name:''}} </a></p>
                                        <p class="gray" >
                                            <span style="line-height: 1rem;">{{item!=null&&item!=''?item.goods_model:''}}</span>
                                        </p>
                                    </h6>
                                </div>
                                <p class="fr fz14 commodity_num">× {{item.goods_nums}}件</p>
                            </router-link>
                            <h3></h3>
                            <div class="operation_box operation_box_list clearfix">
                                <p class="fl pay">
                                    <span class="color_black">{{item.pay_type_text}}：</span>
                                    <span>￥{{item!=null&&item!=''?item.order_amount:''}}</span>
                                </p>
                                <!--<a href="javascript:;" v-show="item.order_status=='2'" class="fr toPay">去支付</a>-->
                                <router-link exact :to="{path:'/index/login/order_detail',query:{id:item.id}}" class="fr toCheck" style="margin-left: 0">查看</router-link>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab :disabled="!disableClick" title="已发货">
                        <div v-for="(item,index) in order_details" class="uc_list_box">
                            <p class="state_p " :class="{'payment':item.order_status=='2'}">
                                <i class="fl"></i>
                                <span class="fl">{{item.order_status_text}}</span>
                            </p>
                            <p class="uc_p" style="margin-bottom: 2rem">
                                <span>{{item!=null&&item!=''?item.order_no:''}}</span>
                                <span>{{item!=null&&item!=''?item.create_time:''}}</span>
                            </p>
                            <router-link exact :to="{path:'/index/products',query:{id:item.goods_id}}" class="clearfix commodity_box" style="margin-top: 2rem">
                                <div class="fl commodity_list">
                                    <a href="javascript:;" class="fl commodity_a">
                                        <img :src="item.goods_img" width="50px" height="50px" >
                                    </a>
        
                                    <h6 class="fl commodity_h6">
                                        <p class="fz14"><a href="javascript:;">{{item!=null&&item!=''?item.goods_name:''}} </a></p>
                                        <p class="gray" >
                                            <span style="line-height: 1rem;">{{item!=null&&item!=''?item.goods_model:''}}</span>
                                        </p>
                                    </h6>
                                </div>
                                <p class="fr fz14 commodity_num">× {{item.goods_nums}}件</p>
                            </router-link>
                            <h3></h3>
                            <div class="operation_box operation_box_list clearfix">
                                <p class="fl pay">
                                    <span class="color_black">{{item.pay_type_text}}：</span>
                                    <span>￥{{item!=null&&item!=''?item.order_amount:''}}</span>
                                </p>
                                <!--<a href="javascript:;" v-show="item.order_status=='2'" class="fr toPay">去支付</a>-->
                                <router-link exact :to="{path:'/index/login/order_detail',query:{id:item.id}}" class="fr toCheck" style="margin-left: 0">查看</router-link>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab :disabled="!disableClick" title="已完成">
                        <div v-for="(item,index) in order_details" class="uc_list_box">
                            <p class="state_p " :class="{'payment':item.order_status=='2'}">
                                <i class="fl"></i>
                                <span class="fl">{{item.order_status_text}}</span>
                            </p>
                            <p class="uc_p" style="margin-bottom: 2rem">
                                <span>{{item!=null&&item!=''?item.order_no:''}}</span>
                                <span>{{item!=null&&item!=''?item.create_time:''}}</span>
                            </p>
                            <router-link exact :to="{path:'/index/products',query:{id:item.goods_id}}" class="clearfix commodity_box" style="margin-top: 2rem">
                                <div class="fl commodity_list">
                                    <a href="javascript:;" class="fl commodity_a">
                                        <img :src="item.goods_img" width="50px" height="50px" >
                                    </a>
        
                                    <h6 class="fl commodity_h6">
                                        <p class="fz14"><a href="javascript:;">{{item!=null&&item!=''?item.goods_name:''}} </a></p>
                                        <p class="gray" >
                                            <span style="line-height: 1rem;">{{item!=null&&item!=''?item.goods_model:''}}</span>
                                        </p>
                                    </h6>
                                </div>
                                <p class="fr fz14 commodity_num">× {{item.goods_nums}}件</p>
                            </router-link>
                            <h3></h3>
                            <div class="operation_box operation_box_list clearfix">
                                <p class="fl pay">
                                    <span class="color_black">{{item.pay_type_text}}：</span>
                                    <span>￥{{item!=null&&item!=''?item.order_amount:''}}</span>
                                </p>
                                <!--<a href="javascript:;" v-show="item.order_status=='2'" class="fr toPay">去支付</a>-->
                                <router-link exact :to="{path:'/index/login/order_detail',query:{id:item.id}}" class="fr toCheck" style="margin-left: 0">查看</router-link>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
                <div class="list-group-show" v-show="showpd">
                    <div class="no_order">
                        <img src="../../../../static/skin/default/images/no_order.png" height="340" width="384"/>
                        <p>订单空空如也～</p>
                        <span>赶快去逛一逛，挑选你中意的物品吧！</span>
                    </div>
                    <div class="form-group has-feedback">
                        <a @click="pathTo()"  class="btn b-danger btn-sm b-danger-edit" href="javascript:void(0)">再去逛逛</a>
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { Search ,Popup,Swipe, SwipeItem,PullRefresh,List,Tab, Tabs,NoticeBar,Icon } from 'vant';
    import { login } from "../../../api/simple/index"; //登录
    import { url,phsessid,webtitle } from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    export default {
        name: "order",
        components:{},
        data(){
            return{
                // onerror:'this.src="' +"./static/skin/default/images/img_default.png"+ '"',//默认图片
                selectIndex:"0",
                order_details:[],//订单详情
                page:"1",//分页
                loading: false,
                finished: false,
                disableClick:true,
                showpd: false,
                stopData: false,
                state:0,//起始状态
                onClickIndex:0,//点击状态
                minute:'',//分钟
                second:'',//秒
            }
        },
        computed:{},
        beforeCreate(){},
        mounted(){},
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
                rbottomSelection: "BOTTOMSELECTION", //底部信息
            }), //向vuex存入数据；
            /*时间倒计时*/
            timer(){
               var _this=this;
               var time=1800;//30分钟换算成1800秒
               setInterval(function(){
                   time=time-1;
                   var minute=parseInt(time/60);
                   var second=parseInt(time%60);
                   _this.minute=minute;
                   _this.second=second;
               },1000);
            }, 
            order_listFn(page,index){
                this.disableClick=false;
                this.loading = true;
                var _this=this;
                _this.showpd=false;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=order_list&%5Bpage%5D="+page+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=order_list&time="+time+"&rand="+rand+"&page="+page+"&qtype="+index+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status=="1"){
                            for(var i=0;i<res.data.data.length;i++){
                                _this.order_details.push(res.data.data[i]); 
                            }
                            if(res.data.data.length<20){
                                _this.finished=true;
                            }
                            _this.loading = false;
                        }else if(res.data.code=="1") {
                            _this.finished=true;
                        }
                        if(_this.order_details.length==0){
                            _this.showpd=true;
                            _this.finished=true;
                            _this.loading = false;
                        }
                        _this.disableClick=true;
                    })
                    .catch(function (err) {
                        console.log(err);
                        _this.disableClick=true;
                    });
            },
            onLoad() {
                var _this=this;
                //异步更新数据
                setTimeout(() => {
                    _this.page++;
                    // 加载状态结束
                    _this.order_listFn(_this.page,_this.onClickIndex);
              
                }, 500);
            },
            onClick(index, title){
                    this.finished=false;
                    this.loading = true;
                    this.page=1;
                    this.onClickIndex=index;
                    this.order_details=[];
                    this.order_listFn(1,index);
            },
            /**立即付款**/
            immediate_payment(e){
                window.location.href ='http://'+ e
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
            /**动态改变url**/
            newQueryFn(){
                let query = this.$router.history.current.query;
                let path = this.$router.history.current.path;
                //对象的拷贝
                let newQuery = JSON.parse(JSON.stringify(query));
                newQuery.state = this.onClickIndex;
                this.$router.replace({ path, query: newQuery });
            }
        },
        activated(){
            phsessid();
            this.rHeadText("我的订单");
            webtitle(getStorage("source"),"我的订单");
            this.rbottomSelection(3);
            this.finished=false;
            this.loading = true;
            this.page=1;
            this.state=this.$route.query.state;
            this.selectIndex=this.state;
            this.order_details=[];
            if(this.onClickIndex==this.state){
                this.order_listFn(this.page,this.state); 
            }
        },
        watch:{
            // $route:"order_listFn"
            onClickIndex(){
                this.newQueryFn();
            }
        },
    }
</script>

<style scoped>

</style>