import React,{useState} from "react";
const Chat = (props)=>{

    const chatList = (props.cList) =>{
        const [currentChat,setCurrentChat]= useState("");

        const handleChat = (e,name)=>{

        }


        return (<div >
                {props.cList.forEach(name =>
                {return(<div key={name}>
                    <button  name={name}  type={"button"} onClick = {(e) =>{handleChat(e,name)}} />
                </div>)})}
            </div>
        )



    }

    return(<div>
        {chatList}
        {chatWindow}
        {chatInput}
        </div>
    )
}


export default Chat;