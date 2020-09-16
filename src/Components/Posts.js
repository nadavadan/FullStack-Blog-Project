import React from 'react';
import '../CSS/post.css';
import {Link} from "react-router-dom";
import axios from "axios";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';



export default class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            comments:[],
            comment:"",
            username:this.props.username,
            key:this.props.MyKey,
            search:this.props.search,
        };

    }
    componentDidMount() {
        if (this.state.search){
            axios.get(`/postss/${this.state.key}`).then(res => {
                if (res.data!== "no posts" ) {
                    this.setState({
                        posts: res.data,
                    });
                }
            })
        }
        else axios.get('/posts').then(res => {
            if (res.data!== "no posts" ) {
                this.setState({
                    posts: res.data,
                });
            }
        })
    }

    // componentDidMount() {
    //     axios.get('/posts').then(res => {
    //         if (res.data !== "no posts") {
    //             this.setState({
    //                 posts: res.data,
    //             });
    //         }
    //
    //     })
    //     console.log("this key in post" + this.state.key)
    //     let key = this.state.key
    //     if(key !== "") {
    //         axios.get('/posts').then(res => {
    //             if (res.data !== "no posts") {
    //                 this.setState({
    //                     posts: res.data,
    //                 });
    //             }
    //
    //         })
    //     } else {
    //         axios.get('/posts').then(res => {
    //             if (res.data!== "no posts" ) {
    //                 this.setState({
    //                     posts: res.data,
    //                 });
    //             }
    //         })
    //     }
    // }

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
        axios.delete(`/posts/${post_id}`)
            .then(res => {
                this.componentDidMount()
                this.setState({
                    posts:[]
                });
            }).catch(err=>{
                console.log(err)
            })
    }

    postCounter = (post_id) => {
        axios.put(`/counter/${post_id}`)
            .then(res => {
                this.componentDidMount()
                this.setState({
                    posts:[]
                });
            }).catch(err=>{

            })
    }


     onePost=(post,index)=>{
        return (

            <div key = {index}>
            <div className="post-container">
                <div className="post">
                    <label className="post-title">
                        <a href={`/post/${post.id}`}>
                            <button className="post-title-button" onClick={()=>this.postCounter(post.id)}>
                                <span className="button--inner">{post.title}</span>
                            </button>
                        </a>
                        {/*<Link to={`/post/${post.id}`} className="post-title"> {post.title} </Link>*/}

                        {this.props.username === post.author &&
                            <>
                                <Link to={`/edit/${post.id}`} className="post-title">Edit  </Link>
                                <button onClick={()=>this.deletePost(post.id)}> Delete </button>
                            </>
                        }

                    </label>
                    <p className="post-content">
                        {ReactHtmlParser(post.content)}
                    </p>
                    <label className="post-footer">
                        Published {post.published} by {post.author}
                        <span className="vertical-line"> | </span>
                        {post.counter} Views
                    </label>
                </div>
            </div>
                <Link to={`/post/${post.id}`} className="comments"> {'Comments'} </Link>
            </div>
        );
    }
}