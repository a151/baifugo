<template>
    <section id="main">
        <ul class="reveres">
            <li><span>可用额度:</span> <span class="quota_nav_red"></span>
                <span>元</span></li>
            <li class="quota_nav_right">总额度￥:</li>
            <span>元</span>
        </ul>
        <ul class="reveres-details" style="clear: both">
        </ul>
    </section>
</template>

<script>
    export default {
        name: "credit_records"
    }
</script>

<style scoped>
    hr {
        margin: 0px;
    }
</style>