import React from 'react';
import '../CSS/post.css';
import axios from "axios";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";



class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments:[],
            comment:"",
            post_id: this.props.Post_id,
            username: this.props.username,
            published : "",
            is_logged_in:this.props.is_logge_in,
        };
    }

    componentDidMount() {
        const data = {post_id: this.props.Post_id}
        if(data) {
            axios.put('/comment', data)
                .then((res) => {
                    this.setState({
                        comments: res.data,
                        published: res.data.published,
                    });
                })
        }
    }

    showComment =()=> {
        if (this.state.comments !== []) {
            return this.state.comments.map((comment) => {
                return this.oneComment(comment)
            })
        }
        else return <h3> no comments </h3>
    }

    handleAddComment = (e) => {
        this.setState({
            comment: e.target.value,
        })
    }

    onNewCommentClick =(e)=> {
        e.preventDefault();
        const data = {
            username: this.props.username,
            post_id: this.props.Post_id,
            content: this.state.comment,
        }

        axios.post(`/comment`, data).then(res => {
            this.setState({
                comment: '',
            });

            this.componentDidMount()
        })
    }

    render() {

        return (
            <div>
                {this.showComment()}
                {this.state.is_logged_in &&
                <div>
                    <CKEditor
                        placeholder="Add your comment"
                        editor={ ClassicEditor }
                        onChange={ ( event, editor ) => {
                            this.state.comment= editor.getData();
                            console.log( { event, editor } );
                        } }
                    />
                    <br/><br/>
                    <button onClick={this.onNewCommentClick}>Post</button>
                </div>
                }
            </div>
        )
    }


    oneComment=(props)=>{
        return (
            <div key={props.id}>
                <div className="post-container">
                    <div className="post">
                        <label className="post-title">
                            <h5>{props.username}</h5>
                        </label>
                        <p className="post-content">
                            {ReactHtmlParser(props.content)}
                        </p>
                        <label className="post-footer">
                            {props.published}
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}


export default Comments;