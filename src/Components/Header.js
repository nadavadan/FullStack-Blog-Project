import {Link} from "react-router-dom";
import React from 'react';
import '../CSS/header.css';


function Header() {
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
                <Link to="/login">Login</Link>
            </div>
        </header>
    );
}

export default Header;