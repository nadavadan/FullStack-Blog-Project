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
import SignUpPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";
import { Redirect } from "react-router-dom";
import Posts from "./Components/Posts";
import CreateAndEdit from "./Pages/CreateAndEdit";
import SinglePost from "./Pages/SinglePost";




class App extends React.Component {

    constructor(props){
        super(props)
        this.state ={
            is_logged_in: false,
            firstname: '',
            userId: '',
            username:'',
            edit : true,
        }
    }

    set_login_true =(id ,username ) =>{
        console.log("username === " + username)

        this.setState({
            is_logged_in: true,
            username: username,
            userId:id,
        })
    }

    set_login_false =(e) =>{
        this.setState({
            is_logged_in: false
        })
    }

    render() {
        const {username, is_logged_in, userId } = this.state
        return (
            <div className="app-header">
                <Router>
                    <div className="header">
                        <Header
                               is_logged_in={is_logged_in}
                               user_name={username}
                               user_id={userId}
                               onLogout={this.set_login_false}
                        />
                    </div>

                    <div className="page">
                        <Switch>
                            <Route path="/login"
                                render={(props) => <LogInPage {...props} onLogIn={this.set_login_true}/> }>
                            </Route>
                            <Route path="/posts" component={(props)=><Posts {...props} username={username}/>}/>
                            {/*<Route path="/postss/:keyword" component={(props)=><Posts {...props} username={username}/>}/>*/}
                            <Route path ="/signup" component={SignUpPage}/>
                            <Route path='/post/:id' component={(props)=><SinglePost {...props} username={username} is_logged_in={is_logged_in} />}/>
                            <Route path='/edit/:id' component={(props)=> is_logged_in ?
                                <CreateAndEdit {...props} username={username} edit = {this.state.edit}/>
                                :
                                <Redirect to = {"/login"}  /> }/>
                            <Route path="/about" component={AboutMe}/>
                            <Route path="/add-post" component={(props)=> is_logged_in ?<CreateAndEdit {...props} edit = {!this.state.edit} username={username}/>:<Redirect to = {"/login"} /> }/>
                            <Route path="/" component={(props)=><HomePage {...props} username={username}/>}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;