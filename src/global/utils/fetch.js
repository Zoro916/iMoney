import 'whatwg-fetch';
import {
    hex_sha1
} from './sha1'

import {
    readCookie
} from './Cookie';

import { hashHistory } from 'react-router';

const URL = "http://192.168.1.240/api/";
const UPLOADFILE = "http://192.168.1.240/file/upload"

// const URL = "http://114.55.230.77/api/";
// const UPLOADFILE = "http://114.55.230.77/file/upload"

const PREFIX = "organization"

/**
 * JavaScript内部对字符串是UTF-16编编码的,写了个utf16转8，
 * 然后再调sha1就行了
 * @param {String} str
 * @returns {String} 
 */
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

/************************************* 公共方法 ******************************************/
/**
 * signature算法：
 * 1、将所有非sign键的字典进行以键（string类型）反序排列，并以{key}{value}形式依次组装成字符串
 * 2、将组装好的字符串进行sha1算法进行40长度字符串生成
 * 3、通过参数数量决定获取抽样数量（默认抽样数量=参数数量*抽样因子（默认1.4）向下取整），并通过 签名长度 / 抽样次数 来决定
 * 间隔数量，通过抽样数量及间隔来决定抽取的字符串。
 * 如：
 * 原字典数据：{'auth_token':'1231kandfkk1sdf', 'timestamp':123154143123, 'method':'get_user', 'account':'test', 'passwd':'test'}
 * 生成字符串：timestamp123154143123passwdtestmethodget_userauth_token1231kandfkk1sdfaccounttest
 * 算法生成：114d8d89b3135639d75ed99144310274b7586299
 * 最终采样：1d19d47
 * 注：如果 默认抽样数量 > sha1算法计算的签名长度，则立即返回sha1算法计算的签名 获取sign
 * @function
 * @param {Object} op   用户信息
 * @param {Object} scb  成功后的回调
 * @param {Object} ecb  失败后的回调
 */
function getSign(op) {
    var sign = "";
    var tmpArr = [];
    var tmpStr = "";

    for (var key in op) {
        tmpArr.push(key);
    }
    tmpArr = tmpArr.sort().reverse();
    for (var i = 0; i < tmpArr.length; i++) {
        if (typeof (op[tmpArr[i]]) === "object") {
            tmpStr = tmpStr + tmpArr[i] + JSON.stringify(op[tmpArr[i]]);
        } else {
            tmpStr = tmpStr + tmpArr[i] + op[tmpArr[i]];
        }

    }
    var sha = hex_sha1(utf16to8(tmpStr));
    var shaLength = sha.length;
    var count = parseInt(tmpArr.length * 1.4);

    if (count > shaLength) {
        count = shaLength;
    }

    var step = shaLength / count;

    for (var i = 0; i < count; i++) {
        var num = Math.floor(i * step);
        sign = sign + sha.charAt(num);
    }

    return sign;
}

function transformData(data) {
    let form = document.createElement('form');
    let formData=new FormData(form)

    for (let key in data) {
        formData.append(key,data[key])
    }

    return formData;
}

function _post(method, args) {
    const m = PREFIX + '.' + method;
    const auth_token = localStorage.getItem('auth_token');
    let data = Object.assign({},
        {
            method: m,
            timestamp: new Date().getTime(),
        },
        args);

    if (auth_token && auth_token !== undefined && auth_token !== 'undefined') {
        data['auth_token'] = auth_token;
    }

    const sign = getSign(data);
    data.sign = sign;

    return fetch(URL, {
        method: 'POST',
        body: transformData(data)
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        console.log(m, response)
        if(response.code==10008||response.code==10009){
            hashHistory.push('/')
        }        
        return response;
    }).catch(function (ex) {
        console.log('parsing failed', ex)
    })
}

function _get(method, args) {
    const m = PREFIX + '.' + method;
    const data = Object.assign({}, { method: m }, args);

    return fetch(URL, {
        body: JSON.stringify(data)
    }).then(function (response) {
        return response.json();
    }).catch(function (ex) {
        console.log('parsing failed', ex)
    })
}

function _updateFile(file,storeType,fileName) {
    const auth_token = localStorage.getItem('auth_token');
    let form = document.createElement('form');
    let formData=new FormData(form);

    formData.append("upload_file",file,fileName); 
  
    if (auth_token && auth_token !== undefined && auth_token !== 'undefined') {
        formData.append('auth_token',auth_token)
    }

    formData.append('store_type',storeType);

    return fetch(UPLOADFILE, {
        method: 'POST',
        body: formData
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        console.log(response);
        if(response.code==10008||response.code==10009){
            hashHistory.push('/')
        }
        return response;
    }).catch(function (ex) {
        console.log('parsing failed', ex)
    })
}


export const post = _post;
export const get = _get;
export const updateFile = _updateFile;