<template>
    <div class="bg_Change">
       <ul class="raise_ul">
           <li>
               <span>总额度</span>
               <span>{{total_credit_money}}</span>
           </li>
           <li>
               <span>用户实名</span>
               <span>{{jfw_user_info.jfw_realname}}</span>
           </li>
           <li>
               <span>身份证号</span>
               <span>{{jfw_user_info.jfw_idno}}</span>
           </li>
           <li>
               <span>电子合同</span>
               <a @click="stage_credit()" href="javascript:;">《分期授信协议》</a>
           </li>
       </ul>
        <a @click="pathTo()"  class="submission_info_to ">去看看</a>
        <van-dialog
            v-model="show"
            show-cancel-button
        >
            <div class="CreditProtocol">
                <h1></h1>
                <p>
                    授权人声明：<br>
                              &nbsp; &nbsp; &nbsp;本人（姓名：<span class="text-border">{{jfw_user_info.jfw_realname}}</span>，身份证号码：<span class="text-border">{{jfw_user_info.jfw_idno}}</span>）在 北京腾石科技  有限公司运营的购物平台上已经仔细阅读本授权书全部内容，对本授权书所有条款的含义及相应的法律后果已全部通晓并充分理解，并且明白点击“确认”（或其他类似意思表示，以所在页面显示名称为准）按钮后，本授权书即视为本人签署，构成具有约束力的法律文件，且授权期限自本人通过  <span class="text-border">腾石科技</span> 运营管理的购物平台使用分期付款形式购买货物之日起生效。<br>
                        鉴于本人拟通过 <span class="text-border">北京腾石科技</span>  有限公司(以下简称“<span class="text-border">腾石科技</span>公司”)运营的互联网购物平台通过分期付款的方式购买商品，又在与该公司有合作关系的第三方金融公司运营的互联网金融平台上实名注册并通过该平台进行金融活动，因此就  <span class="text-border">腾石科技</span>  公司通过第三方金融公司所属平台对本人在的账户进行提现额度锁定、解锁等相关事宜，特签署本授权书。<br>
                              一、定义<br>
                              &nbsp&nbsp1、互联网购物平台<br>
                              在本授权及系列协议中指 <span class="text-border">腾石科技</span> 公司经营管理的网络平台、应用程序（PC端网页：www.baifugo.com及手机APP软件“百福购 ”）。<br>
                              &nbsp&nbsp2、第三方金融公司及其运营的互联网金融平台<br>
                              在本授权及系列协议指与  <span class="text-border">腾石科技</span>  公司合作且向本人提供互联网金融服务的金融单位及其所属平台，包括但不限于盛京百善（北京）投资管理集团有限公司及其所属百善金饭碗平台、辽宁百善投资有限公司及其所属百善投资平台、帝华（北京）投资管理有限公司及其所属帝华创投平台。<br>
                              二、本人明确对<span class="text-border">腾石科技</span> 公司、第三方金融公司及其运营的互联网金融平台作如下授权：<br>
                              &nbsp&nbsp1、本人授权 <span class="text-border">腾石科技</span> 公司在本协议签订后，可以向第三方金融公司提交锁定指令，依据该指令第三方金融公司可以锁定本人在其公司所属平台的账户的提现额度。<br>
                              &nbsp&nbsp2、锁定的额度参照本人在<span class="text-border">腾石科技</span> 公司所属购物平台的分期额度确定。<br>
                              &nbsp&nbsp3、在分期还款过程中本人按约定按期还款时，每期还款后，<span class="text-border">腾石科技</span>  公司需向第三方金融公司提交指令，以减少相应的已锁定的提现额度。分期还款全部完成，提现额度的锁定全部解除。<br>
                              &nbsp&nbsp4、本人授权当本人分期还款过程中有逾期情况，第三方金融公司可依指令持续锁定本人账户提现额度，直至逾期情况消除。<br>
                              &nbsp&nbsp5、授权第三方金融公司可以依照 <span class="text-border">腾石科技</span>  公司的指令进行以上操作。<br>
                              三、本人对<span class="text-border">腾石科技</span>   公司及第三方金融公司的授权期限自本授权书本人签署之日起至本人全部分期付款款项清偿完毕时止。<br>
                              四、本授权经接受后即时生效，且效力具有独立性，不因相关业务合同或条款无效或被撤销而无效或失效，本授权一经做出，便不可撤销。<br>
                              五、如因被授权人锁定账户导致纠纷的，本人同意与被授权人友好协商解决，协商不成的，将争议或纠纷提交至沈阳仲裁委员会，按申请仲裁时该会现行有效的仲裁规则进行仲裁。仲裁裁决是终局的，对双方当事人均有约束力。有管辖权的人民法院。<br>
                本人已知悉本授权书全部内容的含义及因此产生的法律效力，自愿作出以上授权。本授权书是本人真实意思表示，本人同意承担由此带来的一切法律后果。
               
               </p>
            </div>
            
        </van-dialog>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { url,phsessid,webtitle } from "../../../api/simple/index"; //url
    import { Popup ,Toast ,AddressEdit ,NavBar,Area ,Dialog } from 'vant';
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    let Base64 = require('js-base64').Base64;
    import axios from 'axios';
    export default {
        name: "raise_amount",
        components:{},
        data(){
            return{
                show:false,//分期授信协议
                jfw_user_info:{},//信息
                credit_money:"",//
                total_credit_money:"",//总金额
            }
        },
        computed:{},
        mounted(){

        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入左侧数字数据；
            /**协议内容**/
            stage_credit(){
                this.show=true;
            },
            /**跳转页面**/
            pathTo(){
                if(getStorage("source")=="ios"){
                    window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"toHomepage"});//返回首页
                }else if(getStorage("source")=="android") {
                    window.bsshop_android.nowbrowse();//返回首页
                }else {
                    this.$router.push({path: '/index/login/centerContent'});//返回首页
                }
            },
        },
        activated(){
            phsessid();
            this.rHeadText("授信提额");
            webtitle(getStorage("source"),"授信提额");
            this.jfw_user_info=JSON.parse(this.$route.query.jfw_user_info) ;
            this.credit_money=this.$route.query.credit_money;
            this.total_credit_money=this.$route.query.total_credit_money;
        },
        watch:{

        },
    }
</script>

<style scoped>
.CreditProtocol{
    padding: 1.6rem;
    height: 36rem;
    overflow: scroll;
}
</style>