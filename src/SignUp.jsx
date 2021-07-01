import React, {useEffect, useState} from "react";
import {useProfile} from "./ProfileContext";
import InputField from "./InputField";
import {Link, useHistory} from "react-router-dom";
import ErrorDisplay from "./ErrorDisplay";
import "./Login.css";


const SignUp = () => {
    const {profileData, setProfileData} = useProfile();
    const [data, setData] = useState({});
    let history = useHistory();
    const [apiError, setApiError] = useState({"exists": false, "content": ""});

    useEffect(() => {
        if (profileData.name != null) {
            history.push("/dashboard")
        }
    }, [profileData]);

    const handleChange = (name, value) => {
        return (setData(prev => {
            return ({...prev, [name]: value})
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let response = await fetch("/api/createAccount", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data),
            cache: 'no-cache',
            referrerPolicy: 'no-referrer',
        });

        if (response.status === 200) {
            let jsResponse = await response.json();
            setProfileData(() => jsResponse);
        } else if (response.status === 401) {
            const textResponse = await response.text();
            setApiError(() => {
                    return {"exists": true, "content": textResponse}
                }
            );
        } else {
            setApiError(() => {
                return {"exists": true, "content": "Internal Server Error"}
            });
        }

    }

    return (<div className={"login-box"}>
            <h2>Sign Up</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <InputField
                    name="name"
                    type="text"
                    placeholder="Username"
                    onChange={handleChange}
                    className={"user-box"}
                />
                <InputField
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className={"user-box"}
                />
                <div className={"radio-button"}>
                    <label>
                        <input
                            autoComplete={"off"}
                            name="level"
                            type="radio"
                            value="Least Access"
                            checked={data.level === 0}
                            onChange={() => handleChange("level", 0)}
                        />
                        Least Access
                    </label>
                </div>
                <div className={"radio-button"}>
                    <label>
                        <input
                            autoComplete={"off"}
                            name="level"
                            type="radio"
                            value="Medium Access"
                            checked={data.level === 1}
                            onChange={() => handleChange("level", 1)}
                        />
                        Medium Access
                    </label>
                </div>
                <div className={"radio-button"}>
                    <label>
                        <input
                            autoComplete={"off"}
                            name="level"
                            type="radio"
                            value="All access"
                            checked={data.level === 2}
                            onChange={() => handleChange("level", 2)}
                        />
                        All Access
                    </label>
                </div>
                <InputField
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className={"user-box"}
                />
                <button type="submit" value="Submit" className={"sign-up"}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Sign Up
                </button>
            </form>
            <ErrorDisplay showError={apiError.exists} errorContent={apiError.content}/>
            <Link to={"/login"} className={"log-in"}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>Log In</Link>
        </div>
    )
}
export default SignUp;