import React from "react";
import Axios from "axios";
import '../CSS/Signup_Page.css';

export default class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            username: "",
            password: "",
            fullnameFill:false,
            usernameFill:false,
            passwordFill:false,
        };
    }

    handleFullNameChange = (event) => {
        this.setState({
            fullname: event.target.value,
            fullnameFill: event.target.value !== "",
        });
    }
    handleUserNameChange = (event) => {
        this.setState({
            username: event.target.value,
            usernameFill: event.target.value !== "",
        });
    }
    handlePassChange = (event) => {
        this.setState({
            password:event.target.value,
            passwordFill: event.target.value !== "",

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
                <h2></h2>
                  <input type="text" placeholder={"Full Name"} name="full_name" onChange={this.handleFullNameChange}/><br/>
                  <input type="text"placeholder={"User Name"}name="user_name" onChange={this.handleUserNameChange}/><br/>
                  <input type="password" placeholder={"Password"} name="password" onChange={this.handlePassChange}/><br/>
                <button disabled={this.state.usernameFill&&this.state.fullnameFill&&this.state.passwordFill? false:true}onClick={this.handleSignUp}>Sign Up</button><br/><br/>
            </div>
        );
    }
}