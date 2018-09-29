import React, { Component } from "react";
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import './../../stylesheets/react-datepicker.scss'

import mozoABI from './../../../abi/mozoABI.json';
import mozoSaleABI from './../../../abi/mozoSaleABI.json';
import invesmentDiscountABI from './../../../abi/invesmentDiscountABI.json';
import referralABI from './../../../abi/referralABI.json';

import mozoBC from './../../../bytecode/mozoBC.json';
import mozoSaleBC from './../../../bytecode/mozoSaleBC.json';
import invesmentDiscountBC from './../../../bytecode/invesmentDiscountBC.json';
import referralBC from './../../../bytecode/referralBC.json';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class Home extends Component {  
    constructor(props) {
      super(props)
      this.state = {
          status: 0,
          mozoSaleBalance:0,
          invesmentDiscountBalance:0,
          referralBalance:0,
          mozoTnx: "",
          weiContributionTranches: [1000000000,2000000000,3000000000],
          bonusPercentageTranches: [10,20,30],
          coOwner:[
              '0x3052485de311DEF7BF80a3EBcE529b3e89B05905',
              '0x660654981a23b76e9A41d6c5c2e47a4933bBe902',
              '0x8b92865556c63869ae5beCD028CecaD1BCa7B7aF',
              '0xAb6aCAB964C9F72E47c394C13A489Bb8Bf81c06e'
          ],
          mozoAddr: localStorage.getItem('mozoAddr'),
          mozoSaleAddr: localStorage.getItem('mozoSaleAddr'),
          invesmentDiscountAddr: localStorage.getItem('invesmentDiscountAddr'),
          referralAddr: localStorage.getItem('referralAddr'),
          referralSupply: 0,
          mozoSaleStartTime: moment().utc().add(5, 'minutes'),   
          mozoSaleEndTime: moment().utc().add(2, 'days'),  
          invesmentDiscountStartTime: moment().utc().add(5, 'minutes'),
          invesmentDiscountEndTime: moment().utc().add(2, 'days'),       
          referralStartTime: moment().utc().add(5, 'minutes'),
          referralEndTime: moment().utc().add(2, 'days')   
      }

        this.mozoSaleStartTimehandleChange = this.mozoSaleStartTimehandleChange.bind(this);
        this.mozoSaleEndTimehandleChange = this.mozoSaleEndTimehandleChange.bind(this);
        this.invesmentDiscountStartTimehandleChange = this.invesmentDiscountStartTimehandleChange.bind(this);
        this.invesmentDiscountEndTimehandleChange = this.invesmentDiscountEndTimehandleChange.bind(this);
       
        this.referralStartTimehandleChange = this.referralStartTimehandleChange.bind(this);
        this.referralEndTimehandleChange = this.referralEndTimehandleChange.bind(this);


      if (typeof web3 != 'undefined') {
          console.log("Using web3 detected from external source like Metamask")
          this.web3 = new Web3(web3.currentProvider)
      } else {
          console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
          this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
      }

      //   const MyContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"generateNumberWinner","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"myid","type":"bytes32"},{"name":"result","type":"string"}],"name":"__callback","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numberOfBets","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_queryId","type":"bytes32"},{"name":"_result","type":"string"},{"name":"_proof","type":"bytes"}],"name":"__callback","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"player","type":"address"}],"name":"checkPlayerExists","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"resetData","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"bets","type":"uint256"}],"name":"updateMaxBets","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"number","type":"uint256"}],"name":"bet","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"amountWei","type":"uint256"}],"name":"updateMinimumBet","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"distributePrizes","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numberWinner","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"minimumBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"maxAmountOfBets","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_maxAmountOfBets","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"}])
      //   this.state.ContractInstance = MyContract.at("0x430d959fa54714aca8eecd61fae2661fca900e04")

      window.a = this.state
  }   
  mozoSaleStartTimehandleChange(date) {
    this.setState({
      mozoSaleStartTime: date
    });
    document.getElementById('openningTime').value = parseInt(moment(date).valueOf()/1000)
}
mozoSaleEndTimehandleChange(date) {
    this.setState({
      mozoSaleEndTime: date
    });
    document.getElementById('closingTime').value = parseInt(moment(date).valueOf()/1000)
}
invesmentDiscountStartTimehandleChange(date) {
    this.setState({
      invesmentDiscountStartTime: date
    });
    document.getElementById('invesmentDiscountStartTime').value = parseInt(moment(date).valueOf()/1000)
}
invesmentDiscountEndTimehandleChange(date) {
    this.setState({
      invesmentDiscountEndTime: date
    });
    document.getElementById('invesmentDiscountEndTime').value = parseInt(moment(date).valueOf()/1000)
}


referralStartTimehandleChange(date) {
    this.setState({
      referralStartTime: date
    });
    document.getElementById('referralStartTime').value = parseInt(moment(date).valueOf()/1000)
}
referralEndTimehandleChange(date) {
    this.setState({
      referralEndTime: date
    });
    document.getElementById('referralEndTime').value = parseInt(moment(date).valueOf()/1000)
}

loadMozo(_address) {
    const mozoContract = web3.eth.contract(mozoABI)
    this.state.mozoInstance = mozoContract.at(_address)
}
loadMozoSale(_address) {
    const mozoSaleContract = web3.eth.contract(mozoSaleABI)
    this.state.mozoSaleInstance = mozoSaleContract.at(_address)
}
loadInvesmentDiscount(_address) {
    const invesmentDiscountContract = web3.eth.contract(invesmentDiscountABI)
    this.state.invesmentDiscountInstance = invesmentDiscountContract.at(_address)
}

loadReferral(_address) {
    const referralContract = web3.eth.contract(referralABI)
    this.state.referralInstance = referralContract.at(_address)
}
getMozoBalance(_address) {
    var self = this
    this.state.mozoInstance.balanceOf(_address, function (error, result) {
        if (!error)
            self.setState({
                mozoAddrBalance: result.toString()
            })
        else
            self.setState({
                status: error
            })
    });
}
getMozoSaleBalance(_address) {
    var self = this
    this.state.mozoSaleInstance.balanceOf(_address, function (error, result) {
        if (!error)
            self.setState({
                mozoSaleAddrBalance: result.toString()
            })
        else
            self.setState({
                status: error
            })
    });
}

mozoTransfer(_address, amount) {
    var self = this
    console.log('transfer Mozo: '+ amount)
    this.state.mozoInstance.transfer(_address, amount, function (error, result) {
        if (!error){
            self.setState({
                status: result,
                mozoSaleBalance: amount 
            })
            console.log('Started deploy invesmentDiscount')
                self.deployInvesmentDiscount(self.state.mozoSaleAddr)

                   

                    console.log('Started deploy Referral')

                        self.deployReferral(self.state.mozoSaleAddr,
                            document.getElementById("referralAgencyAddress").value)
        }
        else
            self.setState({
                status: error
            })
    });
}

mozoSaleTransfer(_address, amount,_type) {
    var self = this
    this.state.mozoSaleInstance.transfer(_address, amount, function (error, result) {
        if (!error)
        {
            self.setState({
                status: result
                
            })
            if(_type==1)
            self.setState({
                invesmentDiscountBalance: amount
            })
            else
            self.setState({
                referralBalance: amount
            })
        }
        else
            self.setState({
                status: error
            })
    });
}
invesmentDiscountTransfer(_address, amount) {
    var self = this
    this.state.invesmentDiscountInstance.transfer(_address, amount, function (error, result) {
        if (!error)
            self.setState({
                status: result
            })
        else
            self.setState({
                status: error
            })
    });
}

referralTransfer(_address, amount) {
    var self = this
    this.state.referralInstance.transfer(_address, amount, function (error, result) {
        if (!error)
            self.setState({
                status: result
            })
        else
            self.setState({
                status: error
            })
    });
}
mozoSaleBuyToken(_address, value, amount) {
    var self = this
    this.state.mozoSaleInstance.transferByEth(_address, value, amount, function (error, result) {
        if (!error)
            self.setState({
                status: result
            })
        else
            self.setState({
                status: error
            })
    });
}
invesmentDiscountBuyToken(wei) {
    var self = this
    this.state.invesmentDiscountInstance.buyToken({gas: '300000', gasPrice: '25000000000',  value: wei }, function (error, result) {
        if (!error)
            self.setState({
                status: result
            })
        else
            self.setState({
                status: error
            })
    });
}

referralBuyToken(wei) {
    var self = this
    this.state.referralInstance.buyToken({gas: '300000', gasPrice: '25000000000', value: wei }, function (error, result) {
        if (!error)
            self.setState({
                status: result
            })
        else
            self.setState({
                status: error
            })
    });
}
deployMozo(_totalSupply) {
    console.log('MozoSale: '+ _totalSupply * 0.25)
    var self = this
    var mozotokenContract = web3.eth.contract(mozoABI);
    var mozotoken = mozotokenContract.new(_totalSupply,
        {
            from: web3.eth.accounts[0],
            data: '0x' + mozoBC.object,
            gas: '4000000',
            gasPrice: '25000000000'
        }, function (e, contract) {
            self.setState({
                mozoTnx : contract.transactionHash
            });
            
            console.log("mozoTnx: "+ self.state.mozoTnx);
            if (typeof contract.address !== 'undefined') {
                self.state.mozoAddr = contract.address
                self.setState({
                    mozoAddr: contract.address
                })
                self.loadMozo(this.state.mozoAddr)
                // Check browser support
                if (typeof(Storage) !== "undefined") {
                    // Store
                    localStorage.setItem("mozoAddr", contract.address)
                    document.getElementById("mozoDetail").disabled = false;
                } else {
                    console.log("Sorry, your browser does not support Web Storage...")
                }   
                                
                this.deployMozoSale(self.state.mozoAddr, document.getElementById("mozoSaleSupply").value, document.getElementById("rate").value)
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
            }
        }.bind(this))
}
deployMozoSale(_mozoToken, _supply, _rate) {
 
    this.state.referralSupply = _supply * 0.2
    var self = this
    var _openingTime = document.getElementById('openningTime').value
    var _closingTime = document.getElementById('closingTime').value
    var mozoSaletokenContract = web3.eth.contract(mozoSaleABI);
    var mozosaletoken = mozoSaletokenContract.new(_mozoToken,self.state.coOwner, _supply, _rate, _openingTime, _closingTime,
        {
            from: web3.eth.accounts[0],
            data: '0x' + mozoSaleBC.object,
            gas: '4000000',
            gasPrice: '25000000000'
        }, function (e, contract) {
            console.log(e, contract);
            if (typeof contract.address !== 'undefined') {
                self.setState({
                    mozoSaleAddr: contract.address
                })
                // Check browser support
                if (typeof(Storage) !== "undefined") {
                    // Store
                    localStorage.setItem("mozoSaleAddr", contract.address)
                } else {
                    console.log("Sorry, your browser does not support Web Storage...")
                }     
                
                
                self.loadMozoSale(this.state.mozoSaleAddr)
                self.mozoTransfer(self.state.mozoSaleAddr,_supply)

               
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                
            }
        }.bind(this))
}
deployInvesmentDiscount(_smzoToken) {
    var self = this    
    var _startTime = document.getElementById('invesmentDiscountStartTime').value
    var _endTime = document.getElementById('invesmentDiscountEndTime').value
    var invesmentDiscountContract = web3.eth.contract(invesmentDiscountABI);
    var invesmentDiscount = invesmentDiscountContract.new(_smzoToken, self.state.weiContributionTranches, self.state.bonusPercentageTranches, _startTime, _endTime,
        {
            from: web3.eth.accounts[0],
            data: '0x' + invesmentDiscountBC.object,
            gas: '4000000',
            gasPrice: '25000000000'
        }, function (e, contract) {
            console.log(e, contract);
            if (typeof contract.address !== 'undefined') {
                self.setState({
                    invesmentDiscountAddr: contract.address
                })
                // Check browser support
                if (typeof(Storage) !== "undefined") {
                    // Store
                    localStorage.setItem("invesmentDiscountAddr", contract.address)
                } else {
                    console.log("Sorry, your browser does not support Web Storage...")
                }     
                this.loadInvesmentDiscount(this.state.invesmentDiscountAddr)
                self.mozoSaleTransfer(this.state.invesmentDiscountAddr,document.getElementById('invesmentDiscountSupply').value,1)
                
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
            }
        }.bind(this))
}

deployReferral(_smzoToken, _agency) {
    var self = this
           
    var _startTime = document.getElementById('referralStartTime').value
    var _endTime = document.getElementById('referralEndTime').value
    var referralContract = web3.eth.contract(referralABI);
    var referral = referralContract.new(_smzoToken, _agency,self.state.weiContributionTranches, self.state.bonusPercentageTranches, _startTime, _endTime,
        {
            from: web3.eth.accounts[0],
            data: '0x' + referralBC.object,
            gas: '4000000',
            gasPrice: '25000000000'
        }, function (e, contract) {
            console.log(e, contract);
            if (typeof contract.address !== 'undefined') {
                self.setState({
                    referralAddr: contract.address
                })
                // Check browser support
                if (typeof(Storage) !== "undefined") {
                    // Store
                    localStorage.setItem("referralAddr", contract.address)
                } else {
                    console.log("Sorry, your browser does not support Web Storage...")
                }     
                this.loadReferral(this.state.referralAddr)
                self.mozoSaleTransfer(this.state.referralAddr,document.getElementById('referralSupply').value,3)
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
            }
        }.bind(this))
}
resetLocalStogare(){
    localStorage.removeItem('mozoAddr');
    localStorage.removeItem('mozoSaleAddr');
    localStorage.removeItem('invesmentDiscountAddr');
    localStorage.removeItem('referralAddr');
}

getTransactionStatus(){
    this.setState({
        mozo
    })
}
  render() {
    var self = this
    return (
        <div className="main-container">
            <h2>Mozo Token</h2>
            <div className="block" >
                <div className="title">Total Supply: </div>
                <input id="mozoSupply" type="text" defaultValue={'500000000000'} />
            </div>
            <div className="block" >
                <button className="button" onClick={() => self.deployMozo(document.getElementById("mozoSupply").value)}>
                    Deploy Mozo Token
        </button>
            </div>
            <div className="block" >
                <b>Mozo Address:</b> &nbsp;
           <span>{self.state.mozoAddr}</span>
            </div>
            <div className="block">
                <b>Mozo Sale Address:</b> &nbsp;
           <span>{self.state.mozoSaleAddr}</span>
           &nbsp;&nbsp;<b>{self.state.mozoSaleBalance}</b>&nbsp;MOZO
            </div>
            <div className="block">
                <b>Invesment Discount Address:</b> &nbsp;
           <span>{self.state.invesmentDiscountAddr}</span>
           &nbsp;&nbsp;<b>{self.state.invesmentDiscountBalance}</b>&nbsp;SMZO
            </div>
            
            <div className="block">
                <b>Referral Address:</b> &nbsp;
           <span>{self.state.referralAddr}</span>
           &nbsp;&nbsp;<b>{self.state.referralBalance}</b>&nbsp;SMZO
            </div>
            <hr/>
            <a id='mozoDetail' className="button"  href="http://localhost:8080/mozo" target="_blank">Mozo Detail</a>
            <a id='mozoSaleDetail' className="button"  href="http://localhost:8080/mozosale" target="_blank">MozoSale Detail</a>
            <a id='invesmentDiscountDetail' className="button"  href="http://localhost:8080/invesmentDiscount" target="_blank">invesmentDiscount Detail</a>
           
            <a id='referralDetail' className="button"  href="http://localhost:8080/referral" target="_blank">Referral Detail</a>      
            <button className="button" onClick={() => self.resetLocalStogare()}>
                    Reset All
        </button>
        <button className="button" onClick={() => self.resetLocalStogare()}>
                    Get Transaction Status
        </button>
        &nbsp;<b>{self.state.mozoTnx}</b>
            <br></br>
            <hr />
            <h2>Mozo Sale Token</h2>
            <div className="block">
                <div className="title">Total Supply:</div> <input id="mozoSaleSupply" type="text" defaultValue={'125000000000'} />
                &nbsp;
        </div>
            <div className="block">
                <div className="title">Rate:</div> <input id="rate" type="text" defaultValue={'1250000000000'} />
                &nbsp;
        </div>
            <div className="block">
                <div className="title">Openning Times:</div> <input id="openningTime" type="text" defaultValue={moment(this.state.mozoSaleStartTime).valueOf()/1000} />
                &nbsp;
                <DatePicker
             selected={this.state.mozoSaleStartTime}                    
                onChange={this.mozoSaleStartTimehandleChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="LLL"
                timeCaption="time" />
        </div>
            <div className="block">
                <div className="title">Closing Times:</div> <input id="closingTime" type="text" defaultValue={moment(this.state.mozoSaleEndTime).valueOf()/1000} />
                &nbsp;
                <DatePicker
             selected={this.state.mozoSaleEndTime}                    
                onChange={this.mozoSaleEndTimehandleChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="LLL"
                timeCaption="time" />
        </div>
            <div className="block">
                <button className="button" onClick={() => self.deployMozoSale(self.state.mozoAddr, document.getElementById("mozoSaleSupply").value, document.getElementById("rate").value)}>
                    Deploy Mozo Sale Token
        </button>
            </div>
            
            
            <hr />
            <h2>invesmentDiscount</h2>
            <div className="block">
                <div className="title">Min Contribution:</div> <input id="minContribution" type="text" defaultValue={'50000000000000000000'} />
            </div>
            <div className="block">
                <div className="title">Min Contribution After Bonus:</div> <input id="minContributionAfterBonus" type="text" defaultValue={'50000000000000000000'} />
            </div>
        
            <div className="block">
                <div className="title">Bonus Percent:</div> <input id="bonusPercent" type="text" defaultValue={20} />
            </div>
            <div className="block">
                <div className="title">Total Supply:</div> <input id="invesmentDiscountSupply" type="text" defaultValue={'5000000000'} />
            </div>
            <div className="block">
                <div className="title">Start Time:</div> <input id="invesmentDiscountStartTime" type="text" defaultValue={moment(this.state.invesmentDiscountStartTime).valueOf()/1000} />
                <DatePicker
             selected={this.state.invesmentDiscountStartTime}                    
                onChange={this.invesmentDiscountStartTimehandleChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="LLL"
                timeCaption="time" />
            </div>
            <div className="block">
                <div className="title">End Time:</div> <input id="invesmentDiscountEndTime" type="text" defaultValue={moment(this.state.invesmentDiscountEndTime).valueOf()/1000} />
                <DatePicker
             selected={this.state.invesmentDiscountEndTime}                    
                onChange={this.invesmentDiscountEndTimehandleChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="LLL"
                timeCaption="time" />
            </div>
            <div className="block">
                <button className="button" onClick={() => self.deployInvesmentDiscount(self.state.mozoSaleAddr)}>
                    Deploy invesmentDiscount
        </button>
            </div>
           
            
            
            
            <hr />
            <h2>Referral</h2>
            <div className="block">
                <div className="title">Agency Address:</div> <input id="referralAgencyAddress" type="text" defaultValue={'0x3e01d100eb27f52E6c57425f80DDF7cB3AB626f7'} />
            </div>
            <div className="block">
                <div className="title">Total Supply:</div> <input id="referralSupply" type="text" defaultValue={'4000000000'} />
            </div>
            <div className="block">
                <div className="title">Start Time:</div> <input id="referralStartTime" type="text" defaultValue={moment(this.state.referralStartTime).valueOf()/1000} />
                <DatePicker
             selected={this.state.referralStartTime}                    
                onChange={this.referralStartTimehandleChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="LLL"
                timeCaption="time" />
            </div>
            <div className="block">
                <div className="title">End Time:</div> <input id="referralEndTime" type="text" defaultValue={moment(this.state.referralEndTime).valueOf()/1000} />
                <DatePicker
             selected={this.state.referralEndTime}                    
                onChange={this.referralEndTimehandleChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="LLL"
                timeCaption="time" />
            </div>
            <div className="block">
                <button className="button" onClick={() => self.deployReferral(self.state.mozoSaleAddr,
                    document.getElementById("referralAgencyAddress").value)}>
                    Deploy Referral
        </button>
            </div>
           
            
            <hr />
            <span>{self.state.status}</span>
            
        </div>

    )
}
}