<template>
    <div class="afterSale">
        <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="60">
            <van-tabs @click="onClick" v-model="selectIndex">
                <van-tab :disabled="!disableClick" title="退货" >
                    <div>
                        <div v-for="(item,index) in order_details" class="uc_list_box">
                            <p class="state_p " :class="{'payment':item.status_text!='待审核'&&item.status_text!='待退款'}">
                                <i class="fl"></i>
                                <span class="fl">{{item.status_text}}</span>
                            </p>
                            <p class="uc_p" style="margin-bottom: 2rem">
                                <span>{{item.order_no}}</span>
                                <span>{{item.create_time}}</span>
                            </p>
                            <div class="clearfix commodity_box" style="margin-top: 2rem">
                                <div class="fl commodity_list">
                                    <a href="javascript:;" class="fl commodity_a">
                                        <img :src="item.goods_img" width="50px" height="50px" onerror=''>
                                    </a>
    
                                    <h6 class="fl commodity_h6">
                                        <p class="fz14 commodity_h6_p"><a href="javascript:;">{{item.goods_name}} </a></p>
                                        <p class="gray" >
                                        <span style="line-height: 1rem;">{{item.goods_specification}}</span>
                                        </p>
                                    </h6>
                                </div>
                                <p class="fr fz14 commodity_num">× {{item.goods_num}} 件</p>
                            </div>
                            <div>
                                <div v-show="item.apply_reason!=''&&item.apply_reason!=undefined&&item.apply_reason!=null" class="feedReason">
                                    <span>理由：</span>
                                    <span>{{item.apply_reason}}</span>
                                </div>
                                <dl v-show="item.img.length>0" class="showProblemPictures">
                                    <dt>
                                        <span>图片：</span>
                                    </dt>
                                    <dd v-for="(it,i) in item.img">
                                        <img :src="it">
                                    </dd>
                                </dl>
                            </div>
                           
                            <div v-show="item.feedback!=''&&item.feedback!=undefined&&item.feedback!=null" class="feedback">
                                <p class="clearfix">
                                    <span class="fl">反馈：</span>
                                    <span class="fl">{{item.feedback}}</span>
                                </p>
                            </div>
                            <div v-show="item.mailing_address!=''&&item.mailing_address!=undefined&&item.mailing_address!=null" class="feedback">
                                <p class="clearfix" v-show="item.mailing_address!=''&&item.mailing_address!=undefined&&item.mailing_address!=null">
                                    <span class="fl">邮寄地址：</span>
                                    <span class="fl">{{item.mailing_address}}</span>
                                </p>
                            </div>
                            <div v-show="item.send_back_logis_bill!=''&&item.send_back_logis_bill!=undefined&&item.send_back_logis_bill!=null" class="feedback">
                                <p class="clearfix" v-show="item.send_back_logis_company!=''&&item.send_back_logis_company!=undefined&&item.send_back_logis_company!=null">
                                    <span class="fl">退回物流公司：</span>
                                    <span class="fl">{{item.send_back_logis_company}}</span>
                                </p>
                                <p class="clearfix" v-show="item.send_back_logis_bill!=''&&item.send_back_logis_bill!=undefined&&item.send_back_logis_bill!=null">
                                    <span class="fl">退回物流单号：</span>
                                    <span class="fl">{{item.send_back_logis_bill}}</span>
                                </p>
                            </div>
                            <h3></h3>
                            <div class="operation_box clearfix">
                                <p class="fl pay">
                                    <span>{{item.qtype==1?"退货":"换货"}}</span>
                                </p>
                                <div class="operation_box_modular">
                                    <a href="javascript:;" class="fr toCheck"   v-show="item.can_cancel"    @click="cancelReturns(item.id,item.qtype)">取消</a>
                                    <a href="javascript:;" class="fr toUpdata"  v-show="item.can_logistics" @click="SubmitLogInfor(item.id,item.qtype)">提交物流信息</a>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab :disabled="!disableClick" title="换货">
                    <div>
                        <div v-for="(item,index) in order_details" class="uc_list_box">
                            <p class="state_p " :class="{'payment':item.status_text!='待审核'&&item.status_text!='待退款'}">
                                <i class="fl"></i>
                                <span class="fl">{{item.status_text}}</span>
                            </p>
                            <p class="uc_p" style="margin-bottom: 2rem">
                                <span>{{item.order_no}}</span>
                                <span>{{item.create_time}}</span>
                            </p>
                            <div class="clearfix commodity_box" style="margin-top: 2rem">
                                <div class="fl commodity_list">
                                    <a href="javascript:;" class="fl commodity_a">
                                        <img :src="item.goods_img" width="50px" height="50px" :onerror='onerror'>
                                    </a>
    
                                    <h6 class="fl commodity_h6">
                                        <p class="fz14 commodity_h6_p"><a href="javascript:;">{{item.goods_name}} </a></p>
                                        <p class="gray" >
                                            <span style="line-height: 1rem;">{{item.goods_specification}}</span>
                                        </p>
                                    </h6>
                                </div>
                                <p class="fr fz14 commodity_num">× {{item.goods_num}} 件</p>
                            </div>
                            <div>
                                <div v-show="item.apply_reason!=''&&item.apply_reason!=undefined&&item.apply_reason!=null" class="feedReason">
                                    <span>理由：</span>
                                    <span>{{item.apply_reason}}</span>
                                </div>
                                <dl v-show="item.img.length>0" class="showProblemPictures">
                                    <dt>
                                        <span>图片：</span>
                                    </dt>
                                    <dd v-for="(it,i) in item.img">
                                        <img :src="it">
                                    </dd>
                                </dl>
                            </div>
                            <div v-show="item.feedback!=''&&item.feedback!=undefined&&item.feedback!=null" class="feedback">
                                <p class="clearfix">
                                    <span class="fl">反馈：</span>
                                    <span class="fl">{{item.feedback}}</span>  
                                </p>
                                <p class="clearfix" v-show="item.mailing_address!=''&&item.mailing_address!=undefined&&item.mailing_address!=null">
                                    <span class="fl">邮寄地址：</span>
                                    <span class="fl">{{item.mailing_address}}</span>
                                </p>
                            </div>
                            <div v-show="item.send_back_logis_bill!=''&&item.send_back_logis_bill!=undefined&&item.send_back_logis_bill!=null" class="feedback">
                                <p class="clearfix" v-show="item.send_back_logis_company!=''&&item.send_back_logis_company!=undefined&&item.send_back_logis_company!=null">
                                    <span class="fl">退回物流公司：</span>
                                    <span class="fl">{{item.send_back_logis_company}}</span>
                                </p>
                                <p class="clearfix" v-show="item.send_back_logis_bill!=''&&item.send_back_logis_bill!=undefined&&item.send_back_logis_bill!=null">
                                    <span class="fl">退回物流单号：</span>
                                    <span class="fl">{{item.send_back_logis_bill}}</span>
                                </p>
                            </div>
                            <div v-show="item.send_off_logis_bill!=''&&item.send_off_logis_bill!=undefined&&item.send_off_logis_bill!=null" class="feedback">
                                <p class="clearfix" v-show="item.send_off_logis_company!=''&&item.send_off_logis_company!=undefined&&item.send_off_logis_company!=null">
                                    <span class="fl">寄出物流公司：</span>
                                    <span class="fl">{{item.send_off_logis_company}}</span>
                                </p>
                                <p class="clearfix" v-show="item.send_off_logis_bill!=''&&item.send_off_logis_bill!=undefined&&item.send_off_logis_bill!=null">
                                    <span class="fl">寄出物流单号：</span>
                                    <span class="fl">{{item.send_off_logis_bill}}</span>
                                </p>
                            </div>
                            <h3></h3>
                            <div class="operation_box clearfix">
                                <p class="fl pay">
                                    <span>{{item.qtype==1?"退货":"换货"}}</span>
                                </p>
                                <div class="operation_box_modular">
                                    <a href="javascript:;" class="fr toCheck"   v-show="item.can_cancel"    @click="cancelReturns(item.id,item.qtype)">取消</a>
                                    <a href="javascript:;" class="fr toUpdata"  v-show="item.can_logistics" @click="SubmitLogInfor(item.id,item.qtype)">提交物流信息</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
            <div class="list-group-show" v-show="showpd">
                <div class="no_order">
                    <img src="../../../../static/skin/default/images/no_order.png" height="340" width="384"/>
                    <p>空空如也～</p>
                    <span>赶快去逛一逛，挑选你中意的物品吧！</span>
                </div>
                <div class="form-group has-feedback">
                    <a @click="pathTo()"  class="btn b-danger btn-sm b-danger-edit" href="javascript:void(0)">再去逛逛</a>
                </div>
            </div>
        </van-list>
        <van-popup v-model="PopupState">
            <!--取消订单-->
            <div>
                <div class="cancellingOrders">
                    <p>
                        <img src="../../../../static/skin/default/images/logistics-ico.png">
                    </p>
                    <h6>请提交退回商品的物流信息</h6>
                </div>
                <div class="purchaseTips purchaseTipsLogistics">
                    <p>
                       <input type="text" placeholder="物流公司" v-model="logis_company">
                    </p>
                    <p>
                        <input type="number" placeholder="物流单号" v-model="logis_bill">
                    </p>
                </div>
                <div class="orderToState orderToStateLogistics">
                    <a href="javascript:;"   class="cancelPop"      @click="PopupState=false">取消</a>
                    <a href="javascript:;"   class="determineOrder" @click="submissionLogistics()">提交</a>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { Search ,Popup,Swipe,Toast, SwipeItem,PullRefresh,List,Tab, Tabs,NoticeBar,Icon } from 'vant';
    import { login } from "../../../api/simple/index"; //登录
    import { url,phsessid,webtitle } from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    export default {
        name: "afterSale",
        components:{},
        data(){
            return{
                onerror:'this.src="' +"../../../../static/skin/default/images/img_default.png"+ '"',//默认图片
                order_details:[],//订单详情
                selectIndex:0,
                page:1,//分页
                onClickIndex:1, //点击切换
                disableClick:true,//是否可以切换
                loading: false,
                finished: false,
                showpd: false,
                stopData: false,
                PopupState:false, //回填物流单号
                goodsId:"",       //商品id
                qtype:"",         //退货或者换货
                logis_company:"" ,//物流公司
                logis_bill:"" ,   //物流单号
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
            order_listFn(page,index){
                this.disableClick=false;
                this.loading = true;
                var _this=this;
                _this.showpd=false;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=refunds_index&%5Bpage%5D="+page+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=refunds_index&time="+time+"&rand="+rand+"&page="+page+"&qtype="+index+"&sign="+sign;
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
                        }else{
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
                this.order_details=[];
                this.finished=false;
                this.loading = true;
                this.page=1;
                this.onClickIndex=index+1;
                this.order_listFn(1,index+1);
            },
            /**退货和换货取消**/
            cancelReturns(id,qtype){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=refunds_del&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=refunds_del&time="+time+"&rand="+rand+"&id="+id+"&qtype="+qtype+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                       if(res.data.status==1){
                           Toast(res.data.msg);
                           window.location.reload();
                       }else {
                           Toast(res.data.msg); 
                       }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**点击提交物流信息**/
            SubmitLogInfor(id,qtype){
                this.PopupState=true;
                this.goodsId=id;
                this.qtype=qtype;
            },
            /**提交物流信息**/
            submissionLogistics(){
                if(this.logis_company==""){
                    Toast("物流公司不能为空！");
                    return
                }
                if(this.logis_bill==""){
                    Toast("物流单号不能为空！");
                    return
                }
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=logistics_save&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=logistics_save&time="+time+"&rand="+rand+"&id="+this.goodsId+"&qtype="+this.qtype+"&logis_company="+this.logis_company+"&logis_bill="+this.logis_bill+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                            Toast(res.data.msg);
                            _this.PopupState=false;
                            window.location.reload();
                        }else {
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**动态改变url**/
            newQueryFn(){
                let query = this.$router.history.current.query;
                let path = this.$router.history.current.path;
                //对象的拷贝
                let newQuery = JSON.parse(JSON.stringify(query));
                newQuery.state = this.onClickIndex-1;
                this.$router.replace({ path, query: newQuery });
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
        },
        activated(){
            phsessid();
            this.rHeadText("售后");
            webtitle(getStorage("source"),"售后");
            this.order_details=[];
            this.rbottomSelection(3);
            this.finished=false;
            this.loading = true;
            this.page=1;
            this.state=this.$route.query.state;
            this.selectIndex=this.state;
            this.order_listFn(1,parseInt(this.state)+1)
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