<template>
    <div class="bg_purchase">
        <div class="user_top">
        </div>

        <div class="quota_content quota_content_edit">
            <div class="quota_nav_content">
                <div style="display: block" id="quota_title" class="quota_title quota_title_edit">
                    <h5>购买的商品</h5>
                    <div class="commodity_info clearfix">
                        <a href="javascript:;" class="fl">
                            <img src=""/>
                        </a>
                        <div class="fl">
                            <p class="commodity_txt">商品名称及品牌、型号、特征的信息说明</p>
                            <p class="commodity_model">已选 X色+X配置</p>
                            <p class="commodity_price">￥ 4499</p>
                        </div>
                    </div>
                    <a href="javascript:;" class="select_a clearfix">
                        <i class="checkboxCustom active fl"></i>
                        <p class="fl">
                            <span>需要发票</span>
                            <span>发票费用由买家支付</span>
                        </p>
                    </a>
                    <div class="clearfix commodity_num">
                        <span class="fl">数量</span>
                        <van-stepper v-model="value"  class="fr"/>
                    </div>
                    <div class="clearfix commodity_total">
                        <p class="fl"><span>商品价格:</span><span>5999</span> </p>
                        <p class="fl"><span>运费总计:</span><span>0</span> </p>
                        <p class="fl"><span>发票费用:</span><span>15</span> </p>
                        <p class="fl"><span>保价:</span><span>0</span> </p>
                        <p class="fl"><span>支付手续费:</span><span>0</span> </p>
                    </div>
                    <div>
                        <div class="commodity_move_box">
                            <select value="" class="commodity_select">
                                <option>不分期</option>
                                <option>3期</option>
                                <option>6期</option>
                                <option>12期</option>
                            </select>
                            <p class="commodity_move">
                                <span>∧</span>
                                <span>∨</span>
                            </p>
                        </div>
                    </div>
                    <div class="commodity_stages clearfix">
                        <p class="fl">
                            <span>已选择分</span>
                            <span>3期</span>
                        </p>
                        <p class="fl">
                            <span>应还总额</span>
                            <span><b>25.30</b>元</span>
                        </p>
                    </div>
                    <div class="commodity_stages clearfix">
                        <p class="fl">
                            <span>每期还款</span>
                            <span>8.17元</span>
                            <b>（含分期手续费 0.37元）</b>
                        </p>
                        <p class="fl">
                            <span>费率</span>
                            <span>1.5%</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix to_payment_box">
            <a href="javascript:;" class="to_payment fr">去付款</a>
        </div>
      
    </div>
</template>

<script>
    export default {
        name: "commodity_purchase",
        components:{},
        data(){
            return{
                
            }
        },
        computed:{},
        mounted(){

        },
        methods:{
            
        },
        watch:{},
    }
</script>

<style scoped>

</style>