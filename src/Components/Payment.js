import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderPlaced: false,
        }
    }


    order = {
        userId: localStorage.getItem('userId'),
        address: localStorage.getItem('address'),
        billAmount: localStorage.getItem('totalBill')
    }



    placeOrder() {
        this.setState({ orderPlaced: true })

        axios.post('http://localhost:8080/orders', this.order)
            .then(result => {
                console.log("order placed " + result.data.orderId);
                this.updateCart(result.data.orderId);
                this.updateWallet();
                this.updateAdminWallet();
            }
            )
            .catch(error => {
                console.log(error)
            }
            )
    }

    updateCart(OrderId){

        axios.post('http://localhost:8080/usercart/order/'+localStorage.getItem('userId')+'/'+OrderId)
        .then(result => {
            console.log("cart updated.");
        }
        )
        .catch(error => {
            console.log(error)
        }
        )

    }

    updateWallet(){
        axios.post('http://localhost:8080/updatewallet/'+localStorage.getItem('userId')+'/'+localStorage.getItem('totalBill'))
        .then(result => {
            console.log("wallet updated.");
        }
        )
        .catch(error => {
            console.log(error)
        }
        )
    }

    updateAdminWallet(){
        axios.post('http://localhost:8080/updateAdminwallet/'+localStorage.getItem('totalBill'))
        .then(result => {
            console.log("wallet updated.");
        }
        )
        .catch(error => {
            console.log(error)
        }
        )
    }


    render() {
        return (
            <div className="container">

                <br />
                <h2 align="center"> Payment Page </h2>
                <br /><br />
                <div className="card">
                    <div className="card-header">
                        <b>Bill Summary</b>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Wallet Balance</th>
                                    <td>{localStorage.getItem('wallet')}</td>
                                </tr>
                                <tr>
                                    <th>Total Bill:</th>
                                    <td>{localStorage.getItem('totalBill')}</td>
                                </tr>
                                <tr>
                                    <th>Estimated Time for Order Delivery: </th>
                                    <td>30 Minutes</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="card-footer text-muted">
                        {!this.state.orderPlaced && <button onClick={this.placeOrder.bind(this)} className="btn btn-success">Place Order</button>}
                    </div>
                </div>
                <br /><br /><br />

                {this.state.orderPlaced &&
                    <div className="container">
                        <h4>Wallet Balance: {localStorage.getItem('wallet') - localStorage.getItem('totalBill')}</h4>
                        <span></span>

                        <h4>order will be delivered to:</h4>
                        <span>{localStorage.getItem('address')}</span>
                    </div>}


            </div>
        )
    }
}
