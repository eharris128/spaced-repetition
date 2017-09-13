import React from "react";
import { connect } from "react-redux";
import { restartApp } from '../actions/index';
const { LinkedList } = require("../LinkedList");


class Result extends React.Component {

  goToStart(e) {
    e.preventDefault();
    this.props.dispatch(restartApp());
    console.log('Clicked restart');
  }


    render(){
      return (
        <div className="results card">
            <p>You are done.</p>
            <button className="btn button blue" onClick={e => this.goToStart(e)}>Start Over</button>
        </div>
      )
    }
}
export default connect (null)(Result)