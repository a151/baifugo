<template>
    <div>
        <div class="top_tab">
            <ul>
                <li id="mail"><a href='{url:/ucenter/evaluation}'>未评价</a></li>
                <li class="on" id="mobile"><a href='{url:/ucenter/isevaluation}'>已评价</a></li>
            </ul>
        </div>
        <div class="body_page_box">

            <div class="list-group">
                <div class="list-group-item">
                    <h4 class="list-group-item-heading"><strong>订单号：{$item['order_no']}</strong><span>{$item['comment_time']}</span></h4>
                    <p class="list-group-item-text" style="padding-bottom:6px; color:#666;">{$item['name']}</p>
                    <p class="list-group-item-text" style="padding-bottom:6px; color:#666;">
                        <span>评分</span>
                        {if:$item['point'] == 1}<i class="iconfont lyred">&#xe93b;</i>{/if}
                        {if:$item['point'] == 2}<i class="iconfont lyred">&#xe93b;</i><i class="iconfont lyred">&#xe93b;</i>{/if}
                        {if:$item['point'] == 3}<i class="iconfont lyred">&#xe93b;</i><i class="iconfont lyred">&#xe93b;</i><i class="iconfont lyred">&#xe93b;</i>{/if}
                        {if:$item['point'] == 4}<i class="iconfont lyblue">&#xe93b;</i><i class="iconfont lyblue">&#xe93b;</i><i class="iconfont lyblue">&#xe93b;</i><i class="iconfont lyblue">&#xe93b;</i>{/if}
                        {if:$item['point'] == 5}<i class="iconfont lyblue">&#xe93b;</i><i class="iconfont lyblue">&#xe93b;</i><i class="iconfont lyblue">&#xe93b;</i><i class="iconfont lyblue">&#xe93b;</i><i class="iconfont lyblue">&#xe93b;</i>{/if}
                        <span>{$item['point']}分</span>
                    </p>
                    <div class="form-group has-feedback" style="height:20px; line-height:20px; margin-bottom:0px;">
                        <div class="pull-left"><strong class="ok">已评价</strong></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "isevaluation"
    }
</script>

<style scoped>

</style>