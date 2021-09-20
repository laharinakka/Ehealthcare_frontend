import React, { Component } from "react"
import axios from "axios"

export default class ItemUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {},
            itemId: null,
            itemName: null,
            description: null,
            image: null,
            availableQuantity: null,
            price: null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/items/' + this.props.match.params.id)
            .then(result => {
                console.log(result.data);
                this.setState(
                    { item: result.data,
                        itemId: result.data.itemId,
                        itemName: result.data.itemName,
                        description: result.data.description,
                        image: result.data.image,
                        availableQuantity: result.data.availableQuantity,
                        price: result.data.price
                    
                    });
            })
            .catch(error => {
                console.log('There is some error: ' + error);
            })
    }



    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log(this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const item = {
            itemId: this.state.itemId,
            itemName: this.state.itemName,
            description: this.state.description,
            image: this.state.image,
            availableQuantity: this.state.availableQuantity,
            price: this.state.price
        }
        console.log(item);
        axios.post('http://localhost:8080/items', item)
            .then(result => {
                console.log(result);
                console.log('Item Updated successfully');
                this.props.history.push('/items');
            })
            .catch(error => {
                console.log(error);
                console.log('There is some error while updating.')
            })
    }


    render() {
        return (
            <div className="container">
                <br />
                <h2 align="center"> Update Items (Admin View) </h2>
                <br /><br />

               <form onSubmit={this.handleSubmit}>
                    {/* <div class="form-group">
                        <label> Select Event Date:</label> &nbsp;
                        <input type="date" onChange={this.handleChange} name="eventDate" min="2021-01-01" max="2025-12-31" className="form-control" placeholder="Select Event Date"></input>
                    </div> */}
                    <br />
                    <div class="form-group">
                        {/* <label>Event Name</label> */}
                        <input type="text" value={this.state.itemName} onChange={this.handleChange} className="form-control" name="itemName" placeholder="Enter Item Name"></input>
                    </div><br />
                    <div class="form-group">
                        {/* <label>State</label> */}
                        <input type="text" value={this.state.description} onChange={this.handleChange} className="form-control" name="description" placeholder="Enter Item Description"></input>
                    </div><br />
                    <div class="form-group">
                        {/* <label>Price</label> */}
                        <input type="text" value={this.state.image} onChange={this.handleChange} className="form-control" name="image" placeholder="Enter Item Image URL"></input>
                    </div><br />
                    <div class="form-group">
                        {/* <label>Available Seats</label> */}
                        <input type="text" value={this.state.availableQuantity} onChange={this.handleChange} className="form-control" placeholder="Enter Available Quantity" name="availableQuantity"></input>
                    </div><br />
                    <div class="form-group">
                        {/* <label>Price</label> */}
                        <input type="text" value={this.state.price} onChange={this.handleChange} className="form-control" name="price" placeholder="Enter Item Price"></input>
                    </div><br />

                    <input type="submit" className="btn btn-success" value="Update Item" />   &nbsp;
                    <input type="reset" className="btn btn-warning" value="Reset" />
                </form>
            </div>
        )
    }
}