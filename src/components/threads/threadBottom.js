import { useMutation } from "@apollo/client"
import { gql } from "apollo-boost"
import React from "react"

const ThreadBottom = ({threadId, boardId, nextIds}) => {

    const sleep = ms => {
        return new Promise(resolve => {
          return setTimeout(resolve, ms)
        })
      }

    const DELETE_THREAD = gql`
     mutation deleteThread($threadId: ID!, $boardId: ID!) {
         deleteThread(threadId: $threadId, boardId: $boardId) {
             _id
         }
     }
    `
    const [deleteThread] = useMutation(DELETE_THREAD)

    const deleteThreadHandler = async () => {

        deleteThread({
            variables: {threadId: threadId, boardId: boardId}
        })
        

        

        
    }
    return (
        <div className="threads thread-wrapper-bottom"><button onClick={deleteThreadHandler} className="crimson">X</button></div>
    )

}

export default ThreadBottom