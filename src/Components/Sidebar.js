import React from 'react';
//import '../CSS/style.css';
import {Link} from 'react-router-dom';


function Sidebar() {
    return (
        <aside className="side-bar">
            <label className="title"><h1>Latest</h1></label>
            <ul className="side-bar-list">
                <li>
                    <span>Blog post #1 </span><Link to={'/post/0'}>go to page</Link>
                </li>
                <li>
                    <span>Blog post #2 </span><Link to={'/post/1'}>go to page</Link>
                </li>
                <li>
                    <span>Blog post #3 </span><Link to={'/post/2'}>go to page</Link>
                </li>
            </ul>
            <hr/>
            <label className="title"><h1>Popular</h1></label>
            <ul className="side-bar-list">
                <li>
                    <span>Blog post #1 </span><Link to={'/post/0'}>go to page</Link>
                </li>
                <li>
                    <span>Blog post #2 </span><Link to={'/post/1'}>go to page</Link>
                </li>
                <li>
                    <span>Blog post #3 </span><Link to={'/post/2'}>go to page</Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
