import React, { Component } from "react";
import { connect } from "react-redux";
import "materialize-css/dist/css/materialize.min.css";
import * as Cookies from "js-cookie";
import {resetState, userLogin} from '../actions/index';

export class Header extends Component {
  demoLogin(){
    console.log('Clicked');
    const accessToken = "87dbff268125bd41013acd2001991dd90781a8fb"
    Cookies.set('accessToken', accessToken, { expires: 7 });
        if (accessToken) {
            fetch('/api/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                return res.json();
            }).then(userData => {
                this.props.dispatch(userLogin(userData.token));
            });
        }
  }
  renderContent() {
    console.log('Props: ', this.props.userId);
    return !this.props.currentUser ? (
      <div>
      <li> 
        <button onClick={() => this.demoLogin()}className="button">Demo Login</button>
      </li>
      <li>
        <a className='user-log' href="/api/auth/github">Login With GitHub</a>
      </li>
      </div>
    ) : (
      <li>
        <a className='user-log' href="/api/auth/logout">Logout</a>
      </li>
    );
  }

  render() {
    return (
      <nav className="nav-wrapper blue">
        <div>
          <h2 className="brand-logo">Study Hard</h2>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.userId
});

export default connect(null)(Header);
