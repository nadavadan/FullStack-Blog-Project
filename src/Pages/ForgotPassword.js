import React from 'react';
import Axios from 'axios';
import '../CSS/Forgot_Mypass_Page.css';
import { v4 as uuidv4 } from 'uuid';
import emailjs from 'emailjs-com';


export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email:"",
            emailfill:false,

        };
    }
    handleSubmit = (event) => {
            // event.preventDefault();
            Axios.get(`/forgot/${this.state.email}`).then((res) => {
                if(res.data === "user exist") {
                    this.setState({
                    });
                    this.resetPassword(this.state.email)
                    alert("reset mail sent");
                    this.props.history.push('/login')
                }
                else {
                    alert("no such user")
                    this.props.history.push('/login')
                }
            }).catch((err) => {
                this.setState({

                });
                alert("reset password failed");
                this.props.history.push('/login')
            });
    }

    //Secure fixes -back
    resetPassword =(email)=>{
        let uuid = uuidv4()
        this.sendEmail(email,uuid)
        console.log("Email on reset",email);
        Axios.post('/reset', {
            uuid:uuid,
            email:email
        }).then((res) => {
            if(res.status === 200) {
            }
        }).catch((err) => {
        });
    }

    sendEmail(email,uuid) {
        const templates = {
            "user": "user",
            "link": "http://ec2-100-25-21-251.compute-1.amazonaws.com:5000/reset/" + uuid
        }
        emailjs.send('gmail', 'template_8dnwhv9', templates, 'user_OquBz0i13IVBCXM7zcJhq')
            .then((result) => {
                window.location.reload()
            }, (error) => {
                console.log(error.text);
            });
    }


    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value,
            emailfill: event.target.value !== "",
        });
    }


    render() {
        return (
            <div className="forgot-password">
                <h4>Forgot my password</h4>
                <input type="text" placeholder={"your email"} name="user" onChange={this.handleEmailChange}/><br/>
                <button disabled={this.state.emailfill  ? false : true}  onClick={this.handleSubmit}>Submit</button>
                <br/><br/>
            </div>
        );
    }

}









