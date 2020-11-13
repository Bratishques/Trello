import { gql, useQuery } from "@apollo/client"
import React, { useContext, useEffect } from "react"
import { ModalContext } from "../../context/modalContext"

const PostTemplate = ({ name, id, threadId}) => {
  const { setIsOpen, setPostId } = useContext(ModalContext)
  const clickHandler = () => {
    setIsOpen(true)
    setPostId(id)
  }
  const POST_IS_UPDATED = gql`
    subscription postUpdated($postId: ID!) {
      postUpdated(postId: $postId) {
        name
        description
        comments {
          text
        }
        updateType
      }
    }
  `
  const FETCH_POST_DATA = gql`
    query post($postId: ID!) {
      post(postId: $postId) {
        name
        description
      }
    }
  `

  const { data, subscribeToMore } = useQuery(FETCH_POST_DATA, {
      variables: {postId: id}
  })

  useEffect(() => {
    const unsub = subscribeToMore({
      document: POST_IS_UPDATED,
      variables: { postId: id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const post = subscriptionData.data.postUpdated
        if (post.updateType === "nameUpdated") {
          console.log(prev)
          return Object.assign({}, prev, {
            post: {
              ...prev.post,
              name: post.name,
            },
          })
        }
      },
    })
    return () => unsub()
  }, [])

  return (
    <div className="post post-wrapper" onClick={clickHandler}>
      {data && data.post.name}
    </div>
  )
}

export default PostTemplate
