import { gql, useMutation } from "@apollo/client"
import React, { useState } from "react"

import "./threads.scss"

const AddUserModal = ({id, modalOpen, setModalOpen}) => {
  const [email, setEmail] = useState("")
  const [valid, setValid] = useState(false)


  const ADD_USER_TO_BOARD = gql`
    mutation addUserToBoard($userEmail: String!, $boardId: ID!){
        addUserToBoard(userEmail: $userEmail, boardId: $boardId){
            _id
        }
    }
  
  `

  const changeHandler = e => {
    setEmail(e.target.value)
    if (/\S+@\S+\.\S+/.test(e.target.value))
    {
        setValid(true)
    }
    else {
        setValid(false)
    }
  }


  const [addUserToBoard, {data, error}] = useMutation(ADD_USER_TO_BOARD)

  const closeHandler = async () => {
    setModalOpen(false)
  }

  const clickHandler = async () => {
    console.log(id)
      addUserToBoard({
          variables: {userEmail: email, boardId: id}
      })
    
  }

  return (
    <div className={`threads threads-modal-overlay ${modalOpen && `active`}`}>
      <div className="threads threads-modal-container">
        <h3 className="header-with-button">
          Add new user
          <button onClick={closeHandler}>Close</button>
        </h3>
        <div className="threads-modal-user-field">
          <input
            style={{
              backgroundColor: "honeydew",
              border: "2px solid blueviolet",
              width: "100%",
              marginBottom: "30px",
              padding: "4px 10px",
            }}
            type="email"
            name="email"
            placeholder="Email"
            onChange={changeHandler}
          />{" "}
          <button disabled={!valid} onClick={clickHandler}>Add new user</button>
        </div>
        <div className="threads-modal-user-warning"></div>
      <div className="threads-modal-user-result">
          {data && `User has been added`}
          {error && error.message}
      </div>
      </div>
      
    </div>
  )
}

export default AddUserModal
