import React from "react";
import Axios from "axios";

export default class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            username: "",
            password: "",
        };
    }

    handleFullNameChange = (event) => {
        this.setState({
            fullname: event.target.value
        });
    }
    handleUserNameChange = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    handlePassChange = (event) => {
        this.setState({
            password:event.target.value
        });
    }

    handleSignUp = (event) => {
        event.preventDefault();
        const {fullname, username, password} = this.state

        Axios.post('/signup', {
            fullname: fullname,
            username:username,
            password:password
        })
            .then((res) => {
                this.setState({
                    fullname: null,
                    username: null,
                    password: null,
                    resp: "User signup successfully."
                });
                alert(this.state.resp);
                this.props.history.push('/');
            }).catch((err) => {
            this.setState({
                fullname: null,
                username: null,
                password:null,
                resp: "SignUp failed."
            });
            alert(this.state.resp);
        });
    }

    render() {
        return (
            <div className="sign_up">
                <h2>SignUp</h2>
                Full Name: <input type="text" name="full_name" onChange={this.handleFullNameChange}/><br/>
                Username: <input type="text" name="user_name" onChange={this.handleUserNameChange}/><br/>
                Password: <input type="password" name="password" onChange={this.handlePassChange}/><br/>
                <button onClick={this.handleSignUp}>Sign up</button><br/><br/>
            </div>
        );
    }
}