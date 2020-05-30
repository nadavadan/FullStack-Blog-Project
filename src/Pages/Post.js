import React from "react";
import axios from "axios";

class PostPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post: [],
        };
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get(`/posts/${id}`).then(res => {
            this.setState({
                post: res.data,
            });
        })

    }

    render() {
        return (
            <div>
                <h1>{this.state.post.title}</h1>
                <p>{this.state.post.content}</p>
            </div>
        )
    }



}
export default PostPage;