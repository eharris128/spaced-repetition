import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Header extends Component {
  renderContent() {
    // This is rendering twice: something is being passed in and it is mutating
      // what is being changed?
    // console.log(this.props.currentUser)
    return !this.props.currentUser ? (
      <li>
        <a href="/api/auth/github">Login With GitHub</a>
      </li>
    ) : (
      <li>
        <a href="/api/auth/logout">Logout</a>
      </li>
    );
  }

  render() {
    return (
      <nav className="nav-wrapper blue">
        <div>
          <h2 className="brand-logo">Study Hard App</h2>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

export default connect(null)(Header);
