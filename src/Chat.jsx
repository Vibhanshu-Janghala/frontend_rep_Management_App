import React,{useState} from "react";
import ChatRooms from "./ChatRooms";
import ChatWindow from "./ChatWindow";
import UsersOnline from "./UsersOnline";
import MessageInput from "./MessageInput";

const Chat = (props)=>{

    let socket=props.sockt;
    const [chatRoom,setChatRoom]= useState("");
    const handleRoom = (value) =>(setChatRoom(value));
    const [currentChat,setCurrentChat]= useState([]);
    const [onlineUsers,setOnlineUsers] = useState([])

        socket.on("updateOnline",(users)=>{
            setOnlineUsers(users);
        })

        socket.on("prevChat",(chat)=>{
                    setChatRoom(chat[0].title);
                    setCurrentChat(chat);

        })
        // receive new messages and update chat
        socket.on("newMessage",(data)=>{
            let roomIndex = currentChat.indexOf(data.room);
            let updatedRoom = [...currentChat[roomIndex].content,{"sender":data.sender,"message":data.message}];
            setCurrentChat((prev)=>{
                prev.splice(roomIndex,1,updatedRoom);
                return prev;
            })
        })

        socket.emit("getPrevChat");

    const handleMessageSubmit = (newMessage)=>{
        let data = {"room":chatRoom,"sender":["FILL HERE"],"message":newMessage};
       // THINK HOW TO UPDATE CHAT VIA SENDER OR RECEIVER
        socket.emit("newMessage",data)

    }

    return(
        <>
            <ChatRooms
                rooms={Object.keys(currentChat)}
                onChange = {handleRoom}
            />
            <ChatWindow
                chatTitle={chatRoom}
                chatContent={currentChat[chatRoom]}
                userName={null}
            />
            < MessageInput
                onSubmit ={handleMessageSubmit}
            />
            <UsersOnline list={onlineUsers} />

        </>
    )

}


export default Chat;