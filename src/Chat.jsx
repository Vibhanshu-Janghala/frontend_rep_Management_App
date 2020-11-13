import React,{useState} from "react";
const Chat = (props)=>{

    const chatList = (props.cList) =>{
        const [currentChat,setCurrentChat]= useState("");

        const handleChat = (e,name)=>{
        // switch between chat windows
        }


        return (<div >
                {props.cList.forEach(name =>
                {return(<div key={name}>
                    <button  name={name}  type={"button"} onClick = {(e) =>{handleChat(e,name)}} />
                </div>)})}
            </div>
        )


    }
    // render previous chat
    const chatWindow = ()=>{}

    //render chat input and send button
    const chatInput = ()=>{}
    return(<div>
        {chatList}
        {chatWindow}
        {chatInput}
        </div>
    )
}


export default Chat;