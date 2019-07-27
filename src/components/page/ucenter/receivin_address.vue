<template>
    <div class="body_page_box">
        <div class="list-group list-group-address" v-if="addressList.length>0&&addressList!=null&&addressList!=''&&addressList!=undefined">
            <div v-for="(item,index) in addressList" class="list-group-item">
                <h4 class="list-group-item-heading"><strong>{{item.accept_name}}</strong><span>{{item.mobile}}</span></h4>
                <p class="list-group-item-text" style="padding-bottom:6px; color:#666;">{{item.province_x}} {{item.city_x}} {{item.area_x}}{{ item.address}}</p>
                <p class="list-group-item-text" style="padding-bottom:6px; color:#666;">{{item.zip}}</p>
                <div class="list-group-item-heading" style="height:20px; line-height:20px; margin-bottom:0px;">
                    <div class="pull-left">
                        <a @click="Modify_default(0,item.id,index)" v-if="addressDefault[index]==1" class="lyred" href="javascript:;">取消默认</a>
                        <a @click="Modify_default(1,item.id,index)" v-else class="lyblue" href="javascript:;">设为默认</a>
                    </div>
                    <div class="pull-right">
                        <a href='javascript:void(0)' @click='modifyClick(index,item.id)'>修改</a>
                        <a href="javascript:void(0)" style="padding-left:10px;" @click="deleteAddressFn(index,item.id)">删除</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group has-feedback" v-if="addressList==''||addressList==undefined||addressList==null||addressList.length<=10">
            <input class="btn btn-warning btn-lg btn-block" type="button" value="新增地址" @click="editAddress();"/>
        </div>
        <div class="receivin_address_edit">
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
                    show-set-default
                    show-search-result
                    :search-result="searchResult"
                    @save="onSave"
                    @change-detail="onChangeDetail"
                />
            </van-popup>
        </div>
       
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { login,receivingA } from "../../../api/simple/index"; //登录
    import { url,phsessid,webtitle } from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    import { Popup ,Toast ,AddressEdit ,NavBar,Area  } from 'vant';
    export default {
        name: "receivin_address",      
        components:{},
        data(){
            return{
                id:"",//地址id
                show: false,     //添加地址弹层
                areaList:{},     //省市县
                addressList:[],  //地址列表
                addressDefault:[],  //默认地址
                searchResult: [],//详细地址自动获取
                addressInfo:{},  //信息初始化
            }
        },
        computed:{},
        mounted(){
         
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入左侧数字数据；
            /**地址列表**/
            receivin_addressFn(){
                this.addressDefault=[];
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
                                _this.addressDefault.push(res.data.msg[i].is_default);
                            }
                        }else {}
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**新增地址点击**/
            editAddress(){
                this.id="";
                this.addressInfo={
                    name:"",        //收货人姓名
                    tel:"",             //收货人手机号
                    province:"",          
                    city:"",             
                    county:"",             
                    addressDetail:"",//详细地址
                    areaCode:"",         //地区编码，通过省市区选择获取
                    postalCode:"",        //邮政编码
                    isDefault:false    //是否为默认地址
                };
                this.show=true;
            },
            /**新增地址方法**/
            editAddressFn(accept_name,classify,address,mobile,postalCode,isDefault){
                var _this=this;
                var id_sign="";
                var id_parm="";
                var isDefaults=""
                if(isDefault==true){
                    isDefaults=1
                }else {
                    isDefaults=0
                }
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
                var parm="method=address_add&time="+time+"&rand="+rand+id_parm+"&parm[accept_name]="+accept_name+"&parm[classify]="+classify+"&parm[address]="+address+"&parm[mobile]="+mobile+"&sign="+sign+"&parm[zip]="+postalCode+"&parm[is_default]="+isDefaults;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.status=="200"){
                           _this.show=false;
                           _this.receivin_addressFn();
                        }else{
                           Toast(res.data.msg)  
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**删除信息**/
            deleteAddressFn(index,id){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=address_del&parm%5Bid%5D="+id+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=address_del&time="+time+"&rand="+rand+"&parm[id]="+id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.addressList.splice(index,1);
                            _this.addressList.reverse().reverse();
                            Toast(res.data.msg);
                        }else if(res.data.code!=1){
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**点击返回**/
            onClickLeft() {
                this.show=false;
            },
            /**修改地址**/
            modifyClick(index,id){
                this.id=id;//地址id
                this.show=true;
                this.addressInfo={
                    name:this.addressList[index].accept_name,       //收货人姓名
                    tel:this.addressList[index].mobile,             //收货人手机号
                    province:this.addressList[index].province,
                    city:this.addressList[index].city,
                    county:this.addressList[index].area,
                    addressDetail:this.addressList[index].address, //详细地址
                    areaCode:this.addressList[index].area,         //地区编码，通过省市区选择获取
                    postalCode:this.addressList[index].zip,        //邮政编码
                    isDefault:this.addressList[index].is_default==1?true:false   //是否为默认地址
                }
            },
            /**地址保存**/
            onSave(type) {
                this.editAddressFn(type.name,type.areaCode,type.addressDetail,type.tel,type.postalCode,type.isDefault);
            }, 
            onChangeDetail(val) {
            },
            /**修改默认地址**/
            Modify_default(is_default,id,index){
                for(var i=0;i<this.addressDefault.length;i++){
                    this.addressDefault[i]=0;
                }
                this.addressDefault[index]=1;
                this.addressDefault.reverse().reverse();
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=address_default&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=address_default&time="+time+"&rand="+rand+"&parm[is_default]="+is_default+"&parm[id]="+id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                    })
                    .catch(function (err) {
                        console.log(err);
                    }); 
            },
        },
        activated(){
            phsessid();
            this.rHeadText("收货地址");
            webtitle(getStorage("source"),"收货地址");
            this.areaList=receivingA;
            this.receivin_addressFn();
        },
        watch:{

        },
        
    }
</script>

<style scoped>
    .van-modal{
        z-index: 2001 !important;
    }
    .receivin_address_edit .van-popup{
        width: 100%;
    }
</style>