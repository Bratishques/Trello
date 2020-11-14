import { gql, useMutation } from "@apollo/client"
import React, { useEffect, useState } from "react"

const PostTitle = ({ name, postId, closeHandler }) => {
  const [nameEdit, setNameEdit] = useState(false)
  const [editedName, setEditedName] = useState(name)
  const updatePostNameHandler = () => {
    updatePostName({
      variables: { postId: postId, name: editedName },
    })
  }
  const UPDATE_NAME = gql`
    mutation updatePostName($postId: ID!, $name: String!) {
      updatePostName(postId: $postId, name: $name) {
        name
      }
    }
  `

  const nameEditHandler = () => {
    setNameEdit(!nameEdit)
    if (nameEdit) {
      updatePostNameHandler()
    }
  }

  useEffect(() => {
    setEditedName(name)
  }, [postId])
  const [updatePostName] = useMutation(UPDATE_NAME)
  return (
    <h2
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {!nameEdit ? (
        name
      ) : (
        <input
          value={editedName}
          onChange={e => {
            setEditedName(e.target.value)
          }}
        ></input>
      )}
      <button
        style={{
          fontSize: "20px",
          fontWeight: "200",
        }}
        onClick={nameEditHandler}
      >
        Edit name
      </button>
      <button
        onClick={closeHandler}
        style={{
          fontSize: "20px",
          fontWeight: "200",
        }}
      >
        Close
      </button>
    </h2>
  )
}

export default PostTitle
