<template>
    <div class="body_page_box">
        <ul class="list-group">
            <li class="list-group-item">订单号：{{refund_data.order_no}}</li>
            <li class="list-group-item">处理结果： {{refund_data.pay_status}}</li>
            <li class="list-group-item">
                退款商品：
                <p v-for="(item,index) in refund_data.goods"><router-link exact :to="{path:'/index/login/refunds_detail',query:{id:item.id}}"> {{item}}</router-link></p>
            </li>
            <li class="list-group-item">申请时间：{{refund_data.time}}</li>
            <li class="list-group-item">退款金额：{{refund_data.amount}}</li>
            <li class="list-group-item">处理时间：{{refund_data.dispose_time}}
            </li>
            <li class="list-group-item">处理建议：{{refund_data.dispose_idea}}
            </li>
            <li class="list-group-item">退款原因：<span v-html="refund_data.content"></span></li>
        </ul>
        <!--<div class="form-group has-feedback">-->
            <!--<input class="btn btn-warning btn-lg btn-block" type="submit" @click="backClick()" value="返 回" />-->
        <!--</div>-->
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex";      //改变数据状态
    import { login } from "../../../api/simple/index";//登录
    import { url,phsessid,webtitle } from "../../../api/simple/index";  //url
    import { Search ,Popup,Swipe, SwipeItem,PullRefresh,List } from 'vant';
    import { setStorage,getStorage } from 'src/common/mUtils'
    import md5 from 'js-md5';                           //md5加密
    import axios from 'axios';
    export default {
        name: "refunds_detail",
        components:{},
        data(){
            return{
                id:"",//订单id
                refund_data:"",//退款商品数据
            }
        },
        computed:{},
        mounted(){
          
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入数据；
            order_listFn(){
                this.id=this.$route.query.id;
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=refunds_detail&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=refunds_detail&time="+time+"&rand="+rand+"&id="+this.id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status=="1"){
                           _this.refund_data=res.data.data;
                        }else if(res.data.code!=1){
                           
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**返回**/
            backClick(){
                this.$router.push("/index/login/refunds");
            }
        },
        activated(){
            phsessid();
            this.rHeadText("退款详情");
            webtitle(getStorage("source"),"退款详情");
            this.order_listFn();
        },
        watch:{
            $route:"order_listFn"
        },
    }
</script>

<style scoped>

</style>