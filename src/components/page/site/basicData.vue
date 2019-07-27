<template>
         <div>
             <van-cell-group>
                 <van-cell title="头像" value="">
                     <img id="user_ico_img" src="http://www.baifugo.com/views/8skmobi/skin/default/images/user_ico.png" width="40" height="40">
                 </van-cell>
                 <van-cell title="褔币" value="" >999</van-cell>
                 <van-cell title="手机号" value="" >18965359862</van-cell>
                 <van-cell title="修改密码" value="密码长度为8~16，数字，字母组合" is-link></van-cell>
             </van-cell-group>
             <div>
                 
             </div>
         </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { Popup ,Toast ,AddressEdit,AddressList ,NavBar,Area,Cell, CellGroup} from 'vant';
    import { login ,receivingA} from "../../../api/simple/index"; //登录
    import { url,urlApi,phsessid,webtitle,getUrls } from "../../../api/simple/index";              //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    let Base64 = require('js-base64').Base64;
    import axios from 'axios';
    export default {
        name: "basicData",
        components:{},
        data(){
            return{
               
            }
        },
        computed:{},
        beforeCreate(){},
        mounted(){this.timer()},
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
                rbottomSelection: "BOTTOMSELECTION", //底部信息
            }), //向vuex存入数据；
           
        },
        activated(){
            phsessid();
            this.rHeadText("个人资料");
            webtitle(getStorage("source"),"个人资料");
            this.rbottomSelection(3);
        },
        watch:{
          
        },
    }
</script>

<style scoped>

</style>