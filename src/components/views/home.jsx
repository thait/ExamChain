import React, { Component } from "react";
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import './../../stylesheets/react-datepicker.scss'
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class Home extends Component {  
    constructor(props) {
      super(props)
      this.state = {
          
      }

      window.a = this.state
  }   
 
  render() {
    var self = this
    return (
        <div className="main-container">
            <h2>Hello</h2>
            
        </div>

    )
}
}