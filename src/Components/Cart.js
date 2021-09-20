import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            totalBill: 0
        }
    }

    address=null;

    getAddress = (e)=>{
        this.address = e.target.value
        localStorage.address = this.address
        localStorage.totalBill = this.state.totalBill

        // console.log("user is trying to email input box" , e.target.value)

    }

    componentDidMount() {
        axios.get('http://localhost:8080/items/cust/cart/' + localStorage.getItem('userId'))
            .then(result => {
                console.log(result.data);
                this.setState({ items: result.data })

                this.state.items.map((item, index) =>
                {
                    this.setState({totalBill : this.state.totalBill + (item.price * item.cartItemQuantity)})
                }
                )


            }
            )
            .catch(error => {
                console.log(error)
            }
            )
    }

    UpdateQuantity(id, act) {
        axios.post('http://localhost:8080/items/updateCart/' + localStorage.getItem('userId') + '/' + id + '/' + act)
            .then(result => {
                console.log(result);
                console.log('Item updated successfully.');
                window.location.reload();
            }
            )
            .catch(error => {
                console.log('There is some error while updating: ' + error);
            })
    }

    addProductToCart(id) {
        axios.post('http://localhost:8080/items/addCart/' + localStorage.getItem('userId') + '/' + id)
            .then(result => {
                console.log(result);
                console.log('Item added to cart successfully.');
                window.location.reload();
            }
            )
            .catch(error => {
                console.log('There is some error while deleting: ' + error);
            })
    }

    render() {
        return (
            <div className="container">
                <br />
                <h2 align="center">Cart Details</h2>
                <br />
                <br /><br />
                <table className="table">
                    <thead>
                        <tr align="center">
                            <th align="center">Image</th>
                            <th align="center">Item Name</th>
                            {/* <th align="center">Item Descripion</th> */}
                            {/* <th align="center">Available Quantity</th> */}
                            <th align="center"> Price</th>
                            <th align="center">Quantity</th>
                            <th align="center">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items.map((itm, index) => {
                            return (
                                <tr key={index}>
                                    <td align="center"><img style={{ height: "5em" }} src={itm.image} alt="..." /></td>
                                    <td align="center"><b>{itm.itemName}</b><br/> {itm.description}</td>
                                    {/* <td align="center">{itm.description}</td> */}
                                    {/* <td align="center">{itm.availableQuantity}</td> */}
                                    <td align="center">{itm.price}</td>
                                    <td align="center">
                                    &nbsp;&nbsp; <span>{itm.cartItemQuantity}</span>&nbsp; &nbsp;
                                    </td>
                                    <td align="center">{itm.price * itm.cartItemQuantity}</td>
                                </tr>
            
                            );


                        })}
                    </tbody>
                </table>
                <div align="right">
                    <span>Total Amount: Rs.  </span>
                    <b>  {this.state.totalBill}</b>

                </div>
                <br />
                <div align="right">
                <textarea onChange={this.getAddress} name="address" placeholder="Enter Delivery address here..." rows="4" cols="50"></textarea>
                <br /><br />
                    <Link to='/payment' className="btn btn-primary"> Go to Payment</Link> &nbsp;
                </div>
            </div>
        )
    }
}
