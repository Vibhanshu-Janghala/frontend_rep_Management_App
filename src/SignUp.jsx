import {useEffect, useState} from "react";
import {useProfile} from "./ProfileContext";
import InputField from "./InputField";
import {Link, useHistory} from "react-router-dom";


const SignUp = () => {
    const {profileData,setProfileData} = useProfile();
    const [data, setData] = useState({});
    let history = useHistory();

    useEffect(()=>{
        if(profileData.name != null){
            history.push("/dashboard")
        }
    },[profileData]);

    const handleChange = (name, value) => {
        return (setData(prev => {
            return ({...prev, [name]: value})
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let response = await fetch("http://localhost:8080/api/createAccount", {
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

        if (response.status === 200) {
            let jsResponse = await response.json();
            setProfileData(() => jsResponse);
        } else {
            console.log("Error occurred while Sign Up")
        }

    }

    return (<div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <InputField
                    name="name"
                    type="text"
                    placeholder="Username"
                    onChange={handleChange}
                />
                <InputField
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <div className="radio">
                    <label>
                        <input
                            name="level"
                            type="radio"
                            value="Male"
                            checked={data.level === 0}
                            onChange={() => handleChange("level", 0)}
                        />
                        Least Access
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input
                            name="level"
                            type="radio"
                            value="Female"
                            checked={data.level === 1}
                            onChange={() => handleChange("level", 1)}
                        />
                        Medium Access
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input
                            name="level"
                            type="radio"
                            value="Other"
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
                />
                <button type="submit" value="Submit">
                    Sign Up
                </button>
                <Link to={"/login"}>Log In</Link>
            </form>
        </div>
    )
}
export default SignUp;