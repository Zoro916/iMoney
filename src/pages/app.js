import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';
//跳转组件

//登录
import Login from 'components/user/login/login.js';
class App extends React.Component{
	render(){
		return(
			<div id='ind_main'>
				{this.props.children}	
			</div>
		)
	}
};
// 
ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Login}/>
		</Route>
	</Router>
	),document.body
);