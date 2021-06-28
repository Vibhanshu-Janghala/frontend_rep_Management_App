import NavPane from "./NavPane";
import Announcement from "./Announcement";
import ToDoList from "./ToDoList";
import Workflow from "./Workflow";
import Chat from "./Chat";
import {Route, Switch} from 'react-router-dom';
import {SocketProvider} from "./SocketContext";
import UsersOnline from "./UsersOnline";
import React, {useState} from "react";
import "./Dashboard.css";


const Dashboard = () => {
    const [activeBar, setActiveBar] = useState(true);

    return (
        <SocketProvider>
            <div className={"dashboard-container"}>
                <div >
                    <button onClick={() => setActiveBar((prevState) => !prevState)}
                            className={activeBar ? "nav-toggle close" : "nav-toggle"}>
                        NavIcon
                    </button>
                    <NavPane navState={activeBar}/>
                </div>
                <div className={"main-content"}>
                    <Switch>
                        <Route exact path={`/dashboard/`}>
                            <div> Click on any tab</div>
                        </Route>
                        <Route exact path={`/dashboard/announcement`}>
                            <Announcement/>
                        </Route>
                        <Route exact path={`/dashboard/todolist`}>
                            <ToDoList/>
                        </Route>
                        <Route exact path={`/dashboard/workflow`}>
                            <Workflow/>
                        </Route>
                        <Route exact path={`/dashboard/chat`}>
                            <Chat/>
                        </Route>
                        <Route exact path={'/dashboard/online'}>
                            <UsersOnline/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </SocketProvider>
    );
}
export default Dashboard;