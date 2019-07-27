<template>
    <div class="ly_por_box ">
        <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="60">
        <!--商品排列展示-->
        <div class="display_top">
            <div class="nav_toolbar">
                <div class="ybtn select-ico-ybtn" :class="{'current':order=='sale'}" @click="screenClick('sale')" id="order_sale">
                    <a href="javascript:;" class="clearfix">
                        <p>
                            <span class="fl">销量</span><i class="fl select-ico" :class="{'up':byInit=='saleasc','down':byInit=='saledesc'}"></i>   
                        </p>
                    </a>
                </div>
                <div class="ybtn select-ico-ybtn" :class="{'current':order=='cpoint'}" @click="screenClick('cpoint')" id="order_cpoint">
                    <a href="javascript:;" class="clearfix">
                        <p>
                            <span class="fl">评分</span><i class="fl select-ico" :class="{'up':byInit=='cpointasc','down':byInit=='cpointdesc'}"></i>
                        </p>
                    </a>
                </div>
                <div class="ybtn select-ico-ybtn" :class="{'current':order=='price'}" @click="screenClick('price')" id="order_price">
                    <a href="javascript:;" class="clearfix">
                        <p>
                            <span class="fl">价格</span><i class="fl select-ico" :class="{'up':byInit=='priceasc','down':byInit=='pricedesc'}"></i>
                        </p>
                    </a>
                </div>
                <div class="ybtn select-ico-ybtn" :class="{'current':order=='new'}" @click="screenClick('new')" id="order_new">
                    <a href="javascript:;" class="clearfix">
                        <p>
                            <span class="fl">最新上架</span><i class="fl select-ico" :class="{'up':byInit=='newasc','down':byInit=='newdesc'}"></i>
                        </p>
                    </a>
                </div>
            </div>
            <a v-show="changeChoic==0" @click="exhibitionClick(1)" class="show_s" href="javascript:;" title="列表展示" alt="列表展示"><i class="iconfont"></i></a>
            <a v-show="changeChoic==1" @click="exhibitionClick(0)" class="show_b" href="javascript:;" title="橱窗展示" alt="橱窗展示"><i class="iconfont"></i></a>
            
        </div>
        <div class="por_find_list">
            <!--商品条件筛选-->
            <ul  class="clearfix" v-show="goods_list!=''&&goods_list!=null&&goods_list!=undefined&&goods_list.length!=0&&changeChoic==0">
                <li v-for="(item,index) in goods_list" name="goodsItems" class="win">
                    <a @click="pathTos(urlApis+'index/products?id='+item.id,item.id)" class="pic" >
                        <img class="lazyload" :src="item.img" :alt="item.name" :title="item.name" :onerror="onerror"/>
                    </a>
                    <div class="r_text">
                        <h3 class="title"><a @click="pathTos(urlApis+'index/products?id='+item.id,item.id)">{{item.name}}</a></h3>
                        <div class="price">
                            <b>￥{{item.sell_price}}</b>
                            <!-- <s>￥{{item.market_price}}</s> -->
                        </div>
                        <div class="handle">
                            <input type="button" class="bt1" value="加入购物车" >
                            <input type="button" class="bt2" value="收藏">
                        </div>
                    </div>
                </li>
            </ul>
            <ul v-show="goods_list!=''&&goods_list!=null&&goods_list!=undefined&&goods_list.length!=0&&changeChoic==1" class="clearfix" style="display: none">
                <li v-for="(item,index) in goods_list" name="goodsItems" class="list">
                    <a @click="pathTos(urlApis+'index/products?id='+item.id,item.id)" class="pic">
                        <img class="lazyload" :src="item.img" :alt="item.name" :title="item.name" :onerror="onerror"/>
                    </a>
                    <div class="r_text">
                        <h3 class="title"><a  @click="pathTos(urlApis+'index/products?id='+item.id,item.id)">{{item.name}}</a></h3>
                        <div class="price"><b>￥{{item.sell_price}}</b></div>
                        <div class="handle"  style="display: none">
                            <input type="button" class="bt1" value="加入购物车">
                            <input type="button" class="bt2" value="收藏">
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!--商品列表展示-->
        </van-list>
        <div v-show="showpd" class="ly_row">
            <div class="ly_row_img">
                <img src="../../../../static/skin/default/images/nothing-ico.png"/>
                <p>暂无搜索结果</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex";      //改变数据状态
    import { login } from "../../../api/simple/index";//登录
    import { url,urlApi,phsessid,equipments,webtitle,getUrls} from "../../../api/simple/index";  //url
    import { Search ,Popup,Swipe, SwipeItem,PullRefresh,List,Lazyload } from 'vant';
    import { setStorage,getStorage } from 'src/common/mUtils'
    import md5 from 'js-md5';                           //md5加密
    import axios from 'axios';
    export default {
        name: "pro_list",
        components:{},
        data(){ return{
            onerror:'this.src="' +"../../../../static/skin/default/images/img_default.png"+ '"',//默认图片
            pageTitle:"",//标题
            page:1,//分页
            order:"site",//筛选
            by:"asc",//排序方式
            byInit:"",//排序初始化
            goods_list:[],//商品列表
            changeChoic:0,//转换形式
            isLoading: true,
            loading: false,
            finished: false,
            urlApis:"",
            showpd:false
        }},
        computed:{},
        mounted(){
          
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入数据；
            /**商品列表**/
            goodsListFn(page,order,by){
                this.loading = true;
                this.id=this.$route.query.id;
                var _this=this;
                _this.showpd=false;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=pro_list&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=pro_list&time="+time+"&rand="+rand+"&cat="+this.id+"&page="+page+"&order="+order+"&by="+by+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.pageTitle=res.data.value.cat_name;
                            _this.rHeadText(_this.pageTitle);
                            for(var i=0;i<res.data.value.list.length;i++){
                                _this.goods_list.push(res.data.value.list[i]);
                            }
                            _this.loading = false;
                            if(res.data.value.list.length==0){
                                _this.finished=true;
                            }
                            if(res.data.value.list.length<20){
                                _this.loading = false;
                                _this.finished=true;
                            }
                        }else {
                            _this.loading = false;
                        }
                        if(_this.goods_list.length==0){
                            _this.showpd=true;//无数据显示
                            _this.finished=true;//完成加载
                        }

                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**点击转换列表**/
            exhibitionClick(type){
                this.changeChoic=type;
            },
            /**筛选**/
            screenClick(type){
                this.finished=false;
                this.page=1;
                this.goods_list=[];
                // if(type=="price"){
                    if(this.order==type){
                        if(this.by=="desc"){
                            this.by="asc";
                            this.byInit=type+"asc"
                        }else {
                            this.by="desc";
                            this.byInit=type+"desc"
                        }
                        this.goodsListFn(this.page,this.order,this.by);
                    }else {
                        this.by="asc";
                        this.byInit=type+"asc";
                        this.order=type;
                        this.goodsListFn(this.page,this.order,this.by);
                    } 
                // }else {
                //     this.by="asc";
                //     this.byInit=type+"asc";
                //     this.order=type;
                //     this.goodsListFn(this.page,this.order,this.by);
                // }
            },
            /**下滑加载**/
            onLoad() {
                var _this=this;
                //异步更新数据
                setTimeout(() => {
                    // 加载状态结束
                    _this.page++;
                    _this.goodsListFn(_this.page,_this.order,_this.by);
                }, 500);
            },
            pathTos(url,id){
                if(getStorage("source")=="ios"){
                    this.$router.push({path:'/index/products',query:{id:id}});//商品详情
                }else if(getStorage("source")=="android") {
                    this.$router.push({path:'/index/products',query:{id:id}});//商品详情
                }else {
                    this.$router.push({path:'/index/products',query:{id:id}});//商品详情
                }
            },
            widthChange(){
                // $('.pic img').height($('.pic img').width());
            }
        },
        activated(){
            phsessid();
            this.page=1;
            this.loading = false;
            this.goods_list=[];
            this.urlApis=urlApi;
            this.rHeadText("商品搜索");
            webtitle(getStorage("source"),"商品搜索");
            this.finished=false;
            this.goodsListFn(1,"site","asc")
        },
        updated(){
            this.widthChange();
        },
        watch:{
            
        },
    }
</script>

<style scoped>

</style>