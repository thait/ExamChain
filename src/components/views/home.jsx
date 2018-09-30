import React, { Component } from "react";
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import './../../stylesheets/react-datepicker.scss'
import DatePicker from 'react-datepicker';
import moment from 'moment';
var $ = require ('jquery')
import examABI from '../../../abi/examABI.json';

const ExamSCAddr = '0x2e6f0568da2c5e4a5f05c04f2956dd7d089c73cb'
const Addr = '0x60e23c4D0Ad3143465C1D0f9898E4e51A50b8e62'

export default class Home extends Component {  
    constructor(props) {
      super(props)
      this.state = {
        email: '',
        password: '',
        confirmPassword: '',
      }
      this.handleClick = this.handleClick.bind(this);
      this.registerSubmit = this.registerSubmit.bind(this);
      this.loginSubmit = this.loginSubmit.bind(this);

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
  registerSubmit(event) {
    console.log(event)

    

    event.preventDefault();

  }
  loginSubmit(event) {
    console.log(event)
    event.preventDefault();
  }
  handleClick(e) {
    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

};
  render() {
    const { email, password, confirmPassword } = this.state;

    return (
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6 col-md-offset-3">
                        <div className="panel panel-login">
                          <div className="panel-heading">
                            <div className="row">
                              <div className="col-xs-6">
                                <a href="#" onClick={this.handleClick} className="active" id="login-form-link">Login</a>
                              </div>
                              <div className="col-xs-6">
                                <a href="#" onClick={this.handleClick} id="register-form-link">Register</a>
                              </div>
                            </div>
                            <hr />
                          </div>
                          <div className="panel-body">
                            <div className="row">
                              <div className="col-lg-12">
                                <form id="login-form" onSubmit={this.loginSubmit} role="form" style={{display: 'block'}}>
                                  <div className="form-group">
                                    <input type="text" name="username" id="username" tabIndex={1} className="form-control" placeholder="Username" defaultValue />
                                  </div>
                                  <div className="form-group">
                                    <input type="password" name="password" id="password" tabIndex={2} className="form-control" placeholder="Password" />
                                  </div>
                                 
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col-sm-6 col-sm-offset-3">
                                        <input type="submit" name="login-submit" id="login-submit" tabIndex={4} className="form-control btn btn-login" defaultValue="Log In" />
                                      </div>
                                    </div>
                                  </div>
                                 
                                </form>
                                <form id="register-form" onSubmit={this.registerSubmit} role="form" style={{display: 'none'}}>
                                  <div className="form-group">
                                    <input type="text" name="username" id="username" tabIndex={1} className="form-control" placeholder="Username" defaultValue='P.Jonh' />
                                  </div>
                                  <div className="form-group">
                                    <input type="email" name="email" id="email" tabIndex={1} className="form-control" placeholder="Email Address" defaultValue="jphan@gmail.com"/>
                                  </div>
                                  <div className="form-group">
                                    <input type="password" name="password" id="password" tabIndex={2} className="form-control" placeholder="Password" />
                                  </div>
                                  <div className="form-group">
                                    <input type="password" name="confirm-password" id="confirm-password" tabIndex={2} className="form-control" placeholder="Confirm Password" />
                                  </div>
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col-sm-6 col-sm-offset-3">
                                        <input type="submit" name="register-submit" id="register-submit" tabIndex={4} className="form-control btn btn-register" defaultValue="Register Now" />
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                
              );
}
}