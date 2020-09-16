import React from 'react'
import Posts from "./Posts";
import '../CSS/style.css';
import '../CSS/main_section.css'
import {Link} from "react-router-dom";

class MainSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key : "",
            username: this.props.username,
            search: false,
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
        // e.preventDefault()
        if(e.target.value !== "") {
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
            <div className = "main-section">
                <section >
                    <label className="title"> Best Blog</label>
                    <span className="vertical-line"> | </span>
                    <input type="text" placeholder="Search" size="54" onChange={this.handleSearch}/>
                    <div className= "posts-list">

                        {
                            // this.state.search && <Posts {...this.props} username={this.state.username} MyKey={this.state.key}/>
                            <Posts {...this.props} username={this.state.username} search = {this.state.search} MyKey={this.state.key}/>
                        }
                    </div>
                </section>
            </div>
    );
    }
}

export default MainSection;