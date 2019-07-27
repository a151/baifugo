<template>
    <!--{set:$top_name = "商品评论列表"}-->
    <div class="body_page_box">
        <div class="list-group">
            <div v-for="(item,index) in goodsList" class="list-group-item">
                <div class="media">
                    <div class="media-left media-middle">
                        <router-link exact :to="{path:'/index/products',query:{id:item.goods_id}}"><img :src="item.img"/></router-link>
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading"><router-link exact :to="{path:'/index/products',query:{id:item.goods_id}}">{{item.name}}</router-link></h4>
                        <p class="f_favor">￥{{item.sell_price}}</p>
                        <div class="ly_store" style="padding-left:0px;"><p>评论数：{{commentCount.comment_total}}条</p></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="btn-group btn-group-justified" style="margin-bottom:12px;">
            <div class="btn-group ">
                <div @click="changeClick(0)" class="btn" :class="{'btn-warning':changeGoods==0,'b-default':changeGoods!=0}"><a href="javascript:;">全部({{commentCount.comment_total}}条)</a></div>
            </div>
            <div class="btn-group">
                <div @click="changeClick(3)"  class="btn" :class="{'btn-warning':changeGoods==3,'b-default':changeGoods!=3}"><a href="javascript:;">好({{commentCount.point_grade.good}}条)</a></div>
            </div>
            <div class="btn-group">
                <div @click="changeClick(2)"  class="btn" :class="{'btn-warning':changeGoods==2,'b-default':changeGoods!=2}"><a href="javascript:;">中({{commentCount.point_grade.middle}}条)</a></div>
            </div>
            <div class="btn-group">
                <div @click="changeClick(1)"  class="btn" :class="{'btn-warning':changeGoods==1,'b-default':changeGoods!=1}"><a href="javascript:;">差({{commentCount.point_grade.bad}}条)</a></div>
            </div>
        </div>

        <div class="list-group">
            <div v-for="(item,index) in commodityEvaluation" class="list-group-item">
                <div class="media">
                    <div class="media-left media-middle">
                        <img :src="item.head_ico" width="70px" height="70px"  />
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading"><strong>{{item.username}}</strong></h4>
                        <span>{{item.time}}</span>
                        <div class="ly_store" style="padding-left:0px;"><p>评分：{{item.point}}</p></div>
                        <p style="padding-left:0px;"><b>评语：</b><span class="gray">{{item.contents}}</span></p>
                        <p v-show="item.recontents" class="prompt" style="margin-top:5px;"><b>回复：</b><span class="gray">{{item.recontents}}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { login } from "../../../api/simple/index"; //登录
    import { url,phsessid,webtitle } from "../../../api/simple/index"; //url
    import { Popup ,Toast ,AddressEdit,AddressList ,NavBar,Area  } from 'vant';
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    export default {
        name: "comments_list",
        components:{},
        data(){
            return{
                id:"",//商品id
                goodsList:[],//商品列表
                commodityEvaluation:[],//商品全部列表
                changeGoods:0,//商品切换
                commentCount:{},//好 中 坏
            }
        },
        computed:{},
        mounted(){
            
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入数据；
            /**商品评价详情**/
            comment_details(){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=valua_details&parm%5Bpage%5D="+1+"&parm%5Bstatus%5D="+0+"&parm%5Bid%5D="+this.id+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=valua_details&time="+time+"&rand="+rand+"&parm[page]="+1+"&parm[status]="+0+"&parm[id]="+this.id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status=="success"){
                            _this.goodsList=res.data.data.valuation;
                            _this.commodity_evaluation();
                        }else{
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**商品评价**/
            commodity_evaluation(){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=comment_ajax&parm%5Bgoods_id%5D="+this.goodsList[0].goods_id+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=comment_ajax&time="+time+"&rand="+rand+"&parm[goods_id]="+this.goodsList[0].goods_id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.status==200){
                            _this.commodityEvaluation=res.data.data.data;
                            _this.commentCount=res.data.data.commentCount;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**好 中 坏切换**/
            changeClick(type){
                this.changeGoods=type;
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=comments_list_classification&parm%5Bid%5D="+this.goodsList[0].goods_id+"&parm%5Btype%5D="+type+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=comments_list_classification&time="+time+"&rand="+rand+"&parm[id]="+this.goodsList[0].goods_id+"&parm[type]="+type+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.status==200){
                            if(res.data.data.length==0){
                                _this.commodityEvaluation=[];  
                            }else {
                                _this.commodityEvaluation=res.data.data;
                            }
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
        },
        activated(){
            phsessid()
            this.rHeadText("商品评价列表");
            webtitle(getStorage("source"),"商品评价列表");
            this.id=this.$route.query.id;
            this.comment_details();
          
            },
        watch:{},
    }
</script>

<style scoped>

</style>