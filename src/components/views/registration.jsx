import React, { Component } from "react";
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import './../../stylesheets/react-datepicker.scss'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../../stylesheets/registration.scss';
var $ = require ('jquery')

export default class Registration extends Component {  
    constructor(props) {
      super(props)
      this.state = {
        email: '',
        password: '',
        confirmPassword: '',
      }
      this.handleClick = this.handleClick.bind(this);
  }   
 
  onChange(e) {
      console.log(this)
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    //handle form processing here....
  }
  componentDidMount () {
    
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
                                <form id="login-form" method="post" role="form" style={{display: 'block'}}>
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
                                <form id="register-form" method="post" role="form" style={{display: 'none'}}>
                                  <div className="form-group">
                                    <input type="text" name="username" id="username" tabIndex={1} className="form-control" placeholder="Username" defaultValue />
                                  </div>
                                  <div className="form-group">
                                    <input type="email" name="email" id="email" tabIndex={1} className="form-control" placeholder="Email Address" defaultValue />
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
};
