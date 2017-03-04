import {
    USER_INFO,
    LOGIN,
    REGISTER,
    CHANGEPWD
} from './config';

import { get, post } from 'global/utils/fetch';
import { hex_md5 } from 'global/untils/CryptoMd5.js';
//用户信息
export const userInfo = () => {
    return (dispatch)=>{
        post('user.customer.get').then((data)=>{
            if (data.status == 1) {
                dispatch({
                    type:USER_INFO,
                    data:data.data
                })
            }
        });
    }
}

//用户信息
export const login = (username, password, scb, ecb) => {
    return (dispatch) => {
        post('user.login', {
            phone: username,
            passwd: hex_md5(password),
            role_type: '0'
        }).then((data) => {
            if (data.status == 1) {
                createCookie("auth_token", data.data["auth_token"], 7);
                scb&&scb(data);
            } else {
                ecb&&ecb(data);
            }
        });
    }
}
