import React,{useState} from "react";
import ChatRooms from "./ChatRooms";
import ChatWindow from "./ChatWindow";
import UsersOnline from "./UsersOnline";
import InputField from "./InputField";

const Chat = (props)=>{

    let socket=props.sockt;
    const [chatRoom,setChatRoom]= useState("");
    const handleRoom = (value) =>(setChatRoom(value));
    const [currentChat,setCurrentChat]= useState({});
    const [onlineUsers,setOnlineUsers] = useState([])

        socket.on("updateOnline",(users)=>{
            setOnlineUsers(users);
        })

        socket.on("prevChat",(chat)=>{
            setChatRoom(chat[0].title);
            chat.forEach((item)=>{
                setCurrentChat(prevState => {
                    return {...prevState,[item.title]:item.content}
                })
            })
        })
        // receive new messages and update chat
        socket.on("newMessage",(data)=>{
            setCurrentChat(prevState => {
                let updatedArray = [...prevState[data.title],data.message]
                return {prevState,[data.title]:updatedArray}
            })
        })

        socket.emit("getPrevChat");

        socket.emit("message",(data)=>{

        })


    return(
        <>
            <ChatRooms
                room={Object.keys(currentChat)}
                onChange = {handleRoom}
            />
            <ChatWindow
                chatTitle={chatRoom}
                chatContent={currentChat[chatRoom]}
            />
            < MessageInput />
            <UsersOnline list={onlineUsers} />

        </>
    )

}


export default Chat;