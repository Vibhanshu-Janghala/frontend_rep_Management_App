import React,{useState} from "react";
import NavPane from "./NavPane";
import ToDoList from "./ToDoList";
import Workflow from "./Workflow";
import Chat from "./Chat";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Announcement from "./Announcement";

import { io } from 'socket.io-client';


// props has user.name user.level and authToken
    const Dashboard = (props)=>{
        const socket = io('https://server-domain.com', options);

        io.on("connection",(socket)=>{
            console.log(socket +"CONNECTED")
        })

        return(
        <>
            <NavPane user={props.user}/>
            <Routes>
                <Route path="/" element={<Announcement
                        announce={props.data.announce}
                        level={props.user.level}
                        authToken={props.authToken}
                        />} />
                <Route path="/todolist" element={<ToDoList
                    todoList={props.data.todoList}
                    authToken={props.authToken}
                />} />
                <Route path="/workflow" element={<Workflow
                    authToken={props.authToken}
                    sockt = {socket}
                />} />
                <Route path="/chat" element={<Chat
                    authToken={props.authToken}
                    sockt = {socket}
                />} />
            </Routes>
        </>
    )
}
export default Dashboard;