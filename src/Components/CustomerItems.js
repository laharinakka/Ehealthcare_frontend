import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CustomerItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/items/cust/'+localStorage.getItem('userId'))
            .then(result => {
                console.log(result.data);
                this.setState({ items: result.data })
            }
            )
            .catch(error => {
                console.log(error)
            }
            )
    }

    UpdateQuantity(id, act) {
        axios.post('http://localhost:8080/items/updateCart/'+localStorage.getItem('userId')+'/' + id+'/'+act)
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
        axios.post('http://localhost:8080/items/addCart/'+localStorage.getItem('userId')+'/' + id)
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
                <h2 align="center">Items List</h2>
                <br />
                <br /><br />
                <table className="table">
                    <thead>
                        <tr align="center">
                        <th align="center">Image</th>
                            <th align="center">Item Name</th>
                            <th align="center">Item Descripion</th>
                            {/* <th align="center">Available Quantity</th> */}
                            <th align="center"> Price</th> 
                            <th align="center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items.map((itm, index) => {
                            return (
                                <tr key={index}>
                                    <td align="center"><img style={{height:"5em"}} src={itm.image} alt="..." /></td>
                                    <td align="center">{itm.itemName}</td>
                                    <td align="center">{itm.description}</td>
                                    {/* <td align="center">{itm.availableQuantity}</td> */}
                                    <td align="center">{itm.price}</td>
                                    <td align="center">
                                   {!itm.cartItemAvailable &&  <button onClick={this.addProductToCart.bind(this, itm.itemId)} align="center" className="btn btn-danger" >Add to Cart</button>}
                                        &nbsp;
                                       {itm.cartItemAvailable &&
                                         <div>
                                         <button onClick={this.UpdateQuantity.bind(this, itm.itemId,'minus')} align="center" className="btn btn-danger" >(-)</button>
                                         &nbsp;&nbsp; <span>{itm.cartItemQuantity}</span>&nbsp; &nbsp;
                                         <button onClick={this.UpdateQuantity.bind(this, itm.itemId, 'plus')} align="center" className="btn btn-danger" >(+)</button>
                                         </div>
                                       }
                                    </td>


                                </tr>
                            );


                        })}
                    </tbody>
                </table>
                <br/>
                <div align="right">
                <Link to='/cart' className="btn btn-primary"> Go to Cart</Link> &nbsp;
                </div>
            </div>
        )
    }
}
