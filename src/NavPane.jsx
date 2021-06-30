import React, {useEffect} from "react"
import {useProfile} from "./ProfileContext";
import {Link, useHistory} from "react-router-dom";
import "./NavPane.css";
import {useSocket} from "./SocketContext";

const NavPane = (props) => {
    let {profileData, setProfileData} = useProfile();
    let history = useHistory();
    const socket = useSocket();

    useEffect(() => {
        if (profileData.name == null) {
            history.push("/login");
        }
    }, [profileData]);
    const handleClick = async () => {
        socket.disconnect();
        let response = await fetch("http://localhost:8080/api/logOut", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.stringify(profileData)
            },
            credentials: "include",
            cache: 'no-cache',
            referrerPolicy: 'no-referrer',
            mode: "cors"
        });
        if (response.status === 200) {
            setProfileData(() => {
                return {}
            });
        } else {
            console.log("Error while signing out");
        }
    }
    return (
        <div className={props.navState ? "nav-menu" : "nav-menu nav-closed"}>
            <div className={"navpane-welcome"}>
                Hi,
                <h2>
                    {profileData.name}
                </h2>
            </div>
            <nav className={props.navState ? "nav-all-links nav-links-close" : "nav-all-links "}>
                <ul className={"link-list"}>
                    <li onClick={props.changeState}><Link className={"nav-link"} to={`/dashboard/`}>Home</Link></li>
                    <li onClick={props.changeState}><Link className={"nav-link"}
                                                          to={`/dashboard/announcement`}>Announcements</Link></li>
                    <li onClick={props.changeState}><Link className={"nav-link"} to={`/dashboard/todolist`}>ToDo
                        List</Link></li>
                    <li onClick={props.changeState}><Link className={"nav-link"}
                                                          to={`/dashboard/workflow`}>Workflow</Link></li>
                    <li onClick={props.changeState}><Link className={"nav-link"} to={`/dashboard/chat`}>Chat</Link></li>
                    <li onClick={props.changeState}><Link className={"nav-link"} to={`/dashboard/online`}>Users
                        Online</Link></li>
                    <li>
                        <div onClick={handleClick} className={"nav-link"}>
                            Log Out
                        </div>
                    </li>
                </ul>
            </nav>
            <div className={"navpane-contact-me"}>
                <a href="https://www.linkedin.com/in/vibhanshu-janghala-a83b311b6" target="_blank"
                   className={"contact-me"} rel="noreferrer">
                    Contact Me
                </a>
            </div>
        </div>
    )
}
export default NavPane;