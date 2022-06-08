import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            report: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/admin/medicinesReport')
            .then(result => {
                console.log(result.data);
                this.setState({ report: result.data })
            }

            )
            .catch(error => {
                console.log(error)
            }
            )
    }

    // deleteEvent(id) {
    //     axios.delete('http://localhost:8080/admin/medicinesReport' + id)
    //         .then(result => {
    //             console.log(result);
    //             console.log('Item Deleted successfully.');
    //             window.location.reload();
    //         }
    //         )
    //         .catch(error => {
    //             console.log('There is some error while deleting: ' + error);
    //         })
    // }

    render() {
        return (
            <div className="container">
                <br />
                <h2 align="center">Report (Admin View)</h2>
                <br />
                <div>
                    <span class="glyphicon glyphicon-plus" ></span>
                    <Link className="btn btn-success" to="/admin/medicinesReport">view report</Link>
                </div>
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
                {/* <table className="table">
                    <thead>
                        <tr align="center">
                        <th align="center">Image</th>
                            <th align="center">Item Name</th>
                            <th align="center">Item Descripion</th>
                            <th align="center">Available Quantity</th>
                            <th align="center"> Price</th> 
                            {/* <th align="center">Actions</th> */}
                        {/* </tr>
                    </thead>
                    <tbody>
                        {this.state.report.map((itm, index) => {
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
                </table> */} 
                 </form>
            </div>
        )
    }
}
