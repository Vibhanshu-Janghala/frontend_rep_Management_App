import React,{useState} from "react";
import NavPane from "./NavPane";
import ToDoList from "./ToDoList";
import Workflow from "./Workflow";
import Chat from "./Chat";
import {
    Route,
    Switch,
    useRouteMatch
} from 'react-router-dom';
import Announcement from "./Announcement";

import { io } from 'socket.io-client';


// props has user.name user.level and authToken
    const Dashboard = ()=>{
        let match = useRouteMatch();
        const socket = io('https://server-domain.com', options);

        io.on("connection",(socket)=>{
            console.log(socket +"CONNECTED")
        })

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