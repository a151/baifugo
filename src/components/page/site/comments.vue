<template>
    <!--{set:$top_name = "商品评论"}-->
    <div class="body_page_box">

        <div v-for="(item,index) in goodsList" class="list-group">
            <div class="list-group-item">
                <div class="media">
                    <div class="media-left media-middle">
                        <router-link exact :to="{path:'/index/products',query:{id:item.goods_id}}"><img :src="item.img"/></router-link>
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading"><router-link exact :to="{path:'/index/products',query:{id:item.goods_id}}">{{item.name}}</router-link></h4>
                        <p class="f_favor">￥{{item.sell_price}}</p>
                        <div class="ly_store" style="padding-left:0px;"><p>评论数：{{item._hash}}条</p></div>
                       
                    </div>
                </div>
            </div>
        </div>
            <input type="hidden" name="id" value="{$this->comment['id']}" />
            <div class="form-group has-feedback">
                <label class="control-label">评论等级</label>
                <label @click="scoreClick(5)" class="point_box"><span><input name="point" class="radio" type="radio" value="5" checked="checked" /></span><i class="iconfont lyred">&#xe93b;</i><i class="iconfont lyred">&#xe93b;</i><i class="iconfont lyred">&#xe93b;</i><i class="iconfont lyred">&#xe93b;</i><i class="iconfont lyred">&#xe93b;</i><span>5分</span></label>
                <label @click="scoreClick(4)" class="point_box"><span><input name="point" class="radio" type="radio" value="4" /></span><i class="iconfont lyred">&#xe93b;</i><i class="iconfont lyred">&#xe93b;</i><i class="iconfont lyred">&#xe93b;</i><i class="iconfont lyred">&#xe93b;</i><span>4分</span></label>
                <label @click="scoreClick(3)" class="point_box"><span><input name="point" class="radio" type="radio" value="3" /></span><i class="iconfont lyred">&#xe93b;</i><i class="iconfont lyred">&#xe93b;</i><i class="iconfont lyred">&#xe93b;</i><span>3分</span></label>
                <label @click="scoreClick(2)" class="point_box"><span><input name="point" class="radio" type="radio" value="2" /></span><i class="iconfont lyred">&#xe93b;</i><i class="iconfont lyred">&#xe93b;</i><span>2分</span></label>
                <label @click="scoreClick(1)" class="point_box"><span><input name="point" class="radio" type="radio" value="1" /></span><i class="iconfont lyred">&#xe93b;</i><span>1分</span></label>
            </div>
            <div class="form-group has-feedback">
                <label class="control-label">评论内容</label>
                <textarea v-model="contents" name="contents" rows="5" class="form-control" id="contents"></textarea>
            </div>
            <div class="form-group has-feedback">
                <input @click="loginFn()" class="btn btn-warning btn-lg btn-block" type="button" value="提交评论" />
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
        name: "comments",
        components:{},
        data(){
            return{
                id:"",//评论的id
                point:"5",//评论的分数
                contents:"",//评价内容
                goodsList:[],//详情页面
            }
        },
        computed:{},
        mounted(){
            this.rHeadText("商品评论");
           
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入数据；
            /**选择分数**/
            scoreClick(type){
                this.point=type;
            },
            /**商品评价详情**/
            comment_details(){
                this.id=this.$route.query.id;
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=valua_details&parm%5Bpage%5D="+1+"&parm%5Bstatus%5D="+0+"&parm%5Bid%5D="+this.id+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=valua_details&time="+time+"&rand="+rand+"&parm[page]="+1+"&parm[status]="+0+"&parm[id]="+this.id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status=="success"){
                            _this.goodsList=res.data.data.valuation;
                        }else{
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**评论**/
            loginFn(flag) {
                if(this.contents==""){
                    Toast("请填写评论！");
                    return
                }
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=comment_add&parm%5Bid%5D="+this.id+"&parm%5Bpoint%5D="+this.point+"&parm%5Bcontents%5D="+this.contents+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=comment_add&time="+time+"&rand="+rand+"&parm[id]="+this.id+"&parm[point]="+this.point+"&parm[contents]="+this.contents+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.data.status==1){
                            Toast(res.data.data.context);
                            _this.$router.push({path: '/index/login/comments_list',query:{id:_this.id}});
                        }else{
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
        },
        activated(){
            phsessid();
            this.id=this.$route.query.id;
            webtitle(getStorage("source"),"评论");
            this.comment_details();
        },
        watch:{

        },
    }
</script>

<style scoped>

</style>