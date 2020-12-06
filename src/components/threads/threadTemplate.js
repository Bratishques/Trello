import { useQuery } from "@apollo/client"
import { gql } from "apollo-boost"
import React, { useEffect } from "react"
import PostAdder from "../post/postAdder"
import PostTemplate from "../post/postTemplate"
import ThreadBottom from "./threadBottom"

const ThreadTemplate = ({ name, id, boardId, nextIds, threads}) => {
  const POST_DELETED = gql`
  subscription postDeleted($threadId: ID!){
      postDeleted(threadId: $threadId) {
        _id
      }
  }
`
  const SUBSCRIBE_TO_POST = gql`
    subscription onPostAdded($threadId: ID!) {
      postAdded(threadId: $threadId) {
        name
        _id
        threadId
      }
    }
  `


  const FETCH_THREAD = gql`
    query thread($threadId: ID!) {
      thread(threadId: $threadId) {
        name
        posts {
          name
          _id
        }
      }
    }
  `
  

  const { data, subscribeToMore} = useQuery(FETCH_THREAD, {
    variables: { threadId: id },
  })

  

  useEffect(() => {
    let unsubscribe = subscribeToMore({
      document: POST_DELETED,
      variables: { threadId: id },
      updateQuery: (prev, { subscriptionData }) => {

        if (!subscriptionData.data) return prev
        const postId = subscriptionData.data.postDeleted._id
        const newPosts = prev.thread.posts.filter(a => a._id !== postId)
        
        return Object.assign({}, prev, {
          ...prev,
          thread: {
            ...prev.thread,
            posts: [...newPosts]
          }
        })
        
      },
    })

    return () => unsubscribe()
  }, [threads.length])

  useEffect(() => {
    let unsubscribe = subscribeToMore({
      document: SUBSCRIBE_TO_POST,
      variables: { threadId: id },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(id)
        if (!subscriptionData.data) return prev
        const newPost = subscriptionData.data.postAdded
        return Object.assign({}, prev, {
          thread: {
            ...prev.thread,
            posts: {
              ...prev.thread.posts,
              newPost,
            },
          },
        })
      },
    })

    return () => unsubscribe()
  }, [threads.length])


  return (
    <div id={`${id}`} className="threads thread-wrapper" draggable="true">
      <div  className="thread thread-scroll-wrap">
        <div className="threads thread-wrapper-top">
          <h3
            style={{
              margin: "0",
            }}
          >
            {name}
          </h3>
        </div>
        <div className="threads thread-wrapper-middle">
          {data &&
            data.thread.posts.map((a, i) => {
              return <PostTemplate name={a.name} key={i} id={a._id} threadId={id}/>
            })}
          <PostAdder id={id} />
        </div>
        <ThreadBottom threadId={id} boardId = {boardId} nextIds = {nextIds}/>
      </div>
    </div>
  )
}

export default ThreadTemplate
