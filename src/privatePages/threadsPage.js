import { useQuery } from "@apollo/client"
import { gql } from "apollo-boost"
import React, { useEffect }  from "react"
import { useContext } from "react"
import ThreadsWrapper from "../components/threads/threadsWrapper"
import { AuthContext } from "../context/authContext"


const ThreadsPage = ({ id }) => {
  const auth = useContext(AuthContext)

  const SUBSCRIBE_TO_POST = gql`
    subscription onPostAdded($threadIds: [ID!]) {
      postAdded(threadIds: $threadIds) {
        name
        _id
        threadId
      }
    }
  `

  const SUBCRIBE_TO_THREADS = gql`
    subscription onThreadAdded($boardId: ID!) {
      threadAdded(boardId: $boardId) {
        _id
        name
        posts {
          name
          _id
        }
      }
    }
  `
  const FETCH_BOARD_DATA = gql`
    query board($userId: ID!, $boardId: ID!) {
      board(userId: $userId, boardId: $boardId) {
        name
        threads {
          _id
          name
          posts {
            name
            _id
            threadId
          }
        }
      }
    }
  `



  const { data, loading, error, subscribeToMore } = useQuery(FETCH_BOARD_DATA, {
    variables: { userId: auth.data.userId, boardId: id },
  })

  useEffect(() => {
    console.log("mounted")

    let unsubscribe = subscribeToMore({
      document: SUBCRIBE_TO_THREADS,
      variables: { boardId: id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newFeedItem = subscriptionData.data.threadAdded
        console.log(newFeedItem)
        return Object.assign(
          {},
          {
            ...prev,
            board: {
              ...prev.board,
              threads: [...prev.board.threads, newFeedItem]
            }
          }
        )
      },
    })
    //!important
    return () => unsubscribe()

  
  }, [SUBCRIBE_TO_THREADS, id, subscribeToMore])

  if (error) return <div>AN ERROR OCCURED</div>

  return (

    <div>
      <h1>Threads at {loading ? `..Loading` : data.board.name}</h1>
      { !loading &&
        <ThreadsWrapper threads = {data.board.threads} boardId={id} subscribeToMore = {subscribeToMore} SUBSCRIBE_TO_POST= {SUBSCRIBE_TO_POST}/>
      }
    </div>
  )
}

export default ThreadsPage