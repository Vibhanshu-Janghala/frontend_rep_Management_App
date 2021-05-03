import React from "react";
import NavPane from "./NavPane";
import Announcement from "./Announcement";
import ToDoList from "./ToDoList";
import Workflow from "./Workflow";
import Chat from "./Chat";
import {
    Route,
    Switch,
    useRouteMatch
} from 'react-router-dom';

import { io } from 'socket.io-client';
import {useProfile} from "./ProfileContext";

    const Dashboard = ()=>{
        const {profileData} = useProfile();
        let match = useRouteMatch();
        const socket = io("http://localhost:8000",
                { transports:["websocket"],
                    reconnectionAttempts:5,
                    auth :{
                        "token": JSON.stringify(profileData)
                     }
                });

        socket.on("connect", () => {
            console.log(socket.connected);
        });
        socket.on("connect_error", () => {
           console.log("SOCKET CONNECTION ERROR")
        });

        return(
        <>
            <NavPane />
            <Switch>
                <Route path={`${match.path}/`}>
                    <Announcement  />
                </Route>
                <Route path={`${match.path}/todolist`} >
                    <ToDoList />
                </Route>
                <Route path={`${match.path}/workflow`}>
                    <Workflow sockt={socket} />
                </Route>
                <Route path={`${match.path}/chat`}>
                    <Chat sockt={socket} />
                </Route>
            </Switch>
        </>
    )
}
export default Dashboard;