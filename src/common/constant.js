/**
 * 公用常量
 */

//缓存根域名
export const Domain = 'mojoy.cc';

//用户授权缓存key
export const AUTH_TOKEN = 'AUTH_TOKEN';

// 例子
export const OrderState = {
    '0': {
        '0': {
            name: '有新订单啦',
            status: ''
        },
        '1': {
            name: '未付款',
            status: ''
        },
        '2': {
            name: '已拒绝',
            status: ''
        },
        '3': {
            name: '已付款',
            status: 'ready'
        },
        '4': {
            name: '客户已取消订单',
            status: 'cancel'
        },
        '8': {
            name: '已借出',
            status: 'done'
        },
        '9': {
            name: '客户已确认收到',
            status: 'done'
        },
        '99': {
            name: '已取消',
            status: 'cancel'
        },
    },
    '1': {
        '0': {
            name: '客户已收到',
            status: ''
        },
        '1': {
            name: '客户已归还',
            status: ''
        },
        '2': {
            name: '待评价',
            status: ''
        },
        '3': {
            name: '申请索赔中',
            status: ''
        },
    },
    '2': {
        '0': {
            name: '申请索赔中',
            status: ''
        }
    },
    '3': {
        '0': {
            name: '已完成',
            status: 'complete'
        }
    }
};

