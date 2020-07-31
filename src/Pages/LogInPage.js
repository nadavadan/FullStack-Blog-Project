import React from 'react';
import Axios from 'axios';

export default class LogInPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            userid:"",
        };
    }

    handleLogIn = (event) => {
        event.preventDefault();
        const { username, password} = this.state

        Axios.post('/login', {
            username:username,
            password:password
        })
            .then((res) => {
                if(res.status === 200) {
                    console.log("RES",res)
                    this.props.onLogIn(res.data,username )
                    this.setState({
                        username: null,
                        password: null,
                        resp: "User loged in successfully."
                    });
                    this.props.history.push('/');
                }
            }).catch((err) => {
                this.setState({
                    username: null,
                    password:null,
                    resp: "Login failed."
                });
                alert(this.state.resp);
            });
    }

    handleLoginUserNameChange = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    handleLoginPassChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    render(){
        return (
            <div className="login">
                <h1>Login</h1>
                Username: <input type="text"   name="user" onChange={this.handleLoginUserNameChange} ></input><br/>
                Password: <input type="password" name="pass" onChange={this.handleLoginPassChange} ></input><br/>
                <button to='/' onClick={this.handleLogIn}>Login</button><br/><br/>
            </div>
        );
    }
}
