import React, {useEffect, useRef, useState} from "react";
import ChatRooms from "./ChatRooms";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import {useProfile} from "./ProfileContext";
import {useSocket} from "./SocketContext";
import "./Chat.css";
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
    const refObject = useRef({"indexedRoom": indexedRoom, "currentChat": currentChat});

    useEffect(() => {
        refObject.current = {"indexedRoom": indexedRoom, "currentChat": currentChat}
    }, [currentChat]);

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
                let roomIndex = refObject.current.indexedRoom[data.room];
                // remove current room if equal tod deleted
                if (currentRef.current[0] === data.room) {
                    setCurrentChatRoom(["", -1]);
                }
                //update chat
                setCurrentChat((prev) => {
                    let cloneArr = [...prev]
                    cloneArr.splice(roomIndex, 1);
                    return cloneArr;
                });
            });

            // receive new messages and update chat
            socket.on("newMessage", (data) => {
                let roomIndex = refObject.current.indexedRoom[data.room];
                let updatedRoom = [...refObject.current.currentChat[roomIndex].content,
                    {"sender": data.sender, "message": data.message, "timeStamp": data.timeStamp}];
                setCurrentChat((prev) => {
                    let cloneArr = [...prev]
                    cloneArr.splice(roomIndex, 1, {"room": data.room, "content": updatedRoom});
                    return cloneArr;
                });
            });
            return (() => {
                socket.removeAllListeners();
            });
        }
        , []);


    // handler for selected chat room
    const [currentChatRoom, setCurrentChatRoom] = useState(["", -1]);
    const handleRoom = (name, index) => (setCurrentChatRoom([name, index]));
    const currentRef = useRef(currentChatRoom);
    useEffect(() => {
        currentRef.current = currentChatRoom
    }, [currentChatRoom]);

    // handler for adding new chat room
    const handleAddRoom = (name) => {
        if (profileData.level === 2) {
            const data = {"room": name};
            socket.emit("newRoom", data, (response) => {
                if (response.status !== 200) {
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
                if (response.status !== 200) {
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
                return null;
            } else {
                console.log("Error occurred while sending message")
            }

        })

    }
    return (
        <div className={"chat-main-flex"}>
            <ChatRooms
                rooms={indexedRoom}
                onChange={handleRoom}
                level={profileData.level}
                onDelete={handleDelete}
                onAddRoom={handleAddRoom}
            />

            {(currentChatRoom[0] !== "") ? <div className={"current-chat"}>
                <ChatWindow
                    chatTitle={currentChatRoom[0]}
                    chatContent={currentChat[currentChatRoom[1]].content}
                />
                < MessageInput
                    onSubmit={handleMessageSubmit}
                />
            </div> : null}
        </div>
    );

}

export default Chat;
