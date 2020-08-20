import React from 'react'
import Posts from "./Posts";
import '../CSS/style.css';
import {Link} from "react-router-dom";

class MainSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key : "",
            username: this.props.username,
            search: false
        };
    }
    componentDidUpdate() {
        console.log("im in componentDidMount")
        console.log("this is the key value", this.state.key)
        if(this.state.search) {
            this.render()
        }
    }


    handleSearch = (e) => {
        e.preventDefault()
        console.log("this is the e", e.target.value)
        if(e.target.value !== undefined) {
            this.setState({
                key: e.target.value,
                search: true
            })
        } else {
            this.setState({
                key:'',
                search: false
            })
        }
        this.componentDidUpdate()
    }

    render() {
        return(
            <section >
                {console.log("this is render", this.state)}
                <label className="title"> Best Blog</label>
                <span className="vertical-line"> | </span>
                <input type="text" placeholder="Search" size="54" onChange={this.handleSearch}/>
                <div className= "posts-list">

                    {

                        // this.state.search && <Posts {...this.props} username={this.state.username} MyKey={this.state.key}/>
                        <Posts {...this.props} username={this.state.username} MyKey={this.state.key}/>
                    }
                </div>
            </section>
        );
    }
}

export default MainSection;