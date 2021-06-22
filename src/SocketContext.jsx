import React, {useContext} from "react";
import {useProfile} from "./ProfileContext";
import {io} from "socket.io-client";

const SocketContext = React.createContext(null);

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({children}) {
    console.log("provide SOcket");

    const {profileData} = useProfile();
    let socket;
    const socketInitializer = () => {
        return io("localhost:8080/", {
            "path": "/socket.io",
            "upgrade": false,
            "transports": ["websocket"],
            "reconnection": false,
            "reconnectionDelay": 3000,
            "reconnectionAttempts": 4,
            "forceNew": false,
            "auth": {
                "authToken": profileData.authToken
            }
        });
    }
    if(profileData.name!= null){
        console.log("running")
        socket = socketInitializer();
    }
    socket.on("connect", () => console.log("YOOOOOOOO"))

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}