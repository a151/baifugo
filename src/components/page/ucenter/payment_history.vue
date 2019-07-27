<template>
    <div class="bg_purchase bg_purchase_edit">
        <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="60">
        <div class="history_pd">
            <div v-for="(item,index) in record_list" class="history_box">
                <p><span>分期订单号</span><span>{{item.order_no}}</span></p>
                <p><span>订单时间</span><span>{{item.create_time}}</span></p>
                <p><span>待还总金额</span><span>¥{{item.repay_amount}}</span></p>
                <p><span>订单状态</span><span>{{item.stage_status}}</span></p>
                <p><span>已还总金额</span><span>{{item.paid_amount}}</span></p>
                <p><span>分期期数</span><span>{{item.stage}}期</span></p>
                <router-link exact :to="{path:'/index/login/details_orders',query:{order_no:item.order_no}}" class="look_over">查看</router-link>
            </div>
        </div>
        </van-list>    
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { login } from "../../../api/simple/index"; //登录
    import { Search ,Popup,Swipe, SwipeItem,PullRefresh,List,Tab, Tabs,NoticeBar,Icon } from 'vant';
    import { url,phsessid,webtitle } from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    export default {
        name: "payment_history",
        components:{},
        data(){
            return{
                stage_status:"1",//还款状态
                page:"1",//页数
                loading: false,
                finished: false,
                pagesize:"20",//每页显示条数
                record_list:[],//还款记录
            }
        },
        computed:{},
        mounted(){
          
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入左侧数字数据；
          
            /**还款记录详情**/
            loginFn(page) {
                this.loading = true;
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=payment_history&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=payment_history&time="+time+"&rand="+rand+"&stage_status="+this.stage_status+"&page="+page+"&pagesize="+this.pagesize+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                            for(var i=0;i<res.data.data.length;i++){
                                _this.record_list.push(res.data.data[i]);
                            }
                            if(res.data.data.length<20){
                                _this.finished=true;
                            }
                            _this.loading = false;
                        }else{
                            _this.finished=true;
                        }
                        if(_this.record_list.length==0){
                            _this.finished=true;
                            _this.loading = false;
                        }
                        
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            onLoad() {
                var _this=this;
                //异步更新数据
                setTimeout(() => {
                    _this.page++;
                    // 加载状态结束
                    _this.loginFn(_this.page);

                }, 500);
            },
        },
        activated(){
            phsessid();
            this.rHeadText("还款记录");
            webtitle(getStorage("source"),"还款记录");
            this.record_list = []
            this.finished = false;
            this.loading = true;
            this.page=1;
            this.loginFn(this.page);
        },
        watch:{

        },
    }
</script>

<style scoped>
  .bg_purchase_edit{
      height: auto;
  }
</style>