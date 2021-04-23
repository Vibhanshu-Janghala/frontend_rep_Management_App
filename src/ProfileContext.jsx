import React, { useContext, useState } from "react";

const ProfileContext = React.createContext();

export function useProfile() {
    return useContext(ProfileContext);
}

export function ProfileProvider({ children }) {
    const [profileData, setProfileData] = useState({});

    return (
        <ProfileContext.Provider value={{profileData,setProfileData}}>
            {children}
        </ProfileContext.Provider>
    );
}
