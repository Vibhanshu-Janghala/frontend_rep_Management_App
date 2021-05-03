import React from "react"
import {useProfile} from "./ProfileContext";
import {Link} from "react-router-dom";
const NavPane = () =>{
    let {profileData}= useProfile();
    return(
        <>
            <div>
                <h1>
                    {profileData.name}
                </h1>
                <h1>
                    Level {profileData.level} Account
                </h1>
            </div>
            <nav>
                <Link to="/">Announcements</Link>
                <Link to="/todolist">ToDo List</Link>
                <Link to="/workflow">Workflow</Link>
                <Link to="/chat">Chat</Link>
            </nav>
        </>
    )
}
export default NavPane;