<template>
    <div class="login_box">
        <div class="header_top header_login">
            <a id="kros_user" class="iconfont" href="javascript:void(0)" @click="loginBack()" title="返回"></a>
            <span class="headline">登录</span>
            <a class=" iconfont_search" href="javascript:void(0)"  title="搜索">&#xe769;</a>
        </div>
        <!--<div class="login_top_bg">-->
           <!--<img src="../../../../static/skin/default/images/login_bg.jpg" width="100%"/>-->
            <!--<p><span>会员登录</span></p>-->
        <!--</div>-->

        <div class="body_page_box">
            <div v-show="isShow" class="prompt">{{failure_information}}</div>
            <h3 class="login_account">登录账号</h3>
            <div>
                <div class="cell-phone_number">
                    <input type="text" v-model="login_info" class="auto-control" name=""  placeholder="填写手机号" value="" pattern='required' alt='填写手机号' maxlength="11" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                    onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/>
                </div>
                <div class="cell-phone_number">
                    <input id="change_password" type="password" v-model="password" class="auto-control"  placeholder="登录密码"  name="" pattern='^\S{6,32}$' alt='填写密码'/>
                    <i @click="lookPassword()" class="see_it" :class="{'open':showPassword==true}"></i>
                </div>
                <div v-show="graphic_code_isshow" class="graphic_code clearfix">
                    <input v-model="graphic_code" type="text" placeholder="请输入图形验证码" class="fl"/>
                    <img @click="graphicCodecClick()" class="fl" :src="graphic_code_url"/>
                </div>
                <div class="clearfix">
                    <router-link exact :to="{path:'/index/retrieve_password'}" class="forget_password fr">
                        忘记密码
                    </router-link>
                </div>
            
            </div>
            <div class="">
                <a class="login_btn" @click="loginFn" href="javascript:;">登录</a>
                <router-link exact :to="{path:'/index/reg_new'}"  class="register_btn" href="javascript:;">注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { login } from "../../../api/simple/index"; //登录
    import { url,phsessid ,urlApi,urlI} from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import { Popup ,Toast  } from 'vant';
    import md5 from 'js-md5';//md5加密
    // import base64 from 'js-base64';//base64加密
    let Base64 = require('js-base64').Base64;
    import axios from 'axios';
    export default {
        name: "login",
        components:{},
        data(){
            return{
                isShow:false,//错误信息是否显示
                showPassword:false,//展示密码
                login_info:"",//手机号
                password:"",//密码
                failure_information:"",//失败信息
                rememberNumber:false,
                graphic_code_isshow:false, //图像验证码是否显示
                graphic_code_url:"", //图像验证码url
                graphic_code:"",//图像验证码
            }
        },
        computed:{},
        mounted(){
            this.rememberNumber=getStorage("rememberNumber");//是否记住账号
            this.graphicCodecClick()
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入左侧数字数据；
            /**回退按钮点击**/
            loginBack(){
                this.$router.push({//你需要接受路由的参数再跳转
                    path: "login/centerContent"
                });
            },
            /**点击图像验证码**/
            graphicCodecClick(){
                this.graphic_code_url=urlI+"controller=simple&action=getCaptcha&random="+Math.floor(Math.random()*900000 + 100000)
            },
            /**看见密码**/
            lookPassword(){
                if(this.showPassword==false){
                    this.showPassword=true;
                    $("#change_password").attr('type','text')
                }else {
                    this.showPassword=false;
                    $("#change_password").attr('type','password')
                }
            },
            /**记住密码**/
            rememberNumberClick(){
                if(this.rememberNumber==false){
                    this.rememberNumber=true;
                    setStorage("rememberNumber",true);
                    setStorage("Mobile",this.login_info);
                }else {
                    this.rememberNumber=false;
                    setStorage("rememberNumber",false);
                    setStorage("Mobile","");
                }
            },
            /**登录**/
            loginFn(flag) {
                if(this.login_info==''||this.login_info==null||this.login_info==undefined){
                    Toast("请输入正确的手机号哦！");
                    return
                }
                if(this.password==''||this.password==null||this.password==undefined){
                    Toast("请输入密码哦！");
                    return
                }
                if(this.graphic_code_isshow==true){
                    if(this.graphic_code==''||this.graphic_code==null||this.graphic_code==undefined){
                        Toast("请输入图形验证码哦！");
                        return
                    } 
                }
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign="";
                var parm="";
                if(this.graphic_code_isshow==true){
                     sign=md5("method=login&parm%5Blogin_info%5D="+this.login_info+"&parm%5Bpassword%5D="+this.password+"&parm%5Bcaptcha%5D="+this.graphic_code+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                     parm="method=login&time="+time+"&rand="+rand+"&parm[login_info]="+Base64.encode(this.login_info)+"&parm[password]="+Base64.encode(this.password)+"&parm[captcha]="+this.graphic_code+"&sign="+sign;
                }else {
                    sign=md5("method=login&parm%5Blogin_info%5D="+this.login_info+"&parm%5Bpassword%5D="+this.password+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                    parm="method=login&time="+time+"&rand="+rand+"&parm[login_info]="+Base64.encode(this.login_info)+"&parm[password]="+Base64.encode(this.password)+"&sign="+sign;
                }
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            Toast(res.data.msg);
                            let redirect = decodeURIComponent(_this.$route.query.redirect || '/');
                            _this.$router.push({//你需要接受路由的参数再跳转
                                path: redirect
                            });
                            sessionStorage.setItem('token',res.data.value.user_id);
                            _this.setCookie("session_id",res.data.value.user_id,0.1);
                            _this.setCookie("phone_number",_this.login_info,0.1);
                            setStorage("session_id",res.data.value.user_id);
                            setStorage("phone_number",_this.login_info);
                            _this.graphic_code_isshow=false;
                        }else if(res.data.code!=1){
                            Toast(res.data.msg);
                            if(res.data.flag==1){
                                _this.graphic_code_isshow=true;
                            }
                        }
                    })
                    .catch(function (err) {
                        Toast("系统出错了呢~");
                    });
            },
            //设置cookie<存>
            setCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";path=/;domain=test.baifugo.com;" + expires;
            },
            //获取cookie
            getCookie: function (cname) {
                var arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return (arr[2]);
                else
                    return null;
            },
            
        },
        activated() {
            phsessid();
            this.rHeadText("登录");
            this.login_info=getStorage("phone_number")!=''&&getStorage("phone_number")!=null&&getStorage("phone_number")!=undefined?getStorage("phone_number"):"";
        },
        watch:{},
    }
</script>

<style scoped>
   .body_relative{height: 100%}
   .login_box{height: 100%;background: #fff} 
</style>