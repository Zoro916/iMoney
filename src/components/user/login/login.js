import { updateFile, post } from 'global/utils/fetch.js';
import { hex_md5 } from 'global/utils/CryptoMd5.js';
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,push,hashHistory} from 'react-router';
import './login.less';
export default class Login extends Component {
	//创建属性
	constructor(props){
	 	super(props);
	 	this.state={
	 		userName:"",
	 		userPassword:"",
	 		unameHelp:"",
	 		upwdHelp:""
	 	}
	 }

	 //监听input中的数据保存到state中
	changeUsername(e){
	 	let uname = e.target.value;

	 	this.setState({
	 		userName: uname
	 	});
	 }

	changePassword(e){
	 	let upwd = e.target.value;
	 	this.setState({
	 		userPassword: upwd
	 	});
	 }

	 //点击登录按钮，触发后台接口提供验证，对数据的处理
	login(){
	 	
	 	 //验证账号密码是否为空和符合格式
	 	if(this.state.userName === ""||this.state.userName === null){
	 		this.setState({
	 			unameHelp: "*用户名不能为空",
	 			upwdHelp:""
	 		});
	 	}else if(this.state.userPassword === ""||this.state.userPassword === null){
	 		this.setState({
	 			unameHelp: "",
	 			upwdHelp: "*密码不能为空"
	 		});
	 	}else{
	 		this.setState({
	 			unameHelp: "",
	 			upwdHelp: ""
	 		});
	 	
         
		 	post('user.employee.login', {
	            account: this.state.userName,
	            passwd: hex_md5(this.state.userPassword),
	        }).then((data) => {
	            if (data.status == 1) {
	                //更新信息
	                let Auth_token = data.data.auth_token;
	                let is_admin = data.data.is_admin;     
	                if (typeof(Storage) !== "undefined") {
					    localStorage.setItem("auth_token", Auth_token.auth_token);   
					}
					post('user.employee.organizationinfo', {
				        auth_token: localStorage.getItem('auth_token'),
				        
				        }).then((data) => {
				        if (data.status == 1) {   
	  						sessionStorage.setItem("logoUrl",data.data.logo);
				        }
					});
					sessionStorage.setItem("passWorld", this.state.userPassword);
	                hashHistory.push('/Home');
	            }else{
	            	this.setState({
		 			unameHelp: "账号或密码不正确",
		 			upwdHelp: ""
		 		   });
	            }
	        });
	     }
	}
	onEntry(event){
		if(event.keyCode === 13){
			this.login()		
		}
	}
	render(){

	  	return (
	  	    <div id='lg_main'>	
	  	   		<div id='wrap'>
  	 				<div id="login">
	  	 		   		<form>
		  	 			<h1 className='lg_title'>欢迎登录e血液供应商系统</h1>
		  	 			<div className='lg_input'>
			  	 			<div className='lg_user'>
    						    <label htmlFor='username'>用户名：</label>
    						    <input type='text' id='username' placeholder='请输入用户名' ref='uname' 
    						    onChange={this.changeUsername.bind(this)}
    						    onKeyUp={this.onEntry.bind(this)}
    						    />
    						    <span id='user_prompt'>{this.state.unameHelp}</span>
	    				    </div>
					        <div className='lg_user'>
	    						<label htmlFor='password'>密&nbsp;码：</label>
	    						<input type='password' id='password' placeholder='请输入密码' ref='upwd' 
	    						onChange={this.changePassword.bind(this)}
	    						onKeyUp={this.onEntry.bind(this)}
	    						/>
	    						<span id='pass_prompt'>{this.state.upwdHelp}</span>
	    				    </div>
	    				    <div className='lg_btn'>
							    <input type='button' value='登录' onClick={this.login.bind(this)}/>
					        </div> 
			     		</div>
			   			</form>
  	 				</div>
  	 	   		</div>
  	 	    </div>
	  	 	);
	  }
};

module.exports = Login;
