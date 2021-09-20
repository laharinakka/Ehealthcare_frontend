import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/events')
            .then(result => {
                console.log(result.data);
                this.setState({ events: result.data })
            }

            )
            .catch(error => {
                console.log(error)
            }
            )
    }

    deleteEvent(id) {
        axios.delete('http://localhost:5000/events/' + id)
            .then(result => {
                console.log(result);
                console.log('Event Deleted successfully.');
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
                <h2 align="center">Events List</h2>
                <br />
                <div>
                    <span class="glyphicon glyphicon-plus" ></span>
                    <Link className="btn btn-success" to="/event-add">Add Upcoming Event</Link>
                </div>
                <br /><br />
                <table className="table">
                    <thead>
                        <tr align="center">
                            <th align="center">Event Date</th>
                            <th align="center">Event Name</th>
                            {/* <th align="center">Venue</th>
                            <th align="center">Available Seats</th>
                            <th align="center">Ticket Price</th> */}
                            <th align="center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.events.map((evnt, index) => {
                            return (
                                <tr key={index}>
                                    <td align="center">{evnt.eventDate}</td>
                                    <td align="center">{evnt.eventName}</td>
                                    {/* <td align="center">{evnt.venue}</td>
                                    <td align="center">{evnt.seatsAvaliable}</td>
                                    <td align="center">{evnt.price}</td> */}
                                    <td align="center">
                                        <Link to={'/event-detail/' + evnt.id} align="center" className="btn btn-secondary" >View</Link> &nbsp;&nbsp;
                                        <Link to={'/event-update/' + evnt.id} align="center" className="btn btn-warning">Update</Link> &nbsp;&nbsp;
                                        <button onClick={this.deleteEvent.bind(this, evnt.id)} align="center" className="btn btn-danger" >Delete</button>
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
