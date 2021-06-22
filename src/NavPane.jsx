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
            </div>
            <nav>
                <Link to={`/dashboard/announcement`}>Announcements</Link>
                <Link to={`/dashboard/todolist`}>ToDo List</Link>
                <Link to={`/dashboard/workflow`}>Workflow</Link>
                <Link to={`/dashboard/chat`}>Chat</Link>
            </nav>
        </>
    )
}
export default NavPane;