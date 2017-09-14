import React from "react";
import { connect } from "react-redux";
import { restartApp } from '../actions/index';


class Result extends React.Component {

  goToStart(e) {
    e.preventDefault();
    this.props.dispatch(restartApp());
  }


    render(){
      return (
        <div className="results card">
            <p>You are done.</p>
            <button autoFocus className="btn button blue" onClick={e => this.goToStart(e)}>Start Over</button>
        </div>
      )
    }
}
export default connect (null)(Result)