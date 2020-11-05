import { useQuery } from "@apollo/client"
import { gql } from "apollo-boost"
import React, { useContext, useEffect, useState } from "react"
import { ModalContext } from "../../context/modalContext"

const PostModal = () => {
    
    const modalContext = useContext(ModalContext)
    const {isOpen, postId, setIsOpen} = modalContext

    const closeHandler = () => {
        setIsOpen(false)
    }

    const FETCH_POST_DATA = gql`
        query post($postId: ID!) {
            post(postId: $postId) {
                name
            }
        }
    
    `
    const {data, refetch, loading} = useQuery(FETCH_POST_DATA, {
        variables: {postId: postId}
    })

    useEffect(() => {
       if (isOpen) {
        refetch()
       }
 
    },[postId])

    return (
        <div className={`post post-modal-overlay ${isOpen && `active`}`}>
            <div className="post post-modal-container">
                <div className="post post-modal-wrap">
                    <h2 style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        {!data ? `Loading...` : data.post.name}
                        <button onClick={closeHandler} style={{
                            fontSize: "20px",
                            fontWeight: "200"
                        }}>
                        Close
                        </button>
                    </h2>
                    <div>
                        Description
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostModal