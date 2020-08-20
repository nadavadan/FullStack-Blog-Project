import React from 'react';
import axios from 'axios';


class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: null,
            content: null,
            author: null,
            postId: this.props.match.params.id,
            post :[],
        };
    }
    componentDidMount() {
        let {postId} = this.state;
        axios.get(`/posts/${postId}`).then(res => {
            this.setState({
                //post: res.data,
                title: res.data.title,
                content: res.data.content,
            });
        })
    }

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value,
        })
    }
    handleContentChange = (e) => {
        this.setState({
            content: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            content: this.state.content,
        }

        axios.put(`/posts/${this.state.postId}`, data)
            .then(res => {
                if(res.status === 200) {
                    this.setState({
                        title: '',
                        content: '',
                        //author:''
                    });
                    this.props.history.push("/")
                }})
            .catch(err=>{
                console.log(err)
            })
    }

    render() {
        const {title, content} = this.state
        return (
            <div>
                <h1>Edit post</h1>
                <p>
                    <br/>
                    <input type="text" defaultValue={title} size="54" onChange={this.handleTitleChange}>
                    </input>
                    <br/><br/>
                    <textarea rows="8" cols="50" defaultValue={content} onChange={this.handleContentChange}/>
                    <br/><br/>
                    <input type="submit" value="edit post" onClick={this.handleSubmit}/>
                </p>
            </div>
        );
    }
}

export default Edit;
