import React, {useEffect, useState} from "react";
import ChatRooms from "./ChatRooms";
import ChatWindow from "./ChatWindow";
import UsersOnline from "./UsersOnline";
import MessageInput from "./MessageInput";
import {useProfile} from "./ProfileContext";
import {useSocket} from "./SocketContext";

// props : chatSocket
const Chat = (props) => {
    let {profileData} = useProfile()
    let socket = useSocket();
    const [currentChat, setCurrentChat] = useState([]);

    const getChatRoomAndIndex = () => {
        let obj = {};
        currentChat.forEach((item, index) => {
            obj = {...obj, [item.room]: index};
        });
        return obj;
    }

    const indexedRoom = getChatRoomAndIndex();

    useEffect(() => {
            socket.emit("prevChat");
            socket.on("currentChat", (chat) => {
                setCurrentChat(chat);
            });
            // new chat room
            socket.on("createRoom", (data) => {
                setCurrentChat((prev) => {
                    return ([...prev, {"room": data.room, content: []}]);
                });
            });

            // delete chat room => Listener = "del"
            socket.on("delRoom", (data) => {
                let roomIndex = indexedRoom[data.room];
                setCurrentChat((prev) => {
                    let cloneArr = [...prev]
                    cloneArr.splice(roomIndex, 1);
                    return cloneArr;
                });
            });

            // receive new messages and update chat
            socket.on("newMessage", (data) => {
                let roomIndex = indexedRoom[data.room];
                let updatedRoom = [...currentChat[roomIndex].content, {"sender": data.sender, "message": data.message}];
                setCurrentChat((prev) => {
                    let cloneArr = [...prev]
                    cloneArr.splice(roomIndex, 1, {"room": data.room, "content": updatedRoom});
                    return cloneArr;
                });
            });
            return (()=>{
                socket.removeAllListeners();
            });
        }
        , []);




    // handler for selected chat room
    const [currentChatRoom, setCurrentChatRoom] = useState(["", -1]);
    const handleRoom = (name, index) => (setCurrentChatRoom([name, index]));

    // handler for adding new chat room
    const handleAddRoom = (name) => {
        if (profileData.level === 2) {
            const data = {"room": name};
            socket.emit("newRoom", data, (response) => {
                if (response.status === 200) {
                    setCurrentChat((prev) => {
                        return ([...prev, {"room": data.room, content: []}]);
                    });
                } else {
                    console.log("Some Error Occurred");
                }
            });
        } else {
            console.log("Not authorized");
        }
    }

    const handleDelete = (name, index) => {
        if (profileData.level === 2) {
            let data = {"room": name};
            socket.emit("deleteRoom", data, (response) => {
                if (response.status === 200) {

                    setCurrentChatRoom(["", -1]);
                    let roomIndex = index;
                    setCurrentChat((prev) => {
                        let cloneArr = [...prev];
                        cloneArr.splice(roomIndex, 1);
                        return cloneArr;
                    });
                } else {
                    console.log("Some Error Occurred");
                }
            });
        } else {
            console.log("Not Authorized");
        }
    }
    const handleMessageSubmit = (newMessage) => {
        let data = {"room": currentChatRoom[0], "sender": profileData.name, "message": newMessage};
        socket.emit("message", data, (response) => {
            // if acknowledgement successful
            if (response.status === 200) {
                let roomIndex = indexedRoom[data.room];
                let updatedRoom = [...currentChat[roomIndex].content, {"sender": data.sender, "message": data.message}];
                setCurrentChat((prev) => {
                    let cloneArr = [...prev];
                    cloneArr.splice(roomIndex, 1, {"room": data.room, "content": updatedRoom});
                    return cloneArr;
                })
            } else {
                console.log("Error occurred while sending message")
            }

        })

    }
    console.log(currentChatRoom)
    console.log((currentChatRoom !== ["", -1]));
    return (
        <>
            <ChatRooms
                rooms={indexedRoom}
                onChange={handleRoom}
                level={profileData.level}
                onDelete={handleDelete}
                onAddRoom={handleAddRoom}
            />
            {(currentChatRoom[0] !== "") ? <div>
                <ChatWindow
                    chatTitle={currentChatRoom[0]}
                    chatContent={currentChat[currentChatRoom[1]].content}
                />
                < MessageInput
                    onSubmit={handleMessageSubmit}
                />
            </div> : null}
            <UsersOnline/>

        </>
    );

}

export default Chat;
