/**
 *  全局过滤器
 */
import Vue from 'vue';

import * as Constant from 'src/common/constant'

Vue.filter('lendMode', (value) => {
  if (value == 0) {
      return '上门'
  }else if (value == 2) {
      return '快递'
  }else if (value == 3) {
      return '闪送'
  }
});
//专题类型
Vue.filter('subjectType', url => {
    return url ? '快速专题' : '自定义专题';
});
