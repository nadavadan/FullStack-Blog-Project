import React from 'react';
//import '../CSS/style.css';
import {Link} from 'react-router-dom';
import axios from "axios";

class Sidebar extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            postsid: [],
            username:this.props.username,
        };
    }
    componentDidMount() {
            axios.get('/popular').then(res => {
                if (res.data!== "no posts" ) {
                    this.setState({
                        postsid: res.data,
                    });
                    console.log(res.data[0])
                }
            })
    }

    render() {
        return (
            <aside className="side-bar">
                <label className="title"><h3>Most Popular</h3></label>
                <ul className="side-bar-list">
                    <li>
                        <span> #1  </span><Link to={`/post/${this.state.postsid[0]}`}>Go</Link>
                    </li>
                    <li>
                        <span> #2 </span><Link to={`/post/${this.state.postsid[1]}`}>Go</Link>
                    </li>
                    <li>
                        <span> #3 </span><Link to={`/post/${this.state.postsid[2]}`}>Go</Link>
                    </li>
                </ul>
            </aside>
        )
    }
}
// function Sidebar() {
//     return (
//         <aside className="side-bar">
//             <label className="title"><h3>Most Popular</h3></label>
//             <ul className="side-bar-list">
//                 <li>
//                     <span> Post #1 </span><Link to={'/post/0'}>Go</Link>
//                 </li>
//                 <li>
//                     <span> Post #2 </span><Link to={'/post/1'}>Go</Link>
//                 </li>
//                 <li>
//                     <span> Post #3 </span><Link to={'/post/2'}>Go</Link>
//                 </li>
//             </ul>
//         </aside>
//     );
// }

export default Sidebar;
