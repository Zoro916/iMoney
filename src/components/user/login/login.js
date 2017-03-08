import { updateFile, post } from 'global/utils/fetch.js';
import { hex_md5 } from 'global/utils/CryptoMd5.js';
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,push,hashHistory} from 'react-router';
import './login.less';
import { Flex, WhiteSpace } from 'antd-mobile';
export default class Login extends Component {
	//创建属性
	constructor(props){
	 	super(props);
	 	this.state={
	 		userName:"",
	 		userPassword:"",
	 	}
	 }
	render(){
	  	return (
	  	    <div id='login'>
						<div className="center">
					    <header id="header">
					      <h1 className="login-logo"></h1>
					    </header>
					    <main className="login-main">
					      <div>
					        <div className="title">
					          <h2>欢迎使用爱存钱</h2>
					        </div>

					        <div className="login-userinfo">
					          <input className="login-username" type="text" placeholder="请输入用户名" />
					        </div>
					        <div className="login-userinfo">
					          <input className="login-password" type="text" placeholder="请输入密码" />
					        </div>

					        <div className="login-register">
					          <div className="login-blank-remember">
					            <input type="checkbox" id="login-remember"/><label htmlFor="login-remember">记住密码</label>
					          </div>
					          <div className="login-blank-register">
					            <a href="https://www.baidu.com" target="_blank">马上注册</a>
					          </div>
					        </div>

					        <div className="loign-btn-submit">
					          <button type="button" name="button">登录</button>
					        </div>
					      </div>
					    </main>
					  </div>
  	 	    </div>
	  	 	);
	  }
};
