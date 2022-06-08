import React, { Component } from 'react';
import { getUser } from '../users';
import './Home.css';

export default class AdminLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  // Events Field Change Handlers
  handleChange = (event) => {
    console.log(event.target.value);
    const fieldName = event.target.name;
    let fieldValue = event.target.value;

    this.setState({ [fieldName]: fieldValue });
    console.log(this.state);
  };

  // handle form submit
  handleFormSubmit = (event) => {
    // prevent default event submit
    event.preventDefault();
    //console.log(this.state);
    //console.log(this.state.email);
    console.log(this.state.password);
    getUser(this.state.email)
      .then((user) => {
        console.log(this.state);
        console.log(user[0].password);

        if (user[0].password === this.state.password) {
          //redirect/navigate

          console.log('Login successful !');
          //this.props.navigation.navigate('/products');
          window.location.href = '/admin-products';
        }
      })
      .catch((error) => {
        console.log('Failed Login !', error);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row" style={{ margin: '200px 0' }}>
          <div className="col-sm-8">
            <h1 className="display-5 logo-text">
              E-HealthCare Management System
            </h1>
            <br></br>
            <h3 className="display-6">Logging into Admin Portal</h3>
          </div>
          <div className="form-card col-sm-4">
            <div className="card-body">
              <form
                className="form-validate"
                onSubmit={this.handleFormSubmit}
                noValidate
              >
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="Email Address"
                    aria-describedby="emailHelp"
                    required
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="d-grid gap-2 mx-auto">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
