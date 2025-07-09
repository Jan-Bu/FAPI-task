import React, { createContext, useContext, useState } from "react"

const UserContext = createContext([{}, () => { }])

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState({})

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)