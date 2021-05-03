import React,{useState} from "react";
import ChatRooms from "./ChatRooms";
import ChatWindow from "./ChatWindow";
import UsersOnline from "./UsersOnline";
import MessageInput from "./MessageInput";
import {useProfile} from "./ProfileContext";

const Chat = (props)=>{
    let {profileData} = useProfile()
    let socket=props.sockt;
    const [currentChatRoom,setCurrentChatRoom]= useState("");
    const [currentChat,setCurrentChat]= useState([]);
    const [onlineUsers,setOnlineUsers] = useState([])

    socket.emit("getPrevChat");

        socket.on("updateOnline",(users)=>{
            setOnlineUsers(users);
        })

        socket.on("prevChat",(chat)=>{
                    setCurrentChatRoom(chat[0].title);
                    setCurrentChat(chat);

        })
        // receive new messages and update chat
        socket.on("newMessage",(data)=>{
            let roomIndex = currentChat.indexOf(data.room);
            let updatedRoom = [...currentChat[roomIndex].content,{"sender":data.sender,"message":data.message}];
            setCurrentChat((prev)=>{
                prev.splice(roomIndex,1,{"room":data.room,"content":updatedRoom});
                return prev;
            })
        })



    const handleMessageSubmit = (newMessage)=>{
        let data = {"room":currentChatRoom,"sender":profileData.name,"message":newMessage};

        socket.emit("newMessage",data,(response)=>{
           // if acknowledgement successful
            if(response.status === 200){
                let roomIndex = currentChat.indexOf(data.room);
                let updatedRoom = [...currentChat[roomIndex].content,{"sender":data.sender,"message":data.message}];
                setCurrentChat((prev)=>{
                    prev.splice(roomIndex,1,{"room":data.room,"content":updatedRoom});
                    return prev;
                })
            }
            else{
                console.log("Error occurred while sending message")
            }

        })

    }
    function getChatRooms(){
        let arr = [];
        currentChat.forEach((item)=>[...arr,item.title]);
        return arr ;
    }

    const handleRoom = (value) =>(setCurrentChatRoom(value));

    return(
        <>
            <ChatRooms
                rooms={getChatRooms()}
                onChange = {handleRoom}
            />
            <ChatWindow
                chatTitle={currentChatRoom}
                chatContent={ currentChat[currentChat.indexOf(currentChatRoom)].content }
            />
            < MessageInput
                onSubmit ={handleMessageSubmit}
            />
            <UsersOnline list={onlineUsers} />

        </>
    )

}



export default Chat;