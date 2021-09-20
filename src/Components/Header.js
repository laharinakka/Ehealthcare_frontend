import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";


export default class Header extends Component {

    

    render(){
        return(
            <Router>
            <div>
            <NavLink to='/home' activeStyle={{color:'green'}}>Home</NavLink> |
            <NavLink to='/about' activeStyle={{color:'green'}}>About</NavLink> |
            <NavLink to='/customer/azeem' activeStyle={{color:'green'}}>Customer</NavLink>|
            <NavLink to='/contact' activeStyle={{color:'green'}}>Contact</NavLink>|
            <NavLink to='/users' activeStyle={{color:'green'}}>Users</NavLink>|

            {/* <input type="button" onClick={this.loginHandle.bind(this)} className="btn btn-secondary" value = {this.state.loggedIn ? "Logout" : "Login"} /> */}
            </div>
            </Router>
        );
    }
}
