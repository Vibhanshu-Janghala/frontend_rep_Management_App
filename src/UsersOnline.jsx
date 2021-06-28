import {useSocket} from "./SocketContext";
import {useEffect, useState} from "react";
import "./UsersOnline.css";

const UsersOnline = () => {
    // props.list = [{socketId,username},...]
    const socket = useSocket();
    const [onlineUsers, setOnlineUsers] = useState({});
    useEffect(() => {
        socket.emit("getOnline");
        socket.on("updateOnline", (data) => {
            setOnlineUsers(data);
        });
        return (() => {
            socket.removeAllListeners();
        });
    }, []);
    const keysArr = Object.keys(onlineUsers);
    const usersList = keysArr !== [] ? (keysArr).map((key) => {
        return <span key={onlineUsers[key]} className="onlineUser-item">
            {key}
        </span>
    }) : null;

    return (
        <div className={"onlineUser-container"}>
            {usersList}
        </div>
    )
}
export default UsersOnline;