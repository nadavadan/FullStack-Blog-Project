import React from 'react';
import './CSS/App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch
}  from 'react-router-dom';

import Header from "./Components/Header"
import AboutMe from "./Pages/AboutMe";
import HomePage from "./Pages/HomePage";
import NewPost from "./Pages/NewPost";
import Post from "./Pages/Post";

function App() {
    return (
        <div className="app-header">
            <Router>
                <Header/>
                <Switch>
                    <Route path='/post/:id' component={Post}/>
                    <Route path="/about" component={AboutMe}/>
                    <Route path="/add-post" component={NewPost}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;