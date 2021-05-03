import {useState} from "react";
import {useProfile} from "./ProfileContext";
import InputField from "./InputField";
import {Link, Redirect} from "react-router-dom";



const SignUp = ()=>{
    const {setProfileData} = useProfile();
    const [data,setData] = useState({});

    const handleChange = (name,value) =>{
        return(setData(prev =>{return({ ...prev , [name]: value})}))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(data)

        let response = await fetch("/api/createAccount",  {
            method: "POST",
            header: {accept: "application/json"},
            credentials: "same-origin",
            body: JSON.stringify(data)
        });
        let jsResponse = await response.json();
        setProfileData(() => jsResponse);
        if(response.status === 200){
           return <Redirect to={"/"} />
        }
        else{
            console.log("Error occurred while Sign Up")
        }

    }

    return (<div>
        <form onSubmit ={ (e)=>handleSubmit(e)} >
                <InputField
                    name="name"
                    type ="text"
                    placeholder= "Username"
                    onChange = {handleChange}
                />
                <InputField
                    name="email"
                    type ="email"
                    placeholder= "Email"
                    onChange = {handleChange}
                />
                <InputField
                    name="level"
                    type ="number"
                    placeholder= "Access Level"
                    onChange = {handleChange}/>
                <InputField
                    name="Password"
                    type ="password"
                    placeholder= "Password"
                    onChange = {handleChange}
                />
                <button type = "submit" value = "Submit" >
                    Sign Up
                </button>
                <Link to={"/login"}>Log In</Link>
            </form>
        </div>
        )
}
export default SignUp;