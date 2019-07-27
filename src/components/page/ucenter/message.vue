<template>
    <div class="ly_message_Wrapper">
        <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="60">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div v-for="(item,index) in mailList" :key="index" class="new_message_box">
                <div class="m_title"><strong>{{item.title}}</strong><span>{{item.time}}</span></div>
                <div id="show_msg_25" class="show_msg" v-show="current==index" style="display:none" v-html="item.content">{{item.content}}</div>
                <div class="b_more"  v-show="current!=index" @click="openClick(index,item.id)" id="more_25"><a href="javascript:void(0)" ><b>阅读全文</b><strong id="msg_id_25">{{item.is_read==0?"未读":"已读"}}</strong></a></div>
                <div class="d_more"  v-show="current==index" id="del_25" style="display: block;"><a href="javascript:;"><b @click="deleteClick(index,item.id)" >删除</b></a></div>
            </div>
        </van-pull-refresh>
        </van-list>    
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex"; //改变数据状态
    import { register } from "../../../api/simple/index"; //注册
    import { login } from "../../../api/simple/index"; //登录
    import { url,phsessid,webtitle } from "../../../api/simple/index"; //url
    import {getStorage, setStorage} from 'src/common/mUtils'
    import md5 from 'js-md5';//md5加密
    import axios from 'axios';
    import { PullRefresh } from 'vant';
    export default {
        name: "message",
        components:{
        },
        data(){
            return{
                page:1,
                count: 0,                        //加载次数
                isLoading: false,              //是否加载完成
                mobile:"",                      //手机号
                mobile_code:"",                //手机验证码
                password:"",                   //密码 
                mailList:[],                   //站内信列表
                current:"",                    //当前
                loading: false,
                finished: false,
                showpd:false,
                
            }
        },
        computed:{},
        mounted(){
          
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //draftsmanCard
            }), //向vuex存入左侧数字数据；
            lis_messageFn(page){
                this.loading = true;
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=lis_message&parm%5Bpage%5D="+page+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=lis_message&time="+time+"&rand="+rand+"&parm[page]="+page+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            for(var i=0;i<res.data.value.length;i++){
                                _this.mailList.push(res.data.value[i]);
                            }
                            if(res.data.value.length<19){
                                _this.finished=true;
                            }
                            if(_this.mailList.length==0){
                                _this.showpd=true;
                            }
                            _this.loading = false;
                        }else if(res.data.code!=1){
                            _this.finished=true;
                            _this.loading = false;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**展开内容**/
            openClick(index,id){
                this.current=index;
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=read_message&parm%5Bid%5D="+id+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=read_message&time="+time+"&rand="+rand+"&parm[id]="+id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.lis_messageFn(_this.page)
                        }else if(res.data.code!=1){
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**删除内容**/
            deleteClick(index,id){
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=del_message&parm%5Bid%5D="+id+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=del_message&time="+time+"&rand="+rand+"&parm[id]="+id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.mailList.splice(index,1);
                        }else if(res.data.code!=1){

                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            /**下拉刷新**/
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.isLoading = false;
                    this.count++;
                }, 500);
            },
            onLoad() {
                var _this=this;
                //异步更新数据
                setTimeout(() => {
                    _this.page++;
                    // 加载状态结束
                    _this.lis_messageFn(_this.page);
                }, 500);
            },
        },
        activated(){
            phsessid();
            this.rHeadText("站内信");
            webtitle(getStorage("source"),"站内信");
            this.lis_messageFn(1);
        },
        watch:{
            // $route:"lis_messageFn"
        },
    }
</script>

<style scoped>

</style>