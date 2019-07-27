<template>
    <div>
        <div class="top_tab">
            <ul>
                <li class="on" id="mail"><a href='{url:/ucenter/account_log}'>交易记录</a></li>
                <li id="mobile"><a href='{url:/ucenter/withdraw}'>提现申请</a></li>
            </ul>
        </div>
        <div class="body_page_box">
            <div class="prompt">
                <p>账户余额：￥{$this->memberRow['balance']}</p>
            </div>
            <div class="list-group">
                <div class="list-group-item">
                    <h4 class="list-group-item-heading"><strong>{echo:$item['amount'] < 0 ? $item['amount'].'元' : ''}</strong><p>{echo:$item['amount'] > 0 ? $item['amount'].'元' : ''}</p><span>{$item['time']}</span></h4>
                    <p class="list-group-item-text" style="padding-bottom:6px; color:#666;">{$item['note']}</p>
                    <div class="form-group has-feedback" style="height:20px; line-height:20px; margin-bottom:0px;">余额 {$item['amount_log']} 元</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "account_log"
    }
</script>

<style scoped>

</style>