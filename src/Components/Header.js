import {Link} from "react-router-dom";
import React from 'react';
import '../CSS/header.css';
import axios from "axios";


class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username:this.props.user_name,
            isLoggedIn: this.props.is_logged_in,
            userId: this.props.user_id,
            onLogout: this.props.onLogout,
        };
    }

    doLogout = () => {
        const data = {
            userId: this.props.user_id,
            username: this.props.user_name,
        }

        axios.post("/logout",data)
            .then((res) => {
                if(res.status === 200) {
                    this.props.onLogout()
                    this.props.history.push('/');
                }
            })
            .catch((err) => {
                console.log(err)
            });
    }

    render() {
        return (
            <div>
                {/*alternate class name - left-nav-bar*/}
                <div className="Header">
                  <Link to="/">Home</Link>    <Link to="/about">About</Link>
                  <Link to="/add-post">New Post</Link>
                </div>
                {/*Functionality by blog users permission*/}
                <div className="login_signin_logout">
                    {!this.props.is_logged_in && <Link  to="/signup">Sign Up</Link>}
                    {this.props.is_logged_in && <label>{'Hello ' + this.props.user_name} </label>}
                    {!this.props.is_logged_in && <Link to="/login">Login</Link>}
                    {this.props.is_logged_in && <Link to='/' onClick={this.doLogout}> Logout</Link>}
                </div>
            </div>
        );
    }
}
export default Header;