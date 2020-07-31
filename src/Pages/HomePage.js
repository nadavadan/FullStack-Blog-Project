import MainSection from "../Components/MainSection";
import Sidebar from "../Components/Sidebar";
import React from "react";




class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username:this.props.username,
        };
    }

    render(){
        return(
            <div>
                <div className="app-container">
                    <div className="mainSection-container"><MainSection {...this.props} username={this.state.username}/></div>
                    <div className="sidebar-container"><Sidebar/></div>
                </div>
            </div>
        );
    }
}
export default HomePage;