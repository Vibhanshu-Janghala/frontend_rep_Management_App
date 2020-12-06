import React,{useState} from "react";
//Login page css
import InputField from './InputField'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Redirect
} from 'react-router-dom';

function LoginPage(props){

    const [data,setData] = useState({});

    const handleChange = (name,value) =>{
        return(setData(prev =>{return({ ...prev , [name]: value})}))
    }
    console.log(data)

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        alert(`Submitting Data ${data}`)
        console.log(data)
    //updated from here
        let response = await fetch("loginURL",options)
        //if login successful
        if(response.ok){
            //set cookie from response
            props.setAuth(response.body.authToken);
            return  <Redirect to={"/dashboard"} />;
        }
        if(response.status === 401){
            //incorrect username/password
            //useState to display error
        }
        if(response.status === 500){
            //internal server error
            //useState to display error
        }
    }

    return(
        <div>
            <form onSubmit ={ (e)=>{handleSubmit(e)}} >
                <InputField
                    name="Username"
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
            </form>

        </div>
        //render login failed server not responding here

    )
}
export default LoginPage;