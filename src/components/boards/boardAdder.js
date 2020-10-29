import React, { useState } from "react"

const BoardAdder = ({additionHandler}) => {

    const [boardName, setBoardName] = useState('')

    const createBoard = async () => {
        if (boardName.length > 0) {
            console.log(boardName)
        }
    }
  
    const inputHandler = (e) => {
      setBoardName(e.target.value)
    }

  return (
    <div className="boards board-wrap">
      <input className="boards board-input" placeholder="Insert Name" onChange={inputHandler} />
      <div className="boards board-input-buttons-wrap">
        <button className="boards board-input-button" onClick={createBoard}>Save</button>
        <button
          className="boards board-input-button cancel"
          onClick={additionHandler}
        >
          {" "}
          Cancel
        </button>
      </div>
    </div>
  )
}

export default BoardAdder
