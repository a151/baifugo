'use strict';
import Vue from 'vue'
import Vuex from 'vuex'
//views中modules
//...

import common from './modules/common'
Vue.use(Vuex);
// 创建 store 实例
export default new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        common,
    }
});
