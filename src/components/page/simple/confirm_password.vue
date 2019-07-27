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
                    <input id="change_password" type="password" v-model="password" class="auto-control" minlength="6" maxlength="16"  placeholder="6-16位新密码"  name="" pattern='^\S{6,16}$' alt='填写密码'/>
                    <i @click="lookPassword()" class="see_it" :class="{'open':showPassword==true}"></i>
                </div>
                <div class="cell-phone_number">
                    <input  type="password" v-model="repassword" class="auto-control" minlength="6" maxlength="16"  placeholder="再次输入新密码"  name="" pattern='^\S{6,16}$' alt='填写密码'/>
                </div>
                <p class="forget_password"></p>
            </div>
            <div class="">
                <a @click="registerFn()"  :class="{'next_btn':!password||!repassword}" class="login_btn "  href="javascript:;">确定</a>
            </div>
        </div>
       
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { login } from "../../../api/simple/index"; //登录
    import { url,phsessid } from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    import { Popup ,Toast  } from 'vant';
    export default {
        name: "login",
        components:{},
        data(){
            return{
                hash:"",                        //	找回密码发送手机验证码短信接口返回的hash值
                user_id:"",                     //用户id
                showPassword:false,            //看见密码
                password:"",                    //密码
                repassword:"",                  //再次输入密码
            }
        },
        computed:{},
        mounted(){
              this.user_id=this.$route.query.user_id;
              this.hash=this.$route.query.hash
        },
        methods:{
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
            /**修改密码**/
            registerFn(flag) {
                if(!this.password||!this.repassword){
                    Toast("请输入正确密码");
                    return
                }
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=do_restore_password&parm%5Bhash%5D="+this.hash+"&parm%5Buser_id%5D="+this.user_id+"&parm%5Bpassword%5D="+this.password+"&parm%5Brepassword%5D="+this.repassword+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=do_restore_password&time="+time+"&rand="+rand+"&parm[hash]="+this.hash+"&parm[user_id]="+this.user_id+"&parm[password]="+this.password+"&parm[repassword]="+this.repassword+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.$router.push({path: '/index/login/centerContent'});
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
        },
        watch:{
        },
    }
</script>

<style scoped>
    .reg_new{height: 100%;background: #fff}
</style>