import React,{useState} from "react";

const MessageInput = (props)=>{
   const [message,setMessage]= useState("");
   console.log("working")

    const handleSubmit = (e)=>{
       e.preventDefault();
       props.onSubmit(message);
       setMessage("");
    }

    const handleChange = (e)=>{
       setMessage(e.target.value);
   }
    return(
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input
                name="message"
                placeholder="Message..."
                value={message}
                onChange={handleChange}
            />

            <button type="submit" value="Submit" >
                Send
            </button>


        </form>
    );
}
export default MessageInput;