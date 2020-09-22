import React, {useState} from 'react';
import axios from 'axios';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from "react-html-parser";

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
                axios.get(`/post`).then(res => {
                     this.setState({
                        title: res.data.title,
                        content: res.data.content,
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
           content:ReactHtmlParser(this.state.content)
        });
        const data = {
            title: this.state.title,
            titlecontent: this.state.content,
            content: this.state.content,
            author:this.state.author,
            post_id: this.props.match.params.id,
        }

        if (this.state.edit){
            axios.put(`/post`, data)
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
                    <input type="submit" value={button} onClick={this.handleSubmit}/>
                    {/*disabled={this.state.titlefill&&this.state.contentfill? false:true}*/}
                </p>
            </div>
        );
    }
}

export default CreateAndEdit;




