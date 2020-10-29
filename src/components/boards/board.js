import React, { useState } from "react"
import BoardAdder from "./boardAdder"

const Board = () => {
  const [isAdding, setIsAdding] = useState(false)
  const additionHandler = () => {
    setIsAdding(!isAdding)
}

  return (
    <div>
      {!isAdding ? (
        <button onClick={additionHandler} className="boards board-wrap">
          <h1
            style={{
              marginBottom: "5px",
              fontSize: "60px",
            }}
          >
            +
          </h1>
          <div>Add New Board</div>
        </button>
      ) : (
        <BoardAdder additionHandler = {additionHandler}/>
      )}
    </div>
  )
}

export default Board
