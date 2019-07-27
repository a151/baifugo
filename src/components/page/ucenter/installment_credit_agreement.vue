<template>
    <div class="bg_Change pd_Change">
        
        <p class="read_title">阅读并完成授权，即可使用授信提额在百福购平台消费</p>
        <h3 class="raise_title">分期授信协议</h3>
        <p class="read_content">
            质押性质，p2p出借人统一将其在p2p平台账户中总资产的80%的额度，用于百福购平台的分期授信额度使用，如授信后用信支付，则应在规定期限内偿还本息 质押性质，
        </p>
        <p class="read_content">
            p2p出借人统一将其在p2p平台账户中总资产的80%的额度，用于百福购平台的分期授信额度使用，如授信后用信支付，则应在规定期限内偿还本息
        </p>
        <div class="read_tips">
            <p>点击“获取验证码”，</p>
            <p>百福购将向您<span class="to_red">{{jfw_phone}}</span>的手机发送验证短信，</p>
            <p>输入验证码并点击“授权用信”，</p>
            <p>即代表您已同意授权使用《授信协议》</p>
        </div>
        <div class="verification_code clearfix">
            <input type="text" placeholder="验证码" v-model="mobile_code"/>
            <button id="sendNewEmail" @click="send_message_mobileFn()">获取验证码</button>
        </div>
        <a href="javascript:;" class="submission_ins_to" @click="letter_creditClick()">授权用信</a>
        <a href="javascript:;" class="submission_ins_del">取消</a>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { url,phsessid,webtitle } from "../../../api/simple/index"; //url
    import { Popup ,Toast ,AddressEdit ,NavBar,Area   } from 'vant';
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    let Base64 = require('js-base64').Base64;
    import axios from 'axios';
    export default {
        name: "installment_credit_agreement",
        components:{},
        data(){
            return{
                jfw_bankcard:"",//卡号
                jfw_idno:"",    //身份证号
                jfw_realname:"",//姓名
                jfw_phone:"",   //省略手机号
                phone:"",       //手机号
                mobile_code:"",        //手机验证码
            }
        },
        computed:{},
        mounted(){
           
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入左侧数字数据；
            /**点击验证码**/
            time(wait) {
                var _this=this;
                var $this = $("#sendNewEmail");
                if (wait == 0) {
                    $this.css("color","#5887FB");
                    $this.html("发送验证码");
                    wait = 60;
                } else {
                    $this.css("color","#999999");
                    $this.html("重新发送(" + wait + ")");
                    wait--;
                    setTimeout(function() {
                            _this.time(wait)
                        },
                        1000)
                }
            },
            /**手机验证码**/
            send_message_mobileFn(){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=sendRegMobileCode&parm%5Bmobile%5D="+this.phone+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=sendRegMobileCode&time="+time+"&rand="+rand+"&parm[mobile]="+this.phone+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code=="1"){
                            _this.time(60);
                        }else if(res.data.code==0){
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**授信**/
            letter_creditClick(flag) {
                if(this.mobile_code==""||this.mobile_code==null||this.mobile_code==undefined){
                    Toast("验证码不正确！");
                    return
                }
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=credit_two&parm%5Bmobile_code%5D="+this.mobile_code+"&parm%5Bmobile%5D="+this.phone+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=credit_two&time="+time+"&rand="+rand+"&parm[mobile_code]="+this.mobile_code+"&parm[mobile]="+this.phone+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            if(res.data.msg.retCode==1){
                                Toast(res.data.msg.retMsg);
                                _this.$router.push({path: '/index/login/raise_amount_to',query:{credit_money:res.data.msg.credit_money,jfw_user_info:JSON.stringify(res.data.msg.jfw_user_info),total_credit_money:res.data.msg.total_credit_money}});
                            }else{
                                Toast(res.data.msg.retMsg);
                            }
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
            this.jfw_bankcard=this.$route.query.jfw_bankcard;
            this.jfw_idno=this.$route.query.jfw_idno;
            this.jfw_realname=this.$route.query.jfw_realname;
            this.jfw_phone=this.$route.query.jfw_phone;
            this.phone=this.$route.query.phone;
        },
        watch:{
           
        },
    }
</script>

<style scoped>

</style>