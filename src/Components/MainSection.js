import React from 'react'
import Posts from "./Posts";
import '../CSS/style.css';
import '../CSS/main_section.css'
import axios from "axios";



class MainSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key : "",
            username: this.props.username,
            search: false,
            posts:[],
            found:true,
        };
    }



     handleSearch = (e) => {
        if(e !== undefined) {
            this.setState({
                key: e.target.value
            });
        }
            if (e.target.value !== "") {
                axios.get(`/postss/${e.target.value}`).then(res => {
                    if (res.data !== "no posts") {
                        this.setState({
                            search: true,
                            posts: res.data,
                        });
                    }else {
                        this.setState({
                            found: false,

                        });
                    }

                })
            } else axios.get('/posts').then(res => {
                if (res.data !== "no posts") {
                    console.log("posts are:", res.data)
                    this.setState({
                        search: false,
                        posts: res.data,
                    });

                }
            })
         }

    render() {
        return(
            <div className = "main-section">
                <section >
                    <label className="title"> Best Blog</label>
                    <span className="vertical-line"> | </span>
                    <input type="text" placeholder="Search" size="54" onChange={this.handleSearch}/>
                    {!this.state.found&&<p >no match</p>}

                    <div className= "posts-list">

                        {
                            this.state.found &&  <Posts {...this.props} found ={this.state.found}Posts ={this.state.posts} Username={this.state.username} Search = {this.state.search} MyKey={this.state.key}/>
                        }

                    </div>
                </section>
            </div>
         );
    }
}

export default MainSection;