import React from 'react';
import axios from 'axios';


class NewPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: null,
            content: null,
            author: this.props.username,
        };
        console.log(this.props)
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
            author: this.state.author,
        }

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

    render() {
        return (
            <div>
                <h1>Create new post</h1>
                <p>
                    <br/>
                    <input type="text" value={this.state.title} placeholder="Post title goes here..." size="54"
                           onChange={this.handleTitleChange}></input>
                    <br/><br/>
                    <textarea rows="8" cols="50" value={this.state.content} placeholder="Post content goes here..." onChange={this.handleContentChange}/>
                    <br/><br/>
                    <input type="submit" value="Save post" onClick={this.handleSubmit}/>
                </p>
            </div>
        );

    }
}

export default NewPost;
