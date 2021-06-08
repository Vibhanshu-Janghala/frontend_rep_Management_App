import React, {useEffect, useState} from "react";
//Login page css
import InputField from './InputField'
import {Link, useHistory, useRouteMatch} from 'react-router-dom';
import {useProfile} from "./ProfileContext";

function LoginPage(){
    let history = useHistory();
    console.log(useRouteMatch());
    const {profileData,setProfileData} = useProfile();
    const [data,setData] = useState({});

    // when profileData is fetched and useState has updated useEffect will trigger
    useEffect(()=>{
        if(profileData.name != null){
            history.push("/dashboard");
        }
    },[profileData]);

    const handleChange = (name,value) =>{
        return(setData(prev =>{return({ ...prev , [name]: value})}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)

        let response = await fetch("http://localhost:8080/api/login",  {
            method: "POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data),
            cache: 'no-cache',
            referrerPolicy: 'no-referrer',
            mode: "cors"
        });

        //if login successful
        if(response.status === 200){
            let jsResponse = await response.json();
            console.log(jsResponse);
            setProfileData(()=>jsResponse);
        }
        else{
            console.log("Error occurred while Logging In")
        }
    }

    return(
        <div>
            <form onSubmit ={ (e)=>handleSubmit(e)} >
                <InputField
                    name="name"
                    type ="text"
                    placeholder= "Username"
                    onChange = {handleChange}
                />
                <InputField
                    name="password"
                    type ="password"
                    placeholder= "Password"
                    onChange = {handleChange}
                />
                <button type = "submit" value = "Submit" >
                    Log In
                </button>

            </form>
            <Link to={"/signup"}>Sign Up!</Link>

        </div>

    )
}
export default LoginPage;