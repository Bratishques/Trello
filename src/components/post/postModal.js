import { useMutation, useQuery } from "@apollo/client"
import { gql } from "apollo-boost"
import React, { useContext, useEffect, useState } from "react"
import { ModalContext } from "../../context/modalContext"
import PostComments from "./postComments"
import PostDescription from "./postDescription"
import PostTitle from "./postTitle"

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
  
  const { data, refetch, subscribeToMore} = useQuery(FETCH_POST_DATA, {
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
       if (post.updateType === "nameUpdated") {
          console.log(post)
          return Object.assign({}, prev, {
            post: {
              ...prev.post,
              name: post.name
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
          <div>
            {!data ? `Loading...` : <PostTitle name={data.post.name} postId={postId} closeHandler={closeHandler}/>}
          </div>
          {!data ? "...Loading" :
          <div>
            <h4 style={{
                fontSize: "20px",
                marginBottom: "20px"
            }}>Description</h4>
            <PostDescription description={data.post.description} postId = {postId} isOpen={isOpen}/>
            <h4>Comments</h4>
           <PostComments postId = {postId}/>
          </div>
        }
        </div>
      </div>
    </div>

  )
}

export default PostModal
