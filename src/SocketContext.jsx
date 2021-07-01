import React, {useContext} from "react";
import {useProfile} from "./ProfileContext";
import {io} from "socket.io-client";

// Program Flaw : This file runs everytime todoList is edited

const SocketContext = React.createContext(null);

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({children}) {

    const {profileData} = useProfile();
    let socket;
    const socketInitializer = () => {
        return io("/", {
            "path": "/socket.io",
            "upgrade": false,
            "transports": ["websocket"],
            "reconnection": true,
            "reconnectionDelay": 3000,
            "reconnectionAttempts": 4,
            "forceNew": false,
            "auth": {
                "authToken": profileData.authToken
            }
        });
    }
    if(profileData.name!= null){
        socket = socketInitializer();
    }

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}