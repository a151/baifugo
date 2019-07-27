<template>
    <!--{set:$top_name = "网站地图"}-->
    <div class="body_page_box">
        <div class="sitemap_hot">
            <ul>
                <li><a class="s1" href="{url:/simple/reg}">注册</a></li>
                <li><a class="s2" href="{url:/simple/login}">登录</a></li>
                <li><a class="s3" href="{url:/site/article}">商城资讯</a></li>
                <li><a class="s4" href="{url:/site/groupon}">团购</a></li>
                <li class="on"><a class="s6" href="{url:/site/tags}">热门标签</a></li>
                <li><a class="s7" href="{url:/simple/cart}">购物车</a></li>
                <li><a class="s8" href="{url:site/sitemap}">网站地图</a></li>
                <li><a class="s9" href="{url:/site/notice}">站点公告</a></li>
                <li><a class="s10" href="{url:/site/help_list}">帮助中心</a></li>
                <li><a class="s11" href="{url:/simple/find_password}">找回密码</a></li>
            </ul>
        </div>

        <div class="ly_box">
            <div class="title">所有商品分类</div>
            <div class="sort_1">
                <a onclick="$(this).siblings().removeClass('current');$(this).addClass('current');" href="#sort_{$key}">{$first['name']}</a>
            </div>
            <div class="sort_2">
                <table class="form_table" width="100%">
                    <col width="80px" />
                    <col />
                    <caption><a name="sort_{$key}" class="name"><i class="iconfont">&#xe631;</i><strong>{$first['name']}</strong></a></caption>
                    <tbody>
                    <tr>
                        <th><a class="current" href="{url:/site/pro_list/cat/$second[id]}">{$second['name']}</a></th>
                        <td>
                            <a href='{url:/site/pro_list/cat/$third[id]}'>{$third['name']}</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sitemap"
    }
</script>

<style scoped>

</style>