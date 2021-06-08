import {useEffect} from "react";
import NavPane from "./NavPane";
import Announcement from "./Announcement";
import ToDoList from "./ToDoList";
import Workflow from "./Workflow";
import Chat from "./Chat";
import {
    Route,
    Switch
} from 'react-router-dom';

import {io} from 'socket.io-client';
import {useProfile} from "./ProfileContext";

const Dashboard = () => {
    console.log("running")
    const {profileData} = useProfile();
    let socket;
    useEffect(()=>{
        socket = io("http://localhost:8080/",
        {
            path:"/socket.io",
            transports: ["websocket"],
            reconnectionAttempts: 2,
            auth: {
                "authToken": profileData.authToken
            }
        })},[]);

    return (
        <>
            <NavPane/>
            <Switch>
                <Route exact path={`/dashboard`}>
                    <Announcement/>
                </Route>
                <Route exact path={`/dashboard/todolist`}>
                    <ToDoList/>
                </Route>
                <Route exact path={`/dashboard/workflow`}>
                    <Workflow sockt={socket}/>
                </Route>
                <Route exact path={`/dashboard/chat`}>
                    <Chat sockt={socket}/>
                </Route>
            </Switch>
        </>
    );
}
export default Dashboard;