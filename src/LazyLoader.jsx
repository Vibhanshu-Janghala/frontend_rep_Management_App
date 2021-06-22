import React, {useEffect} from "react";
import {
    useHistory
} from 'react-router-dom';
import {useProfile} from "./ProfileContext";

const LazyLoader = () => {

    let {profileData, setProfileData} = useProfile();
    let history = useHistory();

    useEffect(() => {
        if (profileData.name != null) {
            history.push("/dashboard");
        }
        else{
            fetchProfileData()
                .catch((e) => console.log("Error fetching Access Tok :" + e));
        }
    }, [profileData]);

     async function fetchProfileData() {
            let response = await fetch("http://localhost:8080/api/lazyLogin",
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    cache: 'no-cache',
                    referrerPolicy: 'no-referrer',
                    mode: "cors"
                });
            if(response.status === 200){
            let jsResponse = await response.json();
            setProfileData(() => jsResponse);
            }
            else if(response.status !== 401){
                history.push("/login");
            }
        }

    return (
        <div>
            Loading...
        </div>
    );
}

export default LazyLoader;