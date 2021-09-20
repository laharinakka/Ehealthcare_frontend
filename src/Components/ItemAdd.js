import React, { Component } from "react";
import axios from "axios";

export default class ItemAdd extends Component {

    constructor() {
        super()
        this.state = {
            itemName: null,
            description: null,
            image: null,
            quantityAvailable: null,
            displayItem:null,
            price: null
        }
    }

    handleChange = (event) =>{
        event.preventDefault();
        const {name , value} = event.target;
        this.setState({[name]: value});
        console.log(this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const item = {
            itemName: this.state.itemName,
            description: this.state.description,
            image: this.state.image,
            displayItem:this.state.displayItem,
            quantityAvailable: this.state.quantityAvailable,
            price : this.state.price
        }
        console.log(item);
        axios.post('http://localhost:8080/items', item)
        .then(result =>{
            console.log(result);
            console.log('Item Added successfully');
            this.props.history.push('/items');
        })
        .catch(error => {
            console.log(error);
            console.log('There is some error');
        })
    }

    render() {
        return (
            <div className="container">
                <br />
                <h2 align="center">Add Item (Admin View) </h2>
                <form onSubmit={this.handleSubmit}>
                    {/* <div class="form-group">
                        <label> Select Event Date:</label> &nbsp;
                        <input type="date" onChange={this.handleChange} name="eventDate" min="2021-01-01" max="2025-12-31" className="form-control" placeholder="Select Event Date"></input>
                    </div> */}
                    <br />
                    <div class="form-group">
                        {/* <label>Event Name</label> */}
                        <input type="text" onChange={this.handleChange} className="form-control" name="itemName" placeholder="Enter Item Name"></input>
                    </div><br />
                    <div class="form-group">
                        {/* <label>State</label> */}
                        <input type="text" onChange={this.handleChange} className="form-control" name="description" placeholder="Enter Item Description"></input>
                    </div><br />
                    <div class="form-group">
                        {/* <label>Price</label> */}
                        <input type="text" onChange={this.handleChange} className="form-control" name="image" placeholder="Enter Item Image URL"></input>
                    </div><br />
                    <div class="form-group">
                        {/* <label>Available Seats</label> */}
                        <input type="text" onChange={this.handleChange} className="form-control" placeholder="Enter Available Quantity" name="quantityAvailable"></input>
                    </div><br />
                    <div class="form-group">
                        {/* <label>Price</label> */}
                        <input type="text" onChange={this.handleChange} className="form-control" name="price" placeholder="Enter Item Price"></input>
                    </div><br />

                    <input type="submit" className="btn btn-success" value="Add Item" />   &nbsp;
                    <input type="reset" className="btn btn-warning" value="Reset" />
                </form>
            </div>

        )
    }
}