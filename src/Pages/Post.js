import React from "react";
import axios from "axios";
import Comments from "../Components/Comments";

class PostPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post: [],
            post_id:this.props.match.params.id,
            username:this.props.username,
            is_logged_in: this.props.is_logged_in
        };
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get(`/posts/${id}`).then(res => {
            this.setState({
                post: res.data,
                post_id:id,
            });
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.post.title}</h1>
                <p>{this.state.post.content}</p>
                <Comments post_id = {this.state.post_id} username={this.props.username} is_logge_in={this.state.is_logged_in} />
            </div>
        )
    }
}
export default PostPage;