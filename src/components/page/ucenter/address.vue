<template>
    <div class="body_page_box">
        <div class="list-group">
            <div class="list-group-item">
                <h4 class="list-group-item-heading"><strong>李先生</strong><span>17090822106</span></h4>
                <p class="list-group-item-text" style="padding-bottom:6px; color:#666;">北京市市辖区东城区11我w</p>
                <p class="list-group-item-text" style="padding-bottom:6px; color:#666;">100000</p>
                <div class="list-group-item-heading" style="height:20px; line-height:20px; margin-bottom:0px;">
                    <div class="pull-left">
                        <a class="lyblue" href="{url:/ucenter/address_default/id/$item[id]/is_default/1}">设为默认</a>
                    </div>
                    <div class="pull-right">
                        <a href='javascript:void(0)' onclick=''>修改</a>
                        <a href="javascript:void(0)" style="padding-left:10px;" onclick="delModel({link:'{url:/ucenter/address_del/id/$item[id]}'});">删除</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group has-feedback">
            <input class="btn btn-warning btn-lg btn-block" type="submit" value="新增地址" onclick="editAddress();"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "address"
    }
</script>

<style scoped>

</style>