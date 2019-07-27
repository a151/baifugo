<template>
    <div class="body_page_box">
        <!--还款记录-->
        <div class="control-label m_ytitle">还款记录</div>
        <div class="list-group">
            <div class="list-group-item">
                <div class="list-group-item-heading">分期订单号：</div>
                <div class="list-group-item-heading">分期期数：期</div>
                <div class="list-group-item-heading">订单创建时间：</div>
                <div class="list-group-item-heading">订单金额：</div>
                <div class="list-group-item-heading">订单状态：</div>
                <div class="list-group-item-heading">还款总额：</div>
                <div class="hk-button-div">
                    <a class="hk-button-a" style="color: #ffffff;" href="{url:/ucenter/repayments_show/order_no/$item['order_no']}">查看详情</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "repayments_list"
    }
</script>

<style scoped>
    .hk-button-div{
        text-align: right;
        padding-bottom: 5px;
    }
    .hk-button-a{
        padding: 4px;
        border: 1px solid #00b0e3;
        border-radius: 4px;
        background-color: #00b0e3;

    }
</style>