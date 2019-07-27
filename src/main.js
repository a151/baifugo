import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import bridge from './common/nativeJsBridge';

/*Vant UI*/
import Vant from 'vant';
import 'vant/lib/index.css';
import md5 from 'js-md5';//md5加密
import ElementUI from 'element-ui';
import store from "./vuex/store"//VUEX
import 'element-ui/lib/theme-default/index.css';    // 默认主题
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import "babel-polyfill";
import '../src/assets/css/bootstrap.css';
import '../src/assets/css/bootstrap-theme.css';
import '../static/skin/default/css/8skSkin.css';
import '../src/assets/iconfont/font-awesome.min.css';
import '../src/assets/js/jquery-1.12.2.min';
import '../src/assets/js/bootstrap.min';
import { getUrls } from "./api/simple/index"; //url
import {getStorage, setStorage} from 'src/common/mUtils'
Vue.use(Vant);
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
axios.defaults.withCredentials = true; //让ajax携带cookie
import requestNew from 'src/api/simple/index'
requestNew.phsessid() ;// 请求头初始化
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
Vue.prototype.$axios = axios;

router.afterEach((to, from, next) => {
    setTimeout(function () {
        getUrls(getStorage("source"),window.location.href);
        window.scrollTo(0,0);
    },500)
});

router.beforeEach((to,from,next)=>{
    //进入登录页面的时候清除 token
    if(to.path === '/index/login_new' ){
        sessionStorage.removeItem("token", '');
        sessionStorage.removeItem("user_Data", '');
    }
    store.state.token = sessionStorage.getItem('token');//获取本地存储的token
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.token !== "" && store.state.token !== null) {  // 通过vuex state获取当前的token是否存在
            next();
        }else {
            next({
                path: '/index/login_new',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }else {
        next();
    }
    //它的三个参数：
    //to: (Route路由对象)  即将要进入的目标 路由对象       to对象下面的属性： path   params  query   hash   fullPath    matched   name    meta（在matched下，但是本例可以直接用）

    //from: (Route路由对象)  当前导航正要离开的路由

    //next: (Function函数)   一定要调用该方法来 resolve 这个钩子。  调用方法：next(参数或者空)
    //商品评价跳列表
    if(to.path === '/index/login/comments' && from.path === '/index/login/comments_list'){
        next({ path: '/index/login/evaluation' })
    }else {
        next();
    }
});




new Vue({
    router,
    store,
    bridge,
    render: h => h(App)
}).$mount('#app');
