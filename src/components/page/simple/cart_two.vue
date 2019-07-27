<template>
    <div class="body_page_box body_page_box_pay">
         <div class="user_menu_list">
            <div class="addres-box" v-if="addressList.length>0" @click="toEditAddress()">
                <van-cell  v-for="(item,index) in addressList" v-if="item.id==selectedAdderssId"  icon="" is-link>
                    <template  slot="title">
                        <div class="clearfix">
                            <i class="adderss-icon fl"></i>
                            <div class="fl" style="line-height: 2rem">
                                <p>
                                    <span class="custom-text custom-text-name">{{item.accept_name}}</span>
                                    <span class="custom-text">{{item.mobile}}</span>
                                    <van-tag type="danger" v-if="item.is_default==1">默认</van-tag>
                                </p>
                            </div>
                        </div>
                        <p class="custom-text custom-text-address" style="line-height: 1.8rem"><span>{{item.province_x}}</span><span>{{item.city_x}}</span><span>{{item.area_x}}</span><span>{{item.address}}</span></p>
                    </template>
                </van-cell>
            </div>
            <button v-else-if="showpd&&!(addressList.length>0)" @click="directOnAdd(0)" class="van-button van-button--danger van-button--large van-button--square van-address-list__add van-address-list__edit"><span class="van-button__text">新增地址</span></button>
            <div class="list-group list-group-goods">
            <div class="control-label m_ytitle">购买的商品</div>
            <div v-for="(item,index) in confirmList.goodsList" class="list-group-item">
            <div class="media clearfix">
                <div class="media-left media-middle media-width-img fl">
                    <a  href="javascript:;" class="media-width-img-a">
                        <img :src="item.img" width="70" height="70" :title="item.name" />
                    </a>
                </div>
                <div class="media-body media-width-body media-width-body-right fl">
                    <router-link tag="div" class="fl width9" exact :to="{path:'/index/products',query:{id:item.goods_id}}">
                        <h4 class="media-heading"><a href="javascript:;">{{item.name}}</a></h4>
                        <p style="padding-bottom:5px;color:#999999;">
                            {{item.spec}}
                        </p>
                    </router-link>
                    <div class="fr width1">
                        <p style="color:#999; text-align: right;">×{{item.count}}</p>
                    </div>
                </div>
            </div>
            <div class="clearfix">
                <p class="fl lyGay" style="line-height:3rem;color: #444444;font-size: 1.2rem"><b>￥{{item.sell_price}}</b></p>
                <a class="fr fb_currency_btn" @click="fbPopClick(index)" >{{last_deduction_array[index]!=0&&last_deduction_array[index]!=undefined?"已抵扣"+last_deduction_array[index]+"元":"选择褔币抵扣"}}</a> 
            </div>
            </div>
           <van-cell title="发票" @click="invoiceFn" is-link :value="order.taxes?invoiceSelect[0].company_name:'本次不开具发票'" />
           <div class="van-cell">
                <div class="van-cell__title">
                    <span>配送</span>
                   
                </div>
                <div class="van-cell__value">
                    <span>快递 {{freightIs?confirmList.temp_carriage:"0.00"}}</span>
                    <div class="van-cell__label">新疆、黑龙江等偏远地区，另加运费</div>
                </div>
            </div>
           <div class="van-cell-group van-hairline--top-bottom order-van-hairline--top-bottom" style="border: none;">
                    <div class="van-cell van-field" style="line-height: 24px;border: none;">
                        <div class="van-cell__title van-field__label">
                            <span>订单附言</span>
                        </div>
                        <div class="van-cell__value">
                            <div class="van-field__body">
                                <textarea placeholder="选填，这里填写订单附言" rows="1" class="van-field__control" :style="{'height': 24+(Math.floor(parseFloat(order.order_message.length)/15))*24+'px'}" style="text-align: right"  v-model="order.order_message"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wantToPay clearfix">
                <div class="wantToPayLeft fl">
                    <p>
                        <span>应付</span>
                        <span class="red">¥{{paymentNum==2?(parseFloat(confirmList.sum)+parseFloat(freightIs?parseFloat(confirmList.temp_carriage):0)).toFixed(2):(parseFloat(parseFloat(confirmList.sum)-parseFloat(last_deduction_money))+parseFloat(freightIs?parseFloat(confirmList.temp_carriage):0)).toFixed(2)}}</span>
                    </p>
                    <p>
                        <span>福币抵扣：</span>
                        <span>{{last_deduction_money}}元</span>
                    </p>
                </div>
                <div class="wantToPayCenter fl">
                    <p>共{{goodsNums}}件商品</p>
                </div>
                <div class="wantToPayRight fl">
                    <a href="javascript:;" @click="to_place_order()">我要付款</a>
                </div>
            </div>
            <!--选择地址-->
            <div class="address-selected width100">
                <van-popup v-model="selectShow" position="right" :overlay="false">
                    <van-nav-bar title="选择收货地址" left-text="返回" left-arrow @click-left="selectShow=false"/>
                    <div v-for="(item,index) in addressList" v-if="item.is_default==1" class="van-cell van-cell--clickable van-address-item van-address-item-defaults"><!----><!---->
                        <div class="van-cell__value van-cell__value--alone">
                            <div class="van-radio">
                                <span class="van-radio__input">
                                    <input type="radio" class="van-radio__control" value="103">
                                    <i class="van-icon van-icon-checked"><!----></i>
                                 </span>
                                <span class="van-radio__label">
                                    <div class="van-address-item__name">{{item.accept_name}}，{{item.mobile}}<span class="van-tag">默认</span></div>
                                    <div class="van-address-item__address"><span>{{item.province_x}}</span> <span>{{item.city_x}}</span> <span>{{item.area_x}}</span> <span>{{item.address}}</span></div>
                                </span>
                                
                            </div>
                        </div>
                        <!--<i class="van-icon van-icon-edit van-address-item__edit">&lt;!&ndash;&ndash;&gt;</i>-->
                    </div>
                    <div class="address-list-selected">
                        <!--地址管理 结束-->
                        <van-address-list v-model="order.address_id" :list="list" @select="freightChange" @add="onAdd()" @edit="onEdit"/>
                    </div>
                </van-popup>
            </div>        
            <div class="modifyAdd width100">
               <!--修改地址-->
               <van-popup v-model="show" position="right" :overlay="false">
                   <van-nav-bar
                       title="收货地址"
                       left-text="返回"
                       left-arrow
                       @click-left="onClickLeft"
        
                   />
                   <van-address-edit
                       :area-list="areaList"
                       :address-info="addressInfo"
                       show-postal
                       show-delete
                       show-set-default
                       show-search-result
                       :search-result="searchResult"
                       @save="onSave"
                       @delete="onDelete"
                       @change-detail="onChangeDetail"
                   />
               </van-popup>
           </div>
            <!--发票-->
            <van-actionsheet
                title="发票编辑"
                v-model="invoice"
                show-cancel-button
                show-confirm-button
                confirm-button-text="确定"
                >
                <dl class="invoiceRise">
                    <dt>发票抬头</dt>
                    <dd @click="invoiceClick(true)" :class="{'active':invoicePop}">个人</dd>
                    <dd @click="invoiceClick(false)" :class="{'active':!invoicePop}">企业</dd>
                </dl>
                <div class="invoice-rise-box">
                    <div v-show="invoicePop">
                        <i v-show="username!=''" @click="username=''" class="delete-input" ></i>
                        <van-field
                            v-model="username"
                            placeholder="个人名称"/>
                        <i v-show="username_cell_phone!=''"  @click="username_cell_phone=''" class="delete-input delete-input-phone" ></i>
                        <van-field
                            v-model="username_cell_phone"
                            :error-message="errorMessage"
                            placeholder="收票人手机号"/>
                    </div>
                    <div v-show="!invoicePop">
                        <i v-show="corporate_name!=''" @click="corporate_name=''" class="delete-input"></i>
                        <van-field
                            v-model="corporate_name"
                            placeholder="公司名称"/>
                        <i v-show="corporate_username!=''" @click="corporate_username=''" class="delete-input delete-input-phone"></i>
                        <van-field
                            v-model="corporate_username"
                            :error-message="errorMessages"
                            placeholder="联系方式"/>
                        <i v-show="identification_code!=''" @click="identification_code=''" class="delete-input-code"></i>
                        <van-field
                            v-model="identification_code"
                            placeholder="纳税人识别号（或统一社会信用代码）"/>
                    </div>
                </div>
                <div class="invoice-rise-btn-box">
                    <a href="javascript:;" class="invoice-rise-btn" @click="beforeClose()" >确定</a>
                </div>
                
               
            </van-actionsheet>
            <!--抵扣福币-->
            <div class="fb_box">
                <van-actionsheet :close-on-click-overlay="false" title="褔币抵扣" v-model="fb_money">
                    <p class="nowayTittle">福币不支持分期支付</p>
                    <section class="currency-box">
                        <div class="currency-title clearfix">
                            <p class="fl">
                                应付（元）￥<span>{{separateGoodsSum}}</span>
                            </p>
                            <p class="fl">
                                持有福币<span style="color:red;">{{lucky_coin}}</span>
                            </p>
                        </div>
                        <div class="currency-number  clearfix">
                              <span  class="fl styleSpan">使用</span> 
                              <span  class="fl styleChange ">
                                  <span @click="reduceClick()" class="currency-btn sub">-</span><input type="text"  v-model="fbNumber" @input="fbBlur()"  placeholder="500的整倍数"><span @click="plusClick()" class="currency-btn add">+</span>
                              </span>
                              <span  class="fl styleSpan">
                                  个福币抵扣 <span style="font-size:20px;vertical-align: -2px;">￥<span class="currency-text">{{fbMoney}}</span></span>元
                              </span>
                            
                        </div>
                        <div class="button-currency">
                            <span @click="fbClosePop()" class="remove">不使用</span><span @click="fbUse()" class="confirm">使用</span>
                        </div>
                    </section>
                </van-actionsheet>
            </div>
            <!--支付方式-->
            <div class="pay_box">
                <van-popup v-model="toPayPop" position="right" :overlay="false">
                    <van-nav-bar
                        title="确认支付"
                        left-text="返回"
                        left-arrow
                        @click-left="toPayPop=false"/>
                    <div class="list-group-supply">
                        <van-cell title="订单全额" :value="paymentNum==2?(parseFloat(confirmList.sum)+parseFloat(freightIs?parseFloat(confirmList.temp_carriage):0)).toFixed(2):(parseFloat(parseFloat(confirmList.sum)-parseFloat(last_deduction_money))+parseFloat(freightIs?parseFloat(confirmList.temp_carriage):0)).toFixed(2)" />
                    </div>
                    <h6 class="list-group-h6">选择支付方式</h6>
                    <div class="list-group-supply-topay" style="overflow-y: scroll;padding-bottom: 15rem">
                        <van-radio-group v-model="radio">
                            <van-cell-group >
                                <van-cell icon="credit" title="分期支付"   @click="payment('2')"    >
                                    <van-radio name="2"  :disabled="canClick"/>
                                </van-cell>
                                <div v-show="paymentNum==2" class="list-group-supply list-group-supply-edit">
                                    <h6 class="list-group-h6">月供</h6>
                                    <div class="monthlySupply">
                                        <p>¥{{stagesList.installmentAmount}}</p>
                                        <p>可用额度：{{confirmList?confirmList.now_amount:"0"}}元</p>
                                    </div>
                                    <h6 class="list-group-h6">选择分期</h6>
                                    <!-- 分期选择 -->
                                    <div  class="list-group-pay">
                                        <ol class="paymentMethod paymentMethodEdit clearfix">
                                            <li><a @click="stagesNumClick('3','分期支付3期')"    :class="{'active':paymentNum==2&&activeNum==3}"   href="javascript:;">3期</a> </li>
                                            <li><a @click="stagesNumClick('6','分期支付6期')"    :class="{'active':paymentNum==2&&activeNum==6}"   href="javascript:;">6期</a></li>
                                            <li><a @click="stagesNumClick('12','分期支付12期')"  :class="{'active':paymentNum==2&&activeNum==12}"  href="javascript:;">12期</a></li>
                                        </ol>
                                    </div>
                                    <van-cell-group>
                                        <van-field
                                            v-model="order.mobile_code"
                                            center
                                            clearable
                                            label="短信验证码"
                                            placeholder="请输入短信验证码"
                                        >
                                            <van-button @click="send_message_mobileFn()" id="sendNewEmail" slot="button" size="small" type="primary">发送验证码</van-button>
                                        </van-field>
                                    </van-cell-group>
                                </div>
                                <van-cell icon="weichat" title="微信全额支付" @click="stagesNumClicks('13','微信支付')"   clickable >
                                    <van-radio name="13" />
                                </van-cell>
                                <van-cell icon="pay" title="支付宝全额支付"  @click="stagesNumClicks('9','支付宝支付')"   clickable >
                                    <van-radio name="9"  />
                                </van-cell>
                            </van-cell-group>
                        </van-radio-group>
                        <p  class="nowayTittle">分期支付购买的商品有质量问题只换不退</p>
                    </div>
                    <div class="confirmBtn">
                        <p v-show="paymentNum==2" class="loanAgreement-p">
                            <label @click="agreeIsClick()">
                                <i :class="{'active':agreeIs==true}"></i>
                                <span>阅读并同意</span>
                            </label>
                            <a href="javascript:;"   class="loanAgreement" @click="loanAgreement()">《借款协议》</a>
                        </p>
                        <a @click="place_order(false)" class="confirmPayment" href="javascript:;">确认支付</a>
                    </div>
                </van-popup>
            </div>
         </div>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { Popup ,Toast ,AddressEdit,AddressList ,NavBar,Area,Actionsheet,Cell, CellGroup,Field,RadioGroup, Radio,Dialog  } from 'vant';
    import { login ,receivingA} from "../../../api/simple/index"; //登录
    import { url,urlApi,phsessid,webtitle,getUrls } from "../../../api/simple/index";//url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    let Base64 = require('js-base64').Base64;
    import axios from 'axios';
    export default {
        name: "cart_two",
        components:{},
        data(){
            return{
                id:"",//地址id
                confirmList:{},//订单确认
                selectedAdderssId:"",//选中支付地区id
                chosenAddressId: '',
                list: [],//收货地址
                paymentNum:"0",//支付方式
                invoice:false,     //发票弹窗
                selectShow:false,//修改默认地址
                show: false,     //添加地址弹层
                toPayPop:false,//支付方式
                directPop:false,
                showpd: false,//新增地址防止闪烁
                areaList:{},     //省市县
                addressList:[],  //地址列表
                searchResult: [],//详细地址自动获取
                addressInfo:{},  //信息初始化
                canClick:false,//支付是否可以点击
                invoiceSelect:[],//选择发票
                invoicePop:true, //个人企业转换
                username:"",//个人姓名
                username_cell_phone:"",//收票人手机号
                errorMessage:"",//手机号输入错误提示
                errorMessages:"",//手机号输入错误提示
                corporate_name:"",//公司名称
                corporate_username:"",//公司收票人手机号
                identification_code:"",//纳税人识别或统一社会信用代码
                showTxt:true,//分期详情是否显示
                json_toBuy:{},
                state:"",//下单时状态0为购物车1为直接购买
                stagesNum:"",//分期数
                rate:"",//分期费率
                orderAmount:"",//订单金额
                orderAmountListArray:[],//单个商品价格数组
                stagesList:{},//分期利率数据
                order:{
                    address_id:"",//收货地址id
                    accept_time:"任意",//收货时间（任意、周一到周五、周末）
                    payment:"",//支付类型（9支付宝、13微信、18分期支付）
                    order_message:"",//订单附言
                    taxes:false,//是否勾选选需要发票（on为选中、off未选中）
                    invoice_id:"",//发票id
                    direct_gid:"",//直接购买时的货品id 无货品id则为商品id,如果是从购物车直接结算 则为空
                    direct_num:"",//直接购买时的商品数量
                    direct_type:"",//直接购买时的商品类型（goods商品、product货品）
                    stagesNum:"",//分期数（全款支付可不传）
                    agreement:false,//是否勾选分期协议（on为选中、off未选中）
                    mobile_code:"",//分期支付授权短信验证码
                },//下单接口
                separateGoodsSum:0,//每个商品价格
                goodsNums:0,//一共几件商品
                fb_deduction_index:0,//第几个商品褔币抵扣
                lucky_coin_all:0,//褔币返回数量不变
                lucky_coin:0,//褔币返回数量
                lucky_coin_clone:0,//褔币返回克隆固定数量
                fb_money:false,//抵扣褔币弹窗
                fbNumber:"",//褔币数量
                fbNumber_deduction_array:[],//抵扣褔币数量集合
                fbMoney:0,//抵扣金额
                fbMoney_deduction_array:[],//抵扣金额集合
                last_deduction_money:0,//最后抵扣金额
                last_deduction_array:[],//最后抵扣金额集合
                activeNum:0,//支付选择
                paymentMethodTxt:"支付方式",//支付方式显示文字
                freightIs:false,//是否有运费
                areaFreight:"",//地区运费
                radio:"0",     //选择支付方式
                agreeIs:false, //是否已经同意借款协议
                credit_granting:{},//授信额度
                lastPayMoney:"",//最后支付金额
            }
        },
        computed:{},
        mounted(){
            
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //头部信息
                rpayInfor: "PAYINFOR", //支付信息
                rbottomSelection: "BOTTOMSELECTION", //底部信息
            }), //向vuex存入数据；
            /**UTF-8解码**/
            decodeUtf8(bytes) {
                var encoded = "";
                for (var i = 0; i < bytes.length; i++) {
                    encoded += '%' + bytes[i].toString(16);
                }
                return decodeURIComponent(encoded);
            },
            /**支付方式点击**/
            PayMethod(){
                this.toPayPop=true;
            },
            invoiceFn() {
                setTimeout(function () {
                    if(getStorage("source") == 'ios'&&getStorage("version") == 'null'){
                        $(".user_menu_list .van-actionsheet").css("bottom","5.5rem");
                    }else {
                        $(".user_menu_list .van-actionsheet").css("bottom","0");
                    }
                },300)
                this.invoice = true
            },
            /**去支付点击**/
            to_place_order(){
                this.lastPayMoney=this.paymentNum==2?(parseFloat(this.confirmList.sum)+parseFloat(this.freightIs?parseFloat(this.confirmList.temp_carriage):0)).toFixed(2):(parseFloat(parseFloat(this.confirmList.sum)-parseFloat(this.last_deduction_money))+parseFloat(this.freightIs?parseFloat(this.confirmList.temp_carriage):0)).toFixed(2)
                if(this.lastPayMoney<="0.00"){
                    this.place_order(true);
                }else {
                   this.toPayPop=true;
                }
                
            },
            /**订单确认**/
            acknowledgement_order(){
                this.json_toBuy=JSON.parse(Base64.decode(this.$route.query.json_toBuy));
                this.order.direct_gid=this.json_toBuy.direct_gid;
                this.order.direct_type=this.json_toBuy.direct_type;
                this.order.direct_num=this.json_toBuy.direct_num;
                this.state=this.$route.query.state;
                this.last_deduction_array=[];
                var _this=this;
                var sign="";
                var parm="";
                var goodsNum=0;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                if(this.json_toBuy&&this.state==1){
                    sign=md5("method=order_check&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                    parm="method=order_check&time="+time+"&rand="+rand+"&id="+this.json_toBuy.direct_gid+"&type="+this.json_toBuy.direct_type+"&stagesNum="+this.json_toBuy.stagesNum+"&buy_num="+this.json_toBuy.direct_num+"&sign="+sign;
                }else {
                    sign=md5("method=order_check&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                    parm="method=order_check&time="+time+"&rand="+rand+"&sign="+sign;
                }
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                            _this.confirmList=res.data.data;
                            _this.orderAmount=res.data.data.final_sum;//订单金额
                            _this.rate=res.data.data.rate;//订单金额
                            _this.lucky_coin=res.data.data.lucky_coin;//褔币数量
                            _this.lucky_coin_all=res.data.data.lucky_coin;//褔币数量
                            _this.lucky_coin_clone=res.data.data.lucky_coin;//褔币数量
                            _this.areaFreight=res.data.data;
                            _this.freightIs=res.data.data.is_freight==1?true:false;
                            if(_this.json_toBuy.stagesNum!=0&&_this.state!=0){
                                _this.radio='2';
                                _this.paymentNum=2;
                                _this.order.payment=18;
                                _this.activeNum=_this.json_toBuy.stagesNum;
                                _this.stagesNumClick(_this.json_toBuy.stagesNum,'分期支付'+_this.json_toBuy.stagesNum+'期');
                                _this.toPayPop=true;
                            }
                            for(var i=0;i<res.data.data.goodsList.length;i++){
                                _this.last_deduction_array.push(0);
                                _this.orderAmountListArray.push(res.data.data.goodsList[i].sum);
                                goodsNum=parseFloat(res.data.data.goodsList[i].count)+goodsNum
                            }
                            _this.goodsNums=goodsNum;
                        }else if(res.data.status==0){
                            Toast(res.data.msg)
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**点击默认地址**/
            toEditAddress(){
                this.selectShow=true;
            },
            directOnAdd(type){
                this.id="";
                this.addressInfo={
                    name:"",        //收货人姓名
                    tel:"",             //收货人手机号
                    addressDetail:"",//详细地址
                    areaCode:"",         //地区编码，通过省市区选择获取
                    postalCode:"",        //邮政编码
                    isDefault:true    //是否为默认地址
                };
                this.directPop=true;
                this.show=true;
                setTimeout(function(){
                    $(".van-button--default").hide();
                    
                },100)
            },
            onAdd(type) {
                this.id="";
                this.addressInfo={
                    name:"",        //收货人姓名
                    tel:"",             //收货人手机号
                    addressDetail:"",//详细地址
                    areaCode:"",         //地区编码，通过省市区选择获取
                    postalCode:"",        //邮政编码
                    isDefault:false    //是否为默认地址
                };
                this.directPop=false;
                this.show=true;
                setTimeout(function(){
                    $(".van-button--default").hide();
                },100)
            },
            onDelete(type) {
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=address_del&parm%5Bid%5D="+type.id+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=address_del&time="+time+"&rand="+rand+"&parm[id]="+type.id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            Toast(res.data.msg);
                            _this.receivin_addressFn();
                            _this.show=false;
                        }else if(res.data.code!=1){
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            onEdit(item, index) {
                this.modifyClick(index,item.id)
            },
            /**选择支付方式**/
            payment(type,num){
                if(type==2&&this.last_deduction_money!=0){
                    Toast("福币不支持分期支付！");
                    return;
                }
                if(type==2){
                    this.order.payment=18;
                }
                this.activeNum=num;
                this.paymentNum=type;
                this.radio=type;
                this.stagesNumClick('12',"分期支付12期")
            },
            /**地址列表**/
            receivin_addressFn(){
                this.list=[];
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=address&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=address&time="+time+"&rand="+rand+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.addressList=res.data.msg;
                            for(var i=0;i<res.data.msg.length;i++){
                                if(res.data.msg[i].is_default==1){
                                    _this.order.address_id=res.data.msg[i].id;
                                    _this.selectedAdderssId=res.data.msg[i].id;
                                }
                                _this.list.push({
                                    id:res.data.msg[i].id,
                                    name:res.data.msg[i].accept_name,
                                    tel:res.data.msg[i].mobile,
                                    address:res.data.msg[i].province_x+" "+res.data.msg[i].city_x+" "+res.data.msg[i].area_x+" "+ res.data.msg[i].address
                                })
                            }
                        }else {
                            _this.showpd=true;
                            _this.addressList=[];
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**新增地址点击**/
            editAddress(){
                this.show=true;
            },
            /**新增地址方法**/
            editAddressFn(accept_name,classify,address,mobile,postalCode,isDefault){
                var _this=this;
                var id_sign="";
                var id_parm="";
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                if(this.id==""){
                    id_sign="";
                    id_parm="";
                }else {
                    id_sign="&parm%5Bid%5D="+this.id;
                    id_parm="&parm[id]="+this.id;
                }
                var sign=md5("method=address_add"+id_sign+"&parm%5Baccept_name%5D="+accept_name+"&parm%5Bclassify%5D="+classify+"&parm%5Baddress%5D="+address+"&parm%5Bmobile%5D="+mobile+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=address_add&time="+time+"&rand="+rand+id_parm+"&parm[accept_name]="+accept_name+"&parm[classify]="+classify+"&parm[address]="+address+"&parm[mobile]="+mobile+"&sign="+sign+"&parm[zip]="+postalCode+"&parm[is_default]="+isDefault;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.result==true){
                            _this.receivin_addressFn();
                            _this.show=false;
                            if(_this.directPop){
                                _this.selectShow=false;
                            }
                        }else {
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
               
            },
            /**点击返回**/
            onClickLeft() {
                if(this.directPop){
                    this.selectShow=false;
                }
                this.show=false;
                setTimeout(function(){
                    $(".van-button--default").show();
                },300)
            },
            /**修改地址**/
            modifyClick(index,id){
                this.id=id;//地址id
                this.show=true;
                this.addressInfo={
                    id:this.addressList[index].id,
                    name:this.addressList[index].accept_name,        //收货人姓名
                    tel:this.addressList[index].mobile,             //收货人手机号
                    addressDetail:this.addressList[index].address,//详细地址
                    areaCode:this.addressList[index].area,         //地区编码，通过省市区选择获取
                    postalCode:this.addressList[index].zip,        //邮政编码
                    isDefault:this.addressList[index].is_default==1?true:false    //是否为默认地址
                }
            },
            /**地址保存**/
            onSave(type) {
                this.editAddressFn(type.name,type.areaCode,type.addressDetail,type.tel,type.postalCode,type.isDefault==true?"1":"0");
             
            },
            onChangeDetail(val) {
            },
            /**发票确定**/
            beforeClose() {
                    if(this.invoicePop==true){
                        if(this.username==""){
                            Toast('个人名称不能为空！');
                            this.invoiceFnClick(true);
                            return;
                        }
                        if(this.username_cell_phone==""){
                            Toast('收票人手机号不能为空！');
                            this.invoiceFnClick(true);
                            return;
                        }
                        if(this.errorMessage!=""){
                            Toast('手机号错误！');
                            this.invoiceFnClick(true);
                            return;
                        }
                    }else {
                        if(this.corporate_name==""){
                            Toast('公司名称不能为空！');
                            this.invoiceFnClick(true);
                            return;
                        }
                        if(this.corporate_username==""){
                            Toast('公司收票人手机号不能为空！');
                            this.invoiceFnClick(true);
                            return;
                        }
                        if(this.identification_code==""){
                            Toast('纳税人识别或统一社会信用代码不能为空！');
                            this.invoiceFnClick(true);
                            return;
                        }
                        if(this.errorMessages!=""){
                            Toast('手机号错误！');
                            this.invoiceFnClick(true)
                            return;
                        }
                    }
                    this.add_invoice();
            },
            /**点击发票出现弹窗**/
            invoiceFnClick(type){
                this.invoice=type;
            },
            /**发票点击**/
            invoiceClick(type){
                this.invoicePop=type;
            },
            /**发票列表**/
            invoice_list(){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=get_invoice_list&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=get_invoice_list&time="+time+"&rand="+rand+"&rand="+rand+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                            _this.invoiceSelect=res.data.data;
                            _this.order.invoice_id=res.data.data==""||res.data.data==undefined||res.data.data==null?"":res.data.data[0].id;
                            if(res.data.data[0].type==1){
                                _this.username=res.data.data[0].company_name;
                                _this.username_cell_phone=res.data.data[0].telphone;
                            }else {
                                _this.corporate_name=res.data.data[0].company_name;
                                _this.corporate_username=res.data.data[0].telphone;
                                _this.identification_code=res.data.data[0].taxcode;
                            }
                        }else{}
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**新增发票**/
            add_invoice(){
                var _this=this;
                var parm="";
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=invoice_add&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var id="";
                if(this.order.invoice_id==""){
                    id="";
                }else {
                    id="&id="+this.order.invoice_id;
                }
                if(this.invoicePop==true){
                    parm="method=invoice_add&time="+time+"&rand="+rand+id+"&company_name="+this.username+"&telphone="+this.username_cell_phone+"&type="+1+"&sign="+sign;
                }else{
                    parm="method=invoice_add&time="+time+"&rand="+rand+id+"&company_name="+this.corporate_name+"&telphone="+this.corporate_username+"&type="+2+"&taxcode="+this.identification_code+"&sign="+sign;
                }
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                              _this.order.taxes=true;
                              _this.invoice_list();
                              _this.invoice=false;
                        }else if(res.data.status!=1){
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            time(wait) {
                var _this=this;
                var $this = $("#sendNewEmail");
                if (wait == 0) {
                    $this.css('pointer-events', '');
                    $this.css("color","#fff");
                    $this.css("background","#FF6600");
                    $this.html("发送验证码");
                    wait = 60;
                } else {
                    $this.css("pointer-events","none");
                    $this.css("color","#999999");
                    $this.css("background","#eee");
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
                var sign=md5("method=stages_send_verify&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=stages_send_verify&time="+time+"&rand="+rand+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status=="1"){
                            _this.time(60);
                        }else {
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**选择分期数**/
            stagesNumClick(type,txt){
                if(this.paymentNum==2){
                    this.stagesNum=type;
                    this.activeNum=type;
                    this.installation_repayment_plan();
                    this.paymentMethodTxt=txt;
                }
            },
            /**支付宝微信选择**/
            stagesNumClicks(type,txt){
                    this.paymentNum=type;
                    if(this.paymentNum=="9"||this.paymentNum=="13"){
                        this.stagesNum=type;
                        this.activeNum=type;
                        this.order.payment=type;
                        this.paymentMethodTxt=txt;
                        this.radio=type;
                    }
                   
            },
            /**分期还款计划**/
            installation_repayment_plan(){
                this.lastPayMoney=this.paymentNum==2?(parseFloat(this.confirmList.sum)+parseFloat(this.freightIs?parseFloat(this.confirmList.temp_carriage):0)).toFixed(2):(parseFloat(parseFloat(this.confirmList.sum)-parseFloat(this.last_deduction_money))+parseFloat(this.freightIs?parseFloat(this.confirmList.temp_carriage):0)).toFixed(2)
                if(this.stagesNum===""){
                    Toast("请选择期数！");
                    return
                }
                if(this.rate===''){
                    Toast("系统出错啦！");
                    return
                }
                if(this.lastPayMoney===""){
                    Toast("系统出错啦！");
                    return
                }
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=get_plan_redemption&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=get_plan_redemption&time="+time+"&rand="+rand+"&numStages="+this.stagesNum+"&rate="+this.rate+"&orderAmount="+this.lastPayMoney+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                            _this.stagesList=res.data.data;
                        }else if(res.data.code!=1){
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**订单下单**/
            place_order(type){
                if(!type){
                    if(this.order.payment==18&&this.last_deduction_money!=0){
                        Toast("福币不支持分期支付！");
                      
                        return;
                    }
                }
                var _this=this;
                var taxes="";
                var agreement="";
                var parm="";
                var sum="";
                var mobile_code="";
                var lucky_coin_code="";
                var carriage_feeAll=0;
                var last_Money_array=[];
                var carriage_fee=[];
                if(this.order.address_id==""){
                    Toast('请选择收货地址！');
                    return;
                }
                if(this.order.accept_time==""){
                    Toast('请选择配送时间！');
                    return;
                }
                if(this.order.taxes==true){
                    if(this.order.invoice_id=="no"){
                        Toast('请选择发票！');
                        return;  
                    }
                }
                if(!type){
                    if(this.order.payment==""){
                        Toast('请选择支付方式！');
                        return;
                    }
                    if(this.order.payment=="18"){
                        if(this.activeNum==""){
                            Toast('请选择期数！');
                            return;
                        }
                        if(this.order.mobile_code==""){
                            Toast('请输入手机验证码！');
                            return;
                        }
                    }else {
                        this.activeNum="不分期";
                    }
                    if(this.agreeIs==true){
                        agreement="on";
                    }else {
                        agreement="off"
                    }
                }
             
                if(this.order.taxes==true){
                    taxes="on"
                }else {
                    taxes="off"
                }
             
                // var pattern = /[~!@#$%^&*()_+-=]$/;
                // if(this.order.order_message!=""){
                //     if(pattern.test(this.order.order_message)){
                //         alert(this.order.order_message)
                //         console.log(this.order.order_message)
                //          Toast("含有非法字符！");
                //          return
                //     }
                // }
                if(this.freightIs){
                    for(var j=0;j<this.confirmList.goodsList.length;j++){
                        carriage_fee.push(this.confirmList.goodsList[j].carriage_temp);
                    }
                }else {
                    for(var j=0;j<this.confirmList.goodsList.length;j++){
                        carriage_fee.push(0);
                    }
                }
                for(var i=0;i<this.last_deduction_array.length;i++){
                    last_Money_array.push(parseFloat(this.last_deduction_array[i])*500);
                }
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=create_order&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                sum= this.order.payment=='18'?"&stagesNum="+this.activeNum:"";
                mobile_code= this.order.payment=='18'?"&mobile_code="+this.order.mobile_code:"";
                lucky_coin_code=this.order.payment=='18'?"":"&lucky_coins="+last_Money_array;
                if(this.json_toBuy&&this.state==0){
                    parm="method=create_order&time="+time+"&rand="+rand+
                        "&address_id="+this.order.address_id+
                        "&accept_time="+this.order.accept_time+
                        "&payment="+this.order.payment+
                        "&order_message="+this.order.order_message+
                        "&taxes="+taxes+
                        "&invoice_id="+this.order.invoice_id+
                        "&carriage_fee="+carriage_fee+
                        sum+
                        lucky_coin_code+
                        "&agreement="+agreement+
                        mobile_code+
                        "&sign="+sign;
                }else{
                    parm="method=create_order&time="+time+"&rand="+rand+
                        "&address_id="+this.order.address_id+
                        "&accept_time="+this.order.accept_time+
                        "&payment="+this.order.payment+
                        "&order_message="+this.order.order_message+
                        "&taxes="+taxes+
                        "&invoice_id="+this.order.invoice_id+
                        "&direct_gid="+this.order.direct_gid+
                        "&direct_num="+this.order.direct_num+
                        "&direct_type="+this.order.direct_type+
                        "&carriage_fee="+carriage_fee+
                         sum+
                        lucky_coin_code+
                        "&agreement="+agreement+
                         mobile_code+
                        "&sign="+sign;
                }
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.status==1){
                            _this.rpayInfor(res.data.data);
                            if(type||res.data.data.pay_type==2){
                                window.location.href=res.data.data.url
                            }else {
                                _this.payFn(res.data.data.order_id,res.data.data.paymentType);
                            }
                        }else if(res.data.status!=1){
                            Toast(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**去支付**/
            payFn(order_id,payment_id){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=pay&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=pay&time="+time+"&rand="+rand+"&order_id="+order_id+"&payment_id="+payment_id+"&sign="+sign;
                window.location.href=url+parm;
                setTimeout(function () {
                    Dialog.confirm({
                        title: '支付',
                        message: '是否支付成功？'
                    }).then(() => {

                    }).catch(() => {
                        // on cancel
                    });
                },500)

            },
            /**是否同意借款协议**/
            agreeIsClick(){
                if(this.agreeIs==false){
                    this.agreeIs=true;
                }else {
                    this.agreeIs=false;
                }
            },
            /**借款协议点击**/
            loanAgreement(){
                if(getStorage("source")=="ios"){
                    window.webkit.messageHandlers.kMessageFromiOS.postMessage({"idf":"loanAgreement",url:"http://www.baifugo.com/upload/%E5%80%9F%E6%AC%BE%E5%8D%8F%E8%AE%AE.pdf",title:"借款协议"});//借款协议
                }else if(getStorage("source")=="android") {
                    window.bsshop_android.loanAgreement("http://www.baifugo.com/upload/%E5%80%9F%E6%AC%BE%E5%8D%8F%E8%AE%AE.pdf");//借款协议
                }else {
                    window.open("http://www.baifugo.com/upload/%E5%80%9F%E6%AC%BE%E5%8D%8F%E8%AE%AE.pdf")
                }
            },
            /**禁止滚动**/
            bodyScroll(event){
                event.preventDefault();
            },
            /**褔币抵扣弹窗**/
            fbPopClick(index){
                setTimeout(function () {
                    if(getStorage("source") == 'ios'&&getStorage("version") == 'null'){
                        $(".user_menu_list .van-actionsheet").css("bottom","5.5rem");
                    }else {
                        $(".user_menu_list .van-actionsheet").css("bottom","0");
                    }
                },300)
               
                this.fb_money=true;
                this.fb_deduction_index=index;
                this.separateGoodsSum=this.confirmList.goodsList[index].sum;
            },
            /**关闭褔币弹窗**/
            fbClosePop(){
                this.fb_money=false;
                this.fbNumber="";
                this.fbMoney=0;
                this.last_deduction_money=0;
                this.last_deduction_array[this.fb_deduction_index]=0;
                var fBnum=0;
                for(var i=0;i<this.last_deduction_array.length;i++){
                    fBnum+=this.last_deduction_array[i];
                }
                this.lucky_coin=this.lucky_coin_all-parseInt(fBnum)*500;
                this.lucky_coin_clone=this.lucky_coin_all-parseInt(fBnum)*500;
                this.last_deduction_money=fBnum;
            },
            /**点击褔币使用**/
            fbUse(){
                if(this.last_deduction_array[this.fb_deduction_index]==0){
                }else {
                    this.lucky_coin=this.lucky_coin_clone+parseInt(this.last_deduction_array[this.fb_deduction_index])*500;
                }
                if(this.fbNumber==0||this.fbMoney==0){
                    Toast("福币数量无法使用！");
                    return
                }
                if(parseInt(this.fbMoney)*500>this.lucky_coin){
                    Toast("福币数量不足！");
                    return
                }
                if(this.fbNumber>parseInt(this.fbMoney)*500){
                    Toast("福币数量无法使用！");
                    return
                }
                if(this.order.payment=="18"){
                    Toast("福币不支持分期支付！");
                    return
                }
                if(this.orderAmountListArray[this.fb_deduction_index]>=this.fbMoney){
                    this.last_deduction_array[this.fb_deduction_index]=this.fbMoney;
                    var fBnum=0;
                    for(var i=0;i<this.last_deduction_array.length;i++){
                        fBnum+=this.last_deduction_array[i];
                    }
                  
                    this.lucky_coin=this.lucky_coin_all-parseInt(fBnum)*500;
                    this.lucky_coin_clone=this.lucky_coin_all-parseInt(fBnum)*500;
                    this.last_deduction_money=fBnum;
                    this.fb_money=false;
                }else {
                    Toast("抵扣金额大于商品金额！");
                    return
                }
                
            },
            /**褔币数量增加减少**/
            fbBlur(){
                this.fbNumber=this.fbNumber.replace(/[^0-9.]+/,'');
                var commodityPrice=this.orderAmountListArray[this.fb_deduction_index];
                var fbm="";
                var fbInteger="";
                if(this.fbNumber!=""){
                        // 要做长度判断
                        if (this.fbNumber.length > (parseInt(commodityPrice)*500).toString().length) {
                            this.fbNumber = this.fbNumber.slice(0, (parseInt(commodityPrice)*500).toString().length)
                        }else {
                            if(this.fbNumber>parseInt(commodityPrice)*500){
                                // this.fbNumber=parseInt(commodityPrice)*500
                            }
                            fbm=this.fbNumber%500;
                            // if(fbm>=250){
                            //     fbInteger=((this.fbNumber-fbm)/500)+1
                            // }else {
                                fbInteger=(this.fbNumber-fbm)/500;//整数
                            // }
                            this.fbMoney=fbInteger;
                        }
                      
                   
                }
            },
            /**减**/
            reduceClick(){
                var commodityPrice=this.orderAmountListArray[this.fb_deduction_index];
                var fbm="";
                var fbInteger="";
                if(this.fbNumber!=""){
                    if(this.fbNumber!=0){
                        if(this.fbNumber<=500){
                            this.fbNumber=0;
                        }else {
                            this.fbNumber=this.fbNumber-500;
                        }
                        fbm=this.fbNumber%500;
                        if(fbm>=250){
                            fbInteger=((this.fbNumber-fbm)/500)+1
                        }else {
                            fbInteger=(this.fbNumber-fbm)/500;//整数
                        }
                        this.fbMoney=fbInteger;
                    }
                }
            },
            /**加**/
            plusClick(){
                var commodityPrice=this.orderAmountListArray[this.fb_deduction_index];
                var fbm="";
                var fbInteger="";
                if(this.fbNumber===""){
                    this.fbNumber=500;
                    this.fbMoney=1;
                    return
                }
                if(this.fbNumber==0||this.fbNumber!=""){
                    if(this.fbNumber==0||this.fbNumber<(parseInt(commodityPrice)*500)-250){
                        this.fbNumber=parseInt(this.fbNumber)+500;
                        fbm=this.fbNumber%500;
                        // if(fbm>=250){
                        //     fbInteger=((this.fbNumber-fbm)/500)+1
                        // }else {
                            fbInteger=(this.fbNumber-fbm)/500;//整数
                        // }
                        this.fbMoney=fbInteger;
                    }
                }
            },
            /**该地区是否有运费**/
            freightChange(item,index){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=modify_address_fee&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=modify_address_fee&time="+time+"&rand="+rand+"&parm[id]="+item.id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.freightIs=true;
                        }else if(res.data.code!=1){
                            _this.freightIs=false;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                this.selectedAdderssId=item.id;
                this.selectShow=false;
            },
            /**授信额度**/
            judgeFn(){
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=detailedness&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm={
                    method:"credits",
                    rand:rand,
                    time:time,
                    sign:sign
                };
                login(parm).then(res=>{
                    this.credit_granting=res.data.data.data;
                }).catch(err=>{})
            },
        },
        activated(){
            phsessid();
            if(getStorage("source") == 'ios'&&getStorage("version") == 'null'){
                $(".wantToPay").css("bottom","6rem");
                $(".user_menu_list .van-actionsheet").css("bottom","6rem");
            }else {
                $(".wantToPay").css("bottom","0");
                $(".user_menu_list .van-actionsheet").css("bottom","0");
            }
            this.areaList=receivingA;
            this.fbNumber="";
            this.fbMoney=0;
            this.orderAmountListArray=[];
            this.last_deduction_money=0;
            this.receivin_addressFn();
            this.order.taxes=false;
            this.order.order_message="";
            this.invoice_list();//发票列表
            this.judgeFn();
            this.rHeadText("购买页");
            webtitle(getStorage("source"),"购买页"); 

            
            
            this.rbottomSelection(2);
            $(".list-group-goods .van-field").css("background","#fff");
        },
        watch:{
            // $route:'invoice_list',
            toPayPop(){
                if(this.toPayPop){
                    setTimeout(function () {
                            if(getStorage("source") == 'ios'&&getStorage("version") == 'null'){
                                $(".pay_box .list-group-supply-topay").css("height",$(window).height()-350+"px");
                            }else {
                                $(".pay_box .list-group-supply-topay").css("height",$(window).height()-280+"px");
                            }
                    },300)
                }
            },
            list(){
                if(this.list==""||this.list==undefined||this.list==null||this.list.length<=10){
                    $(".body_page_box_pay .van-address-list__add").show();
                }else {
                    $(".body_page_box_pay .van-address-list__add").hide();
                }
            },
            last_deduction_money(){
                if(this.last_deduction_money>0){
                    this.canClick=true;   
                }else {
                    this.canClick=false;
                }
            },
            lastPayMoney(){
                if(this.stagesNum!==""){
                    this.installation_repayment_plan();
                }
            },
            selectedAdderssId(){
                var numId="";
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var signs=md5("method=modify_address_fee&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parms="method=modify_address_fee&time="+time+"&rand="+rand+"&parm[id]="+this.selectedAdderssId+"&sign="+signs;
                axios.get(url+parms)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.freightIs=true;
                        }else if(res.data.code!=1){
                            _this.freightIs=false;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            username_cell_phone(){
                if(!(/^1[34578]\d{9}$/.test(this.username_cell_phone))){
                    this.errorMessage="错误手机号"
                }else {
                    this.errorMessage=""
                }
            },
            corporate_username(){
                if(!(/^1[34578]\d{9}$/.test(this.corporate_username))){
                    this.errorMessages="错误手机号"
                }else {
                    this.errorMessages=""
                }
            },
        },
    }
</script>

<style type="text/css">
    .van-address-list{
       padding-bottom: 20px;
    }
    .van-address-list__add{
        position: relative;
        z-index: 2;
    }
   
    .fq_body_toolbar_layer{
        width: 40%;
        border: 1px solid #EEE;
        background: #FFF;
        display: none;
        /*position: absolute;*/
        top: 28px;
        right: 9px;
        z-index: 414;
        overflow: hidden;
    }
    .fq_body_toolbar_layer,.fq-title{
        padding-bottom: 10px;
        text-align: center;
        margin-top: 2px;
        font-size: 16px;
        border-bottom: 1px solid #eaeaea;
    }
    .fq_body_toolbar_layer,.fq-body{
        line-height: 1;
        padding: 16px 12px 15px 12px;
        overflow: hidden;
    }
    .fq_body_toolbar_layer,.fq-body dl {
        overflow: hidden;
        margin-bottom: 10px;
    }
    .fq_body_toolbar_layer,.fq-body dt {
        width: 100%;
        font-size: 14px;
        color: #3a3a3a;
        padding-bottom: 20px;
        float: left;
    }
    .fq-body dd {
        width: 25%;
        float: left;
        color: #555;
        text-align: center;
    }
    .fq_body_toolbar_layer,.clearfix-1 dd{
        color: #000;
        padding-bottom: 2px;
    }
    .fq-dyn-body dd{
        padding-top: 12px;
        border-top: 1px solid #eaeaea;
    }
    .bystages{
        overflow: hidden;
    }
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }
    .invoiceChange{
        text-align: center;
    }
    .invoiceChange label:first-child{
        margin-right: 30px;
    }
    .van-modal{
        z-index: 2001 !important;
    }
    /*.van-toast{*/
        /*top: 30%;*/
    /*}*/
</style>