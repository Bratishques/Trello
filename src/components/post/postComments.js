import { useQuery } from "@apollo/client"
import { gql } from "apollo-boost"
import React from "react"
import PostComment from "./postComment"


const PostComments = ({postId}) => {

    const GET_COMMENTS = gql`
        query postComments($postId: ID!) {
            postComments(postId: $postId) {
                _id
                text
                author {
                    _id
                }
            }
        }
    
    `
    const {data, subscribeToMore} = useQuery(GET_COMMENTS, {
        variables: {postId: postId} 
    })

    return (
        <div>
        {data && data.postComments.map((a,i) => {
            return <PostComment commentId = {a._id} commentText = {a.text} commentAuthor = {a.author} key = {i}/>
        })} 

        </div>
    )
}

export default PostComments