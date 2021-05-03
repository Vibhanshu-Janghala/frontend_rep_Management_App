import React,{useState} from "react";
//Login page css
import InputField from './InputField'
import { Redirect,Link } from 'react-router-dom';
import {useProfile} from "./ProfileContext";

function LoginPage(){
    const {setProfileData} = useProfile();
    const [data,setData] = useState({});

    const handleChange = (name,value) =>{
        return(setData(prev =>{return({ ...prev , [name]: value})}))
    }
    console.log(data)

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(`Submitting Data ${data}`)
        console.log(data)

        let response = await fetch("/api/login",  {
            method: "POST",
            header: {accept: "application/json"},
            credentials: "same-origin",
            body: JSON.stringify(data)
        });
        let jsResponse = await response.json();
        setProfileData(() => jsResponse);


        //if login successful
        if(response.status === 200){
            return  <Redirect to={"/dashboard"} />;
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
                    name="Password"
                    type ="password"
                    placeholder= "Password"
                    onChange = {handleChange}
                />
                <button type = "submit" value = "Submit" >
                    Sign In
                </button>
                <Link to={"/signup"}>Sign Up!</Link>
            </form>

        </div>

    )
}
export default LoginPage;