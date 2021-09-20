import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Events extends Component {

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

    deleteEvent(id) {
        axios.delete('http://localhost:8080/items/' + id)
            .then(result => {
                console.log(result);
                console.log('Item Deleted successfully.');
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
                <h2 align="center">Items List (Admin View)</h2>
                <br />
                <div>
                    <span class="glyphicon glyphicon-plus" ></span>
                    <Link className="btn btn-success" to="/item-add">Add Items</Link>
                </div>
                <br /><br />
                <table className="table">
                    <thead>
                        <tr align="center">
                        <th align="center">Image</th>
                            <th align="center">Item Name</th>
                            <th align="center">Item Descripion</th>
                            <th align="center">Available Quantity</th>
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
                                    <td align="center">{itm.availableQuantity}</td>
                                    <td align="center">{itm.price}</td>
                                    <td align="center">
                                        <Link to={'/item-detail/' + itm.itemId} align="center" className="btn btn-secondary" >View</Link> &nbsp;&nbsp;
                                        <Link to={'/item-update/' + itm.itemId} align="center" className="btn btn-warning">Update</Link> &nbsp;&nbsp;
                                        <button onClick={this.deleteEvent.bind(this, itm.itemId)} align="center" className="btn btn-danger" >Delete</button>
                                    </td>


                                </tr>
                            );


                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
