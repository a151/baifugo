import axios from "axios";
import router from "router";
import { filterParams } from "../common/mUtils";
import qs from "qs";

var port = "8888";

export const Request = {};
//请求超时时长
const TIMEOUT = 5000;
//http请求授权header属性
const AUTH_KEY = "X-Authorization";
var request = options => {
    //开放cookie 本地操作 并且操作后的cookie 携带过去
    // axios.defaults.withCredentials = true;
    options.headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    //处理查询参数，过滤空值参数
    //filterParams(options.params || options.body);

    options.headers = { ...(options.headers || {}) };

    options.body = { ...(options.body || {}) };
    //options.body.power = 'user';

    let _xtoken = localStorage.getItem("Xtoken");

    if (_xtoken) {
        options.body.Xtoken = _xtoken;
    }

    //参数格式化
    if (Object.prototype.toString.call(options.body) === "[object Object]") {
        options.body = qs.stringify(options.body);
    }
    return axios
        .request({
            headers: options.headers,
            withCredentials: true ,// 允许携带cookie
            url: options.action,
            method: options.method,
            data: options.body,
            params: options.params,
            timeout: TIMEOUT,
            emulateJSON: true
        })
        .then(response => {
            //请求结束
            var result = response;
            // if (result.code >= 401 && result.code <= 405) {
            //   location.href = '/#/login';
            //   throw result;
            // }
            // if (result && result.code == 200) {
            //   var msg = (typeof result.message === 'object' ? JSON.stringify(result.message) : result.message)

            //   // alert('接口code不为10000:' + JSON.stringify(result))
            //   throw result;
            // }
            return result;
        })
        .catch(e => {
            //alert('前端请求错误:' + JSON.stringify(e))
            //抛出异常
            throw e;
        });
};

//http请求方式
const http = {};
["get", "post", "put", "delete"].forEach(method => {
    http[method] = (
        action,
        params,
        typs = 1,
        extra = { headers: {}, loadig: false, includeToken: false }
    ) => {
        method = method.toUpperCase();
        if (process.env.NODE_ENV == "development") {
            if (typs == 1) action = "http://test.baifugo.com/index.php?" + action;
        } else {
            // if (typs == 1) action = "http://test.baifugo.com/index.php?" + action;//测试
            if (typs == 1) action = "http://www.baifugo.com/index.php?" + action;//正式
        }
        if (method === "GET") {
            return request({
                withCredentials: true ,// 允许携带cookie
                action,
                params,
                method,
                headers: extra.headers,
                loading: extra.loading,
                includeToken: extra.includeToken
            });
        }
        return request({
            withCredentials: true ,// 允许携带cookie
            action,
            body: params,
            method,
            headers: extra.headers,
            loading: extra.loading,
            includeToken: extra.includeToken
        });
    };
});
Request.http = http;
