import React from 'react'
import Posts from "./Posts";
import '../CSS/style.css';

function MainSection() {
    return(
        <section >
            <label className="title"> Best blog</label>
            <div className= "posts-list">
                <Posts/>
            </div>

        </section>
    );
}
export default MainSection;