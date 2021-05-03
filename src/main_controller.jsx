import './App.css';
import React, { useState} from "react";
import Cookies from "js-cookie";
import {

    Redirect
} from 'react-router-dom';
import {useProfile} from "./ProfileContext";


function App() {
    // isLoading decides if fetching is complete
    let [isLoading, setIsLoading] = useState(false);

    let {profileData, setProfileData} = useProfile();


    // If refresh Token available get access token
    if (Cookies.get("refreshTok") != null && profileData == null) {
        setIsLoading(true);

        async function fetchProfileData() {
            let response = await fetch("/api/login",
                {
                    method: "GET",
                    header: {accept: "application/json"},
                    credentials: "same-origin",
                });
            let jsResponse = await response.json();
            setProfileData(() => jsResponse);
            setIsLoading(false);

        }

        fetchProfileData()
            .then(() => console.log("Fetched data :" + profileData))
            .catch((e) => console.log("Error getting Access Tok :" + e));

        return (
            isLoading ? <div>
                    Loading...
                </div> :

                <Redirect push to="/dashboard" />


        );
    }
    else if(Cookies.get("refreshTok") == null && profileData == null){
       return(
           <Redirect push to="/login" />
       )
    }
}

export default App;