<template>
    <div class="reg_new">
        <div class="header_top header_login">
            <a id="kros_user" class="iconfont" href="javascript:void(0)" onclick="window.history.back();" title="返回"></a>
            <span class="headline">忘记密码</span>
            <a class=" iconfont_search" href="javascript:void(0)"  title="搜索">&#xe769;</a>
        </div>
        <!--<div class="login_top_bg">-->
           <!--<img src="../../../../static/skin/default/images/login_bg.jpg" width="100%"/>-->
            <!--<p><span>会员登录</span></p>-->
        <!--</div>-->

        <div class="body_page_box">
            <div>
                <div class="cell-phone_number">
                    <input type="text" v-model="mobile" class="auto-control" name=""  placeholder="填写手机号" value="" pattern='required' alt='填写手机号' maxlength="11" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                    onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/>
                </div>
                <div class="cell-phone_number">
                    <input v-model="mobile_code" type="text"  class="auto-control"  placeholder="请输入验证码"  name="" pattern='^\S{6,32}$' alt='填写密码'/>
                    <span @click="send_message_mobileFn()" id="sendNewEmail" class="get_verification_code" >获取验证码</span>
                </div>
                <p class="forget_password"></p>
            </div>
            <div class="">
                <a @click="registerFn()" :class="{'next_btn':mobile==''||mobile_code==''}" class="login_btn "  href="javascript:;">下一步</a>
            </div>
        </div>
       
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { login } from "../../../api/simple/index"; //登录
    import { url,phsessid,webtitle } from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    import { Popup ,Toast  } from 'vant';
    let Base64 = require('js-base64').Base64;
    export default {
        name: "login",
        components:{},
        data(){
            return{
                user_id:"",                      //用户id
                mobile:"",                      //手机号
                mobile_code:"",                //手机验证码
            }
        },
        computed:{},
        mounted(){

        },
        methods:{
            time(wait) {
                var _this=this;
                var $this = $("#sendNewEmail");
                if (wait == 0) {
                    $this.css('pointer-events', '');
                    $this.css("color","#0084FF");
                    $this.html("发送验证码");
                    wait = 60;
                } else {
                    $this.css("pointer-events","none");
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
                var sign=md5("method=send_message_mobile&parm%5Bmobile%5D="+this.mobile+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=send_message_mobile&time="+time+"&rand="+rand+"&parm[mobile]="+Base64.encode(this.mobile)+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.time(60);
                            _this.user_id=res.data.user_id;
                            _this.hash=res.data.hash;
                        }else if(res.data.code==0){
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**注册**/
            registerFn(flag) {
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=find_password_mobile&parm%5Bmobile%5D="+this.mobile+"&parm%5Bmobile_code%5D="+this.mobile_code+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=find_password_mobile&time="+time+"&rand="+rand+"&parm[mobile]="+this.mobile+"&parm[mobile_code]="+this.mobile_code+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.$router.push({path: '/index/confirm_password',query:{user_id:_this.user_id,hash:_this.hash}});
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
            webtitle(getStorage("source"),"忘记密码");
        },
        watch:{},
    }
</script>

<style scoped>
    .reg_new{height: 100%;background: #fff}
</style>