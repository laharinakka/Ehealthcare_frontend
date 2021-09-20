import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class EventDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {}
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/items/' + this.props.match.params.id)
            .then(result => {
                console.log(result.data);
                this.setState(
                    { item: result.data });
            })
            .catch(error => {
                console.log('There is some error: ' + error);
            })
    }

    deleteEvent(id) {
        axios.delete('http://localhost:8080/items/' + id)
            .then(result => {
                console.log(result);
                console.log('Event Deleted successfully.')
                this.props.history.push('/items')
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
                <h2 align="center"> Item Details (Admin View) </h2>
                <br /><br />

                <div className="card">
                    <div className="card-header">
                        <b>Details of {this.state.item.itemName}</b>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <tbody>
                            <tr>
                                    <th>Item Name:</th>
                                    <td>{this.state.item.itemName}</td>
                                </tr>
                                <tr>
                                    <th>Item Description:</th>
                                    <td>{this.state.item.description}</td>
                                </tr>
                                <tr>
                                    <th>Item Image:</th>
                                    <td><img style={{height:"5em"}} src={this.state.item.image} alt="..." /></td>
                                </tr>
                                <tr>
                                    <th>Quantity Available:</th>
                                    <td>{this.state.item.availableQuantity}</td>
                                </tr>
                                <tr>
                                    <th>Item Price:</th>
                                    <td>{this.state.item.price}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="card-footer text-muted">
                        <Link to='/items' className="btn btn-secondary"> Back</Link> &nbsp;
                        <Link to={'/item-update/' + this.state.item.itemId} align="center" className="btn btn-warning">Update Item</Link> &nbsp;&nbsp;
                        <button onClick={this.deleteEvent.bind(this, this.state.item.itemId)} className="btn btn-danger">Delete Item</button>
                    </div>
                </div>
            </div>



        )
    }
}