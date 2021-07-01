import React, {useEffect} from "react";
import {
    useHistory
} from 'react-router-dom';
import {useProfile} from "./ProfileContext";
import Loading from "./Loading";

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
            let response = await fetch("/api/lazyLogin",
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    cache: 'no-cache',
                    referrerPolicy: 'no-referrer',
                });
            if(response.status === 200){
            let jsResponse = await response.json();
            setProfileData(() => jsResponse);
            }
            else if(response.status !== 200){
                history.push("/login");
            }
        }
    const loadingStyle = {
        "height":"100%",
        "width":"100%"
    }
    return (
        <div style={loadingStyle}>
            <Loading />
        </div>
    );
}

export default LazyLoader;