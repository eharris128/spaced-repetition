import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import 'materialize-css'; 
import 'materialize-css/dist/css/materialize.min.css';

class Header extends Component {
  // helper method for Login With Github, show this conditions
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/api/auth/github">Login With GitHub</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/auth/logout">Logout</a>
          </li>
        );
    }
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
          {/* <a href="#" className="brand-logo">Data Structures & Algorithms</a> */}
          <ul id="nav-mobile" className="center">
              <li className="right" ><a href={'/api/auth/github'}>Login with Github</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
