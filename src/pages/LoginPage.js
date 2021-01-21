import React from 'react';
import { Form, Button } from 'react-bootstrap';
import users from '../data/users.json';

class LoginPage extends React.Component {
    constructor(props){
        super(props);
        
        // Controlled component steps
        // 1. Add key to state
        // 2. map to value
        // 3. update using onChange
        this.state = {
            email: '',
            pwd: ''
        }
    }
    validateLogin = () => {
        for( let i = 0; i< users.length; i++) {
            if( users[i].pwd == this.state.pwd && users[i].email == this.state.email) {
                this.props.handleLogin(users[i]);
                window.location = '/#/watchlist'
                return;
                // We will login the user
                // return the found user
            }
        // alert that the user does not exist
        }
        alert('user not found');
    }
    render() {
        // Steps to login
        // 1. if the user exists in the user.json?
        // 2. if the user password matches
        // 3. update the activeUser state in <App> (using handleLogin() prop)
        return (
            <div className="c-login-page">
                <h1>Login</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" 
                onChange={(event) => {this.setState({email: event.target.value})}} 
                placeholder="Enter email" value={this.state.email} />
                </Form.Group>
                
                <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                 onChange={(event) => {this.setState({pwd: event.target.value})}} 
                 placeholder="Password"  value={this.state.pwd}/>
                </Form.Group>
                <Button onClick={this.validateLogin} block variant="success" type="button">
                Login
                </Button>
            </Form> 
            <br/>
            <a href="/#/signup">To Signup</a>
            </div>
            )
        }
    }
    export default LoginPage;