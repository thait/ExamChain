import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../stylesheets/table.scss'
 
 
class Table1 extends Component {
  render() {
    return (
        <table id='tbl_main'>
        <thead>
        <tr>
            <th>Address</th>
            <th>Quanlity</th>
        </tr>
        </thead>
        <tbody>
        {
           this.props.data.map(function(x){
            return <tr key={x.address}>
                    <td>{x.address}</td>
                    <td>{x.quanlity}</td>
                    </tr>  
        })
        }    
        </tbody>    
        </table>
    )
  }
}
 
export default Table1;