<template>
    <div class="body_page_box">
        <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="60">
            <div>
                <h6 class="fb-page-h6">
                    <div class="fbDiv"><p class="red">{{residue_lucky_coin}}</p> <p>持有福币</p></div>
                    <div class="fbDiv"><p class="gray">{{used_lucky_coin}}</p><p>使用福币</p></div>
                </h6>
                <div class="fb-page-div">
                    <dl>
                        <dt>
                            <span style="width: 20%">福币</span>
                            <span style="width: 20%">时间</span>
                            <span style="width: 57%">说明</span>
                        </dt>
                        <dd v-for="(item,index) in order_details" class="clearfix" :key="index">
                            <span class="" style="width: 18%;line-height: 2rem">{{item.value}}</span>
                            <span class="" style="width: 24%;line-height: 2rem">{{item.datetime}}</span>
                            <span class="" style="width: 56%;line-height: 2.4rem;text-align: left;padding-left:1rem;" :title="item.intro">{{item.intro}}</span>
                        </dd>
                    </dl>
                </div>
                <!--<div class="list-group-show">-->
                    <!--<div class="no_order">-->
                        <!--<img src="../../../../static/skin/default/images/no_order.png" height="340" width="384"/>-->
                        <!--<p>暂无订单哦~</p>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </van-list>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { Search ,Popup,Swipe, SwipeItem,PullRefresh,List } from 'vant';
    import { login } from "../../../api/simple/index"; //登录
    import { url,phsessid,webtitle } from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    export default {
        name: "fbPage",
        components:{},
        data(){
            return{
                order_details:[],//福币详情
                page:"1",//分页
                loading: false,
                finished: false,
                showpd: false,
                stopData: false,
                residue_lucky_coin:"",//福币总数
                used_lucky_coin:"",//使用福币数
                
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
            order_listFn(page){
                this.loading = true;
                var _this=this;
                _this.showpd=false;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=getUcenterPointLog&%5Bpage%5D="+page+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=getUcenterPointLog&time="+time+"&rand="+rand+"&page="+page+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status=="success"){
                            _this.residue_lucky_coin=res.data.data.residue_lucky_coin;
                            _this.used_lucky_coin=res.data.data.used_lucky_coin;
                            for(var i=0;i<res.data.data.data.length;i++){
                                _this.order_details.push(res.data.data.data[i]);
                            }
                            if(res.data.data.data.length<15){
                                _this.finished=true;
                            }
                            _this.loading = false;
                        }else {
                            _this.finished=true;
                        }
                        if(_this.order_details.length==0){
                            _this.showpd=true;
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
                    _this.order_listFn(_this.page);

                }, 500);
            },
        },
        activated(){
            phsessid();
            this.rHeadText("福币");
            webtitle(getStorage("source"),"福币");
            this.order_details=[];
            this.rbottomSelection(3);
            this.finished=false;
            this.loading = true;
            this.page=1;
            this.order_listFn(1)
        },
        watch:{
            // $route:"order_listFn"
        },
    }
</script>

<style scoped>

</style>