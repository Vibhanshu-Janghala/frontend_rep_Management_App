import './App.css';
import LoginPage from "./Login";
import {
    BrowserRouter as Router, Redirect,
    Route,
    Switch
} from 'react-router-dom';
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
import LazyLoader from "./LazyLoader";
import NoUrlMatch from "./NoUrlMatch";
import {useProfile} from "./ProfileContext";
import React from "react";

function App() {
    let {profileData} = useProfile();

    return (
        <div className={"route-container"}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <LazyLoader />
                    </Route>
                    <Route exact path="/login">
                        <LoginPage/>
                    </Route>
                    <Route exact path="/signup">
                        <SignUp/>
                    </Route>
                    <Route path="/dashboard">
                        {profileData.name!=null?
                        <Dashboard />:
                        <Redirect push to="/" />}
                    </Route>
                    <Route path="*">
                        <NoUrlMatch />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
