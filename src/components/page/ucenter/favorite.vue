<template>
    <div class="body_page_box">
        <div class="ly_box">
            <div class="title">按分类查找</div>
            <div class="sort_1">
                <a href="{url:/ucenter/favorite}" id="catarea">全部（1）</a>
                <a href="{url:/ucenter/favorite/cat_id/$item[id]}" id="catarea{$item['id']}">美妆护肤（1）</a>
            </div>
        </div>

        <div class="list-group">
            <div class="list-group-item">
                <div class="media">
                    <div class="media-left media-middle">
                        <a href="{url:/site/products/id/$item['goods_id']}"><img class="lazyload" src="{url:/pic/thumb/img/$item['img']/w/80/h/80}" alt="{$item['name']}" /></a>
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading"><a href="{url:/site/products/id/$item['goods_id']}">{$item['name']}</a></h4>
                        <p class="f_favor">￥{$item['sell_price']}</p>
                        <input type='hidden' name='goods_id[]' value='{$item['goods_id']}' />
                        <div class="ly_store"><p>库存：{$item['store_nums']}</p><p>{$item['time']}</p></div>
                        <p id='summary_show_{$item['id']}'>{$item['summary']}</p>
                    </div>
                </div>
                <div style="padding-top:8px;">
                    <a class="btn b-default btn-xs" href="javascript:edit_summary({$item['id']});">更新备注</a>
                    <a class="btn b-default btn-xs" href="javascript:;" onclick="joinCart_list({$item['goods_id']});">加购物车</a>
                    <a class="btn b-default btn-xs" href="javascript:;" onclick="delModel({link:'{url:/ucenter/favorite_del/id/$item[id]}',msg:'是否取消收藏？'});">取消收藏</a>
                </div>
            </div>
            <!--{/foreach}-->
        </div>

    </div>

</template>

<script>
    export default {
        name: "favorite"
    }
</script>

<style scoped>

</style>