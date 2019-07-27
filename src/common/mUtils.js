import Vue from 'vue';
/**
 * 存储localStorage
 */
export const setStorage = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStorage = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
};

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    } else if (element.currentStyle) {
        target = element.currentStyle[attr];
    } else {
        target = document.defaultView.getComputedStyle(element, null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
    
};

/**
 * 获取url ?后面的传值
 */
export const getQuery = (key) => {
    const location = window.location;
    const query = {};
    const params = location.href.split('?')[1] || '';
    if (params) {
        params.split('&').forEach((item) => {
            const queryPair = item.split('=');
            query[queryPair[0]] = queryPair[1];
        });
    }
    const rst = query[key];
    //解码一个编码的 URI。
    return rst ? window.decodeURIComponent(query[key]) : '';
};

/**
 * 捕获异常弹窗
 */
export const customToast = e => {
    Vue.$vux.toast.show({
        text: e.message,
        type: 'text',
        width: '80%',
        time: 1500
    });
    if (e.code === 401 || e.code === 403) {
        window.location.href = "/#/login";
    }
};

/**
 * 处理错误
 */
// export const errorHandler = e => {
//     if (e.error) {
//         Vue.$vux.toast.show({
//             text: e.message,
//             type: 'text',
//             width: '80%'
//         })

//         return;
//     }
// }

/**
 * 测试工具
 */
export const getTestUtil = k => {
    return k + ',' + k;
};

export const filterParams = params => {
    if (Object.prototype.toString.call(params) === '[object Object]') {
        for (var key in params) {
            if (params[key] === undefined) {
                delete params[key];
            } else if (typeof params[key] === 'string') {
                (params[key] = trim(params[key])) === '' && (delete params[key]);
            } else if (params[key] instanceof Date) {
                params[key] = format(params[key]);
            } else if (typeof params[key] === 'object') {
                params[key] = filterParams(params[key]);
            }
        }
    }
    return params;
};
//过滤左右空格
function trim(str) {
    if (!str) return str;
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
//保存搜索记录-单条
export const saveSearchItem = item => {
    let searchList = sessionStorage.getItem('localSearchList') || null;
    if (searchList == null) {
        searchList = [];
        searchList.push(item);
    } else {
        searchList = JSON.parse(searchList);
        if (searchList.length >= 5) {
            searchList.pop();
        }
        searchList.unshift(item);
    }
    sessionStorage.setItem('localSearchList', JSON.stringify(searchList));
};
export const getSearchList = () => {
    let searchList = sessionStorage.getItem('localSearchList') || null;
    if (searchList) searchList = JSON.parse(searchList);
    return searchList;
};
//删除搜索记录
export const clearSearchList = () => {
    let searchList = sessionStorage.removeItem('localSearchList') || null;
};