import React, { useState } from "react"

export const ModalContext = React.createContext()

export const ModalContextProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [postId, setPostId] = useState('')

    return (
        <ModalContext.Provider value={{
            isOpen,
            setIsOpen,
            postId,
            setPostId
        }}>
        {children}
        </ModalContext.Provider>
    )
}