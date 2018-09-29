import React, { Component } from "react";
import { browserHistory } from 'react-router';
import { Table, Row } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
const Tx = require('ethereumjs-tx')
import './../../stylesheets/react-datepicker.scss'
import Table1 from '../util/table'

import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
      
        }

        window.a = this.state
    }
    
   
    render() {
        var self = this
        return (
            <div className="container">
                <h2>Hello</h2>
               
            </div>
        )
    }
}