import React from 'react'
import Posts from "./Posts";
import '../CSS/style.css';

class MainSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
        };
    }

    render() {
        return(
            <section >
                <label className="title"> Best Blog</label>
                <div className= "posts-list">
                    <Posts {...this.props} username={this.state.username}/>
                </div>
            </section>
        );
    }
}

export default MainSection;