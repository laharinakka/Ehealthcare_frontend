import React , {Component}  from "react";
import axios from "axios";

// {Component:class {}}


function validEmail(e) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search (filter) !== -1;
}
class Signup extends React.Component{
    constructor(){
        super()
        this.state = {
            showMessage:false,
            signUpMessage:""
        }
    }
    
    user ={
       
    }
    signup = (e)=>{
        e.preventDefault()
        if(validEmail(this.user.email)){
            console.log("Now make a server call" , this.user)
            axios({
                url:'http://localhost:8080/register',
                method:'post',
                data:this.user
            }).then((response)=>{
                console.log("response from signp api" , response.data)
                if(response.data==this.user.email+' added successfully.'){
                    this.setState({
                        showMessage:true,
                        signUpMessage:"User Created Successfully. Please navigate to Login Page."
                    })
                } else{
                    this.setState({
                        showMessage:true,
                        signUpMessage:"User Creation was unsuccessful. Please Try again with correct format."
                    })
                }
                
            }, (error)=>{
                console.log("error from signp api" , error)
                this.setState({
                    showMessage:true,
                    signUpMessage:"User Creation was unsuccessful. Please Try again with correct format."
                })
            })
        }
        else{
           
        }
    }
    getEmail = (e)=>{
        this.user.email = e.target.value
        // console.log("user is trying to email input box" , e.target.value)

    }
    getPassword = (e)=>{
        this.user.pwd = e.target.value
        // console.log("user is trying to password input box" , e.target.value)
    }
    getName = (e)=>{
        this.user.username = e.target.value
        // console.log("user is trying to name input box" , e.target.value)

    }
    render(){
        return(
            <div style={{margin:"auto", width:"50%"}} className="container">
                <h1>Signup here</h1>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input onChange={this.getEmail} type="email" class="form-control" aria-describedby="emailHelp" />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            <label style={{color:"red"}}>{this.state.emailError}</label>
                        </div> <br/>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Name</label>
                            <input onChange={this.getName} type="text" class="form-control"  />
                        </div><br/>
                <div class="form-group">
                           <label for="exampleInputPassword1">Password</label>
                           <input onChange={this.getPassword} type="password" class="form-control"  />
                </div>
                <br/>
                <button onClick={this.signup} type="submit" class="btn btn-primary">Submit</button>
                </form>

                {this.state.showMessage && <div><span>{this.state.signUpMessage}</span></div>}
            </div>
        
        )
    }
}

export default Signup