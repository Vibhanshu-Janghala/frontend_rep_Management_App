import {useSocket} from "./SocketContext";
import {useEffect, useState} from "react";

const UsersOnline = () => {
    // props.list = [{socketId,username},...]
    const socket = useSocket();
    const [onlineUsers,setOnlineUsers] = useState([]);
    useEffect(()=>{
        socket.emit("getOnline");
        socket.on("updateOnline",(data)=>{
            setOnlineUsers(data);
        });
        return (()=>{
            socket.removeAllListeners();
        });
    },[])
    const usersList = onlineUsers.map((obj) => {
        return <div key={obj.name} className="onlineUser">
            {obj.name}
        </div>
    });

    return (
        <div>
            {usersList}
        </div>
    )
}
export default UsersOnline;