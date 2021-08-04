import React from 'react';
import Axios from 'axios';
import '../CSS/Reset_Password_Page.css';




export default class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uuid:this.props.match.params.id,
            password:"",
            verifypassword:"",
            passwordfill:false,
            verifypasswordfill:false
        };
    }

    // passStrength = (event) => {
    //     this.setState({
    //
    //     });
    // }

    handleSubmit = () => {
        if (this.state.password !== this.state.verifypassword){
            alert("verify your password");
        }else {
            const data = {
                password: this.state.password,
            }
            Axios.post(`/reset/${this.state.uuid}`,data).then((res) => {
                console.log("int reset data",res.data)
                if (res.data === "password changed") {
                    alert("password changed");
                    this.props.history.push('/login')
                } else {
                    alert("contact our support team")
                    this.props.history.push('/login')
                }
            }).catch((err) => {
                alert("contact our support team(Expected errors: Link expired)")
                this.props.history.push('/login')
            });
        }
    }


    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value,
            passwordfill: event.target.value !== "",
        });
    }
    handleVerifyPasswordChange = (event) => {
        this.setState({
            verifypassword: event.target.value,
            verifypasswordfill: event.target.value !== "",
        });
    }


    render() {
        return (
            <div className="reset-password">
                <h4>Reset Password</h4>
                <input type="text" placeholder={"password"} name="password" onChange={this.handlePasswordChange}/><br/>
                <input type="text" placeholder={"verify password"} name="verify password" onChange={this.handleVerifyPasswordChange}/><br/>
                <button   onClick={this.handleSubmit}>Submit</button>
                {/*disabled={this.state.passwordFill&&this.state.verifypasswordfill? false : true}*/}
                <br/><br/>
            </div>
        );
    }


}