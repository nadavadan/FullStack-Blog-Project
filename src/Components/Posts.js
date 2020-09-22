import React from 'react';
import '../CSS/post.css';
import {Link} from "react-router-dom";
import axios from "axios";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';



export default class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // posts: [],
            found:this.props.found,
            posts:this.props.Posts,
            comments:[],
            comment:"",
            username:this.props.Username,
            key:this.props.MyKey,
            search:this.props.Search,
        };

    }

    componentDidMount() {
           axios.get('/posts').then(res => {
               console.log("this is res ", res.data)
               if (res.data !== "no posts") {
                   console.log("posts are:", res.data)
                   this.setState({
                       search: false,
                       posts: res.data,
                   });
               }
           })
    }

    showPost =()=> {
        console.log("this is show post", this.state.posts)
        console.log("this is show post props", this.props.Posts)
        console.log(JSON.stringify(this.props.Posts))
        if (this.props.Search){
            if (!this.state.found){

            }
            return this.props.Posts.map((post,index)=>{
                return this.onePost(post,index)
            })
        }else {
            return this.state.posts.map((post,index)=>{
                return this.onePost(post,index)
            })
        }

    }


    render() {
        console.log(this.state.posts)
        return (
            <div>
                {this.showPost()}
            </div>
        )}

    deletePost = (post_id) => {
        const data={
            post_id:post_id,
        }
        axios.post('/delete',data)
            .then(res => {
                this.setState({
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
                });
            }).catch(err=>{

            })
    }


     onePost=(post,index)=>{
        console.log("this is post", post)
        return (

            <div key = {index}>
            <div className="post-container">
                <div className="post">
                    <label className="post-title">
                        <Link to={`/post/${post.id}`}>
                            <button value={"post"} className="post-title-button" onClick={()=>this.postCounter(post.id)}>
                                <span className="button--inner">{post.title}</span>
                            </button>
                        </Link>
                        {this.props.username === post.author &&
                            <>
                                <Link to={`/edit/${post.id}`} className="edit">Edit  </Link>
                                <button className="delete" onClick={()=>this.deletePost(post.id)}> Delete </button>
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
                {console.log(post.id)}
                <Link to={`/post/${post.id}`} className="comments"> {'Comments'} </Link>
            </div>
        );
    }

}