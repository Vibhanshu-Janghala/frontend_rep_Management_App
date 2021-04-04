import React,{useState} from "react";
import InputField from "./InputField";


// INCOMPLETE COMPONENT
// INCOMPLETE COMPONENT
// INCOMPLETE COMPONENT
const MessageInput = (props)=>{
   const [message,setMessage]= useState("")

    const handleSubmit = ()=>{
       props.onSubmit(message);
       setMessage(null);
    }

    const handleChange = (name,value)=>{
       setMessage(value)
   }
    return(
        <div>
            <InputField
                name={"message"}
                placeholder={"Type here..."}
                onChange={handleChange}
            />

            <button type="button" onClick={handleSubmit}>
                Send
            </button>


        </div>
    )
}
export default MessageInput;