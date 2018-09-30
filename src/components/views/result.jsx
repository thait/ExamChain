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
import examABI from '../../../abi/examABI.json';

const ExamSCAddr = '0x2e6f0568da2c5e4a5f05c04f2956dd7d089c73cb'


const student = {
    Name : 'AA',
    Email : '',
    Addr: '0x60e23c4D0Ad3143465C1D0f9898E4e51A50b8e62'
}

export default class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
      
        }
        if (typeof web3 != 'undefined') {
            console.log("Using web3 detected from external source like Metamask")
            this.web3 = new Web3(web3.currentProvider)
        } else {
            console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        }
        const examontract = web3.eth.contract(examABI)
        this.state.examInstance = examontract.at(ExamSCAddr)
        window.a = this.state
    }
    
     getResultByAddress(_address) {
          var self = this
          console.log(_address)
          this.state.examInstance.GetResultByAddress(_address, function (error, result) {
              if (!error){
                  console.log('A')
                 console.log(result)       
              }
              else
                  console.log(error)
          });
      }
      getStudentInfo() {
        var self = this
        console.log()
        this.state.examInstance.GetStudentInfo(function (error, result) {
            if (!error){
               console.log(result)       
            }
            else
                console.log(error)
        });
    }
      updateInput(event){
        student.Addr = event.target.value
        }
        
    render() {
        var self = this
        return (
            <div className="container">
            <div className="header">
                <h2>Hello, {ExamSCAddr}</h2>
            </div>
            <div className="content">
            <input type='text' onChange={this.updateInput}/>
             <button onClick={this.getResultByAddress(student.Addr)}>Get Result</button>
            </div>
            </div>
        )
    }
}