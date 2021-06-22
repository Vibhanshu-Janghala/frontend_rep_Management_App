import NavPane from "./NavPane";
import Announcement from "./Announcement";
import ToDoList from "./ToDoList";
import Workflow from "./Workflow";
import Chat from "./Chat";
import {
    Route,
    Switch
} from 'react-router-dom';
import {SocketProvider} from "./SocketContext";


const Dashboard = () => {
    return (
        <SocketProvider>
            <div>
                <NavPane/>
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
                </Switch>
            </div>
        </SocketProvider>
    );
}
export default Dashboard;