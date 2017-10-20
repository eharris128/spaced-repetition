import React, { Component } from "react";
import { connect } from "react-redux";
import "materialize-css/dist/css/materialize.min.css";

export class Header extends Component {
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
          <h3 className="app-brand-logo">Study Hard</h3>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

export default connect(null)(Header);
