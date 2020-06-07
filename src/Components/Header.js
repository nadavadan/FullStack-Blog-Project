import {Link} from "react-router-dom";
import React from 'react';
import '../CSS/header.css';
import axios from "axios";



class Header extends React.Component {


    doLogout = () => {
        axios.post("/logout")
            .then((res) => {
                this.props.set_login_false()
                this.props.history.push('/');
            })
            .catch((err) => {
                console.log("error")
            });
    }
    render() {
        return (
            <header>
                <div className="nav-bar">
                    <div>
                        <Link to="/">Home</Link>
                        <span className="vertical-line"> | </span>
                        <Link to="/about">About</Link>
                        <span className="vertical-line"> | </span>
                        <Link to="/add-post">New Post</Link>
                    </div>

                    <div className="login_signin_logout">
                        {!this.props.is_logged_in && <Link  to="/signup">Sign Up</Link>}
                        <span className="vertical-line"> | </span>
                        {!this.props.is_logged_in && <Link to="/login">Login</Link>}
                        {this.props.is_logged_in && <Link to='/' onClick={this.doLogout}>Logout</Link>}
                    </div>

                </div>
            </header>
        );
    }
}

export default Header;