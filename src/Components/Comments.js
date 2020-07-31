import React from 'react';
import '../CSS/post.css';
import axios from "axios";


class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments:[],
            comment:"",
            postid: this.props.post_id,
            username: this.props.username,
            published : "",
            is_logged_in:this.props.is_logge_in,
        };
    }

    componentDidMount() {
        axios.get(`/comment/${this.props.post_id}`).then(res => {
            this.setState({
                comments: res.data,
                published: res.data.published,
            });
        })
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
            postid:this.props.post_id,
            content: this.state.comment,
        }
        console.log("data:  ",data)

        axios.post(`/comment/${this.props.post_id}`, data).then(res => {
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
                    <input type="text" value={this.state.comment} placeholder="Add your comment" size="54" onChange={this.handleAddComment}/>
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
                            {props.content}
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