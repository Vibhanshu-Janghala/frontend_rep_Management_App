import React, {useContext, useState} from "react";

const ThemeContext = React.createContext(null);

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({children}) {
    const [themeData, setThemeData] = useState(window.localStorage.getItem("themeNumber") != null ?
        window.localStorage.getItem("themeNumber") :
        "first");

    return (
        <ThemeContext.Provider value={{themeData, setThemeData}}>
            {children}
        </ThemeContext.Provider>
    );
}
