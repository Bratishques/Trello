import React, { useContext } from "react"
import { ModalContext } from "../../context/modalContext"

const PostTemplate = ({name, id}) => {

    const {setIsOpen, setPostId} = useContext(ModalContext)
    const clickHandler = () => {
        setIsOpen(true)
        setPostId(id)
    }
    
    return (
        <div className="post post-wrapper" onClick={clickHandler}>
            {name}
        </div>
    )
}

export default PostTemplate