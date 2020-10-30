import { useMutation } from "@apollo/client"
import { gql } from "apollo-boost"
import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"

const BoardAdder = ({additionHandler}) => {
  const auth = useContext(AuthContext)
  const ADD_BOARD = gql`
    mutation createBoard($name: String!, $userId: ID!) {
      createBoard(name: $name, userId: $userId) {
        _id
      }
    }
  `

    const [createBoard] = useMutation(ADD_BOARD, {
    })

    const [boardName, setBoardName] = useState('')

    const clickHandler = async () => {
        if (boardName.length > 0) {
          console.log(boardName, auth.data.userId)
            createBoard({variables:{name: boardName, userId: auth.data.userId}})
        }
    }
  
    const inputHandler = (e) => {
      setBoardName(e.target.value)
    }

  return (
    <div className="boards board-wrap">
      <input className="boards board-input" placeholder="Insert Name" onChange={inputHandler} />
      <div className="boards board-input-buttons-wrap">
        <button className="boards board-input-button" onClick={clickHandler}>Save</button>
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
