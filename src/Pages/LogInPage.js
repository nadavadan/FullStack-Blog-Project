import React from 'react';
import Axios from 'axios';
import '../CSS/Login_Page.css';
import GoogleLogin from 'react-google-login';
import {Link} from "react-router-dom";



export default class LogInPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fullname:"",
            username: "",
            password: "",
            userid:"",
            usernamefill:false,
            passwordfill:false,
            googlesign:'false',
        };
    }

    handleLogIn = (event) => {
        event.preventDefault();
        const { username, password,fullname,googlesign} = this.state

        Axios.post('/login', {
            fullname:fullname,
            username:username,
            password:password,
            googlesign:googlesign,
        }).then((res) => {
                if(res.status === 200) {
                    this.props.onLogIn(res.data, username)
                    this.setState({
                        username: "",
                        password: "",
                        resp: "User loged in successfully."
                    });
                    this.props.history.push('/');
                }
            }).catch((err) => {
                this.setState({
                    username: "",
                    password:"",
                    resp: "Login failed."
                });
                alert(this.state.resp);
                window.location.reload(false);
            });
    }

    handleLoginUserNameChange = (event) => {
        this.setState({
            username: event.target.value,
            usernamefill: event.target.value !== "",
        });
    }

    handleLoginPassChange = (event) => {
        this.setState({
            password: event.target.value,
            passwordfill: event.target.value !== "",
        });
    }

    responseGoogle = (response) => {
        this.setState({
            username: response.profileObj.email,
            password: response.profileObj.googleId,
            fullname: response.profileObj.name,
            googlesign:true,
        });
        this.handleLogIn(response)
    };


    render(){
        return (
            <div className="login">
                <GoogleLogin
                    clientId="116810242139-403938217kerf2iqjh9g24dm36rpg7jf.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />,
                <input type="text" placeholder={"Username"}  name="user" onChange={this.handleLoginUserNameChange} /><br/>
                <input type="text" placeholder={"Password"} name="pass" onChange={this.handleLoginPassChange} /><br/>
                <button to='/' disabled={this.state.passwordfill&&this.state.usernamefill? false:true}onClick={this.handleLogIn}>Login</button><br/><br/>
                <Link to="/forgot">Forgot your password?</Link>
            </div>
        );
    }
}
