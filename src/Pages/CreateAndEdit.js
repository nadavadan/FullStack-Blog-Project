import React, {useState} from 'react';
import axios from 'axios';
import { Editor } from "@tinymce/tinymce-react";
import RichText from "./component/RichText";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


class CreateAndEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            author: this.props.username,
            postId: this.props.match.params.id,
            post :[],
            edit: this.props.edit,
            titlefill:false,
            contentfill:false,
        };
    }

        componentDidMount() {
            if (this.state.edit){
                let {postId} = this.state;
                axios.get(`/posts/${postId}`).then(res => {
                     this.setState({
                        title: res.data.title,
                        content: res.data.content
                    });
                })
            }else{
                axios.get(`/login`).then(res => {
                console.log("login data" ,res.data)
                    this.setState({
                        author: res.data
                    });
                })

            }
        }


    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value,
            titlefill: e.target.value !== "",
        })

    }
    // handleContentChange = (e) => {
    //     this.setState({
    //         content: e.target.value,
    //         contentfill: e.target.value !=="",
    //     })
    // }
    // handleContentChange(content, editor) {
    //     this.setState({content})
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            content: this.state.content,
            author:this.state.author,
        }

        if (this.state.edit){
            axios.put(`/posts/${this.state.postId}`, data)
                .then(res => {
                    if(res.status === 200) {
                        this.setState({
                            title: '',
                            content: '',
                        });
                        this.props.history.push("/")
                    }})
                .catch(err=>{
                    console.log(err)
                })

        }else{
            axios.post('/posts', data)
                .then(res => {
                    this.setState({
                        title: '',
                        content: '',
                        author:'',
                    });
                    this.props.history.push('/');
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }


    render() {
        const method = this.props.edit? "Edit post" : "Add new post"
        const button = this.props.edit? "Edit" : "post"
        const {title, content} = this.state
        return (
            <div>
                <h1>{method}</h1>
                <p>
                    <br/>
                    <input type="text" defaultValue={title} size="54" onChange={this.handleTitleChange}>
                    </input>
                    <br/><br/>
                    {/*<textarea*/}
                    {/*   rows="8" cols="50" defaultValue={content} onChange={this.handleContentChange}*/}

                    {/*/>*/}

                    <div className="post-container">
                        <CKEditor
                            defaultValue="123"
                            editor={ ClassicEditor }
                            onChange={ ( event, editor ) => {
                                this.state.content= editor.getData();
                                this.state.contentfill= editor.getData() !== "";
                                console.log( { event, editor } );
                            } }
                        />
                    </div>

                    <br/><br/>
                    <input type="submit" disabled={this.state.titlefill&&this.state.contentfill? false:true} value={button} onClick={this.handleSubmit}/>
                </p>
            </div>
        );
    }
}

export default CreateAndEdit;




