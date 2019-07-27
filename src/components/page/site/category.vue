<template>
    <div class="category_body">
        <div class="middle_all middle_all_height" style="overflow-y: scroll;">
            <dl>
                <dt v-for="(item,index) in selectiveList" @click="selectiveClick(index)" :class="{'active':selective_state==index}"><a href="javascript:;"><i v-show="selective_state==index"></i>{{item.name}}</a></dt>
            </dl>
        </div>
        <div class="middle_body_height" style="overflow-y: scroll;">
            <div v-show="selective_state==index" v-for="(item,index) in selectiveList" class="middle_all_body">
            <div v-for="(atem,i) in item.cate">
                <p><b><a href="javascript:;" title="">{{atem.name}}</a></b></p>
                <ul class="classificationGoods">
                    <router-link tag="li" exact :to="{path:'/index/login/pro_list',query:{id:btem.id}}" v-for="(btem,ind) in atem.cate">
                        <img :src="btem.img" :onerror="onerror">
                        <span>{{btem.name}}</span>
                    </router-link>
                </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters,mapMutations } from "vuex";      //改变数据状态
    import { login } from "../../../api/simple/index";//登录
    import { url,phsessid,webtitle } from "../../../api/simple/index";  //url
    import { setStorage,getStorage } from 'src/common/mUtils'
    import md5 from 'js-md5';                           //md5加密
    import axios from 'axios';
    export default {
        name: "category",
        components:{},
        data(){ return{
            selective_state:0,  //选中数据
            selectiveList:[],   //数据列表
            onerror:'this.src="' +"../../../../static/skin/default/images/img_default.png"+ '"',//默认图片
        }},
        computed:{
         
        },
        mounted(){
            
        },
        methods:{
            ...mapMutations("common", {
                rHeadText: "HEADTEXT", //头部信息
                rbottomSelection: "BOTTOMSELECTION", //底部信息
            }), //向vuex存入数据；
            /**切换分类**/
            selectiveClick(type){
                this.selective_state=type;
            },
            /****/
            classificationFn(){
                this.id=1;
                var _this=this;
                var time=new Date().getTime();//时间戳
                var rand=Math.floor(Math.random()*90000000 + 10000000);//随机数，大于6位
                var sign=md5("method=getcategory&parm%5Bid%5D="+this.id+"&rand="+rand+"&time="+time+"9393405d5d3cac28c104f3d30eab3ee2");
                var parm="method=getcategory&time="+time+"&rand="+rand+"&parm[id]="+this.id+"&sign="+sign;
                axios.get(url+parm)
                    .then(function (res) {
                        if(res.data.code==1){
                            _this.selectiveList=res.data.value;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);

                    });
            },
        },
        activated(){
            phsessid();
            this.classificationFn();
            this.rHeadText("全部分类");
            webtitle(getStorage("source"),"全部分类");
            this.rbottomSelection(1);
            window.onresize = function(){
                $(".middle_all_height,.middle_body_height").height($(window).height()-104);
            }
            $(".middle_all_height,.middle_body_height").height($(window).height()-104);
        },
        watch:{},
    }
</script>

<style scoped>

</style>