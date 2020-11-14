import { useMutation } from "@apollo/client"
import { gql } from "apollo-boost"
import React, { useState } from "react"
import "./post.scss"
const PostAdder = ({ id }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [name, setName] = useState("")

  const clickHandler = () => {
    setIsAdding(!isAdding)
  }

  const inputHandler = e => {
    setName(e.target.value)
  }

  const ADD_POST = gql`
    mutation createPost($threadId: ID!, $name: String!) {
      createPost(threadId: $threadId, name: $name) {
        name
        _id
      }
    }
  `

  const [createPost, { loading }] = useMutation(ADD_POST)

  const addPostHandler = () => {
    setName('')
    setIsAdding(false)
    createPost({
      variables: { name: name, threadId: id },
    })
  }

  return (
    <div>
      <div className={`post post-add-window ${isAdding && "active"}`}>
        {isAdding && (
          <input
            value={name}
            onChange={inputHandler}
            className="post"
            placeholder="Enter name"
          />
        )}
        {isAdding && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <button className="post post-add-button" onClick={addPostHandler}>
              {loading ? `Loading...` : `Add`}
            </button>
            <button
              className="post post-add-button"
              style={{
                backgroundColor: "crimson",
              }}
              onClick={clickHandler}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <button
        onClick={clickHandler}
        className="post post-add-button"
        style={{
          width: "100%",
          fontSize: "14px",
          padding: "2px 10px",
          textAlign: "left",
          borderRadius: "0 0 10px 10px",
          height: "40px",
        }}
      >
        {!isAdding ? `Add new post` : `Close`}
      </button>
    </div>
  )
}

export default PostAdder
