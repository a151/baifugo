<template>

    <div class="body_page_box">
            <div class="form-group has-feedback">
                <label class="control-label">原有密码</label>
                <input type="password" v-model="fpassword" class="form-control" name="fpassword" pattern='required' alt='请输入原有密码'/>
            </div>

            <div class="form-group has-feedback">
                <label class="control-label">新密码</label>
                <input type="password" v-model="password" class="form-control" name="password" pattern='^\w{6,32}$' alt='密码由英文字母、数字组成，长度6-32位'/>
            </div>

            <div class="form-grourepasswordp has-feedback">
                <label class="control-label">请再次输入新密码</label>
                <input type="password" v-model="repassword" class="form-control" name="repassword" pattern='^\w{6,32}$' alt='密码由英文字母、数字组成，长度6-32位'/>
            </div>

            <div class="form-group has-feedback">
                <input class="btn btn-warning btn-lg btn-block"  @click="loginFn" type="submit" value="修改密码" />
            </div>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { login } from "../../../api/simple/index"; //登录
    import { url,phsessid,equipments,webtitle } from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    import { Popup ,Toast  } from 'vant';
    export default {
        name: "password",
        components:{},
        data(){
            return{
                isShow:false,//错误信息是否显示
                login_info:"",//手机号
                fpassword:"",//原密码
                password:"",//新密码
                repassword:"",//新密码确认
                failure_information:"",//失败信息
            }
        },
        computed:{},
        mounted(){
           
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入左侧数字数据；
            /**修改密码**/
            loginFn(flag) {
                if(this.password!=this.repassword){
                    Toast("新密码输入不一致！");
                    // return
                }
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=modify_password&parm%5Bfpassword%5D="+this.fpassword+"&parm%5Bpassword%5D="+this.password+"&parm%5Brepassword%5D="+this.repassword+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=modify_password&time="+time+"&rand="+rand+"&parm[fpassword]="+this.fpassword+"&parm[password]="+this.password+"&parm[repassword]="+this.repassword+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            Toast(res.data.msg);
                            _this.pathTos();
                        }else{
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**跳转页面**/
            pathTos(){
                var equipmen=equipments(this.$route.query.source);
                if(getStorage("source")=="ios"){
                    window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"pop"});//返回首页
                }else if(getStorage("source")=="android") {
                    window.bsshop_android.JumpBackPop();//返回首页
                }else {
                    this.$router.push({path: '/index/login/memberCenter'});
                }
            },
        },
        activated(){phsessid(); this.rHeadText("密码修改");webtitle(getStorage("source"),"密码修改");},
        watch:{

        },
    }
</script>

<style scoped>

</style>