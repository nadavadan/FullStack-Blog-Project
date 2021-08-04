import React from "react";
import axios from "axios";
import Comments from "../Components/Comments";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


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

    //Init specific post s.t post id taken from URL.
    componentDidMount() {
        const data = { post_id: this.props.match.params.id}
        axios.post('/post',data).then(res => {
            this.setState({
                post: res.data,
            });
        })
    }

    render() {
        {ReactHtmlParser(this.state.post.content)}
        return (
            <div>
                <h1>{this.state.post.title}</h1>
                <p>{ReactHtmlParser(this.state.post.content)}</p>
                <Comments Post_id = {this.state.post_id} username={this.props.username} is_logge_in={this.state.is_logged_in} />
            </div>
        )
    }
}
export default PostPage;