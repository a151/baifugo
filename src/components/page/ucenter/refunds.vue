<template>
    <div class="body_page_box">
        <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="1">
        <div class="list-group">
            <div v-for="(item,index) in order_details" class="list-group-item">
                <h4 class="list-group-item-heading"><strong>退款订单号：</strong>{{item.order_no}}</h4>
                <p class="list-group-item-text" style="padding-bottom:6px; color:#666;">{{item.time}}</p>
                <div class="form-group has-feedback" style="height:20px; line-height:20px; margin-bottom:0px;">
                    <div class="pull-left">
                        <span class="lyred" :class="{'lygreen':item.pay_status_str=='退款成功'}">{{item.pay_status_str}}</span>
                    </div>

                    <div class="pull-right">
                        <a @click="cancellation_refund_application(item.id)" href='javascript:;' v-show="item.pay_status==0">取消</a>
                        <router-link exact :to="{path:'/index/login/refunds_detail',query:{id:item.id}}" style="padding-left:10px;">查看</router-link>
                    </div>
                </div>
            </div>
        </div>
        </van-list>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex";      //改变数据状态
    import { login } from "../../../api/simple/index";//登录
    import { url,phsessid,webtitle } from "../../../api/simple/index";  //url
    import { Search ,Popup,Swipe, SwipeItem,PullRefresh,List,Toast } from 'vant';
    import { setStorage ,getStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';                           //md5加密
    import axios from 'axios';
    export default {
        name: "refunds",
        components:{},
        data(){
            return{
                order_details:[], //退款列表
                page:1,//页数
                loading: false,
                finished: false,
            }
        },
        computed:{},
        mounted(){
            this.order_details=[];
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
                rbottomSelection: "BOTTOMSELECTION", //底部信息
            }), //向vuex存入数据；
            order_listFn(page){
                this.loading=true;
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=refunds_index&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=refunds_index&time="+time+"&rand="+rand+"&page="+page+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status=="1"){
                            for(var i=0;i<res.data.data.length;i++){
                                _this.order_details.push(res.data.data[i]);
                            }
                            if(res.data.data.length<20){
                                _this.finished=true;
                            }
                            _this.loading=false;
                        }else{
                             Toast(res.data.msg);
                             _this.finished=true;
                        }
                        if(_this.order_details.length==0){
                            _this.finished=true;
                            _this.loading = false;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**取消退款申请**/
            cancellation_refund_application(id){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=refunds_del&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=refunds_del&time="+time+"&rand="+rand+"&id="+id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status=="1"){
                            Toast(res.data.msg);
                        }else if(res.data.code!=1){
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**下滑加载**/
            onLoad() {
                var _this=this;
                //异步更新数据
                setTimeout(() => {
                    // 加载状态结束
                    _this.page++;
                    _this.order_listFn(_this.page)
                }, 500);
            },
            
        },
        activated(){
            phsessid();
            this.rHeadText("我的退款");
            webtitle(getStorage("source"),"我的退款");
            this.rbottomSelection(3);
            this.order_details=[];
            this.finished=false;
            this.loading = true;
            this.page=1;
            this.order_listFn(1)
        },
        watch:{
        },
    }
</script>

<style scoped>

</style>