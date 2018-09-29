import React, { Component } from "react";
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Web3 from 'web3';    
const Tx = require('ethereumjs-tx')
import './../../stylesheets/react-datepicker.scss'

import abi from './../../../abi/SNCTokenABI.json';
import bytecode from './../../../bytecode/SNCTokenBC.json';

import deal_abi from './../../../abi/DealABI.json';
import deal_bytecode from './../../../bytecode/DealBC.json';

import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class ExamDetail extends Component {  
    constructor(props) {
      super(props)
      this.state = {
          azureTnx: "",
          azureAddr: '',
          SNCAddr: '0xeb931e687daaeb31c4ffc8e94ac005087f04b18a',
          senderAddr: '0x593c5bcb84bf058d91c65cd0a66bd5bc92c30220',
          //privateKey = new Buffer('009138c3ed8645f12ca3600599b7550520ac6aca8646da26b479da3be5040ca1', 'hex'),
          companyType: 2,
          productId: 88,
          unitPrice: 222,   
          unit: 33,
          expiryDate: moment().utc().add(2, 'days')
      }

        this.deployAzure = this.deployAzure.bind(this);
        this.acceptSNC = this.acceptSNC.bind(this);
        
      window.a = this.state
  } 
  
  activityLogs() {
    //const EthereumTx = require('ethereumjs-tx');
    //Create a new transaction
    const web3 = new Web3(
        new Web3.providers.HttpProvider("http://sncarl-dns-reg1.eastasia.cloudapp.azure.com:8545")
    );

    var dealContract = new web3.eth.Contract(abi,'0xAb5873a4037168a5483753175E073f0257C2108A');
    dealContract.getPastEvents('ChangeStatus', {
        fromBlock: 0,
        toBlock: 'latest'
    }, function(error, events){ console.log(events); })
    .then(function(events){
        console.log(events) // same results as the optional callback above
    });
}
deploySNCToken2()
{
        //const EthereumTx = require('ethereumjs-tx');
        //Create a new transaction
        const web3 = new Web3(
            new Web3.providers.HttpProvider("http://23.96.3.250:8545")
        );
    
        var sncContract = new web3.eth.Contract(abi);
       
        const encodeABIData = sncContract.deploy({
          data: bytecode,
          arguments: ['99900000000']
        }).encodeABI();
        console.log('Step1')
        web3.eth.personal.unlockAccount(this.state.senderAddr, "Qwerty@123456", 600)
        .then(account => {
            console.log('Account unlocked!')
            console.log(account)
            web3.eth.getTransactionCount(this.state.senderAddr).then(_nonce => {
                web3.eth.signTransaction({
                    nonce: _nonce,
                    from: this.state.senderAddr,
                    gasPrice: "20000000000",
                    gas: "21000",
                    value: "0",
                    data: encodeABIData
                }, 'Qwerty@123456').then(signed => {
        
                    var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);
          
                    tran.on('confirmation', (confirmationNumber, receipt) => {
                      console.log('confirmation: ' + confirmationNumber);
                    });
                
                    tran.on('transactionHash', hash => {
                      console.log('hash');
                      console.log(hash);
                    });
                
                    tran.on('receipt', receipt => {
                      console.log('reciept');
                      console.log(receipt);
                    });
                
                    tran.on('error', console.error);
                });
            })
        });
      
}
deploySNCToken() {

   
    //const EthereumTx = require('ethereumjs-tx');
    //Create a new transaction
    const web3 = new Web3(
        new Web3.providers.HttpProvider("http://23.96.3.250:8545")
    );

    var sncContract = new web3.eth.Contract(abi);
   
    const encodeABIData = sncContract.deploy({
      data: bytecode,
      arguments: ['99900000000']
    }).encodeABI();
    console.log('eee')
    // web3.eth.getTransactionCount(this.state.senderAddr).then(_nonce => {
    //     web3.eth.signTransaction({
    //         nonce: _nonce,
    //         from: "0x25d97e52602918a759e042ee9788264530475d3b",
    //         gasPrice: "20000000000",
    //         gas: "21000",
    //         value: "0",
    //         data: encodeABIData
    //     }, 'Qwerty@123456').then(console.log);
    // })

    var tx = {
      chainId: 11,
      from: "0x593c5bcb84bf058d91c65cd0a66bd5bc92c30220",
      gas: '2000000',
      data: encodeABIData
    }; 
  var privateKey = "009138C3ED8645F12CA3600599B7550520AC6ACA8646DA26B479DA3BE5040CA1"
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  console.log(account);
    web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
      var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);
  
      tran.on('confirmation', (confirmationNumber, receipt) => {
        console.log('confirmation: ' + confirmationNumber);
      });
  
      tran.on('transactionHash', hash => {
        console.log('hash');
        console.log(hash);
      });
  
      tran.on('receipt', receipt => {
        console.log('reciept');
        console.log(receipt);
      });
  
      tran.on('error', console.error);
    });
    

}
  
 
  deployAzure() {
    //const EthereumTx = require('ethereumjs-tx');
    //Create a new transaction
    const web3 = new Web3(
        new Web3.providers.HttpProvider("http://23.96.3.250:8545")
    );

    var dealContract = new web3.eth.Contract(deal_abi);
   
    const encodeABIData = dealContract.deploy({
      data: deal_bytecode,
      arguments: ['0xBE3F404B4Bb1E5FA0814E6E7d8bF91A3d51D8578',1,11,555,22,1533444657]
    }).encodeABI();
    console.log('aaa-1')
    var privateKey = "009138C3ED8645F12CA3600599B7550520AC6ACA8646DA26B479DA3BE5040CA1"
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    console.log(account);
    var tx = {
        chainId: 11,
        from: "0x593c5bcb84bf058d91c65cd0a66bd5bc92c30220",
        gas: '2000000',
        data: encodeABIData
      }; 
      web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
        var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);
    
        tran.on('confirmation', (confirmationNumber, receipt) => {
          console.log('confirmation: ' + confirmationNumber);
        });
    
        tran.on('transactionHash', hash => {
          console.log('hash');
          console.log(hash);
        });
    
        tran.on('receipt', receipt => {
          console.log('reciept');
          console.log(receipt);
        });
    
        tran.on('error', console.error);
      });
  }
  getServiceCostA() {
    //const EthereumTx = require('ethereumjs-tx');
    //Create a new transaction
    const web3 = new Web3(
        new Web3.providers.HttpProvider("http://23.96.3.250:8545")
    );
    console.log("YYY")
    var smartContractAddr = "0x0d536Ce95001E2125f1B0A3eaFb9611B6C05e647"
    var dealContract = new web3.eth.Contract(deal_abi,smartContractAddr);
    web3.eth.call({
        to: smartContractAddr,
        data: dealContract.methods.getServiceCost().encodeABI()
    }).then(fee => {
        console.log(fee)
    })
    
  }
  Approve() {
    //const EthereumTx = require('ethereumjs-tx');
    //Create a new transaction
    const web3 = new Web3(
        new Web3.providers.HttpProvider("http://23.96.3.250:8545")
    );
    var to = "0x4D69a71ca37475d345469409847C1dBBdFb37CeD"
    var sncContract = new web3.eth.Contract(abi,'0xeb931e687daaeb31c4ffc8e94ac005087f04b18a');
    const encodeABIData = sncContract.methods.approve(to,300000).encodeABI();
console.log('OOOO')
    const privateKey = new Buffer('009138C3ED8645F12CA3600599B7550520AC6ACA8646DA26B479DA3BE5040CA1', 'hex')
    web3.eth.getTransactionCount(this.state.senderAddr).then(_nonce => {
        const txParams = {
            nonce: _nonce,
            gasLimit: 3000000,
            gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
            from: this.state.senderAddr,
            data: encodeABIData,
            to:this.state.SNCAddr
        }
        
        const tx = new Tx(txParams);
        tx.sign(privateKey);
        const serializedTx = tx.serialize();
        console.log('ttttt')
        //Verify connection is successful
        web3.eth.net.isListening()
            .then(() => console.log('is connected'))
            .catch(e => console.log('Wow. Something went wrong'));
        console.log('kkk')
        let data = `0x${serializedTx.toString('hex')}`;
        web3.eth.sendSignedTransaction(data)
            .on('transactionHash', function (hash) {
                console.log("trans hash: " + hash)
            })
            .on('receipt', function (receipt) {
                console.log("receipt: " + receipt)
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                console.log("conf: " + confirmationNumber, receipt)
            })
            .on('error', (e) => {
                console.log("Sending Error: " + e)
            });
    });
  }
  acceptSNC() {
    //const EthereumTx = require('ethereumjs-tx');
    //Create a new transaction
    const web3 = new Web3(
        new Web3.providers.HttpProvider("http://sncarl-dns-reg1.eastasia.cloudapp.azure.com:8545")
    );

    var dealContract = new web3.eth.Contract(abi,'0xD47aCB0B4f73BAc0720A06A3E20BD7Aa6cb119c6');
    const encodeABIData = dealContract.methods.acceptSNC(1).encodeABI();
console.log('OOOO')
    const privateKey = new Buffer('411b612cc5c972af8ff8a6c4f1faf52461dcb9a595fd7143f5946de6007f8935', 'hex')
    web3.eth.getTransactionCount(this.state.senderAddr).then(_nonce => {
        const txParams = {
            nonce: _nonce,
            gasLimit: 3000000,
            gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
            from: this.state.senderAddr,
            data: encodeABIData,
            to:'0xD47aCB0B4f73BAc0720A06A3E20BD7Aa6cb119c6'
        }
        
        const tx = new Tx(txParams);
        tx.sign(privateKey);
        const serializedTx = tx.serialize();
        console.log('xxx')
        //Verify connection is successful
        web3.eth.net.isListening()
            .then(() => console.log('is connected'))
            .catch(e => console.log('Wow. Something went wrong'));
        console.log('kkk')
        let data = `0x${serializedTx.toString('hex')}`;
        web3.eth.sendSignedTransaction(data)
            .on('transactionHash', function (hash) {
                console.log("trans hash: " + hash)
            })
            .on('receipt', function (receipt) {
                console.log("receipt: " + receipt)
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                console.log("conf: " + confirmationNumber, receipt)
            })
            .on('error', (e) => {
                console.log("Sending Error: " + e)
            });
    });
}

  render() {
    var self = this
    return (
        <div className="main-container">
            <h2>Azure Demo</h2>
            <div className="block" >
                <button className="button" onClick={() => self.Approve()}>
                Approve
        </button>
            </div>
            <div className="block" >
                <button className="button" onClick={() => self.deploySNCToken()}>
                    Deploy SNC Token
        </button>
            </div>
            <div className="block" >
                <button className="button" onClick={() => self.deployAzure()}>
                    Deploy Azure
        </button>
            </div>
            <div className="block" >
                <b>Azure Address:</b> &nbsp;
           <span>{self.state.mozoAddr}</span>
            </div>
           
            <button className="button" onClick={() => self.acceptSNC()}>
                    Accept SNC
        </button>

         <button className="button" onClick={() => self.activityLogs()}>
                    Get Activity Logs
        </button>
            </div>
           
        
    )
}
}