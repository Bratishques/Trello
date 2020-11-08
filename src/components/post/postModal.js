import { useQuery } from "@apollo/client"
import { gql } from "apollo-boost"
import React, { useContext, useEffect, useState } from "react"
import { ModalContext } from "../../context/modalContext"
import PostDescription from "./postDescription"

const PostModal = () => {
  const modalContext = useContext(ModalContext)
  const { isOpen, postId, setIsOpen } = modalContext

  const closeHandler = () => {
    setIsOpen(false)
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
  const { data, refetch, loading, subscribeToMore} = useQuery(FETCH_POST_DATA, {
    variables: { postId: postId },
  })

  useEffect(() => {
    if (isOpen) {
      refetch()
    }
  }, [postId])

  useEffect(() => {
    const unsub = subscribeToMore({
      document: POST_IS_UPDATED,
      variables: {postId: postId},
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data) return prev
        const post = subscriptionData.data.postUpdated
       if (post.updateType === "descriptionUpdated") {
          console.log(post)
            return Object.assign({}, prev, {
              post: {
                ...prev.post,
                description: post.description
              }

            })

       }
       
      
      }
    })
    return () => unsub()

  })

  return (
    <div className={`post post-modal-overlay ${isOpen && `active`}`}>
      <div className="post post-modal-container">
        <div className="post post-modal-wrap">
          <h2
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {!data ? `Loading...` : data.post.name}
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
          {!data ? "...Loading" :
          <div>
            <h4 style={{
                fontSize: "20px",
                marginBottom: "20px"
            }}>Description</h4>
            <PostDescription description={data.post.description} postId = {postId}/>
          </div>
        }
        </div>
      </div>
    </div>

  )
}

export default PostModal
