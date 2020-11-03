import { useMutation } from "@apollo/client"
import { gql } from "apollo-boost"
import React, { useState } from "react"

const Thread = ({boardId}) => {
  const [isAdding, setIsAdding] = useState(false)
  const [name, setName] = useState('')
  const additionHandler = () => {
    setIsAdding(!isAdding)
  }
  const inputHandler = (e) => {
      setName(e.target.value)
  }

  const ADD_THREAD = gql`
   mutation createThread($boardId: ID!, $name: String!) {
       createThread(boardId: $boardId, name: $name) {
           name
       }
   }
  `

  const [createThread, {error, loading}] = useMutation(ADD_THREAD)

  

  const addBoard = async () => {
      if (name.length > 0) {
      await createThread({
          variables: {boardId: boardId, name: name}
      })
      setIsAdding(!isAdding)
    }
  }


  if (!isAdding) {
    return (
      <button className="threads" onClick={additionHandler}
        style={{
          width: "100%",
        }}
      >
        + Add new Thread
      </button>
    )
  }

  else {
    return (
        <div style= {{
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            alignItems: "center",
            padding: "20px",
        }}>
        <input style={{
            width: "100%",
            padding: "5px 10px",
            boxShadow: "0px 2px 5px 0px rgba(102,51,153,0.10)",
            backgroundColor: "#f5f5f5"
          }} value={name} onChange={inputHandler}/>
          <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around"
        }}>
        <button className="threads" onClick={addBoard}>
            {!loading ? `Add one` : `Loading...`}
        </button>
        <button className="threads" onClick={additionHandler} style={{
            backgroundColor: "crimson"
        }}>
          Cancel
        </button>
        </div>
        {error && error.message}
        </div>
      )
  }
}

export default Thread