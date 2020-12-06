import React,{useState} from "react";


// INCOMPLETE COMPONENT
// INCOMPLETE COMPONENT
// INCOMPLETE COMPONENT
const MessageInput = ()=>{
    const [message,setMessage]= useState("")
   const handleSubmit =()=>{
        //emit event using SUBMIT
       console.log("Message is :-" + message)
   }
   const handleChange = (e)=>{
       setMessage(e.target.value)
   }
    return(
        <div>
            <form onSubmit={(handleSubmit())}>
                <input type="text"
                       placeholder="Type a message"
                       name="message"
                       onChange={(e)=>{handleChange(e)}}

                />
                <button type="submit">
                    Send
                </button>
            </form>

        </div>
    )
}
export default MessageInput;