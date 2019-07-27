<template>
    <div>
        <div class="top_tab">
            <ul>
                <li id="mobile"><a href="javascript:mobilTab()">手机找密码</a></li>
            </ul>
        </div>
        <div class="body_page_box">
            <form action="{url:/simple/find_password_mobile}" method="post" id="mobileWay">
            <div class="form-group has-feedback">
                <label class="control-label" for="inputWarning2">手机号</label>
                <div class="input-group" style="width:100%; display:block; overflow:hidden">
                    <input type="text" v-model="mobile" class="form-control" name='mobile' pattern="mobi" placeholder="请输入正确的手机号码" style="width:64%"/>
                    <input id="sendNewEmail"  style="height: 44px;
    background: #2d64b3;
    padding: 0 10px;
    color: #fff;
    border: none;
    cursor: pointer;border-radius:4px; float:right" class="input_button"  @click="send_message_mobileFn()" type="button" value="获取验证码">
                </div>
            </div>
            <div class="form-group has-feedback">
                <label class="control-label" for="inputSuccess2">手机验证码</label>
                <input type="text" v-model="mobile_code"  class="form-control" name='mobile_code' pattern="required" placeholder="请输入短信息中验证码"/>
            </div>
            <div class="form-group has-feedback">
                <input @click="registerFn()" class="btn btn-warning btn-lg btn-block" type="submit" value="找回密码" />
            </div>
            </form>
        </div>
    </div>
   
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { register } from "../../../api/simple/index"; //注册
    import { send_message_mobile } from "../../../api/simple/index"; //找回密码发送手机验证码短信
    import { login } from "../../../api/simple/index"; //登录
    import { url ,phsessid,webtitle} from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    export default {
        name: "find_password",
        data(){
            return {
                mobile:"",//手机号
                mobile_code:"",//手机验证码
            }
        },
        components:{},
        mounted(){
            //短信和邮箱切换
            function changeTab(){
                $('#mailWay').show();
                $('#mail').addClass("on");
                $('#mobile').removeClass("on");
                $('#mobileWay').hide();
            }
            function mobilTab(){
                $('#mailWay').hide();
                $('#mail').removeClass("on");
                $('#mobile').addClass("on");
                $('#mobileWay').show();
            }
            //发送短信码
            function sendMessage(_self){
                var mobile   = $('#mobileWay [name="mobile"]').val();
                $.get("{url:/simple/send_message_mobile}",{"mobile":mobile},function(content){
                    if(content == 'success'){
                        $(_self).prop("disabled",false);
                    }else{
                        //刷新图形验证码
                        //changeCaptcha();
                        var myreg = /^1[0-9]{10}$/;
                        if(!myreg.test(mobile)){
                            alert("请填写正确的手机号码");
                            return false;
                        }

                        times = 60;
                        timerHandle = setInterval(function(){
                            times--;
                            $(_self).val(times + "秒后再次发送");
                            if(times <= 0)
                            {
                                $(_self).prop("disabled",false);
                                $(_self).val("获取验证码");
                                clearInterval(timerHandle);
                                times = 60;
                            }
                        },1000);

                    }
                });
            }
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
                var time=new Date().getTime(); //时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=find_password_mobile&parm%5Bmobile%5D="+this.mobile+"&parm%5Bmobile_code%5D="+this.mobile_code+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=find_password_mobile&time="+time+"&rand="+rand+"&parm[mobile]="+this.mobile+"&parm[mobile_code]="+this.mobile_code+"&sign="+sign;
                axios.get(url+parm).then(function (res) {
                        if(res.data.code==1){
                            _this.$router.push({path: '/index/login/restore_password',query: {user_id: _this.mobile,hash:_this.mobile_code}});
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
            webtitle(getStorage("source"),"找回密码");
        },
        watch:{}
    }
</script>

<style scoped>
    
</style>