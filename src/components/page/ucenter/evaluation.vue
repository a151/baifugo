<template>
    <div class="evaluation">
        <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了" @load="onLoad" :offset="60">
             <van-tabs v-model="active" @click="onClick">
            <van-tab title="待评价" @click="appraisedClick(0)">
                <div  v-for="(item,index) in valuation"  class="evaluate_not_box">
                    <van-row>
                        <van-col span="8">
                            <img :src="item.img"/>
                        </van-col>
                        <van-col span="16">
                            <router-link tag="div" class="trade_name"  exact :to="{path:'/index/products',query:{id:item.goods_id}}" >
                                <p>{{item.name.length>30?item.name.substring(0,30)+"...":item.name}}</p>
                                <p>{{item.value.length>50?item.value.substring(0,50)+"...":item.value}}</p>
                            </router-link>
                            <div class="clearfix">
                                <span class="red fl">×{{item.goods_nums}}</span>
                                <a @click="to_evaluate(item.id)" class="to_evaluate fr">去评价</a>
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </van-tab>
            <van-tab title="已评价" @click="appraisedClick(1)">
                <div v-for="(item,index) in valuation" class="evaluate_over_box">
                    <van-row>
                        <van-col span="5">
                            <img :src="item.img"/>
                        </van-col>
                        <van-col span="12">
                            <router-link tag="div" class="trade_name"  exact :to="{path:'/index/products',query:{id:item.goods_id}}" >
                                <p>{{item.name.length>28?item.name.substring(0,28)+"...":item.name}}</p>
                                <p>{{item.value.length>50?item.value.substring(0,50)+"...":item.value}}</p>
                            </router-link>
                        </van-col>
                        <van-col span="7" style="text-align: right"><span class="red">×{{item.goods_nums}}</span></van-col>
                    </van-row>
                    <div class="evaluate_over_txt">
                        <van-row>
                            <van-col span="24">{{item.contents}}</van-col>
                        </van-row>
                    </div>
                    <div class="clearfix">
                        <div class="clearfix fl"><span style="line-height: 1.4rem;color:#AAAAAA; " class="fl">商品：</span><van-rate class="fl" :readonly="true" :size="15" v-model="item.point" /></div>
                        <div class="clearfix fr"><span style="line-height: 1.4rem;color:#AAAAAA;" class="fl">物流：</span><van-rate class="fl" :readonly="true" :size="15" v-model="item.logistics_scores" /></div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        </van-list>    
        <div>
             <div  class="may_be_like">
                    <h3>您可能喜欢的商品</h3>
             </div>
             <div class="scroll_hot scroll_hot_edit guessRecommend">
                    <div  class="bd">
                        <ul  class="new_products_ul">
                            <li v-for="(item,index) in rost_projects" class="firstBanner">
                                <router-link exact :to="{path:'/index/products',query:{id:item.id}}">
                                    <img  :src="item.img" :onerror="onerror">
                                </router-link> 
                                <div class="commodity_description">
                                    <p  class="trade_name">{{item.name.length>30?item.name.substring(0,30)+"...":item.name}}</p> 
                                    <span  class="present_price">￥{{item.sell_price}}</span>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
        </div>
        <!--评价订单-->
        <van-popup v-model="PopupState">
            <div class="commodityLogisticsBox">
                    <div class="commodityLogisticsTittle">
                        <p>
                            <img src="../../../../static/skin/default/images/fiveStars-ico.png">
                        </p>
                        <h6>宝贝儿 ~ 赏个好评吧  ~</h6>
                    </div>
                    <div class="commodityLogistics">
                        <div class="clearfix commodityLogisticsSet">
                            <span class="fl">
                                商品
                            </span>
                            <van-rate class="fr" :size="30" v-model="commodityStar" />
                        </div>
                        <div class="clearfix commodityLogisticsSet">
                             <span class="fl">
                                物流
                            </span>
                            <van-rate class="fr" :size="30" v-model="logisticsStar" />
                        </div>
                    </div>
                    <div class="reasonsEvaluation">
                        <p>
                            <textarea placeholder="说点啥..." v-model="contents"></textarea>
                        </p>
                    </div>
                    <div class="orderToState">
                        <a href="javascript:;"  @click="PopupState=false" class="cancelOrder">取消</a>
                        <a href="javascript:;"  @click="loginFns()"  class="determineOrder">提交</a>
                    </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { login } from "../../../api/simple/index"; //登录
    import { url,urlApi,phsessid,webtitle } from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import { Popup,Row, Col,Rate,Toast  } from 'vant';
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    import { Tab, Tabs } from 'vant';
    export default {
        name: "evaluation",
        components:{},
        data(){
            return{
                onerror:'this.src="' +"../../../../static/skin/default/images/img_default.png"+ '"',//默认图片
                switchTo:"0",//切换
                page:"1",
                loading: false,
                finished: false,
                showpd: false,
                stopData: false,
                status:"0",
                PopupState:false,//评价弹窗
                valuation:[],//未评价列表
                overValuation:[],//已评价列表
                active: 0,
                score_num:[],//评分分数
                id:"",//goods_id商品id
                commodityStar:0,//商品评价打分
                logisticsStar:0,//物流评价打分数
                contents:"",//评价内容
                rost_projects:[],//推荐商品
            }
        },
        computed:{},
        mounted(){
           
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入数据；
            /**评价与未评价转换**/
            appraisedClick(type){
                this.valuation=[];
                this.switchTo=type;
                if(type==0){
                    this.status=0;
                    this.loginFn(this.page,type);
                }else if(type==1){
                    this.status=1;
                    this.loginFn(this.page,type);
                }
            },
            onLoad() {
                var _this=this;
                //异步更新数据
                setTimeout(() => {
                    _this.page++;
                    // 加载状态结束
                    _this.loginFn(_this.page,_this.active);

                }, 500);
            },
            onClick(index, title) {
                this.appraisedClick(index)
            },
            /**未评价**/
            loginFn(page,status) {
                this.valuation=[];
                this.loading = true;
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=valua&parm%5Bpage%5D="+page+"&parm%5Bstatus%5D="+status+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=valua&time="+time+"&rand="+rand+"&parm[page]="+page+"&parm[status]="+status+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.status==200){
                            for(var i=0;i<res.data.data.valuation.length;i++){
                                _this.valuation.push(res.data.data.valuation[i]);
                            }
                            if(res.data.data.valuation.length<20){
                                _this.finished=true;
                            }
                            _this.loading = false;
                        }else {
                            _this.finished=true;
                        }
                        if(_this.valuation.length==0){
                            _this.showpd=true;
                            _this.finished=true;
                            _this.loading = false;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**去评价**/
            to_evaluate(id){
                this.id=id;
                this.PopupState=true;
            },
            /**评论**/
            loginFns() {
                // if(this.contents==""){
                //     Toast("请填写评论！");
                //     return
                // }
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=comment_add&parm%5Bid%5D="+this.id+"&parm%5Bpoint%5D="+this.point+"&parm%5Bcontents%5D="+this.contents+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=comment_add&time="+time+"&rand="+rand+"&parm[id]="+this.id+"&parm[point]="+this.commodityStar+"&parm[logistics_scores]="+this.logisticsStar+"&parm[contents]="+this.contents+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                            Toast(res.data.context);
                            _this.PopupState=false;
                            location.reload();
                        }else{
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
        },
        activated(){
            phsessid();
            this.rHeadText("商品评论");
            webtitle(getStorage("source"),"商品评论");
            this.valuation=[];
            this.page=1;
            this.loginFn(this.page,this.active);
            this.rost_project();
        },
    }
</script>

<style scoped>

</style>