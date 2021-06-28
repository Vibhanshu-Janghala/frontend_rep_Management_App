import React,{useState} from "react";
import {ReactComponent as SendSVG} from "./icons/send_black_36dp.svg";

const MessageInput = (props)=>{
   const [message,setMessage]= useState("");

    const handleSubmit = (e)=>{
       e.preventDefault();
       props.onSubmit(message);
       setMessage("");
    }

    const handleChange = (e)=>{
       setMessage(e.target.value);
   }
    return(
        <form onSubmit={(e)=>handleSubmit(e)} className={"message-input"}>
            <input
                name="message"
                placeholder="Message..."
                value={message}
                onChange={handleChange}
            />

            <button type="submit" value="Submit" >
                <SendSVG />
            </button>


        </form>
    );
}
export default MessageInput;