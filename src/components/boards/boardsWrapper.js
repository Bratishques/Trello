import React, { useContext, useState } from "react" 
import { AuthContext } from "../../context/authContext"
import Board from "./board"
import "./boards.scss"

const BoardsWrapper = () => {
    const [boards, setBoards] = useState([])
    const auth = useContext(AuthContext)
    
    return (
        <div className = "boards boards-wrapper">
        <Board/>
        <Board/>
        <Board/>
        <Board/>
        <Board/>
        <Board/>
        <Board/>
        <Board/>
        </div>
    )
}

export default BoardsWrapper