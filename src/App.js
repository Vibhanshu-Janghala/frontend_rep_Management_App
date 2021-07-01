import './App.css';
import {Suspense, lazy} from "react";
import {
    BrowserRouter as Router, Redirect,
    Route,
    Switch
} from 'react-router-dom';
import {useProfile} from "./ProfileContext";
import {useTheme} from "./ThemeContext";
import Loading from "./Loading";

const Dashboard = lazy(() => import("./Dashboard"));
const SignUp = lazy(() => import('./SignUp'));
const LazyLoader = lazy(() => import('./LazyLoader'));
const NoUrlMatch = lazy(() => import('./NoUrlMatch'));
const LoginPage = lazy(() => import('./Login'));


function App() {
    const {profileData} = useProfile();
    const {themeData} = useTheme();
    return (
        <div className={`route-container ${"theme-" + themeData}`}>
            <Router>
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route exact path="/">
                            <LazyLoader/>
                        </Route>
                        <Route exact path="/login">
                            <LoginPage/>
                        </Route>
                        <Route exact path="/signup">
                            <SignUp/>
                        </Route>
                        <Route path="/dashboard">
                            {profileData.name != null ?
                                <Dashboard/> :
                                <Redirect push to="/"/>}
                        </Route>
                        <Route path="*">
                            <NoUrlMatch/>
                        </Route>
                    </Switch>
                </Suspense>
            </Router>
        </div>
    );
}

export default App;
