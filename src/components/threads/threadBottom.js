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

       const deletedThread = document.getElementById(threadId)
        deletedThread.style.transition = "0.3s all ease-in"
        deletedThread.style.transform = "translateY(600px)"
        nextIds.map(a => {
            const thread = document.getElementById(a._id)
            thread.style.transition = "0.6s all ease-in"
            thread.style.transform = "translateX(-290px)"
        })
        const elems = document.getElementsByClassName("thread-wrapper")
        const button = elems[elems.length - 1]
        button.style.transition = "0.6s all ease-in"
        button.style.transform = "translateX(-290px)"
        await sleep(300)
        
        
        deletedThread.style.opacity = "0"
        await sleep(300)
        deleteThread({
            variables: {threadId: threadId, boardId: boardId}
        })
        await sleep(50)
        deletedThread.style.transition = "0s all ease-in"
        deletedThread.style.opacity = "1"
        deletedThread.style.transform = "translateY(0px)"
        
        nextIds.map(a => {
            const thread = document.getElementById(a._id)
            thread.style.transition = "0s all ease-in"
            thread.style.transform = "translateX(0px)"
        })
        button.style.transition = "0s all ease-in"
        button.style.transform = "translateX(0px)" 

        

        
    }
    return (
        <div className="threads thread-wrapper-bottom"><button onClick={deleteThreadHandler} className="crimson">X</button></div>
    )

}

export default ThreadBottom