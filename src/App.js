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
import SignUpPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";


class App extends React.Component {

    constructor(props){
        super(props)
        this.state ={
            is_logged_in: false,
            firstname: '',
            user_id: '',
        }
    }
    set_login_true =(e) =>{
        this.setState({
            is_logged_in: true
        })
    }
    set_login_false =(e) =>{
        this.setState({
            is_logged_in: false
        })
    }
    render() {
        return (
            <div className="app-header">
                <Router>
                    <Header
                        is_logged_in={this.state.is_logged_in}
                        firstname={this.state.firstname}
                        user_id={this.state.user_id}
                        onLogout={this.set_login_false}
                    />
                    <Switch>
                        <Route path="/login"
                            render={(props) => <LogInPage {...props} onLogIn={this.set_login_true} handleLogin={this.handleLogin} /> }>
                        </Route>
                        <Route path ="/signup" component={SignUpPage}/>
                        <Route path='/post/:id' component={Post}/>
                        <Route path="/about" component={AboutMe}/>
                        <Route path="/add-post" component={NewPost}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;