import axios from "axios";
import React, { Component } from "react";


export default class Users extends Component {

    constructor(props){
        super(props);
        this.state={
            users:[]
        }
    }

    componentDidMount(){
        // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
        // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.get('http://localhost:8080/users')
        .then(result =>{
            console.log(result.data);
            this.setState({users: result.data})
        }

        )
        .catch(error=>{
            console.log(error)
        }
            )
    }

    render(){
        return(
            <div className="container">
                <br></br>
                <br></br>
                <h2 align="center">Users List (Admin View)</h2>
                <br></br>
                <br></br>
                <table className="table">
                    <thead align="center">
                        <tr>
                            <th align="center">User Id</th>
                            <th align="center">User Name</th>
                            <th align="center">User Email</th>
                            <th align="center">Wallet Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user, index) =>{
                            return(
                                <tr key={index}>
                                    <td align="center">{user.id}</td>
                                    <td align="center">{user.username}</td>
                                    <td align="center">{user.email}</td>
                                    <td align="center">{user.walletAmount}</td>
                                </tr>
                            );


                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
