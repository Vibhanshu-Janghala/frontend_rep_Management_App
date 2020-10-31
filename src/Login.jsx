import React,{useState} from "react";
//Login page css
import InputField from './InputField'
function LoginPage(){

    const [data,setData] = useState({});

    const handleChange = (name,value) =>{
        return(setData(prev =>{return({ ...prev , [name]: value})}))
    }
    console.log(data)

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Data ${data}`)
        console.log(data)
    }

    return(
        <div>
            <form onSubmit = {handleSubmit} >
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

    )
}
export default LoginPage;