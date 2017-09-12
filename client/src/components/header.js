import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import 'materialize-css'; 
import 'materialize-css/dist/css/materialize.min.css';
import { logoutUser, loginUser } from '../actions/index';
class Header extends Component {

  loginUser_user(e) {
    e.preventDefault();    

    this.props.dispatch(loginUser());
    // this.props.history.push("/api/auth/github");
    // this.linkElement.click();
    window.location="/api/auth/github"
  } 

  logoutUser_sid(e) {
    e.preventDefault();
    this.props.dispatch(logoutUser());
    window.location="/api/auth/logout"
  } 
  // helper method for Login With Github, show this conditions, onClick={e => this.loginUser_user(e)}
  renderContent() {
    console.log('-------login status-->', this.props.auth);
    return !this.props.auth ? (
    <li>
      <a role="button" onClick={e => this.loginUser_user(e)}>Login With GitHub</a>
    </li>
    ):(
    <li>
       <a role="button" onClick={e => this.logoutUser_sid(e)}>Logout</a>
    </li>
    );
  }

  render() {
    // console.log(this.props);
    return (
      <nav className="nav-wrapper blue">
        <div>
        <Link
            to={this.props.auth ? "/api/auth/github" : "/"}
            className="brand-logo"
          >
          Data Structures & Algorithms
          </Link>
              <ul className="right">{this.renderContent()}</ul>
    
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps)(withRouter(Header));
