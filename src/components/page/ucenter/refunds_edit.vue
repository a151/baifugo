<template>
 
    <div class="body_page_box returnGoodsBox">
        
        <div class="returnGoodsDetails">
            <div  class="uc_list_box">
                <p class="uc_p">
                    <span>订单 {{refunds_details!=null&&refunds_details!=''?refunds_details.order_no:''}}</span>
                </p>
                <div  class="clearfix commodity_box">
                    <div class="fl commodity_list">
                        <a href="javascript:;" class="fl commodity_a">
                            <img :src="refunds_details.img" width="50px" height="50px" :onerror='onerror'>
                        </a>
                        <h6 class="fl commodity_h6">
                            <p class="fz14 commodity_h6_refund commodity_h6_Txt"><a href="javascript:;">{{refunds_details.goods_name}} </a></p>
                            <p class="gray" >
                                <span style="line-height: 1rem;">{{refunds_details.goods_value}}</span>
                            </p>
                        </h6>
                    </div>
                    <p class="fr fz14 commodity_num">× {{refunds_details.goods_nums}}件</p>
                </div>
            </div>
            <div class="replacementQuantity clearfix">
                <p class="fl">申请{{type=='refund'?'退':'换'}}</p>
                <p class="steppingDevice fl">
                    <span  @click="reduceClick()">-</span>
                    <input @input="fbBlur()" type="number" value="1" v-model="numberData">
                    <span  @click="plusClick()">＋</span>
                </p>
                <p class="fl">件商品，剩余<span class="red">{{parseInt(refunds_details.returnable_num)-parseInt(numberData)}}</span>件 </p>
            </div>
            <p v-show="type=='refund'" class="estimatedRefund"><span class=" ">预计退款</span><span class="red">￥{{parseInt(numberData) == parseInt(refunds_details.returnable_num)?refunds_details.money : (parseFloat(refunds_details.unit_price)*parseInt(numberData)).toFixed(2)}}</span></p>
        </div>
        <div class="returnGoodsOperation">
            <div>
                <p class="refundTittle">请填写<span>{{type=='refund'?'退货':'换货'}}</span>理由并上传至少3张问题图片，以备审核</p>
                <textarea  v-model="content" class="textareaRefund" :placeholder="reason"  name="content" id="content" style="width:100%;height:120px;" pattern="required"></textarea>
            </div>
            <ul class="clearfix picturesUl">
                <li class="upload_pictures">
                    <van-uploader :after-read="onRead" accept="image/*" multiple>
                        <van-icon name="photograph" />
                    </van-uploader>
                    <span class="problem_pic">上传问题图片</span>
                </li>
                <li v-for="(item,index) in pictureArray" :key="index">
                    <div class="van-sku-img-uploader__img">
                        <img :src="item">
                        <i class="van-icon van-icon-clear van-sku-img-uploader__delete" @click="deletePic(index)"></i>
                    </div>
                </li>
            </ul>
            <div class="submission_btn">
                <a href="javascript:;" @click="checkForm()" id="submit">提交</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { login,change } from "../../../api/simple/index"; //登录
    import { url,phsessid,webtitle,urlI } from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    import { Popup ,Toast,Stepper,Uploader } from 'vant';
    import { quillEditor } from 'vue-quill-editor'
    export default {
        name: "refunds_edit",
        components:{},
        data(){
            return{
                onerror:'this.src="' +"./static/skin/default/images/img_default.png"+ '"',//默认图片
                checked:[],//商品选中
                order_id:"",//订单商品
                type:"",    //退货或者换货
                reason: '',
                refunds_details:{},//退款详情
                content:"",//复选框内容
                editorOption:{},
                order_goods_id:[],//商品
                numberData:1,//替换数量
                pictureArray:[],//图片数组
            }
        },
        computed:{},
        mounted(){
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入数据；
            /**订单申请**/
            registerFn(flag) {
                this.order_goods_id=[];
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=refunds_edit&parm%5Border_id%5D="+this.order_id+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=refunds_edit&time="+time+"&rand="+rand+"&order_id="+this.order_id+"&type="+this.type+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.refunds_details=res.data.value;
                            for(var i=0;i<res.data.goods_list.length;i++){
                                _this.order_goods_id.push(res.data.goods_list[i].id);
                            }
                        }else if(res.data.code!=1){
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**减少**/
            reduceClick(){
                if(this.numberData<=0){
                    this.numberData=0;
                }else {
                    this.numberData--; 
                }
               
            },
            /**输入**/
            fbBlur(){
                this.numberData=this.numberData.replace(/[^0-9.]+/,'');
                if(this.refunds_details.returnable_num<=this.numberData){
                    this.numberData=this.refunds_details.returnable_num;
                }
                if(this.numberData<=1){
                    this.numberData=1;
                }
            },
            /**增加**/
            plusClick(){
                if(this.refunds_details.returnable_num<=this.numberData){
                    this.numberData=this.refunds_details.returnable_num;
                }else {
                    this.numberData++;  
                }
            },
            /**选择商品**/
            /**提交退款换货**/
            checkForm(flag) {
                if(this.numberData<=0){
                    Toast("亲~退换货数量不能少于1~");
                    return
                }
                if(this.content==""){
                    Toast("请输入退换理由~");
                    return 
                }
                var patterns = new RegExp("[@#\\$%\\^&\\*<]","i");
                if(this.content!=""){
                    if(patterns.test(this.content)){
                        Toast("含有非法字符！")
                        return
                    }
                }
                if(this.pictureArray.length<3){
                    Toast("亲~问题图片不能少于3张");
                    return
                }
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=refunds_edit_save&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm={
                    method:"refunds_edit_save",
                    time:time,
                    rand:rand,
                    type:this.type,
                    order_id:this.order_id,
                    content:this.content,
                    imgbase64:this.pictureArray,
                    goods_num:this.numberData,
                    sign:sign
                };
                change(parm)
                    .then(function (res) {
                        if(res.status==200){
                            if(res.data.code==1){
                                if(_this.type=="replace"){
                                    _this.$router.push({path:'/index/login/afterSale',query:{state:1}});
                                }else if(_this.type=="refund"){
                                    _this.$router.push({path:'/index/login/afterSale',query:{state:0}});
                                }
                            }
                            Toast(res.data.msg);
                        }else {
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**图片删除**/
            deletePic(index){
                this.pictureArray.splice(index,1);
            },
            /**上传图片读取**/
            onRead(file) {
                if(file.length===undefined){
                    this.pictureArray.push(file.content);
                }else {
                    for(var i=0;i<file.length;i++){
                        this.pictureArray.push(file[i].content);
                    }

                }
            },
            /**退款换货申请提交**/
            applicationSubmission(){}
        },
        activated() {
            phsessid();
            this.rHeadText(this.$route.query.type == 'refund'?'请输入退货理由':'请输入换货理由');
            webtitle(getStorage("source"),this.$route.query.type == 'refund'?'请输入退货理由':'请输入换货理由');
            $(".van-icon-photograph input").attr("capture","camera");
            this.content="";
            this.order_id=this.$route.query.id;
            this.type=this.$route.query.type;
            this.reason = this.$route.query.type == 'refund'?'请输入退货理由':'请输入换货理由';
            this.registerFn();
            setTimeout(function () {
                if(getStorage("source") == 'ios'&&getStorage("version") == 'null'){
                    $(".returnGoodsOperation").css("paddingBottom","7.4rem");
                }else {
                    $(".returnGoodsOperation").css("paddingBottom","1.4rem");
                }
            },400)
        },
        watch:{
            type() {
                this.rHeadText(this.$route.query.type == 'refund'?'订单申请退货':'订单申请换货');
                webtitle(getStorage("source"),this.$route.query.type == 'refund'?'订单申请退货':'订单申请换货');
            }
        },
    }
</script>


<style scoped>
    .list-group-item-heading span{
        width: 95%;
    }
</style>