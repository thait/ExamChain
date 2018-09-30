import React, { Component } from "react";
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Web3 from 'web3';    
const Tx = require('ethereumjs-tx')
import './../../stylesheets/react-datepicker.scss'
import '../../stylesheets/examdetail.scss';

import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class ExamDetail extends Component {  
    constructor(props) {
      super(props)
      this.state = {
      exams:[]  
      }
        
      window.a = this.state
  } 
  componentDidMount() {
    fetch("http://vietp5882.pythonanywhere.com/questions")
      .then(res => res.json())
      .then(
        (result) => {
           
          this.setState({
            isLoaded: true,
            exams: result
           
          });
          console.log(this.state.exams)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    var self = this
    return (
        <div className="main-container">
           <div className="header"> </div>
           <div>
           {this.state.exams.map((item,i) => (
                <div className="questionSection" key={i}>
                <div>Question {i+1}: {item.content}</div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name={i+1} id="inlineRadio1" value="option1"/>
                <label className="form-check-label" htmlFor="inlineRadio1">{item.answer.A}</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name={i+1} id="inlineRadio2" value="option2"/>
                <label className="form-check-label" htmlFor="inlineRadio2">{item.answer.B}</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name={i+1} id="inlineRadio3" value="option3"/>
                <label className="form-check-label" htmlFor="inlineRadio3">{item.answer.C}</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name={i+1} id="inlineRadio3" value="option3"/>
                <label className="form-check-label" htmlFor="inlineRadio4">{item.answer.D}</label>
               </div>                 
               </div>
          ))}
          </div>
        </div>
    )
}
}