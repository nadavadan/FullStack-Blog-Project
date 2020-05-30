import MainSection from "../Components/MainSection";
import Sidebar from "../Components/Sidebar";
import React from "react";

function HomePage(){
    return (
        <div>
            <div className="app-container">
                <div className="mainSection-container"><MainSection/></div>
                <div className="sidebar-container"><Sidebar/></div>
            </div>
        </div>
    )
}

export default HomePage;