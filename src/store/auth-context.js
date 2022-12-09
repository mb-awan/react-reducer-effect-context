import React, {useEffect, useState} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: (email, password) => {
    },
    onLogout: () => {
    }
});

export const AuthContextProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=> {
        const token = localStorage.getItem('token') === '1';
        if(token) setIsLoggedIn(true);
    }, [])

    const loginHandler = (email, password) => {
        localStorage.setItem('token', '1')
        setIsLoggedIn(true);
    }
    const logoutHandler = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            onLogin: loginHandler,
            onLogout: logoutHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContext;