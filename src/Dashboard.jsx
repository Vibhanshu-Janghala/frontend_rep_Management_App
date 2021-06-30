import NavPane from "./NavPane";
import Announcement from "./Announcement";
import ToDoList from "./ToDoList";
import Workflow from "./Workflow";
import Chat from "./Chat";
import {Route, Switch, useLocation} from 'react-router-dom';
import {SocketProvider} from "./SocketContext";
import UsersOnline from "./UsersOnline";
import React, {useState} from "react";
import "./Dashboard.css";
import {ReactComponent as MenuSVG} from "./svgs/menu_black_48dp.svg";
import AppHeader from "./AppHeader";
import Home from "./Home";


const Dashboard = () => {
    const [activeBar, setActiveBar] = useState(true);
    const changeBar = () => {
        setActiveBar((prev) => !prev)
    }
    const routeObj = useLocation().pathname;
    const [headerUrl, setHeaderUrl] = useState("");
    if (headerUrl !== routeObj.substring(routeObj.lastIndexOf("/") + 1)) {
        setHeaderUrl(() => routeObj.substring(routeObj.lastIndexOf("/") + 1))
    }

    return (
        <SocketProvider>
            <div className={"dashboard-container"}>
                <div className={activeBar ? "app-header" : "no-app-header app-header"}>
                    <AppHeader headerUrl={headerUrl}/>
                </div>
                <div className={"nav-pane-wrapper"}>
                    <button onClick={() => setActiveBar((prevState) => !prevState)}
                            className={activeBar ? "nav-toggle close" : "nav-toggle"}>
                        <MenuSVG/>
                    </button>
                    <NavPane navState={activeBar} changeState={changeBar}/>
                </div>
                <div className={activeBar ? "main-content" : "main-content hide"} >
                    <Switch>
                        <Route exact path={`/dashboard/`}>
                            <Home/>
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