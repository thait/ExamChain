import React, { Component } from "react";
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
import Web3 from 'web3';    
const Tx = require('ethereumjs-tx')
import './../../stylesheets/react-datepicker.scss'
import '../../stylesheets/examdetail.scss';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import examABI from '../../../abi/examABI.json';

const ExamSCAddr = '0x2e6f0568da2c5e4a5f05c04f2956dd7d089c73cb'
const Addr = '0x60e23c4D0Ad3143465C1D0f9898E4e51A50b8e62'

export default class ExamDetail extends Component { 
    constructor(props) {
      super(props)
      this.state = {
      exams:[]  
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
      this.Submit = this.Submit.bind(this);
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
radioHandleEvent(event){
    //console.log(event.target.checked, event.target.name);
    //console.log(event.target.checked, event.target.key);
      //  this.state.exams[event.target.name].selected = event.target.value
      //  console.log(this.state.exams[event.target.name].selected)
    
};
 Submit()
 {
    var self = this
          let ID = "DFJDHFJ"
          let Name = "Math"
          let ScoreDetail = "1C-2D-3B-4C-5A"
          let Score = "9.25"
          this.state.examInstance.SubmitExam(ID,Name,ScoreDetail,Score, function (error, result) {
              if (!error){
                  console.log('A')
                 console.log(result)
              }
              else
                  console.log(error)
          });
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
                <input className="form-check-input" onChange={this.radioHandleEvent} type="radio" name={i} id="inlineRadio1" value={item.answer.A}/>
                <label className="form-check-label" htmlFor="inlineRadio1">{item.answer.A}</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" onChange={this.radioHandleEvent} type="radio" name={i} id="inlineRadio2" value={item.answer.B}/>
                <label className="form-check-label" htmlFor="inlineRadio2">{item.answer.B}</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input"  onChange={this.radioHandleEvent} type="radio" name={i} id="inlineRadio3" value={item.answer.C}/>
                <label className="form-check-label" htmlFor="inlineRadio3">{item.answer.C}</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" onChange={this.radioHandleEvent} type="radio" name={i} id="inlineRadio3" value={item.answer.D}/>
                <label className="form-check-label" htmlFor="inlineRadio4">{item.answer.D}</label>
               </div>                 
               </div>
          ))}
          <button onClick={()=>this.Submit(Addr)} className="btn btn-primary">Submit</button>
          </div>
        </div>
    )
}
}