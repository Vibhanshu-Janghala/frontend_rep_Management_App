import './App.css';
import LoginPage from "./Login";
import React,{useState} from "react";
import Cookies from "js-cookies";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Redirect
} from 'react-router-dom';
import Dashboard from "./Dashboard";

function App() {
    // isLoading decides if fetching is complete
    let [isLoading,setIsLoading] = useState(false);
    //authToken has authorization token
    let [authToken,setAuthToken] = useState("");
    //user contains username and access level of account
    let [user,setUser] = useState({});
    // data prefetches announcements and todoList
    let [data,setData] = useState({});

    //function to change authToken
    const handleAuth = (tok)=>{
        return(setAuthToken(tok))
    };

    // If refresh Token available get access token
    if(Cookies.get("refreshTok") !=null){
        setIsLoading(true);
        async function getTok()
        {
          let response = await fetch("serverUrl", options);
            setUser(response.body.user);
            setAuthToken(response.body.authToken);
            setData(response.body.data);
            setIsLoading(false);

        }
        getTok();
    }



    return (
    isLoading? <div>
            Loading...
        </div>:
    // look at twitter for routes
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage setAuth={handleAuth} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
               authToken== null?
                   <Redirect to="/login" />:
                   <Dashboard user={user} authToken={authToken} data={data} />} />
        </Routes>


    );
}

export default App;