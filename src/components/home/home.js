import { updateFile, post } from 'global/utils/fetch.js';
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,push,hashHistory} from 'react-router';
import { sess, local, webStorage } from 'conf/webStorage.js';
import './home.less';

export default class Home extends Component {
  render(){
    return (
      <div id="home">
        <header className="home-header">
          <span className="home-nav-icon"></span>
          <p className="home-title">首页</p>
        </header>
        <div className="center">

        </div>
      </div>
    )
  }
}
