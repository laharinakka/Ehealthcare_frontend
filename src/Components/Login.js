import React, { Component } from "react";
import axios from "axios";

// {Component:class {}}


function validEmail(e) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search(filter) !== -1;
}
class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoggedIn:false,
            loginStatus:false,
            incorrectEmail:false
        }
    }

    user = {

    }
    login = (e) => {
        e.preventDefault()
        if (validEmail(this.user.email)) {
            axios({
                url: 'http://localhost:8080/login',
                method: 'post',
                data: this.user
            }).then((response) => {
                console.log("response from Login api", response.data)
                if(response.data.loginStatus){
                    this.setState({isLoggedIn: response.data.loginStatus})
                    console.log("Login Successful")
                    localStorage.isLoggedIn = response.data.loginStatus
                    localStorage.wallet = response.data.wallet
                    localStorage.userId = response.data.id
                    if(response.data.admin){
                        localStorage.isAdmin = response.data.admin
                    }
                   
                    this.props.history.push('/');
                    window.location.reload();
                } else{
                    this.setState({isLoggedIn: response.data.loginStatus,
                        loginStatus:true
                    })
                }
            }, (error) => {
                console.log("error from Login api", error)

            })
        }
        else {
            this.setState({incorrectEmail: true})
        }
    }
    getEmail = (e) => {
        this.user.email = e.target.value
        // console.log("user is trying to email input box" , e.target.value)

    }
    getPassword = (e) => {
        this.user.pwd = e.target.value
        // console.log("user is trying to password input box" , e.target.value)
    }

    render() {
        return (
            <div style={{ margin: "auto", width: "50%" }} className="container">
                <h1 align="center">Medi Login</h1>

                <br/><br/>
                <form align="center">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input onChange={this.getEmail} type="email" class="form-control" aria-describedby="emailHelp" />
                        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        <label style={{ color: "red" }}>{this.state.emailError}</label>
                    </div> <br /><br />
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input onChange={this.getPassword} type="password" class="form-control" />
                    </div>
                    <br />
                    <button onClick={this.login} type="submit" class="btn btn-primary">Login</button>
                </form>
                <br/>
                {this.state.loginStatus && <div align="center"><span>Incorrect Credentials!!!</span></div>}
                {this.state.incorrectEmail && <div align="center"><span>Incorrect Email Format!!!</span></div>}
            </div>

        )
    }
}

export default Login