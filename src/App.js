import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, Redirect, Route, Link } from "react-router-dom";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Customer from "./Components/Customer";
import Events from "./Components/Events";
import Items from "./Components/Items";
import Home from "./Components/Home";
import Users from "./Components/Users";
import ItemAdd from "./Components/ItemAdd";
import ItemDetail from "./Components/ItemDetail";
import ItemUpdate from "./Components/ItemUpdate";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import CustomerItems from "./Components/CustomerItems";
import report from "./Components/Report";
// import Header from "./Components/Header";
// import Route from "react-router-dom/Route";
import { useHistory } from "react-router-dom";
import Cart from "./Components/Cart";
import Payment from "./Components/Payment";

export default class App extends React.Component {
 
  state = {
    loggedIn: localStorage.getItem('isLoggedIn'),
    isAdmin: localStorage.getItem('isAdmin')
  }

  logoutHandle = () => {
    localStorage.isLoggedIn = false;
    this.setState({isLoggedIn: localStorage.isLoggedIn })
    localStorage.clear();
    window.location.reload();
  }





  render() {
    return (
      <div >
        {/* <Header/> */}

        <Router>
          <div>

            <header>

              <div className="px-3 py-2 bg-dark text-white">

                <div className="container">
                  <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to={'/'} className="navbar-brand">Medicineonline</Link>
                    {this.state.loggedIn && <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                      <li>
                        <NavLink to='/home' className="nav-link text-white">Home</NavLink>
                      </li>
                      <li>
                        <NavLink to='/about' className="nav-link text-white">About</NavLink>
                      </li>
                      <li>
                        <NavLink to='/contact' className="nav-link text-white">Contact</NavLink>
                      </li>
                      <li>
                        <NavLink to='/citems' className="nav-link text-white">Items</NavLink>
                      </li>
                      {this.state.isAdmin && <li> <NavLink to='/users' className="nav-link text-white">Users (Admin Only)</NavLink></li>}
                      {this.state.isAdmin && <li><NavLink to='/items' className="nav-link text-white">Items (Admin Only)</NavLink></li>}
                      {this.state.isAdmin && <li><NavLink to='/report' className="nav-link text-white">report (Admin Only)</NavLink></li>}
                    </ul>}

                    {/* {!localStorage.getItem('isLoggedIn') && <NavLink to='/signup' className="nav-link text-white">Signup</NavLink>}
                    {!localStorage.getItem('isLoggedIn') && <NavLink to='/login' className="nav-link text-white">Login</NavLink>}
                    {localStorage.getItem('isLoggedIn') && <NavLink to='/signup' className="nav-link text-white">Logout</NavLink>}
                   */}


                    {!this.state.loggedIn && <NavLink to='/signup' className="btn btn-secondary">Signup</NavLink>} &nbsp;&nbsp;
                    {!this.state.loggedIn && <NavLink to='/login' className="btn btn-secondary">Login</NavLink>}
                    {this.state.loggedIn  && <NavLink to='/cart' className="btn btn-secondary">Cart</NavLink>} &nbsp;&nbsp;
                    {this.state.loggedIn  && <button onClick={this.logoutHandle.bind(this)} className="btn btn-warning">Logout</button>}
                  
                  </div>

                </div>
              </div>
              {/* <div class="px-3 py-2 border-bottom mb-3">
                <div class="container d-flex flex-wrap justify-content-center">
                  <form class="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto">
                    <input type="search" class="form-control" placeholder="Search..." aria-label="Search" />
                  </form>

                  <div class="text-end">
                    <button type="button" class="btn btn-light text-dark me-2">Login</button>
                    <button type="button" class="btn btn-primary">Sign-up</button>
                  </div>
                </div>
              </div> */}
            </header>

            {/* <NavLink to='/home' activeStyle={{color:'green'}}>Home</NavLink> |
            <NavLink to='/about' activeStyle={{color:'green'}}>About</NavLink> |
            <NavLink to='/customer/azeem' activeStyle={{color:'green'}}>Customer</NavLink>|
            <NavLink to='/contact' activeStyle={{color:'green'}}>Contact</NavLink>|
            <NavLink to='/users' activeStyle={{color:'green'}}>Users</NavLink>| 

            <input type="button" onClick={this.loginHandle.bind(this)} className="btn btn-secondary" value={this.state.loggedIn ? "Logout" : "Login"} />

            */}

            { <Link to='/'>Home</Link> |
            <Link to='/about'>About</Link> |
            <Link to='/contact'>Contact</Link> }
          </div>

          <div>
            <Route path='/' exact render={Home} />
            <Route path='/home' render={Home} />
            <Route path='/about' render={About} />
            <Route path='/contact' render={Contact} />
            <Route path='/users' component={Users} />
            <Route path='/events' component={Events} />
            {/* <Route exact path='/users' render={({ match }) => (this.state.isloggedIn ? (<Users />) : (<Redirect to='/' />))} /> */}
            <Route path='/item-add' component={ItemAdd} />
            <Route path='/item-detail/:id' component={ItemDetail} />
            <Route path='/item-update/:id' component={ItemUpdate} />
            <Route path='/items' component={Items} />
            <Route path='/citems' component={CustomerItems} />
            <Route path='/cart' component={Cart} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/payment' component={Payment} />
            <Route path='/report' component={report} />
            <Route path='/customer/:name' render={({ match }) => (this.state.isloggedIn ? (<Customer name={match.params.name} />) : (<Redirect to='/' />))} />
          </div>
        </Router>
      </div>
    )
  }
}
