import React, {useEffect, useState} from "react";
//Login page css
import InputField from './InputField'
import {Link, useHistory} from 'react-router-dom';
import {useProfile} from "./ProfileContext";
import ErrorDisplay from "./ErrorDisplay";
import "./Login.css" ;

const LoginPage = () => {
    let history = useHistory();
    const {profileData, setProfileData} = useProfile();
    const [data, setData] = useState({});
    const [apiError, setApiError] = useState({"exists": false, "content": ""});

    // when profileData is fetched and useState has updated useEffect will trigger
    useEffect(() => {
        if (profileData.name != null) {
            history.push("/dashboard");
        }
    }, [profileData]);

    const handleChange = (name, value) => {
        return (setData(prev => {
            return ({...prev, [name]: value})
        }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        let response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data),
            cache: 'no-cache',
            referrerPolicy: 'no-referrer',
            mode: "cors"
        });

        //if login successful
        if (response.status === 200) {
            let jsResponse = await response.json();
            setProfileData(() => jsResponse);
        } else if (response.status === 401) {
            const textResponse = await response.text();
            setApiError(() => {
                    return {"exists": true, "content": textResponse}
                }
            )
        } else {
            setApiError(() => {
                return {"exists": true, "content": "Internal Server Error"}
            })
        }

    }

    return (
        <div className={"login-box"}>
            <h2>Login</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <InputField
                    name="name"
                    type="text"
                    placeholder="Username"
                    onChange={handleChange}
                    className={"user-box"}
                />
                <InputField
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className={"user-box"}
                />
                <button type="submit" value="Submit" className={"log-in"}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>Log In</button>

            </form>
            <ErrorDisplay showError={apiError.exists} errorContent={apiError.content}/>
            <Link to={"/signup"} className={"sign-up"}><span></span>
                <span></span>
                <span></span>
                <span></span>Sign Up!</Link>

        </div>

    );
}
export default LoginPage;