import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// import CenterContent from 'centerContent';
export default new Router({
    mode: 'hash',
    // base: '/dist/',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: "/",
            redirect: "/index/login/centerContent"
        },
        {
            path: "/index",
            component: resolve =>require(["../components/common/index.vue"], resolve),
            children:[
                {
                path: "products",
                name:"products",    
                component: resolve =>require(["../components/page/site/products.vue"], resolve),
                },
                {
                    path: "login",
                    name:"login",
                    component: resolve =>require(["../components/page/Home.vue"], resolve),
                    children:[
                        {
                        path: "centerContent", //中间首页路由页面
                        name:"centerContent",    
                        component: resolve => require(["../components/page/site/index.vue"], resolve),
                        },
                        {
                            path: "category", //中间分类路由页面
                            name:"category",
                            component: resolve => require(["../components/page/site/category.vue"], resolve),
                        },
                        {
                            path: "cart", //中间购物车路由页面
                            name:"cart",
                            component: resolve => require(["../components/page/simple/cart.vue"], resolve),
                            meta: {
                                title: '',
                                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                            },
                        },
                        {
                            path: "cart_two", //中间购物车路由页面
                            name:"cart_two",
                            component: resolve => require(["../components/page/simple/cart_two.vue"], resolve),
                        },
                        {
                            path: "cart_three", //支付页面页面
                            name:"cart_three",
                            component: resolve => require(["../components/page/simple/cart_three.vue"], resolve),
                        },
                        {
                            path: "error", //支付失败页面
                            name:"error",
                            component: resolve => require(["../components/page/ucenter/error.vue"], resolve),
                        },

                        {
                            path: "memberCenter", //会员中心页面
                            name:"memberCenter",
                            component: resolve => require(["../components/page/ucenter/index.vue"], resolve),
                            meta: {
                                title: '',
                                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                            },
                        },
                        {
                            path: "order", //我的订单页面
                            name:"order",
                            component: resolve => require(["../components/page/ucenter/order.vue"], resolve),
                        },
                        {
                            path: "order_detail", //订单详情页面
                            name:"order_detail",
                            component: resolve => require(["../components/page/ucenter/order_detail.vue"], resolve),
                        },
                        {
                            path: "message", //站内信页面
                            name:"message",
                            component: resolve => require(["../components/page/ucenter/message.vue"], resolve),
                        },
                        {
                            path: "favorite", //收藏夹页面
                            name:"favorite",
                            component: resolve => require(["../components/page/ucenter/favorite.vue"], resolve),
                        },
                        {
                            path: "evaluation", //商品评论--未评论页面
                            name:"evaluation",
                            component: resolve => require(["../components/page/ucenter/evaluation.vue"], resolve),
                        },
                        {
                            path: "isevaluation", //商品评论--已评论页面
                            name:"isevaluation",
                            component: resolve => require(["../components/page/ucenter/isevaluation.vue"], resolve),
                        },
                        {
                            path: "award_credit", //授信用信页面
                            name:"award_credit",
                            component: resolve => require(["../components/page/ucenter/award_credit.vue"], resolve),
                        },
                        {
                            path: "drepayments", //待还款页面
                            name:"drepayments",
                            component: resolve => require(["../components/page/ucenter/drepayments.vue"], resolve),
                        },
                        {
                            path: "repayments_list", //还款记录页面
                            name:"repayments_list",
                            component: resolve => require(["../components/page/ucenter/repayments_list.vue"], resolve),
                        },
                        {
                            path: "credit_records", //信用记录页面
                            name:"credit_records",
                            component: resolve => require(["../components/page/ucenter/credit_records.vue"], resolve),
                        },
                        {
                            path: "receivin_address", //地址管理页面
                            name:"receivin_address",
                            component: resolve => require(["../components/page/ucenter/receivin_address.vue"], resolve),
                        },
                        {
                            path: "refunds", //我的退款页面
                            name:"refunds",
                            component: resolve => require(["../components/page/ucenter/refunds.vue"], resolve),
                        },
                        {
                            path: "refunds_detail", //我的退款页面
                            name:"refunds_detail",
                            component: resolve => require(["../components/page/ucenter/refunds_detail.vue"], resolve),
                        },
                        {
                            path: "refunds_edit", //我的退款申请页面
                            name:"refunds_edit",
                            component: resolve => require(["../components/page/ucenter/refunds_edit.vue"], resolve),
                        },
                        {
                            path: "account_log", //交易记录页面
                            name:"account_log",
                            component: resolve => require(["../components/page/ucenter/account_log.vue"], resolve),
                        },
                        {
                            path: "withdraw", //申请提现页面
                            name:"withdraw",
                            component: resolve => require(["../components/page/ucenter/withdraw.vue"], resolve),
                        },
                        {
                            path: "password", //修改密码页面
                            name:"password",
                            component: resolve => require(["../components/page/ucenter/password.vue"], resolve),
                        },
                        {
                            path: "raise_amount", //信用额度页面
                            name:"raise_amount",
                            component: resolve => require(["../components/page/ucenter/raise_amount.vue"], resolve),
                        },
                        {
                            path: "raise_amount_to", //信用额度--授权页面
                            name:"raise_amount_to",
                            component: resolve => require(["../components/page/ucenter/raise_amount_to.vue"], resolve),
                        },
                        {
                            path: "installment_credit_agreement", //分期授信协议页面
                            name:"installment_credit_agreement",
                            component: resolve => require(["../components/page/ucenter/installment_credit_agreement.vue"], resolve),
                        },
                        {
                            path: "commodity_purchase", //商品购买页面
                            name:"commodity_purchase",
                            component: resolve => require(["../components/page/ucenter/commodity_purchase.vue"], resolve),
                        },
                        {
                            path: "commodity_payment", //商品付款页面
                            name:"commodity_payment",
                            component: resolve => require(["../components/page/ucenter/commodity_payment.vue"], resolve),
                        },
                        {
                            path: "purchase_success", //购买完成页面
                            name:"purchase_success",
                            component: resolve => require(["../components/page/ucenter/purchase_success.vue"], resolve),
                        },
                        {
                            path: "afterSale", //售后页面
                            name:"afterSale",
                            component: resolve => require(["../components/page/ucenter/afterSale.vue"], resolve),
                        },
                        {
                            path: "repayment_success", //还款成功
                            name:"repayment_success",
                            component: resolve => require(["../components/page/ucenter/repayment_success.vue"], resolve),
                        },
                        {
                            path: "details_orders", //分期订单详情页面
                            name:"details_orders",
                            component: resolve => require(["../components/page/ucenter/details_orders.vue"], resolve),
                        },
                        {
                            path: "payment_history", //还款记录页面
                            name:"payment_history",
                            component: resolve => require(["../components/page/ucenter/payment_history.vue"], resolve),
                        },
                        {
                            path: "payment_record_details", //还款详情页面
                            name:"payment_record_details",
                            component: resolve => require(["../components/page/ucenter/payment_record_details.vue"], resolve),
                        },
                        {
                            path: "be_overdue", //逾期详情页面
                            name:"be_overdue",
                            component: resolve => require(["../components/page/ucenter/be_overdue.vue"], resolve),
                        },
                        {
                            path: "remain_returned", //代还详情页面
                            name:"remain_returned",
                            component: resolve => require(["../components/page/ucenter/remain_returned.vue"], resolve),
                        },
                        {
                            path: "basicData", //个人资料
                            name:"basicData",
                            component: resolve => require(["../components/page/site/basicData.vue"], resolve),
                        },
                        {
                            path: "notice", //商城公告页面
                            name:"notice",
                            component: resolve => require(["../components/page/site/notice.vue"], resolve),
                        },
                        {
                            path: "notice_detail", //商城公告详细页面
                            name:"notice_detail",
                            component: resolve => require(["../components/page/site/notice_detail.vue"], resolve),
                        },
                        {
                            path: "comments", //商品评论页面
                            name:"comments",
                            component: resolve => require(["../components/page/site/comments.vue"], resolve),
                        },
                        {
                            path: "comments_list", //商品评论列表页面
                            name:"comments_list",
                            component: resolve => require(["../components/page/site/comments_list.vue"], resolve),
                        },
                        {
                            path: "help_list", //购物帮助页面
                            name:"help_list",
                            component: resolve => require(["../components/page/site/help_list.vue"], resolve),
                        },
                        {
                            path: "help", //帮助详情页面
                            name:"help",
                            component: resolve => require(["../components/page/site/help.vue"], resolve),
                        },
                        {
                            path: "fbPage", //褔币页面
                            name:"fbPage",
                            component: resolve => require(["../components/page/ucenter/fbPage.vue"], resolve),
                        },
                        {
                            path: "sitemap", //网站地图页面
                            name:"sitemap",
                            component: resolve => require(["../components/page/site/sitemap.vue"], resolve),
                        },
                        {
                            path: "find_password", //找回密码页面
                            name:"find_password",
                            component: resolve => require(["../components/page/simple/find_password.vue"], resolve),
                        },
                        {
                            path: "restore_password", //找回密码第二步页面
                            name:"restore_password",
                            component: resolve => require(["../components/page/simple/restore_password.vue"], resolve),
                        },
                        {
                            path: "pro_list", //商品详情页面
                            name:"pro_list",
                            component: resolve => require(["../components/page/site/pro_list.vue"], resolve),
                        },
                        {
                            path: "search_list", //商品搜索详情页面
                            name:"search_list",
                            component: resolve => require(["../components/page/site/search_list.vue"], resolve),
                        },
                        {
                            path: "clear", //商品搜索详情页面
                            name:"clear",
                            component: resolve => require(["../components/page/site/clear.vue"], resolve),
                        },
                      
                    ]
                },
                {
                    path: "login_new", //用户登录
                    name:"login_new",
                    component: resolve => require(["../components/page/simple/login_new.vue"], resolve),
                },
                {
                    path: "reg_new", //用户注册
                    name:"reg_new",
                    component: resolve => require(["../components/page/simple/reg_new.vue"], resolve),
                },
                {
                    path: "retrieve_password", //忘记密码步骤一
                    name:"retrieve_password",
                    component: resolve => require(["../components/page/simple/retrieve_password.vue"], resolve),
                },
                {
                    path: "confirm_password", //忘记密码步骤二
                    name:"confirm_password",
                    component: resolve => require(["../components/page/simple/confirm_password.vue"], resolve),
                },
            ]
        },
    ]
});
