import React from 'react';
import '../CSS/post.css';
import {Link} from "react-router-dom";
import axios from "axios";


export default class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            comments:[],
            comment:"",
            username:this.props.username,
        };

        console.log(this.props)
    }

    componentDidMount() {
        axios.get('/posts').then(res => {
            if (res.data!== "no posts" ) {
                this.setState({
                    posts: res.data,
                });
            }
        })
    }

    showPost =()=> {
        return this.state.posts.map((post,index)=>{
        return this.onePost(post,index)
        })
    }


    render() {
        return (
            <div>
                {this.showPost()}
            </div>
        )
    }

    deletePost = (post_id) => {
        console.log("in delete post")
        axios.post(`/delete/${post_id}`)
            .then(res => {

                this.componentDidMount()
                this.setState({
                    posts:[]
                });
            })

            .catch(err=>{
                console.log(err)
            })
        }


     onePost=(post,index)=>{
        return (
            <div key = {index}>
            <div className="post-container">
                <div className="post">
                    <label className="post-title">
                        <Link to={`/post/${post.id}`} className="post-title"> {post.title} </Link>

                        {this.props.username === post.author &&
                            <>
                                <Link to={`/edit/${post.id}`} className="post-title">Edit  </Link>
                                <button onClick={()=>this.deletePost(post.id)}> Delete </button>
                            </>
                        }

                    </label>
                    <p className="post-content">
                        {post.content}
                    </p>
                    <label className="post-footer">
                        Published {post.published} by {post.author}
                    </label>
                </div>
            </div>
                <Link to={`/post/${post.id}`} className="comments"> {'Comments'} </Link>
            </div>
        );
    }
}