import React from 'react';
//import '../CSS/style.css';
import {Link} from 'react-router-dom';


function Sidebar() {
    return (
        <aside className="side-bar">
            <label className="title"><h3>Latest</h3></label>
            <ul className="side-bar-list">
                <li>
                    <span> Post #1 </span><Link to={'/post/0'}>Go </Link>
                </li>
                <li>
                    <span> Post #2 </span><Link to={'/post/1'}>Go</Link>
                </li>
                <li>
                    <span> Post #3 </span><Link to={'/post/2'}>Go</Link>
                </li>
            </ul>
            <hr/>
            <label className="title"><h3>Popular</h3></label>
            <ul className="side-bar-list">
                <li>
                    <span> Post #1 </span><Link to={'/post/0'}>Go</Link>
                </li>
                <li>
                    <span> Post #2 </span><Link to={'/post/1'}>Go</Link>
                </li>
                <li>
                    <span> Post #3 </span><Link to={'/post/2'}>Go</Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
