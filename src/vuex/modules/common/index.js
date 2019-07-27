import * as types from './types';
import {
    PageSize
} from '../../../common/constant';

//初始化状态
const state = {
    /**设备**/
    isEquipment:'',
    /**底部选中**/
    bottomSelection:0,
    /**头部文字**/
    headtext: '', //头部文字
    /**是否显示头部**/
    headIsShow:"0",
    /**购物车数量**/
    numberCart:"",
    /**支付信息**/
    payInfor:"",
};

//获取数据
const getters = {
    /**设备**/
    isEquipment:state => state.isEquipment, 
    /**底部选中**/
    bottomSelection:state => state.bottomSelection,
    /**头部文字**/
    headtext: state => state.headtext, //头部文字
    /**是否显示头部**/
    headIsShow: state => state.headIsShow,
    /**购物车数量**/
    numberCart: state => state.numberCart,
    /**支付信息**/
    payInfor: state => state.payInfor,
};
//数据保存方法
const mutations = {
    [types.ISEQUIPMENT](state, isEquipment) {
        state.isEquipment = isEquipment;
    },
    [types.BOTTOMSELECTION](state, bottomSelection) {
        state.bottomSelection = bottomSelection;
    },
    [types.HEADTEXT](state, headtext) {
        state.headtext = headtext;
    },
    [types.HEADISSHOW](state, headIsShow) {
        state.headIsShow = headIsShow;
    },
    [types.NUMBERCART](state, numberCart) {
        state.numberCart = numberCart;
    },
    [types.PAYINFOR](state, payInfor) {
        state.payInfor = payInfor;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations
}