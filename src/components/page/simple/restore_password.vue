<template>
    <div class="body_page_box">
        <form method='post'>
            <div class="form-group has-feedback">
                <label class="control-label" for="inputSuccess2">新密码</label>
                <input v-model="password" type="password" class="form-control" name="password" pattern='^\w{6,32}$' alt='密码由英文字母、数字组成，长度6-32位'/>
                <span class="iconfont form-control-feedback">&#xe628;</span>
            </div>
            <div class="form-group has-feedback">
                <label class="control-label" for="inputWarning2">确认新密码</label>
                <input  v-model="repassword" type="password" class="form-control" name="repassword" pattern='^\w{6,32}$' alt='密码由英文字母、数字组成，长度6-32位' bind='password'/>
                <span class="iconfont form-control-feedback">&#xe830;</span>
            </div>
            <div class="form-group has-feedback">
                <input @click="registerFn()" class="btn btn-warning btn-lg btn-block" type="button" value="确认提交" />
            </div>
        </form>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { register } from "../../../api/simple/index"; //注册
    import { send_message_mobile } from "../../../api/simple/index"; //找回密码发送手机验证码短信
    import { login } from "../../../api/simple/index"; //登录
    import { url,phsessid,webtitle } from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    export default {
        name: "restore_password",
        data(){
            return {
                hash:"",//找回密码发送手机验证码短信接口返回的hash值
                user_id:"",//用户名
                password:"",//新密码
                repassword:"",//新密码确认
            }
        },
        components:{},
        mounted(){
            this.user_id=this.$route.query.user_id;//用户名
            this.hash=this.$route.query.hash;//找回密码发送手机验证码短信接口返回的hash值
        },
        methods:{
            time(wait) {
                var _this=this;
                var $this = $("#sendNewEmail");
                if (wait == 0) {
                    $this.css('pointer-events', '');
                    $this.css("background","#549ff2");
                    $this.val("发送验证码");
                    wait = 60;
                } else {
                    $this.css("pointer-events","none");
                    $this.css("background","#999999");
                    $this.val("重新发送(" + wait + ")");
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
                var parm = {
                    mobile:this.mobile,              //手机号
                };
                send_message_mobile(parm).then(res => {
                    _this.time(60);
                }).catch(err => {});
            },
            /**找回密码**/
            registerFn(flag) {
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=do_restore_password&parm%5Bhash%5D="+this.hash+"&parm%5Buser_id%5D="+this.user_id+"&parm%5Bpassword%5D="+this.password+"&parm%5Brepassword%5D="+this.repassword+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=do_restore_password&time="+time+"&rand="+rand+"&parm[hash]="+this.hash+"&parm[user_id]="+this.user_id+"&parm[password]="+this.password+"&parm[repassword]="+this.repassword+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.$router.push({path: '/index/login/memberCenter'});
                        }else if(res.data.code!=1){

                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
        },
        activated(){
            phsessid();
            webtitle(getStorage("source"),"修改密码");
        },
        watch:{}
    }
</script>

<style scoped>
    .body_page_box{height: 100%;background: #fff}
</style>