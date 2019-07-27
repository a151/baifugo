<template>
    <div class="bg_Change change_raise_amount">
        <van-cell-group>
            <van-field
                v-model="username"
                clearable
                label="姓名"
                placeholder="姓名"
                @click-icon="$toast('question')"
                :error-message="error_name"
            />

            <van-field
                v-model="ID"
                clearable
                label="身份证"
                placeholder="输入身份证号码"
                @click-icon="$toast('question')"
                :error-message="error_id"
            />
        </van-cell-group>
        <a href="javascript:;" @click="credit_ratingFn" class="submission_info">提 交</a>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { url,phsessid ,webtitle} from "../../../api/simple/index"; //url
    import { Popup ,Toast ,AddressEdit ,NavBar,Area   } from 'vant';
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    export default {
        name: "raise_amount",
        components:{},
        data(){
            return{
                username:"",//姓名
                ID:"",//身份证
                error_name:"", // 错误提示
                error_id:"", // 错误提示
            }
        },
        computed:{},
        mounted(){
            
        },
     
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入数据；
            /**授信提额**/
            credit_ratingFn(flag) {
                if(this.username==''){
                    Toast("请输入正确的姓名！");
                    return
                }else if(this.ID==''){
                    Toast("请输入正确的身份证号！");
                    return
                }
                if(this.error_name!=''){
                    Toast("请输入正确的姓名！");
                    return
                }else if(this.error_id!=''){
                    Toast("请输入正确的身份证号！");
                    return
                }
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=credits_one&parm%5Bname%5D="+this.username+"&parm%5Bidon%5D="+this.ID+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=credits_one&time="+time+"&rand="+rand+"&parm[name]="+this.username+"&parm[idon]="+this.ID+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.$router.push({path: '/index/login/installment_credit_agreement',query:{
                                    jfw_bankcard:res.data.msg.jfw_bankcard,
                                    jfw_idno:res.data.msg.jfw_idno,
                                    jfw_realname:res.data.msg.jfw_realname,
                                    jfw_phone:res.data.msg.jfw_phone,
                                    phone:res.data.msg.phone,
                                    
                                }});
                        }else if(res.data.code!=1){
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
            this.rHeadText("授信提额");
            webtitle(getStorage("source"),"授信提额");
        },
        watch:{
            username(){
                var regName =/^[\u4e00-\u9fa5]{2,10}$/;
                if(!regName.test(this.username)){
                    this.error_name='真实姓名填写有误';
                    return false;
                }else {
                    this.error_name='';
                }
            },
            ID(){
                var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if(!regIdNo.test(this.ID)){
                    this.error_id='身份证号填写有误';
                    return false;
                }else {
                    this.error_id='';
                }
            }
        },
    }
</script>

<style scoped>

</style>