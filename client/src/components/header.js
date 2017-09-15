import React, { Component } from "react";
import { connect } from "react-redux";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Header extends Component {
  renderContent() {
    return !this.props.currentUser ? (
      <li>
        <a className='user-log' href="/api/auth/github">Login With GitHub</a>
      </li>
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

export default connect(null)(Header);
