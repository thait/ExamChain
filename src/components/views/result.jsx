import React, { Component } from "react";
import { browserHistory } from 'react-router';
import { Table, Row } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
const Tx = require('ethereumjs-tx')
import './../../stylesheets/react-datepicker.scss'
import Table1 from '../util/table'
import abi from './../../../abi/mozoABI.json';

import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            MozoAddr: '0x44bf22949f9cc84b61b9328a9d885d1b5c806b41',
            Accounts:[{id:1,address:'aaa',quanlity:10,percentage:50},{id:2,address:'bbb',quanlity:20,percentage:70}],
            TableStr:""
        }

        this.getMozoHolder = this.getMozoHolder.bind(this);

        window.a = this.state
    }
    
    async getMozoHolder() {
        //const EthereumTx = require('ethereumjs-tx');
        //Create a new transaction
        var self = this
        
        this.state.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"))
        this.state.MozoContract = new this.state.web3.eth.Contract(abi, this.state.MozoAddr)

        this.state.web3.eth.getBlock('latest', function(e,res)
        {
            console.log(res.number)
        })
        console.log(this.state.MozoContract)
        var firstTransaction = '0xeb85c9f0ce8702a66f92fded2eed1c71cb681b4e8f076a7b35d71f8ecb4ba433'
        this.state.web3.eth.call({
            to: '0x44bf22949f9cc84b61b9328a9d885d1b5c806b41',
            data: this.state.MozoContract.methods.balanceOf('0xa3973ab69b2294d4681ff49168c9961a90426e4c').encodeABI()
        }).then(balance => {
            console.log('AAA'+balance)
        })
         //this.state.MozoContract.balanceOf('0x1bf15B79A5240dAA0cA904e3D150863b94c3f862', function(error, result){
           //                    console.log(result)
         //})
        //var TotalSupply = new BigNumber('500000000000')
        //web3.eth.getTransaction(firstTransaction).then(console.log);
        this.setState({
            Accounts : [{id:1,address:'aaa',quanlity:10,percentage:50},{id:2,address:'bbb',quanlity:20,percentage:70}]
          });
         
        this.state.Address = []
        let index = 0;
       
        
       await this.state.MozoContract.getPastEvents('Transfer', {
            filter: {},
            fromBlock: 5943219,
            toBlock: 'latest'
        }, function (error, events) {
            if (!error){
                var _accounts = []
                for (let i=0; i < events.length; i++) {
                    let event = events[i]
                    if (event.event === 'Transfer') {
                        //let blockNumber = event.blockNumber
                        //let transactionHash = event.transactionHash
                        let fromWallet = event.returnValues.from
                        let toWallet = event.returnValues.to
                        if(typeof self.state.Address == 'undefined'  || !self.state.Address.includes(fromWallet))
                        {                        
                            index++
                            if(typeof self.state.Address == 'undefined')
                            self.state.Address = [{fromWallet}]
                            else
                            self.state.Address.push(fromWallet)
                            // self.state.MozoContract.balanceOf(fromWallet, function(error, result){
                            //     self._accounts.push({id:index,address:toWallet,quanlity:result,percentage:50})
                            // console.log(self.Address)
                            //})             
                            self.state.web3.eth.call({
                                to: '0x44bf22949f9cc84b61b9328a9d885d1b5c806b41',
                                data: self.state.MozoContract.methods.balanceOf(fromWallet).encodeABI()
                            }).then(balance => {
                                console.log(balance)
                                if(typeof _accounts == 'undefined')
                                {
                                    _accounts = [{address:fromWallet,quanlity:parseInt(balance, 16)}]
                                    self.setState({
                                        Accounts: _accounts
                                    })
                                }
                                else
                                {
                                    _accounts.push({address:fromWallet,quanlity:parseInt(balance, 16)})
                                    self.setState({
                                        Accounts: _accounts
                                    })
                                }
                                
                            })               
                        }
                        if(typeof self.state.Address == 'undefined' || !self.state.Address.includes(toWallet))
                        {
                            index++
                            if(typeof self.state.Address == 'undefined')
                            self.state.Address = [{toWallet}]
                            else
                            self.state.Address.push(toWallet)
                            // self.state.MozoContract.balanceOf(toWallet, function(error, result){
                            //     self._accounts.push({id:index,address:toWallet,quanlity:result,percentage:50})
                            // console.log(self.Address)
                            // })      
                            self.state.web3.eth.call({
                                to: '0x44bf22949f9cc84b61b9328a9d885d1b5c806b41',
                                data: self.state.MozoContract.methods.balanceOf(toWallet).encodeABI()
                            }).then(balance => {
                                console.log(balance)
                                if(typeof _accounts == 'undefined')
                                {
                                    _accounts = [{address:toWallet,quanlity:parseInt(balance, 16)}]
                                    self.setState({
                                        Accounts: _accounts
                                    })
                                }
                                else
                                {
                                    _accounts.push({address:toWallet,quanlity:parseInt(balance, 16)})
                                    self.setState({
                                        Accounts: _accounts
                                    })
                                }
                                
                            })                           
                        }
                    
                    }
                }

                // for (let i=0; i < self.Address.length; i++) {

                //     self.web3.eth.call({
                //         to: '0x44bf22949f9cc84b61b9328a9d885d1b5c806b41',
                //         data: self.state.MozoContract.methods.balanceOf('0xa3973ab69b2294d4681ff49168c9961a90426e4c').encodeABI()
                //     }).then(balance => {
                //         if(typeof self._accounts == 'undefined')
                //         {
                //             _accounts = [{address:self.Address[i],balance:self.Address}]
                //         }
                //         else
                //         {
                //             _accounts.push({address:self.Address[i],balance:self.Address})
                //         }
                //     })
                    
                // }
               // console.log(self.Address)
            }
        })
        console.log('Doneeee')
    }

    getBalance(){
        var self = this
        var _accounts = []
        console.log(this.state.Address)
         for (let i=0; i < this.state.Address.length; i++) {
                    console.log(self.state.Address[i])
                    this.state.web3.eth.call({
                        to: '0x44bf22949f9cc84b61b9328a9d885d1b5c806b41',
                        data: self.state.MozoContract.methods.balanceOf(self.state.Address[i]).encodeABI()
                    }).then(balance => {
                        console.log(balance)
                        if(typeof _accounts == 'undefined')
                        {
                            _accounts = [{address:self.state.Address[i],quanlity:balance}]
                            self.setState({
                                Accounts: _accounts
                            })
                            console.log('SSS')
                        }
                        else
                        {
                            _accounts.push({address:self.state.Address[i],quanlity:balance})
                            self.setState({
                                Accounts: _accounts
                            })
                            console.log(_accounts)
                        }
                        
                    })
                    
                }
                console.log('AAA : '+_accounts)
    }
    render() {
        var self = this
        return (
            <div className="container">
                <h2>Mozo Holder</h2>
                <div className="block" >
                    <button className="button" onClick={() => self.getMozoHolder()}>
                        Get Mozo Holder
                    </button>
                </div>
                <div className="block" >
                    <button className="button" onClick={() => self.getBalance()}>
                        Get Balance
                    </button>
                </div>
                <div>
                <Table1 data={this.state.Accounts}/>
                </div>
            </div>
        )
    }
}